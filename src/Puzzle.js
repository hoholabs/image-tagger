import React from 'react';

function Puzzle(props) {
    console.log(props);
    return (
        <div id="puzzle">
            {props.isActive && (
                <img src={props.puzzle.img} alt="hidden object puzzle"></img>
            )}
        </div>
    );
}

export default Puzzle;
