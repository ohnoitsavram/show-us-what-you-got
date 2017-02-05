import Http from "./http";
import request from "request";
import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

let should = chai.should();

chai.use(chaiAsPromised);

describe("http", () => {
    let http;
    let requestGetStub;

    const testEndpoint = "https://google.com";

    const testBody = JSON.stringify([
        {
            Id: 1,
            Name: "Test One"
        },
        {
            Id: 2,
            Name: "Test Two"
        },
        {
            Id: 3,
            Name: "Test Three"
        }
    ]);

    const testResponse = { statusCode: 200, headers: {"content-type": "image/png"} };

    beforeEach(() => {

    });

    afterEach(() => {
        requestGetStub.restore();
    });

    it("should return list of objects without error", (done) => {
        //Arrange
        requestGetStub = sinon.stub(request, 'get').yields(null, testResponse, testBody);

        http = new Http(request);

        //Act
        var getPromise = http.get(testEndpoint);

        //Assert
        getPromise.should.eventually.deep.equal({headers: testResponse.headers, body: JSON.parse(testBody)}).notify(done);
    });

    it("should fail when http error occurs", (done) => {
        //Arrange
        sinon.stub(request, 'get').yields({error: "404"}, { statusCode: 404 }, "Failed with 404");

        //Act
        var getPromise = http.get(testEndpoint);

        //Assert
        getPromise.should.be.rejected.notify(done);
    });
});
