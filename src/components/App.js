import '../styles/App.css';
import React from 'react';
import Board from "./Board";

const App = () => {
    return (
        <div className="App">
            <header className="Header">Trello Clone <div className="Header_Signature">by Shevchenko D.</div></header>
            <Board/>
        </div>
    );
}

export default App;
