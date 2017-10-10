import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createSurveyUserItemResponse: apiCall({
      method: "post",
      path: "/survey_items/:surveyItemId/survey_user_item_response",
      expectedParams: ["body", "surveyItemResponseOptionIds"]
    }),

    createEventSurveyUserItemResponse: apiCall({
      method: "post",
      path:
        "/events/:eventId/survey_items/:surveyItemId/survey_user_item_response",
      expectedParams: ["body", "surveyItemResponseOptionIds"]
    }),

    deleteSurveyUserItemResponse: apiCall({
      method: "delete",
      path: "/survey_items/:surveyItemId/survey_user_item_response"
    }),

    deleteEventSurveyUserItemResponse: apiCall({
      method: "delete",
      path:
        "/events/:eventId/survey_items/:surveyItemId/survey_user_item_response"
    }),

    getSurveyUserItemResponse: apiCall({
      method: "get",
      path: "/survey_items/:surveyItemId/survey_user_item_response"
    }),

    getSurveyUserItemResponse: apiCall({
      method: "get",
      path:
        "/events/:eventId/survey_items/:surveyItemId/survey_user_item_response"
    }),

    updateSurveyUserItemResponse: apiCall({
      method: "patch",
      path: "/survey_items/:surveyItemId/survey_user_item_response",
      optionalParams: ["body", "surveyItemResponseOptionIds"]
    }),

    updateEventSurveyUserItemResponse: apiCall({
      method: "patch",
      path:
        "/events/:eventId/survey_items/:surveyItemId/survey_user_item_response",
      optionalParams: ["body", "surveyItemResponseOptionIds"]
    })
  });
