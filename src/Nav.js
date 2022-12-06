import React, { useState, useEffect } from 'react';
import Auth from './Auth';

function Nav(props) {
    const [displayTime, setDisplayTime] = useState(props.time);

    useEffect(() => {
        let editedTime = props.time.toFixed(1);
        let stringTime = editedTime.toString();

        if (editedTime < 10) {
            stringTime = '00' + stringTime;
        } else if (editedTime < 100) {
            stringTime = '0' + stringTime;
        }
        setDisplayTime(stringTime);
    }, [props.time]);

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
                {<div id="clock">{displayTime}</div>}
                {!props.isActive && (
                    <button onClick={props.startPuzzle}>GO</button>
                )}
                {props.isActive && <div id="blank-timer-div"></div>}
            </div>
            {/* <div id="highscore">highscore</div> */}
            <Auth setUserInfo={props.setUserInfo} userInfo={props.userInfo} />
        </nav>
    );
}

export default Nav;
