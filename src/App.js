import './App.css';
import React, { useState } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import playground from './Puzzles/Playground';

function App() {
    const [puzzle, setPuzzle] = useState(playground);

    const changePuzzle = (puzzle) => {
        setPuzzle(puzzle);
    };

    return (
        <div className="App">
            <Nav changePuzzle={changePuzzle} />
            <Puzzle puzzle={puzzle} />
        </div>
    );
}

export default App;
