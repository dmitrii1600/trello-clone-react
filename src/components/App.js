import React from 'react';
import '../styles/App.css';
import Board from "./Board";

const App = () => {
  return (
    <div className="App">
      <header className="Header">React Trello Clone By DS</header>
      <Board/>
    </div>
  );
}

export default App;
