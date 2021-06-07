### Install dependencies
> npm install

### Run nodejs server

Run command
> npm start


### To run test cases 
> npm test

### Api's available

bookId and authorId's are buffered mongo ids. Ids can be obtained using GET apis.

1) GET http://localhost:8080/books

2) GET http://localhost:8080/authors

3) GET http://localhost:8080/author/363062646561386165663164356434326132643139386432

4) GET http://localhost:8080/book/363062646562626265663164356434326132643139386434

5) POST http://localhost:8080/author
    {
        "firstName": "Rhonda",
        "lastName": "Clement"
    }

6) POST http://localhost:8080/book
    {
        "name": "Unix Systems",
        "isbn": "IS-004",
        "authorId": "363062646561386165663164356434326132643139386432"
    }

7) PUT http://localhost:8080/author/363062646561386165663164356434326132643139386432
    {
        "firstName": "Shwetha",
        "lastName": "Acharya"
    }

8) PUT http://localhost:8080/book/363062646562626265663164356434326132643139386434
    {
        "name": "Database Management Systems",
        "isbn" : "IS - 001",
        "authorId": "363062646561386165663164356434326132643139386432"
    }