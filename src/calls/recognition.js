import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createRecognition: apiCall({
      method: "post",
      path: "/recognitions",
      expectedParams: ["body", "userIds"]
    }),

    deleteRecognition: apiCall({
      method: "delete",
      path: "/recognitions/:recognitionId"
    }),

    getRecognition: apiCall({
      method: "get",
      path: "/recognitions/:recognitionId"
    }),

    listOrganizationValueRecognitions: apiCall({
      method: "get",
      path: "/organization_values/:organizationValueId/recognitions",
      optionalParams: ["page"]
    }),

    listRecognitions: apiCall({
      method: "get",
      path: "/recognitions",
      optionalParams: ["page"]
    }),

    listUserRecognitions: apiCall({
      method: "get",
      path: "/users/:userId/recognitions",
      optionalParams: ["page"]
    }),

    updateRecognition: apiCall({
      method: "patch",
      path: "/recognitions/:recognitionId",
      expectedParams: ["body"],
      optionalParams: ["userIds"]
    })
  });
