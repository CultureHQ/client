import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createOrganization: apiCall({
      method: "post",
      path: "/admin/organizations",
      expectedParams: ["name"],
      optionalParams: [
        "primaryColor",
        "secondaryColor",
        "gamificationEnabled",
        "logo"
      ]
    }),

    deleteOrganization: apiCall({
      method: "delete",
      path: "/admin/organizations/:organizationId"
    }),

    getOrganization: apiCall({
      method: "get",
      path: "/admin/organizations/:organizationId"
    }),

    listOrganizations: apiCall({
      method: "get",
      path: "/admin/organizations",
      optionalParams: ["page"]
    }),

    updateOrganization: apiCall({
      method: "patch",
      path: "/admin/organizations/:organizationId",
      optionalParams: [
        "name",
        "primaryColor",
        "secondaryColor",
        "gamificationEnabled",
        "logo"
      ]
    })
  });
