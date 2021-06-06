import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorModal from '../modal/authorModal';
import editLogo from '../assets/editImg.png';

const AuthorCard = ({
    authorFirstName,
    authorLastName,
    authorId 
}) => {

  const [authorInfo, setAuthorInfo] = useState({
    showAuthorData: false,
    authorData: {}
  });

  const fetchAuthorData = async () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: headers
    };
   
    return await fetch(`http://localhost:8080/author/${authorId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let {authorInfo} = data;
        let authorInfoData = {
            showAuthorData: true,
            authorData: authorInfo
        }
        setAuthorInfo({...authorInfoData}) 
        })
        .catch(error => setAuthorInfo({showAuthorData: false, authorData: {}}));}

  const handleClick = event => {
    event.preventDefault();
    if(!authorInfo.showAuthorData){
        fetchAuthorData();
    }else {
      let authorData = {
        showAuthorData: false,
        authorData: {}
      }
      setAuthorInfo({...authorData});
    }
  };
  
  return (
    <>
        <div>
              <h2 className="author-card"
              onClick={handleClick}
              >
              {authorFirstName}</h2>
              <Link to={`/author/edit/${authorId}`}>
                <img className="edit-img" src={editLogo} alt="edit author"/>
              </Link>
              {authorInfo.showAuthorData && (
                <AuthorModal
                    authorData={authorInfo.authorData}
                />
              )}
	    </div>	
    </>
  );
}

export default AuthorCard