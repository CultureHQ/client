import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    deactivateUser: apiCall({
      method: "delete",
      path: "/users/:userId/deactivations"
    }),

    getProfile: apiCall({
      method: "get",
      path: "/profile"
    }),

    getUser: apiCall({
      method: "get",
      path: "/users/:userId"
    }),

    incrementUserPoints: apiCall({
      method: "post",
      path: "/users/:userId/points_increments",
      expectedParams: ["points"]
    }),

    listUsers: apiCall({
      method: "get",
      path: "/users",
      optionalParams: ["page"]
    }),

    reactivateUser: apiCall({
      method: "post",
      path: "/users/:userId/deactivations"
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
      optionalParams: ["name", "email", "departmentIds", "interestList"]
    })
  });
