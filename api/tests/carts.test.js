import { assert, expect } from "chai";
import { getAllCarts, getCartById, getCartByUserId, addCart, updateCart, deleteCart } from "../endpoints/carts-endpoint.js";

const testCases = {
    positive: {
        getAllCarts: "Should be able to retrieve all carts",
        getCartById: "Should be able to retrieve a cart by ID",
        getCartByUserId: "Should be able to retrieve a cart by user ID",
        addCart: "Should be able to add a new cart",
        updateCart: "Should be able to update an existing cart",
        deleteCart: "Should be able to delete a cart by ID",
    },
    negative: {
        getCartByUnknownId: "Should return 404 when trying to get a cart with an unknown ID",
        updateCartWithUnknownId: "Should return 404 when trying to update a cart with an unknown ID",
        deleteCartWithUnknownId: "Should return 404 when trying to delete a cart with an unknown ID",
    }
};

describe('Carts Endpoint', () => {
    it(`@carts ${testCases.positive.getAllCarts}`, async () => {
        const res = await getAllCarts();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("carts");
        expect(res.body.carts).to.be.an('array');
    });

    it(`@carts ${testCases.positive.getCartById}`, async () => {
        const cartId = 5; // Assuming a cart with ID 1 exists
        const res = await getCartById(cartId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", cartId);
    });

    it(`@carts ${testCases.positive.getCartByUserId}`, async () => {
        const userId = 5;
        const res = await getCartByUserId(userId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("carts");
    });

    it(`@carts ${testCases.positive.addCart}`, async () => {
        const cartData = {
            userId: 51,
            products: [{ id: 144, quantity: 2 }],
        };
        const res = await addCart(cartData);
        const product = res.body.products[0];
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("total");
        expect(res.body).to.have.property("products").that.is.an('array');
        expect(product).to.have.property("id");
        expect(product).to.have.property("title");
        expect(product).to.have.property("price");
        expect(product).to.have.property("quantity");
    });

    it(`@carts ${testCases.positive.updateCart}`, async () => {
        const cartId = 31; // Assuming a cart with ID 1 exists
        const updatedCart = {
            products: [{ id: 1, quantity: 2 }],
            total: 200,
            totalProducts: 1,
            totalQuantity: 2
        };
        const res = await updateCart(cartId, updatedCart);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", cartId);
    });

    it(`@carts ${testCases.positive.deleteCart}`, async () => {
        const cartId = 1;
        const res = await deleteCart(cartId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("isDeleted", true);
        expect(res.body).to.have.property("deletedOn");
        expect(res.body.deletedOn).to.not.be.null;
    });

    it(`@carts ${testCases.negative.getCartByUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await getCartById(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Cart with id '${unknownId}' not found`);
    });

    it(`@carts ${testCases.negative.updateCartWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const updatedCart = {
            products: [{ id: 1, quantity: 2 }],
            total: 200,
            totalProducts: 1,
            totalQuantity: 2
        };
        const res = await updateCart(unknownId, updatedCart);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Cart with id '${unknownId}' not found`);
    });

    it(`@carts ${testCases.negative.deleteCartWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await deleteCart(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Cart with id '${unknownId}' not found`);
    });
});