import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createEvent: apiCall({
      method: "post",
      path: "/events",
      expectedParams: ["name", "details", "startsAt", "endsAt", "eventType"],
      optionalParams: ["sponsored", "surveyId"]
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

    listEventSurveyResults: apiCall({
      method: "get",
      path: "/events/:eventId/survey_results"
    }),

    listUserEvents: apiCall({
      method: "get",
      path: "/users/:userId/events",
      optionalParams: ["page"]
    })
  });
