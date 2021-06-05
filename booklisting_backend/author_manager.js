const { Authors } = require("./schema/author");
const mongoose  = require("mongoose");
const { ObjectId } = mongoose.Types;

async function formatAuthors(authorData){
    try{
        return {
            authorId: Buffer.from(authorData._id.toString(), "ascii").toString("hex"),
            firstName: authorData.firstname,
            lastName: authorData.lastname
        }
    }catch(err){
        throw new Error(`Error in formatAuthors: ${err.message}`);
    }
}


async function getAuthors(){
    try{
        let authors_result = await Authors.find({});
        if(authors_result && authors_result.length > 0){
            let formattedAuthorsList = [];
            for(var author of authors_result){
                let formattedAuthor = await formatAuthors(author);
                if(Object.keys(formattedAuthor).length > 0){
                    formattedAuthorsList.push(formattedAuthor)
                }
            }
            return formattedAuthorsList;
        }
        return [];
    }catch(err){
        throw new Error(`Failed to get list of authors: ${err.message}`);
    }
}


async function getAuthorById(authorId){
    try{
        if(!authorId){
            throw new Error("Invalid authorId");
        }
        let authorid = Buffer.from(authorId,"hex").toString("ascii");
        let author_result = await Authors.findById(ObjectId(authorid));
        if(!author_result){
            throw new Error("Requested author details not available");
        }
        let formattedAuthorResult = await formatAuthors(author_result);
        return formattedAuthorResult;
    }catch(err){
        throw new Error("Failed to get author details: "+err.message);
    }
}



module.exports = {
    getAuthors,
    getAuthorById,
    formatAuthors
}