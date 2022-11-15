import React from 'react';

function Nav(props) {
    return (
        <nav>
            <div id="key">
                <span>FIND THESE</span>
                <div className="legendPicDiv">
                    <img src={props.puzzle.legendA} alt="hint A"></img>
                    {props.legend[0] && (
                        <img
                            className="checkmark"
                            alt="checkmark"
                            src="images/checkmark.png"
                        ></img>
                    )}
                </div>
                <div className="legendPicDiv">
                    <img src={props.puzzle.legendB} alt="hint B"></img>
                    {props.legend[1] && (
                        <img
                            className="checkmark"
                            alt="checkmark"
                            src="images/checkmark.png"
                        ></img>
                    )}
                </div>
                <div className="legendPicDiv">
                    <img src={props.puzzle.legendC} alt="hint C"></img>
                    {props.legend[2] && (
                        <img
                            className="checkmark"
                            alt="checkmark"
                            src="images/checkmark.png"
                        ></img>
                    )}
                </div>
            </div>
            <div id="timer">
                {props.isActive && <span>{props.time}</span>}
                {!props.isActive && (
                    <button onClick={props.startPuzzle}>START</button>
                )}
            </div>
            <div id="highscore">highscore</div>
        </nav>
    );
}

export default Nav;
