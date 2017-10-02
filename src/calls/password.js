import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    changePassword: apiCall({
      method: "patch",
      path: "/password",
      expectedParams: ["password"]
    }),

    requestPasswordReset: apiCall({
      method: "post",
      path: "/password_resets",
      expectedParams: ["email"]
    }),

    resetPassword: apiCall({
      method: "patch",
      path: "/password_resets/:token",
      expectedParams: ["password"]
    })
  });
