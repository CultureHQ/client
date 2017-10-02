import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createComment: apiCall({
      method: "post",
      path: "/events/:eventId/comment",
      expectedParams: ["body"],
      optionalParams: ["parentCommentId"]
    }),

    deleteComment: apiCall({
      method: "delete",
      path: "/events/:eventId/comment"
    }),

    getComment: apiCall({
      method: "get",
      path: "/events/:eventId/comments/:commentId"
    }),

    listComments: apiCall({
      method: "get",
      path: "/events/:eventId/comments",
      optionalParams: ["page"]
    }),

    updateComment: apiCall({
      method: "patch",
      path: "/events/:eventId/comments/:commentId",
      expectedParams: ["body"]
    })
  });
