import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createEvent: apiCall({
      method: "post",
      path: "/events",
      multipart: true,
      expectedParams: ["name", "details", "startsAt", "endsAt", "eventType"],
      optionalParams: ["sponsored", "surveyId", "image"]
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
    }),

    messageEventGuests: apiCall({
      method: "post",
      path: "/events/:eventId/event_notifications",
      expectedParams: ["body"]
    }),

    subscribeToEventNotifications: apiCall({
      method: "post",
      path: "/events/:eventId/event_notification_subscription"
    }),

    unsubscribeFromEventNotifications: apiCall({
      method: "delete",
      path: "/events/:eventId/event_notification_subscription"
    }),

    updateEvent: apiCall({
      method: "patch",
      path: "/events/:eventId",
      optionalParams: [
        "name",
        "details",
        "startsAt",
        "endsAt",
        "eventType",
        "sponsored",
        "surveyId",
        "image"
      ]
    })
  });
