import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createSurveyItem: apiCall({
      method: "post",
      path: "/surveys/:surveyId/survey_items",
      expectedParams: ["prompt", "itemType"],
      optionalParams: ["minRange", "maxRange"]
    }),

    deleteSurveyItem: apiCall({
      method: "delete",
      path: "/survey_items/:surveyItemId"
    }),

    getSurveyItem: apiCall({
      method: "get",
      path: "/survey_items/:surveyItemId"
    }),

    listSurveyItems: apiCall({
      method: "get",
      path: "/surveys/:surveyId/survey_items",
      optionalParams: ["page"]
    }),

    updateSurveyItem: apiCall({
      method: "patch",
      path: "/survey_items/:surveyItem",
      optionalParams: ["prompt", "itemType", "minRange", "maxRange"]
    })
  });
