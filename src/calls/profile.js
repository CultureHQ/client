import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    getProfile: apiCall({
      method: "get",
      path: "/profile"
    }),

    updateProfile: apiCall({
      method: "patch",
      path: "/profile",
      multipart: true,
      optionalParams: [
        "name",
        "email",
        "departmentIds",
        "interestList",
        "avatar"
      ]
    })
  });
