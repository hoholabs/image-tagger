import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function Scores({ userInfo, puzzle }) {
    const [highScore, setHighScore] = useState('--');

    useEffect(() => {
        async function getScores() {
            console.log(userInfo.uid);
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

    return (
        <div>
            <span>Your High Score:{highScore}</span>
        </div>
    );
}

export default Scores;
