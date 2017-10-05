import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createEventRsvp: apiCall({
      method: "post",
      path: "/events/:eventId/rsvps",
      expectedParams: ["responseType"],
      optionalParams: ["extra"]
    }),

    getEventRsvp: apiCall({
      method: "get",
      path: "/events/:eventId/rsvps/:rsvpId"
    }),

    listEventRsvps: apiCall({
      method: "get",
      path: "/events/:eventId/rsvps",
      optionalParams: ["page"]
    }),

    updateEventRsvp: apiCall({
      method: "patch",
      path: "/events/:eventId/rsvps/:rsvpId",
      expectedParams: ["responseType"],
      optionalParams: ["extra"]
    })
  });
