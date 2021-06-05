import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import AuthorsPage from './components/authorsPage';

function App() {
  return (
    <div className="App">
      <AuthorsPage />
    </div>
  );
}

const mainNode = document.getElementById("root");
ReactDOM.render(<App />,mainNode);
