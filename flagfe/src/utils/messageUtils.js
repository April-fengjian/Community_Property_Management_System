  // this function is to get all messages
  export const getMessages = () => {
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