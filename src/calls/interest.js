import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    deleteInterest: apiCall({
      method: "delete",
      path: "/interests/:interestId"
    }),

    getInterest: apiCall({
      method: "get",
      path: "/interests/:interestId"
    }),

    listInterests: apiCall({
      method: "get",
      path: "/interests",
      optionalParams: ["page"]
    })
  });
