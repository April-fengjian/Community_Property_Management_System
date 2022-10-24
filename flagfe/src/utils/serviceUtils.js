const domain = "";
export const sendRequest = (data) => {
    const authToken = localStorage.getItem("authToken");
    const sendRequestUrl = `${domain}/serviceRequest/createRequest`;

    return fetch(sendRequestUrl,{
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) =>{
        if (response.status !== 200) {
            throw Error("Fail to send request")
        }
    });
};
export const getTenantRequest = () => {
    const authToken = localStorage.getItem("authToken");
    const getRequestUrl = `${domain}/serviceRequest/getTenantRequest`;

    return fetch(getRequestUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200){
            throw Error("Fail to get your request list")
        }
        return response.json();
    });
}