const express    = require('express');    
const app        = express();     
const cors = require('cors');   
const mongoose = require("./mongo.js");

const {
  getBooks,
  getBookById,
  addBook,
  updateBook
} = require("./book_manager");

const {
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor
} = require("./author_manager");

const port = process.env.PORT || 8080;        

app.use(express.json());

app.use(cors());


app.get('/books', async function (request, response) {
  let books_list = await getBooks();
  response.send({bookList: books_list});
})

app.get('/authors', async function (request, response) {
  let authors_list = await getAuthors();
  response.send({authorList: authors_list});
})

app.get('/author/:id', async function (request, response) {
  if(request.params.id){
    let authorData = await getAuthorById(request.params.id);
    response.send({authorInfo: authorData});
  }else {
    throw new Error("Require authorId");
  }
})


app.get('/book/:id', async function (request, response) {
  if(request.params.id){
    let bookData = await getBookById(request.params.id);
    response.send({bookInfo: bookData});
  }else {
    throw new Error("Require bookId");
  }
})

app.post('/author', async function(request, response){  
  try{
    let authorData = await addAuthor(request.body);
    response.send({authorInfo: authorData});   
  } catch(err){
    console.log(err.message);
    response.send({authorInfo: {}});
  }  
});

app.post('/book', async function(request, response){ 
  try{
    let bookData = await addBook(request.body);
    response.send({bookInfo: bookData}); 
  } catch(err){
    console.log(err.message);
    response.send({bookInfo: {}});
  }     
});

app.put('/author/:id', async function(request, response){  
  try{
    let authorUpdateStatus = await updateAuthor(request.params.id, request.body);
    response.send({authorUpdateStatus: authorUpdateStatus});   
  } catch(err){
    console.log(err.message);
    response.send({authorUpdateStatus: false});
  }  
});

app.put('/book/:id', async function(request, response){  
  try{
    let bookUpdateStatus = await updateBook(request.params.id, request.body);
    response.send({bookUpdateStatus: bookUpdateStatus});   
  } catch(err){
    console.log(err.message);
    response.send({bookUpdateStatus: false});
  }  
});

app.listen(port);
console.log('listening to port ' + port);