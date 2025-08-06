import { assert, expect } from "chai";
import { faker } from "@faker-js/faker";
import { validAuthData, invalidAuthData } from "../data/auth-data.js";
import { getAccessToken } from "../endpoints/auth-endpoint.js";

const testCases = {
    positive : {
        validData : "As a User, I should be able to login with valid data",
    },
    negative : {
        unregisteredUsername : "As a User, I should got an error message when I login with unregistered username",
        emptyUsername : "As a User, I should got an error message when I login with empty username",
        emptyPassword : "As a User, I should got an error message when I login with empty password",
    },
}

let accessToken;

describe("Authentication Endpoint", () => {
    it(`@auth ${testCases.positive.validData}`, async () => {
        const res = await getAccessToken(validAuthData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.have.property("refreshToken");
        expect(res.body.accessToken.split(".").length).to.equal(3);
        accessToken = res.body.accessToken;
    });

    it(`@auth ${testCases.negative.unregisteredUsername}`, async () => {
        const res = await getAccessToken(invalidAuthData);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Invalid credentials");
    });

    it(`@auth ${testCases.negative.emptyUsername}`, async () => {
        const res = await getAccessToken({ password: validAuthData.password });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Username and password required");
    });

    it(`@auth ${testCases.negative.emptyPassword}`, async () => {
        const res = await getAccessToken({ username: validAuthData.username });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Username and password required");
    });
});

export default { 
    accessToken 
}