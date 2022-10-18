
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
// “content”: “...”,
  
export const getAnnouncement = () => {
    const getAnnouncementUrl = `${domain}/announcement/getAll`;

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
// “content”: “...”,
// “username”:”xxx”
// “announce_id":xx

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
//“announce_id:””

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
// “content”: “...”,
  
export const getMessage = () => {
    const getMessageUrl = `${domain}/message/getAll`;

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
// “content”: “...”,
// “username”:”xxx”  
// “message_id:””

export const getMessageByUser = () => {
    const getMessageByUserUrl = `${domain}/message/`;

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
// “content”: “...”,
// “username”:”xxx”  
// “message_id:””

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
  //"message_id"