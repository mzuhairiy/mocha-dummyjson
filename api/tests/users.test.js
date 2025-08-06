import { assert, expect } from "chai";
import getAccessToken from "../endpoints/auth-endpoint.js";
import { getAllUsers } from "../endpoints/users-endpoint.js";

const testCases = {
    positive : {
        validData : "As a User, I should be able to see all the users",
    },
    negative : {
        unregisteredUsername : "As a User, I should got an error message when I login with unregistered username",
        emptyUsername : "As a User, I should got an error message when I login with empty username",
        emptyPassword : "As a User, I should got an error message when I login with empty password",
    },
}

describe("Users Endpoint", () => {
    it(`@users ${testCases.positive.validData}`, async () => {
        const res = await getAllUsers();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("users");
        expect(res.body.users).to.be.an('array');
    });
});
