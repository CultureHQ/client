import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    listEventAnalytics: apiCall({
      method: "get",
      path: "/analytics/events",
      optionalParams: ["page"]
    }),

    listUserAnalytics: apiCall({
      method: "get",
      path: "/analytics/users",
      optionalParams: ["page"]
    })
  });
