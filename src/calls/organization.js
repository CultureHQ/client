import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createOrganization: apiCall({
      method: "post",
      path: "/admin/organizations",
      expectedParams: ["name"]
    }),

    deleteOrganization: apiCall({
      method: "delete",
      path: "/admin/organizations/:orgId"
    }),

    getOrganization: apiCall({
      method: "get",
      path: "/admin/organizations/:orgId"
    }),

    listOrganizations: apiCall({ method: "get", path: "/admin/organizations" }),

    updateOrganization: apiCall({
      method: "patch",
      path: "/admin/organizations/:orgId",
      expectedParams: ["name"]
    })
  });
