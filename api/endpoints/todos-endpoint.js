import supertest from "supertest";
const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllTodos = () => request.get('/todos')
    .set('Content-Type', 'application/json');

export const getSingleTodo = (id) => request.get(`/todos/${id}`)
    .set('Content-Type', 'application/json');

export const getRandomTodo = (userId) => request.get('/todos/random')
    .set('Content-Type', 'application/json');

export const addTodo = (data) => request.post('/todos/add')
    .set('Content-Type', 'application/json')
    .send(data);

export const updateTodo = (id, data) => request.put(`/todos/${id}`)
    .set('Content-Type', 'application/json')
    .send(data);

export const deleteTodo = (id) => request.delete(`/todos/${id}`)
    .set('Content-Type', 'application/json');

