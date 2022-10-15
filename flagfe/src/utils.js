const domain = '';

export const login = (credential, asManager) => {
  const loginUrl = `${domain}/authenticate/${asManager ? "manager" : "tenant"}`;
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
        throw Error("Fail to log in");
    }
    return response.json();       //把token 拿到解析 return 给 fetch再return出去
  });
};

export const register = (credential, asManager) => {
    const registerUrl = `${domain}/register/${asManager ? "manager" : "tenant"}`;
    return fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to register");
      }
    });
  };

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