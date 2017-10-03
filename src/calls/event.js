import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createEvent: apiCall({
      method: "post",
      path: "/events",
      expectedParams: ["name", "details", "startsAt", "endsAt", "eventType"],
      optionalParams: ["sponsored"]
    }),

    createRSVP: apiCall({
      method: "post",
      path: "/events/:eventId/rsvps",
      expectedParams: ["responseType"],
      optionalParams: ["extra"]
    }),

    getEvent: apiCall({
      method: "get",
      path: "/events/:eventId"
    }),

    listEvents: apiCall({
      method: "get",
      path: "/events",
      optionalParams: ["page"]
    }),

    listUserEvents: apiCall({
      method: "get",
      path: "/users/:userId/events",
      optionalParams: ["page"]
    })
  });
