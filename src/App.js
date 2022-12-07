import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Puzzle from './Puzzle';
import Scores from './Scores';
import playground from './Puzzles/Playground';
import { db } from './firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

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

    // eslint-disable-next-line no-unused-vars
    async function initPuzzle(puzzle) {
        console.log(puzzle);

        const docData = {
            highScores: [
                { name: 'Poncho', score: 7 },
                { name: 'Donyol', score: 13 },
                { name: 'Cher', score: 41 },
                { name: 'Hoho', score: 42 },
                { name: 'Ralph', score: 44 },
                { name: 'Steve', score: 69 },
                { name: 'DJKaz', score: 86 },
                { name: 'Sonny', score: 96 },
                { name: 'Sue', score: 99 },
                { name: 'Kelso', score: 101 }
            ],
            coords: {
                A: puzzle.coordsA,
                B: puzzle.coordsB,
                C: puzzle.coordsC
            }
        };
        await setDoc(doc(db, 'puzzles', puzzle.name), docData);
    }
    // initPuzzle(playground);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    puzzle={puzzle}
                />
            )}
        </div>
    );
}

export default App;
