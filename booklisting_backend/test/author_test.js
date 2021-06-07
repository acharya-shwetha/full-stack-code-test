const chai = require('chai');
const expect = chai.expect;
const mongoose  = require("mongoose");
const { ObjectId } = mongoose.Types;
const { formatAuthors } = require("../author_manager");


describe('Author function testing',() => {
    it('formatAuthors() test', async () => {
        let authorData = {
            _id: ObjectId("60bd37a61751531b9f4ec5dd"),
            firstname: "Shwetha",
            lastname: "Acharya"
        }
        let expectedFormattedData = {
            authorId: "363062643337613631373531353331623966346563356464",
            firstName: "Shwetha",
            lastName: "Acharya"
        }
        let formattedAuthorData = await formatAuthors(authorData);
        expect(formattedAuthorData).to.have.keys(['authorId', 'firstName', 'lastName']);
        expect(formattedAuthorData).to.have.property('authorId', expectedFormattedData.authorId);
        expect(formattedAuthorData).to.have.property('firstName', expectedFormattedData.firstName);
        expect(formattedAuthorData).to.have.property('lastName', expectedFormattedData.lastName);
    });
});