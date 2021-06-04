var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var AuthorsSchema = new Schema({
    firstname: { type: String, required: true, index: true },
    lastname: { type: String, required: true, index: true },
    },
    {
        timestamps
    }  
);
  
  
const Authors = mongoose.model("authors", AuthorsSchema);

module.exports = {
   Authors
};
  
  