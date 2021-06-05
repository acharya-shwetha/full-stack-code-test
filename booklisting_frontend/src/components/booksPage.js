import React, { useState, useEffect } from 'react';
import BookCard from "./BookCard";

const BooksPage = (props) => {
  const [showData, setShowData] = useState({
    bookList: []
  });

  const fetchBooksList = async () => {
  
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: headers
    };

    return await fetch(`http://localhost:8080/books`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let {bookList} = data;
          let bookData = {
            bookList: bookList
          };
          setShowData(bookData); 
       })
       .catch(error => setShowData({
        bookList: []
      }));}
  


  useEffect( () => {
    fetchBooksList()
  },[]);

	
  return (
    <>
      <h1>Books List</h1>
      { showData.bookList.map((data,index) => {
        if (data) {
          return (
          <div key={`book-${data.bookId}`}>
            <BookCard 
            key={`book-${data.bookId}`}
            bookName = {data.name}
            bookId = {data.bookId}
            />
          </div>
    	   )	
    	 } else {
        return (
          <>
          </>
        )
      }
        }) }
    </>
   );
}

export default BooksPage