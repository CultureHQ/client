import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createEventPhoto: apiCall({
      method: "post",
      path: "/events/:eventId/photos",
      multipart: true,
      expectedParams: ["image"],
      optionalParams: ["caption"]
    }),

    bulkCreateEventPhotos: apiCall({
      method: "post",
      path: "/events/:eventId/albums",
      multipart: true,
      expectedParams: ["images"]
    }),

    deleteEventPhoto: apiCall({
      method: "delete",
      path: "/events/:eventId/photos/:photoId"
    }),

    getEventPhoto: apiCall({
      method: "get",
      path: "/events/:eventId/photos/:photoId"
    }),

    getPhotoGallery: apiCall({
      method: "get",
      path: "/gallery",
      optionalParams: ["page", "range"]
    }),

    listEventPhotos: apiCall({
      method: "get",
      path: "/events/:eventId/photos",
      optionalParams: ["page"]
    }),

    updateEventPhoto: apiCall({
      method: "patch",
      path: "/events/:eventId/photos/:photoId",
      multipart: true,
      optionalParams: ["image", "caption"]
    })
  });
