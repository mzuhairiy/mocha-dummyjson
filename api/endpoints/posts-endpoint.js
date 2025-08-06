import supertest from "supertest";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

const getAllPosts = () => request.get('/posts')
    .set('Content-Type', 'application/json');

export default {
    getAllPosts 
};