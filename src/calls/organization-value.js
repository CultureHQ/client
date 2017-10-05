import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createOrganizationValue: apiCall({
      method: "post",
      path: "/organization_values",
      expectedParams: ["name"]
    }),

    deleteOrganizationValue: apiCall({
      method: "delete",
      path: "/organization_values/:organizationValueId"
    }),

    getOrganizationValue: apiCall({
      method: "get",
      path: "/organization_values/:organizationValueId"
    }),

    listOrganizationValues: apiCall({
      method: "get",
      path: "/organization_values",
      optionalParams: ["page"]
    }),

    updateOrganizationValue: apiCall({
      method: "patch",
      path: "/organization_values/:organizationValueId",
      expectedParams: ["name"]
    })
  });
