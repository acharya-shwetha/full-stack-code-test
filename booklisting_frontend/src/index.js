import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AuthorsPage from './components/authorsPage';
import BooksPage from './components/booksPage';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <Route path='/authors' component={AuthorsPage} />
        <Route path='/books' component={BooksPage} />
        </div> 
    </BrowserRouter>
  );
}

const mainNode = document.getElementById("root");
ReactDOM.render(<App />,mainNode);
