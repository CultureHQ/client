import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createPhotoTag: apiCall({
      method: "post",
      path: "/photos/:photoId/photo_tags",
      expectedParams: ["userId"]
    }),

    deletePhotoTag: apiCall({
      method: "delete",
      path: "/photos/:photoId/photo_tags/:photoTagId"
    }),

    listPhotoTags: apiCall({
      method: "get",
      path: "/photos/:photoId/photo_tags",
      optionalParams: ["page"]
    })
  });
