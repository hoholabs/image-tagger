import React from 'react';

function Puzzle(props) {
    const sendCoords = (event) => {
        console.log(event.nativeEvent.offsetX);
        console.log(event.nativeEvent.offsetY);
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
