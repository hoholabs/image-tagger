import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import playground from './Puzzles/Playground';

function App() {
    const [puzzle, setPuzzle] = useState(playground);
    const [legend, setLegend] = useState([false, false, false]);
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                let newTime = time + 1;
                setTime(newTime);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    useEffect(() => {
        if (checkLegend()) {
            console.log(time);
            setIsActive(false);
        }
    }, [legend]);

    const checkLegend = () => {
        for (let index = 0; index < legend.length; index++) {
            const element = legend[index];
            if (element === false) {
                return false;
            }
        }
        return true;
    };

    function loadPuzzle(puzzle) {
        setPuzzle(puzzle);
    }

    const startPuzzle = () => {
        setIsActive(true);
    };

    const changeLegend = (position) => {
        let oldLegend = [...legend];
        oldLegend[position] = true;
        setLegend(oldLegend);
    };

    useEffect(() => {
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
                time={time}
            />
            <Puzzle
                puzzle={puzzle}
                time={time}
                startPuzzle={startPuzzle}
                isActive={isActive}
                changeLegend={changeLegend}
            />
        </div>
    );
}

export default App;
