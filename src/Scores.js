import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function Scores({ userInfo, puzzle, time, isActive }) {
    const [highScore, setHighScore] = useState('--');
    const [score, setScore] = useState(false);

    useEffect(() => {
        async function getScores() {
            if (userInfo.uid) {
                // console.log(props.userInfo.uid);
                const docRef = doc(db, 'users', userInfo.uid);
                const docSnap = await getDoc(docRef);
                const userData = docSnap.data();
                const puzzleName = puzzle.name.toString();
                setHighScore(userData[puzzleName]);
            }
        }

        getScores();
    }, [puzzle.name, userInfo.uid, userInfo]);

    useEffect(() => {
        if (time > 0) {
            setScore(time);
        } else {
            setScore(false);
        }
    }, [time]);

    return (
        <div>
            {/* when the puzzle is not active */}
            {!isActive && (
                <div id="score-card">
                    <div id="top-ten"></div>
                    <span>Your High Score:{highScore}</span>
                    {score && <span>Your Score: {time}</span>}
                </div>
            )}
        </div>
    );
}

export default Scores;
