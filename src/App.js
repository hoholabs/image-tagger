import './App.css';
import React, { useState } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import playground from './Puzzles/Playground';

function App() {
    const [puzzle, setPuzzle] = useState(playground);
    const [legend, setLegend] = useState([false, false, false]);
    const [isActive, setIsActive] = useState(false);
    //later, to add more puzzles, add a default/info screen

    function loadPuzzle(puzzle) {
        setPuzzle(puzzle);
        // console.log(puzzle);
    }

    const startPuzzle = () => {
        setIsActive(true);
    };

    const changeLegend = (position) => {
        let oldLegend = legend;
        oldLegend[position] = true;
        setLegend(oldLegend);
    };

    // loadPuzzle(puzzle);
    useState(() => {
        loadPuzzle(puzzle);
    });

    return (
        <div className="App">
            <Nav
                loadPuzzle={loadPuzzle}
                puzzle={puzzle}
                legend={legend}
                startPuzzle={startPuzzle}
                isActive={isActive}
            />
            <Puzzle
                puzzle={puzzle}
                startPuzzle={startPuzzle}
                isActive={isActive}
                changeLegend={changeLegend}
            />
        </div>
    );
}

export default App;
