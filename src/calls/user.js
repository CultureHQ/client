import apiCall from "../api-call";
import state from "../state";

const signInCall = apiCall({
  method: "post",
  path: "/api_keys",
  expectedParams: ["email", "password"]
});

export default object =>
  Object.assign(object, {
    deactivateUser: apiCall({
      method: "delete",
      path: "/users/:userId/deactivations"
    }),

    getProfile: apiCall({ method: "get", path: "/profile" }),

    getUser: apiCall({ method: "get", path: "/users/:userId" }),

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

    signIn: params =>
      signInCall(params).then(response => {
        state.signIn(response.apiKey.token);
        return response;
      }),

    updateUser: apiCall({
      method: "patch",
      path: "/users/:userId",
      optionalParams: ["name", "email", "departmentIds"]
    })
  });
