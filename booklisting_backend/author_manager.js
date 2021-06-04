const { Authors } = require("./schema/author");


async function getAuthors(){
    try{
        let authors_result = await Authors.find({});
        if(authors_result && authors_result.length > 0){
            return authors_result;
        }
        return [];
    }catch(err){
        throw new Error("Failed to get list of authors: "+err.message);
    }
}


module.exports = {
    getAuthors
}