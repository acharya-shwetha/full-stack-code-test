const chai = require('chai');
const expect = chai.expect;
const mongoose  = require("mongoose");
const { ObjectId } = mongoose.Types;
const { formatBooks, formatBooksWithAuthorData } = require("../book_manager");


describe('Book function testing',() => {
    it('formatBooks() test', async () => {
        let bookList = [{
            _id: ObjectId("60bd37a61751531b9f4ec5dd"),
            name: "Steve Jobs",
            isbn: "ISBN - 001",
            authorId: ObjectId("60bd37a61751531b9f4ec5dd")
        }];
        let expectedFormattedData = [{
            bookId: "363062643337613631373531353331623966346563356464",
            name: "Steve Jobs",
            isbn: "ISBN - 001",
            authorId: "363062643337613631373531353331623966346563356464"
        }]
        let formattedData = await formatBooks(bookList);
        expect(formattedData).to.have.deep.members(expectedFormattedData);
        if(formattedData && formattedData.length > 0){
            expect(formattedData[0]).to.have.keys(['authorId', 'name', 'isbn', 'bookId']);
            expect(formattedData[0]).to.have.property('authorId', expectedFormattedData[0].authorId);
            expect(formattedData[0]).to.have.property('name', expectedFormattedData[0].name);
            expect(formattedData[0]).to.have.property('isbn', expectedFormattedData[0].isbn);
            expect(formattedData[0]).to.have.property('bookId', expectedFormattedData[0].bookId);
        }
    });

    it('formatBooksWithAuthorData() test', async () => {
        let bookData = {
            _id: ObjectId("60bd37a61751531b9f4ec5dd"),
            name: "Steve Jobs",
            isbn: "ISBN - 001",
            authorData: {
                _id: ObjectId("60bd37a61751531b9f4ec5dd"),
                firstname: "Shwetha",
                lastname: "Acharya"
            }
        };
        let expectedFormattedData = {
            bookId: "363062643337613631373531353331623966346563356464",
            name: "Steve Jobs",
            isbn: "ISBN - 001",
            authorData: {
                authorId: "363062643337613631373531353331623966346563356464",
                firstName: "Shwetha",
                lastName: "Acharya"
            }
        }
        let formattedData = await formatBooksWithAuthorData(bookData);
        // expect(formattedAuthorData).to.have.deep.members(expectedFormattedData);
        expect(formattedData).to.deep.equal(expectedFormattedData);
        expect(formattedData).to.have.keys(['authorData', 'name', 'isbn', 'bookId']);
        expect(formattedData).to.have.property('name', expectedFormattedData.name);
        expect(formattedData).to.have.property('isbn', expectedFormattedData.isbn);
        expect(formattedData).to.have.property('bookId', expectedFormattedData.bookId);
        expect(formattedData.authorData).to.have.keys(['authorId', 'firstName', 'lastName']);
        expect(formattedData.authorData).to.have.property('authorId', expectedFormattedData.authorData.authorId);
        expect(formattedData.authorData).to.have.property('firstName', expectedFormattedData.authorData.firstName);
        expect(formattedData.authorData).to.have.property('lastName', expectedFormattedData.authorData.lastName);
    });
});