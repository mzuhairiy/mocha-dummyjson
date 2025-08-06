import supertest from "supertest";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllUsers = () => request.get('/users')
    .set('Content-Type', 'application/json')
    //.set('Authorization', `Bearer ${token}`)

export const getUserById = (id, token) => request.get(`/users/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

export const getCurrentUser = (token) => request.get('/users/me')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

export const addUser = (token, data) => request.post('/users/add')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(data);

export const updateUser = (id, token, data) => request.put(`/users/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(data);

export const deleteUser = (id, token) => request.delete(`/users/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

export const filterUser = (token, query) => request.get('/users/filter')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .query(query);

export const getUserCartsById = (id, token) => request.get(`/users/${id}/carts`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

export const getUserPostsById = (id, token) => request.get(`/users/${id}/posts`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

export const getUserTodosById = (id, token) => request.get(`/users/${id}/todos`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);