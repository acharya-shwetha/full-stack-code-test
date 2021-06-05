const { Books } = require("./schema/book");
const mongoose  = require("mongoose");
const { ObjectId } = mongoose.Types;
const { formatAuthors, checkIfAuthorExist } = require("./author_manager");

async function formatBooks(books_list){
    try{
        let formattedBooksList = [];
        for(var book of books_list){
            formattedBooksList.push({
                bookId: Buffer.from(book._id.toString(), "ascii").toString("hex"),
                name: book.name,
                isbn: book.isbn,
                authorId: Buffer.from(book.authorId.toString(), "ascii").toString("hex")
            });
        }
        return formattedBooksList;
    }catch(err){
        throw new Error(`Error in formatBooks: ${err.message}`);
    }
}


async function formatBooksWithAuthorData(book_data){
    try{
        let formattedBookData = {
            bookId: Buffer.from(book_data._id.toString(), "ascii").toString("hex"),
            name: book_data.name,
            isbn: book_data.isbn
        }

        let formattedAuthorData = await formatAuthors(book_data.authorData);
        formattedBookData.authorData = formattedAuthorData;

        return formattedBookData;

    }catch(err){
        throw new Error(`Error in formatBooksWithAuthorData(): ${err.message}`);
    }
}


async function getBooks(){
    try{
        let books_result = await Books.find({});
        if(books_result && books_result.length > 0){
            let formattedBooksList = await formatBooks(books_result);
            return formattedBooksList;
        }
        return [];
    }catch(err){
        throw new Error("Failed to get list of books: "+err.message);
    }
}

async function getBookById(bookId){
    try{
        if(!bookId){
            throw new Error("Invalid bookId");
        }
        let bookid = Buffer.from(bookId,"hex").toString("ascii");
        let booksData = await Books.aggregate([
            {
              '$match': {
                '_id': ObjectId(bookid)
              }
            }, {
              '$lookup': {
                'from': 'authors', 
                'localField': 'authorId', 
                'foreignField': '_id', 
                'as': 'authorData'
              }
            }, {
              '$unwind': {
                'path': '$authorData', 
                'preserveNullAndEmptyArrays': true
              }
            }
          ]);

        if(booksData && booksData.length == 1){
            let formattedBookData = await formatBooksWithAuthorData(booksData[0]);
            return formattedBookData;
        }
        return {};

    }catch(err){
        throw new Error(`Failed to get book by Id: ${err.message}`);
    }
}


async function addBook(bookData){
    try{
        let { name, isbn, authorId } = bookData;
        let authorid = Buffer.from(authorId, "hex").toString("ascii");
        let isAuthorExist = await checkIfAuthorExist(authorid);
        if(!isAuthorExist){
            throw new Error('Author data not available');
        }
        let bookDoc =  new Books({name: name, isbn: isbn, authorId: ObjectId(authorid)});
        const bookSaveData = await bookDoc.save();
        if(!bookSaveData){
            throw new Error(`Error in saving book details`);
        }
        let formattedBookData = {
            bookId: Buffer.from(bookSaveData._id.toString(),"ascii").toString("hex"),
            name: bookSaveData.name,
            isbn: bookSaveData.isbn,
            authorId: Buffer.from(bookSaveData.authorId.toString(),"ascii").toString("hex")
        }
        return formattedBookData;
    }catch(err){
        throw new Error(`Failed to add author: ${err.message}`);
    }
}


module.exports = {
    getBooks,
    formatBooks,
    getBookById,
    addBook
}