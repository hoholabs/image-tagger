import React from 'react';

function Puzzle(props) {
    return (
        <div id="puzzle">
            <img src={props.puzzle.img} alt="hidden object puzzle"></img>
        </div>
    );
}

export default Puzzle;
