import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = (props) => {
	
  return (
    <>
      <h1>Book Listing App</h1>
      <Link to={`/authors`}>
        <button>Go To Authors Page</button>
      </Link>
      <br/>
      <br/>
      <Link to={`/books`}>
        <button>Go To Books Page</button>
      </Link>
    </>
   );
}

export default DashboardPage