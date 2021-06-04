const { Books } = require("./schema/book");


async function getBooks(){
    try{
        let books_result = await Books.find({});
        if(books_result && books_result.length > 0){
            return books_result;
        }
        return [];
    }catch(err){
        throw new Error("Failed to get list of books: "+err.message);
    }
}


module.exports = {
    getBooks
}