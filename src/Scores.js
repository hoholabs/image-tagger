import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { v4 as uuid } from 'uuid';

function Scores({
    userInfo,
    score,
    isActive,
    highScore,
    setHighScore,
    puzzle
}) {
    const [highScoresArray, setHighScoresArray] = useState([]);
    const [highScoresList, setHighScoresList] = useState(<ul></ul>);

    //retrieve high scores for the puzzle
    useEffect(() => {
        const fetchHighScores = async () => {
            const docRef = doc(db, 'puzzles', puzzle.name);
            const docSnap = await getDoc(docRef);
            const highScores = docSnap.data().highScores;

            setHighScoresArray(highScores);
        };

        fetchHighScores();
    }, [puzzle.name]);

    //retrieve user's highScore form firebase
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

    //turn high scores array into a list
    useEffect(() => {
        function getHighScoresList() {
            const listItems = highScoresArray.map((scoreObj) => (
                <li key={uuid()}>
                    <span>{scoreObj.name}</span> :<span>{scoreObj.score}</span>
                </li>
            ));

            return <ul>{listItems}</ul>;
        }

        setHighScoresList(getHighScoresList());
    }, [highScoresArray]);

    return (
        <div>
            {/* when the puzzle is not active */}
            {!isActive && (
                <div id="score-card">
                    <span>Your High Score:{highScore}</span>
                    {score && <span>Your Score: {score}</span>}
                    {highScoresList}
                </div>
            )}
        </div>
    );
}

export default Scores;
