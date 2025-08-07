import supertest from "supertest";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllPosts = () => request.get('/posts')
    .set('Content-Type', 'application/json');

export const getPostById = (id) => request.get(`/posts/${id}`)
    .set('Content-Type', 'application/json');

export const getPostsByUserId = (userId) => request.get(`/posts/user/${userId}`)
    .set('Content-Type', 'application/json');

export const addPost = (data) => request.post('/posts/add')
    .set('Content-Type', 'application/json')
    .send(data);

export const updatePost = (id, data) => request.put(`/posts/${id}`)
    .set('Content-Type', 'application/json')
    .send(data);

export const deletePost = (id) => request.delete(`/posts/${id}`)
    .set('Content-Type', 'application/json');

export const searchPosts = (query) => {
    const params = new URLSearchParams(query).toString();
    return request
        .get(`/posts/search?${params}`)
        .set('Content-Type', 'application/json');
    }

export const getPostComments = (id) => request.get(`/posts/${id}/comments`)
    .set('Content-Type', 'application/json');