import supertest from "supertest";

const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAccessToken = (data) => 
    request
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send(data);