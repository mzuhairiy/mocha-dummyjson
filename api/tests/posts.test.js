import { expect } from 'chai';
import { getAllPosts, getPostById, getPostsByUserId, addPost, updatePost, deletePost, searchPosts, getPostComments } from '../endpoints/posts-endpoint.js';

const testCases = {
    positive: {
        getAllPosts: "Should be able to retrieve all posts",
        getPostById: "Should be able to retrieve a post by ID",
        getPostsByUserId: "Should be able to retrieve posts by user ID",
        addPost: "Should be able to add a new post",
        updatePost: "Should be able to update an existing post",
        deletePost: "Should be able to delete a post by ID",
        searchPosts: "Should be able to search posts",
        getPostComments: "Should be able to retrieve comments for a post"
    },
    negative: {
        getPostByUnknownId: "Should return 404 when trying to get a post with an unknown ID",
        updatePostWithUnknownId: "Should return 404 when trying to update a post with an unknown ID",
        deletePostWithUnknownId: "Should return 404 when trying to delete a post with an unknown ID",
    }
};

describe('Posts Endpoint', () => {
    it(`@posts ${testCases.positive.getAllPosts}`, async () => {
        const res = await getAllPosts();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("posts");
        expect(res.body.posts).to.be.an('array');
    });

    it(`@posts ${testCases.positive.getPostById}`, async () => {
        const postId = 1; // Assuming a post with ID 1 exists
        const res = await getPostById(postId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", postId);
    });

    it(`@posts ${testCases.positive.getPostsByUserId}`, async () => {
        const userId = 5; // Assuming a user with ID 5 exists
        const res = await getPostsByUserId(userId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("posts");
    });

    it(`@posts ${testCases.positive.addPost}`, async () => {
        const postData = {
            title: "New Post",
            body: "This is a new post",
            userId: 1
        };
        const res = await addPost(postData);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("title", postData.title);
    });

    it(`@posts ${testCases.positive.updatePost}`, async () => {
        const postId = 1; // Assuming a post with ID 1 exists
        const updateData = { title: "Updated Post" };
        const res = await updatePost(postId, updateData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("id", postId);
        expect(res.body).to.have.property("title", updateData.title);
    });

    it(`@posts ${testCases.positive.deletePost}`, async () => {
        const postId = 1; // Assuming a post with ID 1 exists
        const res = await deletePost(postId);
        expect(res.status).to.equal(200);
    });

    it(`@posts ${testCases.positive.searchPosts}`, async () => {
        const query = { q: 'love' };
        const res = await searchPosts(query);
        const posts = res.body.posts[0];
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("posts");
        expect(res.body).to.have.property("total");
        expect(res.body.posts).to.be.an('array');
        expect(posts).to.have.property("id");
        expect(posts).to.have.property("title");
        expect(posts).to.have.property("body");
    });
    
    it(`@posts ${testCases.positive.getPostComments}`, async () => {
        const postId = 1;
        const res = await getPostComments(postId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("comments");
        expect(res.body.comments).to.be.an('array');
        expect(res.body).to.have.property("total");
    });

    it(`@posts ${testCases.negative.getPostByUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await getPostById(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Post with id '${unknownId}' not found`);
    });

    it(`@posts ${testCases.negative.updatePostWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const updateData = { title: "Updated Post" };
        const res = await updatePost(unknownId, updateData);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Post with id '${unknownId}' not found`);
    });

    it(`@posts ${testCases.negative.deletePostWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await deletePost(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal(`Post with id '${unknownId}' not found`);
    });
});