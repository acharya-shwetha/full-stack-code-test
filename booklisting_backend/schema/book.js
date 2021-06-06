var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var BooksSchema = new Schema({
    name: { type: String, required: true, index: true },
    isbn: { type: String, required: true, index: true },
    authorId: { type: SchemaTypes.ObjectId, required: true, index: true, ref: 'authors' },
    },
    {
        timestamps: true
    }  
);
  
  
const Books = mongoose.model("books", BooksSchema);

module.exports = {
   Books
};
  
  