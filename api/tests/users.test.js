import { assert, expect } from "chai";
import getAccessToken from "../endpoints/auth-endpoint.js";
import { getAllUsers, getUserById, getCurrentUser, addUser, updateUser, deleteUser, filterUser, getUserCartsById, getUserPostsById, getUserTodosById  } from "../endpoints/users-endpoint.js";
import { validAuthData } from "../data/auth-data.js";
import { sk } from "@faker-js/faker";

const testCases = {
    positive : {
        getAllUsers : "Should be able to see all the users",
        getUserById : "Should be able to get user by ID",
        getCurrentAuthenticatedUser : "Should be able to get the current user details",
        addUser : "Should be able to add new user",
        updateUser : "Should be able to update user details",
        deleteUser : "Should be able to delete user",
        filterUser : "Should be able to filter users",
        getUserCartsById : "Should be able to get user carts by ID",
        getUserPostsById : "Should be able to get user posts by ID",
        getUserTodosById : "Should be able to get user todos by ID",
    },
    negative : {
        getUserByUnknownId : "Should got an error message when get user by an unknown ID",
        getCurrentUserWithInvalidToken : "Should got an error message when get current user with an invalid token",
        getCurrentUserWithExpiredToken : "Should got an error message when get current user with an expired token",
        addUserWithInvalidToken : "Should got an error message when add user with an invalid token",
        addUserWithEmptyFirstName : "Should got an error message when add user with empty first name",
        addUserWithEmptyLastName : "Should got an error message when add user with empty last name",
        updateUserWithInvalidId : "Should got an error message when update user with an invalid ID",
        deleteUserWithInvalidId : "Should got an error message when delete user with an invalid ID",
        filterUserWithInvalidToken : "Should got an error message when filter users with an invalid token",
        getUserCartsByUnknownId : "Should got an error message when get user carts by an unknown ID",
        getUserPostsByUnknownId : "Should got an error message when get user posts by an unknown ID",
        getUserTodosByUnknownId : "Should got an error message when get user todos by an unknown ID",
    },
}

let accessToken;

describe("Users Endpoint", () => {
    it(`@users ${testCases.positive.getAllUsers}`, async () => {
        const res = await getAllUsers();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("users");
        expect(res.body.users).to.be.an('array');
    });

    it(`@users ${testCases.positive.getUserById}`, async () => {
        const res = await getUserById(1);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", 1);
    });

    it(`@users ${testCases.positive.getCurrentAuthenticatedUser}`, async () => {
        const response = await getAccessToken(validAuthData);
        accessToken = response.body.accessToken;
        const res = await getCurrentUser(accessToken);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("firstName");
        expect(res.body).to.have.property("lastName");
        expect(res.body).to.have.property("age");
        expect(res.body).to.have.property("gender");
        expect(res.body).to.have.property("email");
    });

    it(`@users ${testCases.positive.addUser}`, async () => {
        const newUser = {
            firstName: "Zuhair",
            lastName: "Doe",
            age: 20
        };
        const res = await addUser(newUser);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("firstName", newUser.firstName);
        expect(res.body).to.have.property("lastName", newUser.lastName);
    });

    it(`@users ${testCases.positive.updateUser}`, async () => {
        const updatedData = {
            firstName: "Addison",
            lastName: "Smith"
        };
        const res = await updateUser(30, updatedData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("firstName", updatedData.firstName);
        expect(res.body).to.have.property("lastName", updatedData.lastName);
    });

    it(`@users ${testCases.positive.deleteUser}`, async () => {
        const res = await deleteUser(30);
        expect(res.status).to.equal(200);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("firstName");
        expect(res.body).to.have.property("lastName");
        expect(res.body).to.have.property("isDeleted", true);
    });

    it(`@users ${testCases.positive.filterUser}`, async () => {
        const query = { 
            key: "hair.color",
            value: "Brown",
            limit: 10,
            skip: 0,
            select: "firstName,lastName,hair"
         };
        const res = await filterUser(query);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("users");
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[0].hair).to.have.property("color", "Brown");
    });

    it(`@users ${testCases.positive.getUserCartsById}`, async () => {
        const res = await getUserCartsById(6);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("carts");
        expect(res.body.carts).to.be.an('array');
        const cart = res.body.carts[0];
        expect(cart).to.have.property("id").that.is.a('number');
        expect(cart).to.have.property("total").that.is.a('number');
        expect(cart).to.have.property("discountedTotal").that.is.a('number');
        expect(cart).to.have.property("totalProducts").that.is.a('number');
        expect(cart).to.have.property("totalQuantity").that.is.a('number');
    });

    it(`@users ${testCases.positive.getUserPostsById}`, async () => {
        const res = await getUserPostsById(6);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("posts");
        expect(res.body.posts).to.be.an('array');
        const post = res.body.posts[0];
        expect(post).to.have.property("id").that.is.a('number');
        expect(post).to.have.property("title").that.is.a('string');
        expect(post).to.have.property("body").that.is.a('string');
        expect(post).to.have.property("views").that.is.a('number');
    });

    it(`@users ${testCases.positive.getUserTodosById}`, async () => {
        const res = await getUserTodosById(6);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("todos");
        expect(res.body.todos).to.be.an('array');
        const todo = res.body.todos[0];
        expect(todo).to.have.property("id").that.is.a('number');
        expect(todo).to.have.property("todo").that.is.a('string');
        expect(todo).to.have.property("completed").that.is.a('boolean');
    });
});