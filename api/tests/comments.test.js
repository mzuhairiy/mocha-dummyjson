import { expect } from "chai";
import { 
    getAllComments, 
    getSingleComment, 
    getCommentsByPostId, 
    addComment, 
    updateComment, 
    deleteComment 
} from "../endpoints/comments-endpoint.js";

const testCases = {
    positive: {
        getAllComments: "Should be able to retrieve all comments",
        getSingleComment: "Should be able to retrieve a single comment by ID",
        getCommentsByPostId: "Should be able to retrieve comments by post ID",
        addComment: "Should be able to add a new comment",
        updateComment: "Should be able to update an existing comment",
        deleteComment: "Should be able to delete a comment by ID"
    },
    negative: {
        getSingleCommentWithUnknownId: "Should return 404 when trying to get a comment with an unknown ID",
        updateCommentWithUnknownId: "Should return 404 when trying to update a comment with an unknown ID",
        deleteCommentWithUnknownId: "Should return 404 when trying to delete a comment with an unknown ID"
    }
};

describe('Comments Endpoint', () => {
    it(`@comments ${testCases.positive.getAllComments}`, async () => {
        const res = await getAllComments();
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("comments");
        expect(res.body.comments).to.be.an('array');
        const comment = res.body.comments[0];
        expect(comment).to.include.all.keys(["id", "body", "postId", "likes", "user"]);
    });

    it(`@comments ${testCases.positive.getSingleComment}`, async () => {
        const commentId = 1;
        const res = await getSingleComment(commentId);
        expect(res.status).to.equal(200);
        expect(res.body).to.include.all.keys(["id", "postId", "likes", "body", "user"]);
    });

    it(`@comments ${testCases.positive.getCommentsByPostId}`, async () => {
        const postId = 1;
        const res = await getCommentsByPostId(postId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("comments");
        expect(res.body.comments).to.be.an('array');
        const comment = res.body.comments[0];
        expect(comment).to.include.all.keys(["id", "postId", "likes", "body", "user"]);
    });

    it(`@comments ${testCases.positive.addComment}`, async () => {
        const newComment = {
            postId: 3,
            body: "This is a test comment",
            userId: 5,
        }
        const res = await addComment(newComment);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.include.all.keys(["id", "postId", "user"]);
    });

    it(`@comments ${testCases.positive.updateComment}`, async () => {
        const commentId = 1;
        const updatedData = {
            body: "This is an updated comment"
        }
        const res = await updateComment(commentId, updatedData);
        expect(res.status).to.equal(200);
        expect(res.body).to.include.all.keys(["id", "postId", "likes", "user"]);
        expect(res.body.body).to.equal(updatedData.body);
    });

    it(`@comments ${testCases.positive.deleteComment}`, async () => {
        const commentId = 1;
        const res = await deleteComment(commentId);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("isDeleted", true);
        expect(res.body).to.have.property("deletedOn");
        expect(res.body.deletedOn).to.not.be.null;
    });

    it(`@comments ${testCases.negative.getSingleCommentWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await getSingleComment(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.include(`Comment with id '${unknownId}' not found`);
    });

    it(`@comments ${testCases.negative.updateCommentWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const updatedData = { body: "Updated comment" };
        const res = await updateComment(unknownId, updatedData);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.include(`Comment with id '${unknownId}' not found`);
    });

    it(`@comments ${testCases.negative.deleteCommentWithUnknownId}`, async () => {
        const unknownId = 9999; // Assuming this ID does not exist
        const res = await deleteComment(unknownId);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.include(`Comment with id '${unknownId}' not found`);
    });
});