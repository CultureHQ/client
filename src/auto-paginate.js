import apiCalls from "./api-calls";
import calls from "./calls";

class AutoPaginator {
  constructor(dataType) {
    this.dataType = dataType;
  }

  aggregate(call, options) {
    return call({ ...options, page: 1 }).then(response => {
      const { pagination: { totalPages } } = response;

      // There's no need to make multiple calls if there is only one or zero
      // pages of results.
      if (totalPages <= 1) {
        return response;
      }

      let page;
      const promises = [];

      for (page = 2; page <= totalPages; page += 1) {
        promises.push(call({ ...options, page }));
      }

      // Wait for every API call to resolve before proceeding (this allows all
      // of the requests to be executed in parallel)
      return Promise.all(promises).then(responses => {
        // Pull the data from the first request and all the rest of the requests
        // into one list
        let data = [...response[this.dataType]];
        for (page = 0; page <= totalPages - 2; page += 1) {
          data = [...data, ...responses[page][this.dataType]];
        }

        const aggregated = { ...response };
        aggregated[this.dataType] = data;

        return aggregated;
      });
    });
  }
}

Object.keys(calls).forEach(callName => {
  /* eslint-disable-next-line func-names */
  AutoPaginator.prototype[callName] = function (options) {
    return this.aggregate(apiCalls[callName], options);
  };
});

/**
 * Almost every one of the `list*` events is paginated, and will return
 * pagination metadata along with the actual data of the call. The `pagination`
 * object will look like:
 *
 *     { currentPage, totalPages, totalCount }
 *
 * You can handle this pagination manually, e.g., links on the bottom of the
 * page. You can also use the client's built-in automatic pagination
 * capabilities by using the `autoPaginate` named export, as in the following
 * example:
 *
 *     import { autoPaginate } from "@culturehq/client";
 *     const { events } = await autoPaginate("events").listEvents();
 *
 * This will return the pagination information as normal, but the events will
 * be concatenated together.
 */
const autoPaginate = dataType => new AutoPaginator(dataType);

export default autoPaginate;
