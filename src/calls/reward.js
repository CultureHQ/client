import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createReward: apiCall({
      method: "post",
      path: "/rewards",
      expectedParams: ["name", "points"],
      optionalParams: ["description"]
    }),

    deleteReward: apiCall({
      method: "delete",
      path: "/rewards/:rewardId"
    }),

    getReward: apiCall({
      method: "get",
      path: "/rewards/:rewardId"
    }),

    listRewards: apiCall({
      method: "get",
      path: "/rewards",
      optionalParams: ["page"]
    }),

    updateReward: apiCall({
      method: "patch",
      path: "/rewards/:rewardId",
      optionalParams: ["name", "points", "description"]
    })
  });
