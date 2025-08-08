import supertest from "supertest";
const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllQuotes = () => request.get('/quotes')
    .set('Content-Type', 'application/json');

export const getSingleQuote = (id) => request.get(`/quotes/${id}`)
    .set('Content-Type', 'application/json');

export const getRandomQuote = () => request.get('/quotes/random')
    .set('Content-Type', 'application/json');