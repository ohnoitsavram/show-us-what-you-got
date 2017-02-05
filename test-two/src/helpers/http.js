import request from "request";

class Http {
    constructor(overrideRequest) {
        this.request = overrideRequest || request;
    }

    get(url) {
        let requestOptions = {
            url,
            headers: {
                "User-Agent": "request"
            }
        };

        return new Promise((resolve, reject) => {
            // Confusingly, a response is a node api http.IncomingMessage object, and not a node http.ServerResponse
            // object.
            this.request.get(requestOptions, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve({headers: response.headers, body: JSON.parse(body)});
                } else {
                    reject(JSON.stringify(response));
                }
            });
        });
    }
}

module.exports = Http;
