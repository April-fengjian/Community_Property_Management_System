// this function is to get all messages
export const getAllMessages = () => {
    const authToken = localStorage.getItem("authToken"); // can get userID
    const listMessagesUrl = `${domain}/messages`;

    return fetch(listMessagesUrl, {
        headers: {
        Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if(response.status !== 200){
        throw Error("Fail to get message list");
        }
        return response.json();
    });
};

// this function is used to post messages
export const postMessage = (data) => {
    const authToken = localStorage.getItem("authToken");
    const postMessageUrl = `${domain}/messages`;

    return fetch(postMessageUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: data,
    }).then((response) => {
        if(response.status !== 200){
            throw Error("Fail to post message");
        }
    });
};

// this function is used to delete the message
export const deleteMessage = (messageId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteMessageUrl = `${domain}/messages/${messageId}`;

    return fetch(deleteMessageUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if(response.status !== 200){
            throw Error("Fail to delete message");
        }
    });
};