import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createSurveyItemResponseOption: apiCall({
      method: "post",
      path: "/survey_items/:surveyItemId/survey_item_response_options",
      expectedParams: ["body"]
    }),

    deleteSurveyItemResponseOption: apiCall({
      method: "delete",
      path: "/survey_item_response_options/:surveyItemResponseOptionId"
    }),

    getSurveyItemResponseOption: apiCall({
      method: "get",
      path: "/survey_item_response_options/:surveyItemResponseOptionId"
    }),

    listSurveyItemResponseOptions: apiCall({
      method: "get",
      path: "/survey_items/:surveyItemId/survey_item_response_options",
      optionalParams: ["page"]
    }),

    updateSurveyItemResponseOption: apiCall({
      method: "patch",
      path: "/survey_item_response_options/:surveyItemResponseOptionId",
      optionalParams: ["body"]
    })
  });
