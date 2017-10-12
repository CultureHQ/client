import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    deactivateUser: apiCall({
      method: "post",
      path: "/users/:userId/deactivation"
    }),

    getUser: apiCall({
      method: "get",
      path: "/users/:userId"
    }),

    getUserPointBreakdown: apiCall({
      method: "get",
      path: "/users/:userId/point_breakdown"
    }),

    incrementUserPoints: apiCall({
      method: "post",
      path: "/users/:userId/point_increments",
      expectedParams: ["points"]
    }),

    listUsers: apiCall({
      method: "get",
      path: "/users",
      optionalParams: ["page"]
    }),

    reactivateUser: apiCall({
      method: "delete",
      path: "/users/:userId/deactivation"
    }),

    registerUser: apiCall({
      method: "post",
      path: "/invites/:token/users",
      expectedParams: ["name", "password"]
    }),

    sendInvite: apiCall({
      method: "post",
      path: "/invites",
      expectedParams: ["email"]
    }),

    updateUser: apiCall({
      method: "patch",
      path: "/users/:userId",
      multipart: true,
      optionalParams: [
        "name",
        "email",
        "departmentIds",
        "interestList",
        "avatar",
        "title"
      ]
    })
  });
