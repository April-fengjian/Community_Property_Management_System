const domain = 'https://communitymanagementsystem.ue.r.appspot.com';

export const login = (credential) => {
  const loginUrl = `${domain}/authenticate/${credential.role}`;
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

export const register = (credential) => {
    const registerUrl = `${domain}/register/${credential.role}`;
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

