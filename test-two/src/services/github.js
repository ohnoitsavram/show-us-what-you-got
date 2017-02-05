class GitHubService {
    constructor(baseUrl, http, apiAuthenticationToken) {
        this.baseUrl = baseUrl;
        this.http = http;
        this.apiAuthenticationToken = apiAuthenticationToken;
        this.authenticationQueryString = "";
        if (this.apiAuthenticationToken !== "") {
            this.authenticationQueryString = "access_token=" + this.apiAuthenticationToken;
        }
    }

    getUsersForOrganisation(organisationId, page = 1) {
        let url =
            this.baseUrl + "orgs/" + organisationId + "/members?page=" + page + "&" + this.authenticationQueryString;
        return new Promise((resolve, reject) => {
            this.http.get(url).then((response) => {
                let users = response.body;
                let link = response.headers["link"];
                
                if (link) {
                    let rel = /rel="(.*?)"/.exec(link)[1];
                    
                    if (rel === "next") {
                        let nextPage = /page=(.*?)[&>]/.exec(link)[1];
                        this.getUsersForOrganisation(organisationId, nextPage).then((moreUsers) => {
                            resolve(users.concat(moreUsers));
                        });
                    } else { // Assume no next link means this is the last page.
                        resolve(users);
                    }
                } else { // Assume no link header means this is the only page.
                    resolve(users);
                }
            })
        });
    }

    getRepositoriesForUser(userId) {
        let url = this.baseUrl + "users/" + userId + "/repos?" + this.authenticationQueryString;
        return new Promise((resolve, reject) => {
            this.http.get(url).then((response) => {
                resolve(response.body)
            });
        });
    }
}

module.exports = GitHubService;
