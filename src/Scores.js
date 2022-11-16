import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function Scores(props) {
    const [highScore, setHighScore] = useState('--');

    async function getScores() {
        const docRef = doc(db, 'users', 'hoho');
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        const puzzleName = props.puzzle.name.toString();
        // console.log(userData[puzzleName]);
        setHighScore(userData[puzzleName]);
    }

    useState(() => {
        getScores();
    });

    return (
        <div>
            <span>Your High Score:{highScore}</span>
        </div>
    );
}

export default Scores;
