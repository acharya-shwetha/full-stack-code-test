import React from 'react'

const AuthorModal = ({
    authorData
}) => {

    return (
        <>
          <div className="modal">
              <div className="modal-body">
                First Name: {authorData.firstName}
                <br/>
                Last Name: {authorData.lastName}
              </div>
          </div>
        </>
      );    
}

export default AuthorModal;