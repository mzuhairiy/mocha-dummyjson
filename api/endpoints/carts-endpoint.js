import supertest from "supertest";
const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllCarts = () => request.get('/carts')
    .set('Content-Type', 'application/json');

export const getCartById = (id) => request.get(`/carts/${id}`)
    .set('Content-Type', 'application/json');

export const getCartByUserId = (userId) => request.get(`/carts/user/${userId}`)
    .set('Content-Type', 'application/json');

export const addCart = (data) => request.post('/carts/add')
    .set('Content-Type', 'application/json')
    .send(data);

export const updateCart = (id, data) => request.put(`/carts/${id}`)
    .set('Content-Type', 'application/json')

export const deleteCart = (id) => request.delete(`/carts/${id}`)
    .set('Content-Type', 'application/json');