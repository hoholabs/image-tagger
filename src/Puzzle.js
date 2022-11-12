import React from 'react';

function Puzzle(props) {
    const sendCoords = (event) => {
        let coordsArray = [
            props.puzzle.coordsA,
            props.puzzle.coordsB,
            props.puzzle.coordsC
        ];
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
                console.log('in');
                props.changeLegend(index);
            }
        }
    };

    return (
        <div id="puzzle">
            {props.isActive && (
                <img
                    onClick={sendCoords}
                    src={props.puzzle.img}
                    alt="hidden object puzzle"
                ></img>
            )}
        </div>
    );
}

export default Puzzle;
