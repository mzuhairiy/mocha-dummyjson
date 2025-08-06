import supertest from "supertest";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

const getAllUsers = (token) => request.get('/users')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)

const getUserById = (id, token) => request.get(`/users/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

const getCurrentUser = (token) => request.get('/users/me')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

const addUser = (token, data) => request.post('/users/add')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(data);

const updateUser = (id, token, data) => request.put(`/users/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(data);

const deleteUser = (id, token) => request.delete(`/users/${id}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

const filterUser = (token, query) => request.get('/users/filter')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .query(query);

const getUserCartsById = (id, token) => request.get(`/users/${id}/carts`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

const getUserPostsById = (id, token) => request.get(`/users/${id}/posts`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

const getUserTodosById = (id, token) => request.get(`/users/${id}/todos`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);

export default {
    getAllUsers,
    getUserById,
    getCurrentUser,
    addUser,
    updateUser,
    deleteUser,
    filterUser,
    getUserCartsById,
    getUserPostsById,
    getUserTodosById
};