import GitHubService from "./github";
import Http from "./../helpers/http";
import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinonAsPromised from "sinon-as-promised";

let should = chai.should();

chai.use(chaiAsPromised);

describe("github service", () => {
    const baseGitHubUrl = "https://api.github.com/";

    let gitHubService;
    let http;
    let httpGetStub;

    const organisationId = "facebook";

    const userId = "ohnoitsavram";

    const orgsMembersResponse1 = {
        headers: {
            link: `<https://api.github.com/orgs/' + organisationId + '/members?page=2>; rel="next"
<https://api.github.com/orgs/' + organisationId + '/members?page=3>; rel="last"`
        },
        body: [
            {
                userId: "one"
            }
        ]
    };

    const orgsMembersResponse2 = {
        headers: {
            link: `<https://api.github.com/orgs/' + organisationId + '/members?page=3>; rel="next"
<https://api.github.com/orgs/' + organisationId + '/members?page=3>; rel="last"
<https://api.github.com/orgs/' + organisationId + '/members?page=1>; rel="first"
<https://api.github.com/orgs/' + organisationId + '/members?page=1>; rel="prev"`
        },
        body: [
            {
                userId: "two"
            }
        ]
    };

    const orgsMembersResponse3 = {
        headers: {
            link: `<https://api.github.com/orgs/' + organisationId + '/members?page=1>; rel="first"
<https://api.github.com/orgs/' + organisationId + '/members?page=2>; rel="prev"`
        },
        body: [
            {
                userId: "three"
            }
        ]
    };

    const usersReposResponse = {
        body: [
            {
                name: ".files"
            },
            {
                name: "show-us-what-you-got"
            }
        ]
    };

    beforeEach(() => {
        http = new Http();
        httpGetStub = sinon.stub(http, 'get');
    });

    afterEach(() => {
        httpGetStub.restore();
    });

    it("should return repositories for user", (done) => {
        //Arrange
        httpGetStub.resolves(usersReposResponse);

        gitHubService = new GitHubService(baseGitHubUrl, http, "");

        // Act
        let promise = gitHubService.getRepositoriesForUser(userId);

        //Assert
        promise.should.eventually.deep.equal(usersReposResponse.body).notify(done);
    });

    it("should return users for organisation", (done) => {
        //Arrange
        httpGetStub.onCall(0).resolves(orgsMembersResponse1);
        httpGetStub.onCall(1).resolves(orgsMembersResponse2);
        httpGetStub.onCall(2).resolves(orgsMembersResponse3);

        gitHubService = new GitHubService(baseGitHubUrl, http, "");

        //Act
        let promise = gitHubService.getUsersForOrganisation(organisationId);

        //Assert
        let userData = orgsMembersResponse1.body.concat(orgsMembersResponse2.body, orgsMembersResponse3.body);
        promise.should.eventually.deep.equal(userData).notify(done);
    });

    it("should append authentication parameter to url", () => {
        //Arrange
        const secret = "secret";

        httpGetStub.resolves(orgsMembersResponse3);

        gitHubService = new GitHubService(baseGitHubUrl, http, secret);

        //Act
        gitHubService.getUsersForOrganisation(organisationId);

        //Assert
        httpGetStub.getCall(0).args[0].endsWith("&access_token=" + secret).should.equal(true);
    });

    /*
    it("should prepend base url to url", () => {
        //Arrange
        const secret = "secret";

        httpGetStub.resolves(orgsMembersResponse3);

        gitHubService = new GitHubService(baseGitHubUrl, http, secret);

        //Act
        gitHubService.getUsersForOrganisation(organisationId);

        //Assert
        httpGetStub.getCall(0).args[0].startsWith(baseGitHubUrl).should.equal(true);
    });
    */
});
