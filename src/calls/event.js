import apiCall from "../api-call";

const createRSVPCall = apiCall({
  method: "post",
  path: "/events/:eventId/rsvps",
  expectedParams: ["responseType"],
  optionalParams: ["extra"]
});

export default object =>
  Object.assign(object, {
    createEvent: apiCall({
      method: "post",
      path: "/events",
      expectedParams: ["name", "details", "startsAt", "endsAt", "eventType"],
      optionalParams: ["sponsored"]
    }),

    createRSVP: params => {
      const responseTypes = ["declined", "interested", "accepted"];
      if (responseTypes.indexOf(params.responseType) === -1) {
        throw new Error(
          "responseType parameter must be one of " + responseTypes.join(", ")
        );
      }
      return createRSVPCall(params);
    },

    getEvent: apiCall({ method: "get", path: "/events/:eventId" }),

    listEvents: apiCall({ method: "get", path: "/events" }),

    listUserEvents: apiCall({ method: "get", path: "/users/:userId/events" })
  });
