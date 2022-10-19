
const domain = '';

export const postAnnouncement = (data) => {
    const authToken = localStorage.getItem("authToken");
    const postAnnouncementUrl = `${domain}/announcement/post`;

    return fetch(postAnnouncementUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to post new announcement");
      }
    });
};
// “title”: ”xxx”,
// “time”: Date,
// “description”: “...”,
  
export const getAnnouncement = () => {
    const authToken = localStorage.getItem("authToken");
    const getAnnouncementUrl = `${domain}/announcements`;

    return fetch(getAnnouncementUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get announcement");
      }
   
      return response.json();
    });
};
// “title”: ”xxx”,
// “time”: Date,
// “description”: “...”,
// “user”:”xxx”
// “announcementId":xx
// "importance"

export const deleteAnnouncement = (announceId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteAnnouncementUrl = `${domain}/announcement/${announceId}`;
   
    return fetch(deleteAnnouncementUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to delete announcement");
      }
    });
  };
//“announcementId":xx

  export const postMessage = (data) => {
    const authToken = localStorage.getItem("authToken");
    const postMessageUrl = `${domain}/message/add`;

    return fetch(postMessageUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to post new message");
      }
    });
};
// “title”: ”xxx”,
// “time”: Date,
// “description”: “...”,
  
export const getMessage = () => {
    const authToken = localStorage.getItem("authToken");
    const getMessageUrl = `${domain}/messages`;

    return fetch(getMessageUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get message");
      }
   
      return response.json();
    });
};
// “title”: ”xxx”,
// “time”: Date,
// “description”: “...”,
// “user”:”xxx”
// “messageId:””

export const getMessageByUser = () => {
    const authToken = localStorage.getItem("authToken");
    const getMessageByUserUrl = `${domain}/messages`;

    return fetch(getMessageByUserUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get message");
      }   
      return response.json();
    });
};
// “title”: ”xxx”,        参考getStaysByHost 前端只给token，后端查询链接加上了?host=sun
// “time”: Date,
// “description”: “...”,
// “user”:”xxx”
// “messageId:””

export const deleteMessage = (messageId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteMessageUrl = `${domain}/message/${messageId}`;
   
    return fetch(deleteMessageUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to delete message");
      }
    });
  };
  //"messageId"