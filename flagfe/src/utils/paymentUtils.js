const domain = "";

export const deletePayment = (num) => {
    const authToken = localStorage.getItem("authToken");
    const favoriteItemUrl = `${domain}/payment/${num}`;
    return fetch(favoriteItemUrl, {
      method: 'DELETE',//delete 改method
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ Payment: num })
    }).then((response) => {
      if (response.status !== 200) {
        throw Error('Fail to pay the fee.');
   
      }
    })
  }

export const getUserPayment = () => {
    const authToken = localStorage.getItem("authToken");
    const getRequestUrl = `${domain}/payment`;

    return fetch(getRequestUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200){
            throw Error("Fail to get your payment list")
        }
        return response.json();
    });
};


