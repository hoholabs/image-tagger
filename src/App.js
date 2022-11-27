import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import Scores from './Scores';
import playground from './Puzzles/Playground';

function App() {
    const [puzzle, setPuzzle] = useState(playground);
    const [legend, setLegend] = useState([false, false, false]);
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [userInfo, setUserInfo] = useState({
        username: false,
        picture: false,
        uid: false
    });

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
        const checkLegend = () => {
            for (let index = 0; index < legend.length; index++) {
                const element = legend[index];
                if (element === false) {
                    return false;
                }
            }
            return true;
        };
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
                setUserInfo={setUserInfo}
                userInfo={userInfo}
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
            {!isActive && (
                <Scores
                    userInfo={userInfo}
                    puzzle={puzzle}
                    time={time}
                    isActive={isActive}
                />
            )}
        </div>
    );
}

export default App;
