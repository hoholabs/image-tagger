import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function Puzzle(props) {
    async function checkCoords(event) {
        const docRef = doc(db, 'puzzles', props.puzzle.name);
        const docSnap = await getDoc(docRef);
        const info = docSnap.data();

        let coordsArray = [info.coordsA, info.coordsB, info.coordsC];
        let clickCoords = [
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
        ];

        for (let index = 0; index < coordsArray.length; index++) {
            const coordSet = coordsArray[index];
            if (
                coordSet[0] < clickCoords[0] &&
                clickCoords[0] < coordSet[1] &&
                coordSet[2] < clickCoords[1] &&
                clickCoords[1] < coordSet[3]
            ) {
                props.changeLegend(index);
            }
        }
    }

    return (
        <div id="puzzle">
            <img
                onClick={checkCoords}
                src={props.puzzle.img}
                alt="hidden object puzzle"
            ></img>
        </div>
    );
}

export default Puzzle;
