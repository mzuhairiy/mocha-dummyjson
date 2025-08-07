import { expect } from "chai";
import { 
    getAllProducts, 
    getSingleProduct, 
    getAllProductsCategories, 
    getProductsByCategory, 
    searchProduct,
    addProduct, 
    updateProduct,
    deleteProduct
} from "../endpoints/products-endpoint.js";

const testCases = {
    positive: {
        getAllProducts: "Should be able to retrieve all products",
        getSingleProduct: "Should be able to retrieve a single product by ID",
        getAllProductsCategories: "Should be able to retrieve all product categories",
        getProductsByCategory: "Should be able to retrieve products by category",
        searchProduct: "Should be able to search for products",
        addProduct: "Should be able to add a new product",
        updateProduct: "Should be able to update an existing product",
        deleteProduct: "Should be able to delete a product by ID"
    },
    negative: {
        getSingleProductWithUnknownId: "Should return 404 when trying to get a product with an unknown ID",
        updateProductWithUnknownId: "Should return 404 when trying to update a product with an unknown ID",
        deleteProductWithUnknownId: "Should return 404 when trying to delete a product with an unknown ID"
    }
};

describe('Products Endpoint', () => {
    it(`@products ${testCases.positive.getAllProducts}`, async () => {
        const res = await getAllProducts();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("products");
        expect(res.body.products).to.be.an('array');
    });

    it(`@products ${testCases.positive.getSingleProduct}`, async () => {
        const productId = 1; // Assuming a product with ID 1 exists
        const res = await getSingleProduct(productId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", productId);
    });

    it(`@products ${testCases.positive.getAllProductsCategories}`, async () => {
        const res = await getAllProductsCategories();
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        const category = res.body[0];
        expect(category).to.have.property("slug");
        expect(category).to.have.property("name");
        expect(category).to.have.property("url");
        
        // Optional: validasi nilai spesifik
        expect(category.slug).to.be.a('string');
        expect(category.name).to.be.a('string');
        expect(category.url).to.include('https://dummyjson.com/products/category/');
    });

    it(`@products ${testCases.positive.getProductsByCategory}`, async () => {
        const category = "electronics";
        const res = await getProductsByCategory(category);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("products");
        expect(res.body.products).to.be.an('array');
    });

    it(`@products ${testCases.positive.searchProduct}`, async () => {
        const query = { 
            q: "phone",
            limit: 10,
        };
        const res = await searchProduct(query);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("products").that.is.an('array');
        res.body.products.forEach(product => {
            expect(product).to.have.property("id");
            expect(product).to.have.property("title");
            expect(product).to.have.property("category");
            expect(product).to.have.property("price");
            expect(product).to.have.property("stock");
        });
    });

    it(`@products ${testCases.positive.addProduct}`, async () => {
        const productData = {
            title: "New Product",
            price: 100,
            description: "This is a new product",
            category: "electronics",
            image: "https://example.com/image.jpg"
        };
        const res = await addProduct(productData);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
    });

    it(`@products ${testCases.positive.updateProduct}`, async () => {
        const productId = 1; // Assuming a product with ID 1 exists
        const updateData = { 
            title: "Updated Product",
            price: 120
        };
        const res = await updateProduct(productId, updateData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", productId);
    });

    it(`@products ${testCases.positive.deleteProduct}`, async () => {
        const productId = 1; // Assuming a product with ID 1 exists
        const res = await deleteProduct(productId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("isDeleted", true);
    });

    it(`@products ${testCases.negative.getSingleProductWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await getSingleProduct(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Product with id '${unknownId}' not found`);
    });

    it(`@products ${testCases.negative.updateProductWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const updateData = { 
            title: "Updated Product",
            price: 120
        };
        const res = await updateProduct(unknownId, updateData);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Product with id '${unknownId}' not found`);
    });

    it(`@products ${testCases.negative.deleteProductWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await deleteProduct(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Product with id '${unknownId}' not found`);
    });

});