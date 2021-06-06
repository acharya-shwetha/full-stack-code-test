import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import AuthorsPage from './components/authorsPage';
import AddAuthor from "./components/AddAuthor";
import AddBook from "./components/AddBook";
import BooksPage from './components/booksPage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Redirect exact from="/" to="/dashboard" />
          <Route path='/dashboard' component={DashboardPage} />
          <Route path='/authors' component={AuthorsPage} />
          <Route path='/author/edit/:authorid' component={AddAuthor} />
          <Route path='/author/add' component={AddAuthor} />
          <Route path='/book/edit/:bookid' component={AddBook} />
          <Route path='/book/add' component={AddBook} />
          <Route path='/books' component={BooksPage} />
        </div> 
    </BrowserRouter>
  );
}

const mainNode = document.getElementById("root");
ReactDOM.render(<App />,mainNode);
