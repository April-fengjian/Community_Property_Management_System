const domain = '';

export const getInvoiceByStatus = (status) => {
  const authToken = localStorage.getItem("authToken");
  const getMyInvoiceByStatusUrl = `${domain}/invoice/list?status=${status}`;

  return fetch(getMyInvoiceByStatusUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get invoice!");
    }
    return response.json();
  });
};
export const getMyInvoice = () => {
    const authToken = localStorage.getItem("authToken");
    const getMyInvoiceUrl = `${domain}/invoice/myList/all`;

    return fetch(getMyInvoiceUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then((response) => {
        if (response.status !== 200) {
          throw Error("Fail to get my invoice!");
        }
        return response.json();
      });
  };
// "id": 275,
// "term": null,
// "description": "Nov rent",
// "amount": 3010,
// "status": "unpaid",
// "dueDate": "2022-11-07",
// "paymentDate": null,
// "unit": {
//     "id": 4010

export const getMyInvoiceByStatus = (status) => {
    const authToken = localStorage.getItem("authToken");
    const getMyInvoiceByStatusUrl = `${domain}/invoice/myList?status=${status}`;

    return fetch(getMyInvoiceByStatusUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get my invoice!");
      }
      return response.json();
    });
};
export const postInvoice = (data) => {
    const authToken = localStorage.getItem("authToken");
    const postInvoiceUrl = `${domain}/invoice/create?id=${data}`;

    return fetch(postInvoiceUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to create new invoice");
      }
    });
};
export const payMyInvoice = (id) => {
    const authToken = localStorage.getItem("authToken");
    const payMyInvoiceUrl = `${domain}/invoice/myPayment?id=${id}`;

    return fetch(payMyInvoiceUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to pay this invoice");
      }
    });
};