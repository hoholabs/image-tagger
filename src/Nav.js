import React from 'react';
import Auth from './Auth';

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
                {<span>{props.time.toFixed(1)}</span>}
                {!props.isActive && (
                    <button onClick={props.startPuzzle}>START</button>
                )}
            </div>
            <div id="highscore">highscore</div>
            <Auth />
        </nav>
    );
}

export default Nav;
