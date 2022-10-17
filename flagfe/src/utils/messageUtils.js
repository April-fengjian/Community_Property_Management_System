
export const postNewAnnounce = (data) => {
    const authToken = localStorage.getItem("authToken");
    const announceUrl = `${domain}/announcement/add`;

    return fetch(announceUrl, {
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
// “user_id”:”xxx”  

  
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
// “user_id”:”xxx”
// “announce_id:””

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

  export const postNewMessage = (data) => {
    const authToken = localStorage.getItem("authToken");
    const announceUrl = `${domain}/message/add`;

    return fetch(announceUrl, {
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
// “user_id”:”xxx”
// “message_id:””

export const getMyOwnMessage = () => {
    const getMyOwnMessageUrl = `${domain}/message/getmine`;

    return fetch(getMyOwnMessageUrl, {
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
// “user_id”:”xxx”
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