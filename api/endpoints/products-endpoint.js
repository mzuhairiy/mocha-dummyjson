import supertest from "supertest";
const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllProducts = () => request.get('/products')
    .set('Content-Type', 'application/json');

export const getSingleProduct = (id) => request.get(`/products/${id}`)
    .set('Content-Type', 'application/json');

export const getAllProductsCategories = () => request.get('/products/categories')
    .set('Content-Type', 'application/json');

export const getProductsByCategory = (category) => request.get(`/products/category/${category}`)
    .set('Content-Type', 'application/json');

export const searchProduct = (query) => {
    const params = new URLSearchParams(query).toString();
    return request.get(`/products/search?${params}`)
        .set('Content-Type', 'application/json');
}

export const addProduct = (data) => request.post('/products/add')
    .set('Content-Type', 'application/json')
    .send(data);

export const updateProduct = (id, data) => request.put(`/products/${id}`)
    .set('Content-Type', 'application/json')
    .send(data);

export const deleteProduct = (id) => request.delete(`/products/${id}`)
    .set('Content-Type', 'application/json');