import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createFeedback: apiCall({
      method: "post",
      path: "/feedbacks",
      expectedParams: ["body"],
      optionalParams: ["anonymous"]
    }),

    getFeedback: apiCall({
      method: "get",
      path: "/feedbacks/:feedbackId"
    }),

    listFeedbacks: apiCall({
      method: "get",
      path: "/feedbacks",
      optionalParams: ["page"]
    }),

    reviewFeedback: apiCall({
      method: "patch",
      path: "/feedbacks/:feedbackId"
    })
  });
