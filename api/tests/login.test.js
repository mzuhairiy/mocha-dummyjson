import { assert, expect } from "chai";
import { validAuthData, invalidAuthData } from "../data/auth-data.js";
import getAccessToken from "../endpoints/auth-endpoint.js";

const testCases = {
    positive : {
        loginWithValidData : "Should be able to login with valid data",
    },
    negative : {
        loginWithUnregisteredUsername : "Should got an error message when I login with unregistered username",
        loginWithEmptyUsername : "Should got an error message when I login with empty username",
        loginWithEmptyPassword : "Should got an error message when I login with empty password",
    },
}

let accessToken;

describe("Authentication Endpoint", () => {
    it(`@auth ${testCases.positive.loginWithValidData}`, async () => {
        const res = await getAccessToken(validAuthData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.have.property("refreshToken");
        expect(res.body.accessToken.split(".").length).to.equal(3);
        accessToken = res.body.accessToken;
    });

    it(`@auth ${testCases.negative.loginWithUnregisteredUsername}`, async () => {
        const res = await getAccessToken(invalidAuthData);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Invalid credentials");
    });

    it(`@auth ${testCases.negative.loginWithEmptyUsername}`, async () => {
        const res = await getAccessToken({ password: validAuthData.password });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Username and password required");
    });

    it(`@auth ${testCases.negative.loginWithEmptyPassword}`, async () => {
        const res = await getAccessToken({ username: validAuthData.username });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Username and password required");
    });
});

export default { 
    accessToken 
}