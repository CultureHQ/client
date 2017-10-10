import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createSurvey: apiCall({
      method: "post",
      path: "/surveys",
      expectedParams: ["title"]
    }),

    deleteSurvey: apiCall({
      method: "delete",
      path: "/surveys/:surveyId"
    }),

    getSurvey: apiCall({
      method: "get",
      path: "/surveys/:surveyId"
    }),

    listSurveys: apiCall({
      method: "get",
      path: "/surveys",
      optionalParams: ["page"]
    }),

    listSurveyResults: apiCall({
      method: "get",
      path: "/surveys/:survey_id/survey_results"
    }),

    updateSurvey: apiCall({
      method: "patch",
      path: "/surveys/:surveyId",
      optionalParams: ["title"]
    })
  });
