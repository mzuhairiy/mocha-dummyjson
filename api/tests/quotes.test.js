import { expect } from "chai";
import { getAllQuotes, getSingleQuote, getRandomQuote } from "../endpoints/quotes-endpoint.js";
import { de } from "@faker-js/faker";

const testCases = {
    positive: {
        getAllQuotes: "Should be able to retrieve all quotes",
        getSingleQuote: "Should be able to retrieve a single quote by ID",
        getRandomQuote: "Should be able to retrieve a random quote"
    },
    negative: {
        getSingleQuoteWithUnknownId: "Should return 404 when trying to get a quote with an unknown ID"
    }
};

describe('Quotes Endpoint', () => {
    it(`@quotes ${testCases.positive.getAllQuotes}`, async () => {
        const res = await getAllQuotes();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("quotes");
        expect(res.body.quotes).to.be.an('array');
        const quote = res.body.quotes[0];
        expect(quote).to.include.all.keys(["id", "quote", "author"]);
    });

    it(`@quotes ${testCases.positive.getSingleQuote}`, async () => {
        const quoteId = 1; // Assuming a quote with ID 1 exists
        const res = await getSingleQuote(quoteId);
        expect(res.status).to.equal(200);
        expect(res.body).to.include.all.keys(["id", "quote", "author"]);
    });

    it(`@quotes ${testCases.positive.getRandomQuote}`, async () => {
        const res = await getRandomQuote();
        expect(res.status).to.equal(200);
        expect(res.body).to.include.all.keys(["id", "quote", "author"]);
    });

    it(`@quotes ${testCases.negative.getSingleQuoteWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await getSingleQuote(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.include(`Quote with id '${unknownId}' not found`);
    });
});