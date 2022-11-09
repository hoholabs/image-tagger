import './App.css';
import React, { useState } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import playground from './Puzzles/Playground';

function App() {
    const [puzzle, setPuzzle] = useState(playground);
    //later, to add more puzzles, add a default/info screen

    const [isActive, setIsActive] = useState(false);

    const changePuzzle = (puzzle) => {
        setPuzzle(puzzle);
    };

    const startPuzzle = () => {
        setIsActive(true);
    };

    return (
        <div className="App">
            <Nav
                changePuzzle={changePuzzle}
                puzzle={puzzle}
                startPuzzle={startPuzzle}
                isActive={isActive}
            />
            <Puzzle
                puzzle={puzzle}
                startPuzzle={startPuzzle}
                isActive={isActive}
            />
        </div>
    );
}

export default App;
