import Logger from './helpers/logger';
import GitHubService from './services/github';
import Http from './helpers/http';

const baseUrl = "https://api.github.com/";
const organisationId = "uber";
const gitHubApiAuthToken = "f98b5f75bfaac8b025ede6e4599b856f6df81a60";

let logger = new Logger();
let http = new Http();

let gitHubService = new GitHubService(baseUrl, http, gitHubApiAuthToken);

gitHubService.getUsersForOrganisation(organisationId).then((users) => {
    users.forEach((user) => {        
        gitHubService.getRepositoriesForUser(user.login).then((repositories) => {
            logger.log("Username: " + user.login);
            logger.log("Repositories:");
            repositories.forEach((repository) => {
                logger.log("  " + repository.name);
            });
            logger.log("");
        });
    });
}).catch((error) => {
    logger.log("Error: " + error);
});
