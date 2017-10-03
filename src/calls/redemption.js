import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createRewardRedemption: apiCall({
      method: "post",
      path: "/rewards/:rewardId/redemptions"
    }),

    deleteRewardRedemption: apiCall({
      method: "delete",
      path: "/rewards/:rewardId/redemptions/:redemptionId"
    }),

    getRewardRedemption: apiCall({
      method: "get",
      path: "/rewards/:rewardId/redemptions/:redemptionId"
    }),

    listRedemptions: apiCall({
      method: "get",
      path: "/redemptions",
      optionalParams: ["page"]
    }),

    listRewardRedemptions: apiCall({
      method: "get",
      path: "/rewards/:rewardId/redemptions/:redemptionId",
      optionalParams: ["page"]
    }),

    updateRewardRedemption: apiCall({
      method: "patch",
      path: "/rewards/:rewardId/redemptions/:redemptionId"
    })
  });
