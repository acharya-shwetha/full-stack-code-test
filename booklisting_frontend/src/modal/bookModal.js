import React from 'react'

const BookModal = ({
    bookData
}) => {

  let { firstName, lastName } = bookData.authorData || {firstName: "", lastName: ""};

    return (
        <>
          <div className="modal">
              <div className="modal-body">
                Name: {bookData.name}
                <br/>
                ISBN: {bookData.isbn}
                <br/>
                Author First Name: {firstName}
                <br/>
                Author Last Name: {lastName}
              </div>
          </div>
        </>
      );    
}

export default BookModal;