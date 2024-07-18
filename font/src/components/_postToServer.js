export function _postToServer(endpoint, jsondata, cb) {
    console.log('send ' + JSON.stringify(jsondata) + ' to server');
    const url = "http://127.0.0.1:9999" + endpoint;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsondata)
    })
    .then(res => res.json())
    .then(data => {
        console.log('receive data' + JSON.stringify(data));
        cb(data);
    })
    .catch(error => {
        console.log('receive error' + error);
    });
}
