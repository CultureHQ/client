import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    listInvites: apiCall({
      method: "get",
      path: "/invites",
      optionalParams: ["page"]
    })
  });
