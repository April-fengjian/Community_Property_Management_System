const domain = '';
export const getReservations = () => {  //no input, 
    const authToken = localStorage.getItem("authToken");//get local user token to identify user
    // const listReservationsUrl = `${domain}/reservations`;
    const listReservationsUrl = `${domain}/bookings`;
    return fetch(listReservationsUrl, {headers: {Authorization: `Bearer ${authToken}`}}).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get reservation list");
        }
        return response.json();
    });
};

export const getStaysByHost = () => {
  const authToken = localStorage.getItem("authToken");
  const listStaysUrl = `${domain}/rooms/`;
 
  return fetch(listStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get stay list");
    }
 
    return response.json();
  });
};

export const searchStays = (query) => {
  const authToken = localStorage.getItem("authToken");
  const searchStayUrl = new URL(`${domain}/search/`); //new url data format so that I can append others parameters defined by user automaticly
  searchStayUrl.searchParams.append("guest_number", query.guest_number);
  searchStayUrl.searchParams.append("checkin_date", query.checkin_date.format("YYYY-MM-DD"));
  //? time limitted, latitude and longtitude simplified
  searchStayUrl.searchParams.append("lat", 37);
  searchStayUrl.searchParams.append("lon", -122);

  // we can do not write method, since default method is get
  return fetch(searchStayUrl, {method: 'GET', headers: {Authorization: `Bearer ${authToken}`}}).then((response) => {
      
      if (response !== 200) {
          throw Error("Fail to search stays");
      }
      return response.json();
  });
};

export const uploadStay = (data) => {
  const authToken = localStorage.getItem("authToken");
  const uploadStayUrl = `${domain}/rooms`;
 
  return fetch(uploadStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to upload stay");
    }
  });
};
