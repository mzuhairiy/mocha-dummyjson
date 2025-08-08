import { expect } from "chai";
import { 
    getAllRecipes, 
    getSingleRecipe, 
    getAllRecipesTags, 
    getRecipesByTag, 
    getRcipesByMeal, 
    searchRecipes, 
    addRecipe, 
    updateRecipe, 
    deleteRecipe 
} from "../endpoints/recipes-endpoint.js";

const testCases = {
    positive: {
        getAllRecipes: "Should be able to retrieve all recipes",
        getSingleRecipe: "Should be able to retrieve a single recipe by ID",
        getAllRecipesTags: "Should be able to retrieve all recipe tags",
        getRecipesByTag: "Should be able to retrieve recipes by tag",
        getRecipesByMeal: "Should be able to retrieve recipes by meal type",
        searchRecipes: "Should be able to search for recipes",
        addRecipe: "Should be able to add a new recipe",
        updateRecipe: "Should be able to update an existing recipe",
        deleteRecipe: "Should be able to delete a recipe by ID"
    },
    negative: {
        getSingleRecipeWithUnknownId: "Should return 404 when trying to get a recipe with an unknown ID",
        updateRecipeWithUnknownId: "Should return 404 when trying to update a recipe with an unknown ID",
        deleteRecipeWithUnknownId: "Should return 404 when trying to delete a recipe with an unknown ID"
    }
}

describe('Recipes Endpoint', () => {
    it(`@recipes ${testCases.positive.getAllRecipes}`, async () => {
        const res = await getAllRecipes();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("recipes");
        expect(res.body.recipes).to.be.an('array');
        const recipe = res.body.recipes[0];
        expect(recipe).to.include.all.keys(["id", "name", "ingredients", "instructions", "tags", "prepTimeMinutes", "cookTimeMinutes", "difficulty", "image"]);
        expect(recipe.ingredients).to.be.an('array');
        expect(recipe.instructions).to.be.a('array');
        expect(recipe.tags).to.be.an('array');
    });

    it(`@recipes ${testCases.positive.getSingleRecipe}`, async () => {
        const recipeId = 1;
        const res = await getSingleRecipe(recipeId);
        expect(res.status).to.equal(200);
        const recipe = res.body;
        expect(recipe).to.include.all.keys(["id", "name", "ingredients", "instructions", "tags", "prepTimeMinutes", "cookTimeMinutes", "difficulty", "image"]);
        expect(recipe.ingredients).to.be.an('array');
        expect(recipe.instructions).to.be.a('array');
        expect(recipe.tags).to.be.an('array');
    });

    it(`@recipes ${testCases.positive.getAllRecipesTags}`, async () => {
        const res = await getAllRecipesTags();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it(`@recipes ${testCases.positive.getRecipesByTag}`, async () => {
        const tag = "Asian";
        const res = await getRecipesByTag(tag);
        const recipes = res.body.recipes[0];
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("recipes");
        expect(res.body.recipes).to.be.an('array');
        expect(recipes).to.include.all.keys(["id", "name", "tags"]);
        expect(recipes.tags).to.be.an('array');
    });

    it(`@recipes ${testCases.positive.getRecipesByMeal}`, async () => {
        const meal = "Breakfast";
        const res = await getRcipesByMeal(meal);
        const recipes = res.body.recipes[0];
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("recipes");
        expect(res.body.recipes).to.be.an('array');
        expect(recipes).to.include.all.keys(["id", "name", "ingredients", "instructions", "tags", "prepTimeMinutes", "cookTimeMinutes", "difficulty", "image"]);
        expect(recipes.ingredients).to.be.an('array');
        expect(recipes.instructions).to.be.a('array');
        expect(recipes.mealType).to.include(meal);

    });

    it(`@recipes ${testCases.positive.searchRecipes}`, async () => {
        const query = { 
            q: "pasta",
            limit: 10,
        };
        const res = await searchRecipes(query);
        const recipes = res.body.recipes[0];
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("recipes").that.is.an('array');
        expect(recipes).to.include.all.keys(["id", "name", "ingredients", "instructions", "tags", "prepTimeMinutes", "cookTimeMinutes", "difficulty", "image"]);
        expect(recipes.ingredients).to.be.an('array');
        expect(recipes.instructions).to.be.a('array');
    });

    it(`@recipes ${testCases.positive.addRecipe}`, async () => {
        const newRecipe = {
            id: 1,
            ingredients: ["ingredient1", "ingredient2"],
            instructions: ["Test instructions", "should do this"]
        };
        const res = await addRecipe(newRecipe);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id");
    });

    it(`@recipes ${testCases.positive.updateRecipe}`, async () => {
        const recipeId = 1;
        const updatedData = {
            ingredients: ["updated ingredient1", "updated ingredient2"],
            instructions: ["Updated instructions"],
        };
        const res = await updateRecipe(recipeId, updatedData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", recipeId);
    });

    it(`@recipes ${testCases.positive.deleteRecipe}`, async () => {
        const recipeId = 1;
        const res = await deleteRecipe(recipeId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("isDeleted", true);
        expect(res.body).to.have.property("deletedOn");
        expect(res.body.deletedOn).to.not.be.null;
    });

    it(`@recipes ${testCases.negative.getSingleRecipeWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await getSingleRecipe(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.include(`Recipe with id '${unknownId}' not found`);
    });

    it(`@recipes ${testCases.negative.updateRecipeWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const updatedData = { title: "Updated Recipe" };
        const res = await updateRecipe(unknownId, updatedData);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.include(`Recipe with id '${unknownId}' not found`);
    });

    it(`@recipes ${testCases.negative.deleteRecipeWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await deleteRecipe(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.include(`Recipe with id '${unknownId}' not found`);
    });
});