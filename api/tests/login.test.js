import { assert } from "chai";
import { faker } from "@faker-js/faker";
import { validAuthData, invalidAuthData } from "../data/auth-data.js";

import getAccessToken from "../endpoints/auth-endpoint.js";

const testCase = {
    positive : {
        validData : "As a User, I should be able to login with valid data",
        getAccessToken : "As a System, I should to be able to get access token"
    },
    negative : {
        invalidCredentials : "As a User, I should got an error message when I login with invalid credential",
        invalidEmail : "As a User, I should got an error message when I login with invalid email",
    },
}

let accessToken;

describe("Authentication Endpoint", () => {
    it(`@auth ${testCase.positive.validData}`, async () => {
        const response = await getAccessToken(validAuthData);
        assert.equal(response.status, 200);

    });

    it(`@auth ${testCase.negative.invalidCredentials}`, async () => {
        const response = await getAccessToken(invalidAuthData);
        assert.equal(response.status, 400);
    });
});