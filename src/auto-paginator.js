import calls from "./calls";

/**
 * A class that wraps an API call and automatically concatenates the results
 * across multiple pages.
 */
class AutoPaginator {
  constructor(client, dataType) {
    this.client = client;
    this.dataType = dataType;
  }

  aggregate(callName, options) {
    return this.client[callName]({ ...options, page: 1 }).then(response => {
      const { pagination: { totalPages } } = response;

      // There's no need to make multiple calls if there is only one or zero
      // pages of results.
      if (totalPages <= 1) {
        return response;
      }

      let page;
      const promises = [];

      for (page = 2; page <= totalPages; page += 1) {
        promises.push(this.client[callName]({ ...options, page }));
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
  AutoPaginator.prototype[callName] = function(options) {
    return this.aggregate(callName, options);
  };
});

export default AutoPaginator;
