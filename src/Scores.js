import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function Scores({ userInfo, score, isActive, highScore, setHighScore }) {
    //initialize highScore

    async function initHighScores() {}

    //retrieve highScore form firebase
    useEffect(() => {
        async function getScores() {
            if (userInfo.uid) {
                const docRef = doc(db, 'users', userInfo.uid);
                const docSnap = await getDoc(docRef);
                const userData = docSnap.data();
                setHighScore(userData['highScore']);
            }
        }

        getScores();
    }, [userInfo.uid, userInfo, setHighScore]);

    return (
        <div>
            {/* when the puzzle is not active */}
            {!isActive && (
                <div id="score-card">
                    <div id="top-ten"></div>
                    <span>Your High Score:{highScore}</span>
                    {score && <span>Your Score: {score}</span>}
                </div>
            )}
        </div>
    );
}

export default Scores;
