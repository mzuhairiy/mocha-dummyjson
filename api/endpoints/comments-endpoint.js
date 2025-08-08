import supertest from "supertest";
const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllComments = () => request.get('/comments')
    .set('Content-Type', 'application/json');

export const getSingleComment = (id) => request.get(`/comments/${id}`)
    .set('Content-Type', 'application/json');

export const getCommentsByPostId = (postId) => request.get(`/comments/post/${postId}`)
    .set('Content-Type', 'application/json');

export const addComment = (data) => request.post('/comments/add')
    .set('Content-Type', 'application/json')
    .send(data);

export const updateComment = (id, data) => request.put(`/comments/${id}`)
    .set('Content-Type', 'application/json')
    .send(data);

export const deleteComment = (id) => request.delete(`/comments/${id}`)
    .set('Content-Type', 'application/json');