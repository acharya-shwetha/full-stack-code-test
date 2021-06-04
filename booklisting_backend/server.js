const express    = require('express');    
const app        = express();     
const cors = require('cors');   
const mongoose = require("./mongo.js");

const {
  getBooks
} = require("./book_manager");

const {
  getAuthors
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

app.listen(port);
console.log('listening to port ' + port);