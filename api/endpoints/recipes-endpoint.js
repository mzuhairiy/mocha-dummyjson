import supertest from "supertest";
const BASE_URL = process.env.BASE_URL || "https://dummyjson.com";
const request = supertest(BASE_URL);

export const getAllRecipes = () => request.get('/recipes')
    .set('Content-Type', 'application/json');

export const getSingleRecipe = (id) => request.get(`/recipes/${id}`)
    .set('Content-Type', 'application/json');

export const getAllRecipesTags = () => request.get('/recipes/tags')
    .set('Content-Type', 'application/json');

export const getRecipesByTag = (tag) => request.get(`/recipes/tag/${tag}`)
    .set('Content-Type', 'application/json');

export const getRcipesByMeal = (meal) => request.get(`/recipes/meal-type/${meal}`)
    .set('Content-Type', 'application/json');

export const addRecipe = (data) => request.post('/recipes/add')
    .set('Content-Type', 'application/json')
    .send(data);

export const updateRecipe = (id, data) => request.put(`/recipes/${id}`)
    .set('Content-Type', 'application/json')
    .send(data);

export const deleteRecipe = (id) => request.delete(`/recipes/${id}`)
    .set('Content-Type', 'application/json');

export const searchRecipes = (query) => {
    const params = new URLSearchParams(query).toString();
    return request
        .get(`/recipes/search?${params}`)
        .set('Content-Type', 'application/json');
}

