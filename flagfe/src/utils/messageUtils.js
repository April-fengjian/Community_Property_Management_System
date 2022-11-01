
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
// “username”:”xxx”
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
    const postMessageUrl = `${domain}/message/post`;

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

export const getTopMessage = (lastTime) => {
  const authToken = localStorage.getItem("authToken");
  const getMessageUrl = `${domain}/messages/top?time=${lastTime}`;

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
// “time”: "3000-10-21T10:09:51",
// “description”: “...”,
// “user”:”xxx”
// “id:””

export const getMyMessage = () => {
    const authToken = localStorage.getItem("authToken");
    const getMessageByUserUrl = `${domain}/myMessages`;

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
export const getMyTopMessage = (lastTime) => {
  const authToken = localStorage.getItem("authToken");
  const getTopMessageByUserUrl = `${domain}/myMessages/top?time=${lastTime}`;

  return fetch(getTopMessageByUserUrl, {
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
// “username”:”xxx”
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