import { expect } from "chai";
import { getAllTodos, getRandomTodo, getSingleTodo, addTodo, updateTodo, deleteTodo } from "../endpoints/todos-endpoint.js";
import { faker } from "@faker-js/faker";

const testCases = {
    positive: {
        getAllTodos: "Should be able to retrieve all todos",
        getSingleTodo: "Should be able to retrieve a todo by ID",
        getRandomTodo: "Should be able to retrieve a random todo",
        addTodo: "Should be able to add a new todo",
        updateTodo: "Should be able to update an existing todo",
        deleteTodo: "Should be able to delete a todo by ID"
    },
    negative: {
        getSingleTodoWithUnknownId: "Should return 404 when trying to get a todo with an unknown ID",
        updateTodoWithUnknownId: "Should return 404 when trying to update a todo with an unknown ID",
        deleteTodoWithUnknownId: "Should return 404 when trying to delete a todo with an unknown ID"
    }
};

describe('Todos Endpoint', () => {
    it(`@todos ${testCases.positive.getAllTodos}`, async () => {
        const res = await getAllTodos();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("todos");
        expect(res.body.todos).to.be.an('array');
    });

    it(`@todos ${testCases.positive.getSingleTodo}`, async () => {
        const todoId = 1; // Assuming a todo with ID 1 exists
        const res = await getSingleTodo(todoId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", todoId);
    });

    it(`@todos ${testCases.positive.getRandomTodo}`, async () => {
        const res = await getRandomTodo();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id");
    });

    it(`@todos ${testCases.positive.addTodo}`, async () => {
        const todoTitle = faker.lorem.sentence(3);
        const todoData = {
            todo: todoTitle,
            userId: 5,
            completed: false
        };
        const res = await addTodo(todoData);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
    });

    it(`@todos ${testCases.positive.updateTodo}`, async () => {
        const todoId = 1;
        const updateData = { 
            todo: "Updated Todo",
            completed: true,
            userId: 26,
            isDeleted: false
        };
        const res = await updateTodo(todoId, updateData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", todoId);
    });

    it(`@todos ${testCases.positive.deleteTodo}`, async () => {
        const todoId = 1;
        const res = await deleteTodo(todoId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("isDeleted", true);
        expect(res.body).to.have.property("deletedOn");
        expect(res.body.deletedOn).to.not.be.null;
    });

    it(`@todos ${testCases.negative.getSingleTodoWithUnknownId}`, async () => {
        const unknownId = 9999;
        const res = await getSingleTodo(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Todo with id '${unknownId}' not found`);
    });

    it(`@todos ${testCases.negative.updateTodoWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const updateData = { title: "Updated Todo", completed: true };
        const res = await updateTodo(unknownId, updateData);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Todo with id '${unknownId}' not found`);
    });

    it(`@todos ${testCases.negative.deleteTodoWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await deleteTodo(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Todo with id '${unknownId}' not found`);
    });
});