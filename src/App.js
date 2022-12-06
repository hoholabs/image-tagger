import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import Scores from './Scores';
import playground from './Puzzles/Playground';
import { db } from './firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

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
    const [highScore, setHighScore] = useState(false);
    const [score, setScore] = useState(false);

    const loadPuzzle = (puzzle) => {
        setPuzzle(puzzle);
    };

    const startPuzzle = () => {
        setLegend([false, false, false]);
        setTime(0);
        setIsActive(true);
    };

    const changeLegend = (position) => {
        let oldLegend = [...legend];
        oldLegend[position] = true;
        setLegend(oldLegend);
    };

    async function updateHighScore() {
        //if user is logged in
        if (userInfo.uid) {
            const docRef = doc(db, 'users', userInfo.uid);
            const docSnap = await getDoc(docRef);

            console.log(docSnap.data());

            //update highScore on database
            await updateDoc(docRef, {
                highScore: time
            });
            //update hoghScore locally
            setHighScore(time);
        }
    }

    const puzzleFinished = () => {
        setScore(time);
        if (highScore) {
            if (time < highScore) {
                updateHighScore();
            }
        } else {
            updateHighScore();
        }
        setIsActive(false);
    };
    //load puzzle
    useEffect(() => {
        loadPuzzle(puzzle);
    });
    //timer
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

    // checks to see if all items have been found
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
            puzzleFinished();
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
                    highScore={highScore}
                    setHighScore={setHighScore}
                    userInfo={userInfo}
                    time={time}
                    isActive={isActive}
                    score={score}
                />
            )}
        </div>
    );
}

export default App;
