import apiCall from "../api-call";

export default object =>
  Object.assign(object, {
    createAnnouncement: apiCall({
      method: "post",
      path: "/announcements",
      expectedParams: ["title", "body"]
    }),

    deleteAnnouncement: apiCall({
      method: "delete",
      path: "/announcements/:announcementId"
    }),

    getAnnouncement: apiCall({
      method: "get",
      path: "/announcements/:announcementId"
    }),

    listAnnouncements: apiCall({
      method: "get",
      path: "/announcements",
      optionalParams: ["page"]
    }),

    updateAnnouncement: apiCall({
      method: "patch",
      path: "/announcements/:announcementId",
      optionalParams: ["title", "body"]
    })
  });
