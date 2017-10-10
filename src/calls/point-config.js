import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    getPointConfig: apiCall({
      method: "get",
      path: "/point_config"
    }),

    updatePointConfig: apiCall({
      method: "patch",
      path: "/point_config",
      optionalParams: [
        "firstEvent",
        "eventWithTwoNew",
        "profilePicture",
        "hobbies",
        "widgetSurvey",
        "eventSurvey",
        "recognition"
      ]
    })
  });
