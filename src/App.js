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

    const checkLegend = () => {
        for (let index = 0; index < legend.length; index++) {
            const element = legend[index];
            if (element === false) {
                return false;
            }
        }
        return true;
    };

    const loadPuzzle = (puzzle) => {
        setPuzzle(puzzle);
    };

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

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                let newTime = Math.round((time + 0.1) * 10) / 10;
                setTime(newTime);
            }, 100);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    useEffect(() => {
        if (checkLegend()) {
            setIsActive(false);
        }
    }, [legend]);

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
            {isActive && (
                <Puzzle
                    puzzle={puzzle}
                    time={time}
                    startPuzzle={startPuzzle}
                    isActive={isActive}
                    changeLegend={changeLegend}
                />
            )}
        </div>
    );
}

export default App;
