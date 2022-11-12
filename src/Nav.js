import React, { useState, useEffect } from 'react';

function Nav(props) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;
        if (props.isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else if (!props.isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [props.isActive, time]);

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
                {props.isActive && <span>{time}</span>}
                {!props.isActive && (
                    <button onClick={props.startPuzzle}>START</button>
                )}
            </div>
            <div id="highscore">highscore</div>
        </nav>
    );
}

export default Nav;
