import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthorCard from "./AuthorCard";

const AuthorsPage = (props) => {
  const [showData, setShowData] = useState({
    authorList: []
  });

  const fetchAuthorsList = async () => {
  
    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: headers
    };

    return await fetch(`http://localhost:8080/authors`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let {authorList} = data;
          let authorData = {
            authorList: authorList
          };
          setShowData(authorData); 
       })
       .catch(error => setShowData({
        authorList: []
      }));}
  


  useEffect( () => {
    fetchAuthorsList()
  },[]);
	
  return (
    <>
      <h1>Authors List</h1>
      <Link to={`/dashboard`}>
        <button style={{'marginRight':'16px'}}>Go back to dashboard</button>
      </Link>
      <Link to={`/author/add`}>
        <button>Add Author</button>
      </Link>
      <br/>
      <br/>
      { showData.authorList.map((data,index) => {
        if (data) {
          return (
          <div key={`author-${data.authorId}`}>
            <AuthorCard 
            key={`author-${data.authorId}`}
            authorFirstName={data.firstName}
            authorLastName={data.lastName}
            authorId = {data.authorId}
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

export default AuthorsPage