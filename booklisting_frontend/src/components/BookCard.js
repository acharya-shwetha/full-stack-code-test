import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookModal from '../modal/bookModal';
import editLogo from '../assets/editImg.png';

const BookCard = ({
    bookName,
    bookId 
}) => {

  const [bookInfo, setBookInfo] = useState({
    showBookData: false,
    bookData: {}
  });

  const fetchBookData = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: headers
    };
   
    return await fetch(`http://localhost:8080/book/${bookId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let {bookInfo} = data;
        let bookInfoData = {
            showBookData: true,
            bookData: bookInfo
        }
        setBookInfo({...bookInfoData}) 
        })
        .catch(error => setBookInfo({showBookData: false, bookData: {}}));}

  const handleClick = event => {
    event.preventDefault();
    if(!bookInfo.showBookData){
      fetchBookData();
    }else {
      let bookData = {
        showBookData: false,
        bookData: {}
      }
      setBookInfo({...bookData});
    }
  };
  
  return (
    <>
        <div>
              <h2 className="book-card"
              onClick={handleClick}
              >
              {bookName}</h2>
              <Link to={`/book/edit/${bookId}`}>
                <img className="edit-img" src={editLogo} alt="edit book"/>
              </Link>
              {bookInfo.showBookData && (
                <BookModal
                    bookData={bookInfo.bookData}
                />
              )}
	    </div>	
    </>
  );
}

export default BookCard