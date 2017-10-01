import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createDepartment: apiCall({
      method: "post",
      path: "/departments",
      expectedParams: ["name"]
    }),

    deleteDepartment: apiCall({
      method: "delete",
      path: "/departments/:dptId"
    }),

    getDepartment: apiCall({
      method: "get",
      path: "/departments/:dptId"
    }),

    listDepartments: apiCall({
      method: "get",
      path: "/departments",
      optionalParams: ["page"]
    }),

    updateDepartment: apiCall({
      method: "patch",
      path: "/departments/:dptId",
      optionalParams: ["name"]
    })
  });
