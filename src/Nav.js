import React from 'react';

function Nav(props) {
    return (
        <nav>
            <div id="key">
                <img src={props.puzzle.mapA} alt="hint A"></img>
                <img src={props.puzzle.mapB} alt="hint B"></img>
                <img src={props.puzzle.mapC} alt="hint C"></img>
            </div>
            <div id="timer">Timer</div>
            <div id="highschore">highschore</div>
        </nav>
    );
}

export default Nav;
