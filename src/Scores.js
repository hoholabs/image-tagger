import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function Scores(props) {
    const [highScore, setHighScore] = useState('--');

    useEffect(() => {
        async function getScores() {
            console.log(props.userInfo.uid);
            if (props.userInfo.uid) {
                // console.log(props.userInfo.uid);
                const docRef = doc(db, 'users', props.userInfo.uid);
                const docSnap = await getDoc(docRef);
                const userData = docSnap.data();
                const puzzleName = props.puzzle.name.toString();
                setHighScore(userData[puzzleName]);
            }
        }

        getScores();
    }, [props.puzzle.name, props.userInfo.uid]);

    return (
        <div>
            <span>Your High Score:{highScore}</span>
        </div>
    );
}

export default Scores;
