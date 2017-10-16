import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    getPointLeaderboard: apiCall({
      method: "get",
      path: "/point_leaderboard"
    })
  });
