import './App.css';
import React, { useState } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import playground from './Puzzles/Playground';

function App() {
    const [puzzle, setPuzzle] = useState(playground);
    //later, to add more puzzles, add a default/info screen

    const changePuzzle = (puzzle) => {
        setPuzzle(puzzle);
    };

    return (
        <div className="App">
            <Nav changePuzzle={changePuzzle} puzzle={puzzle} />
            <Puzzle puzzle={puzzle} />
        </div>
    );
}

export default App;
