const domain = '';

export const bookRoom = (data) => {
    const authToken = localStorage.getItem("authToken");
    const bookRoomUrl = `${domain}/bookings`;

    return fetch(bookRoomUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to book reservation");
      }
    });
  };
   
  export const cancelReservation = (reservationId) => {
    const authToken = localStorage.getItem("authToken");
    const cancelReservationUrl = `${domain}/bookings/${reservationId}`;
   
    return fetch(cancelReservationUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("You don't have the right to cancel!");
      }
    });
  };

export const getReservations = (query) => { 
    const authToken = localStorage.getItem("authToken");
    const getReservationsUrl = `${domain}/bookings`;
    return fetch(getReservationsUrl, {headers: {Authorization: `Bearer ${authToken}`}}).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get reservation list");
        }
        return response.json();
    });
};

export const getMyReservations = () => { 
  const authToken = localStorage.getItem("authToken");
  const getMyReservationsUrl = `${domain}/bookings/user`;
  return fetch(getMyReservationsUrl, {headers: {Authorization: `Bearer ${authToken}`}}).then((response) => {
      if (response.status !== 200) {
          throw Error("Fail to get reservation list");
      }
      return response.json();
  });
};