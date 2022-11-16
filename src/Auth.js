import React, { useState } from 'react';
import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect
} from 'firebase/auth';

function Auth(props) {
    const provider = new GoogleAuthProvider();

    const defaultValues = {
        email: '',
        password: ''
    };
    const [inputValues, setInputValues] = useState(defaultValues);
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);

    const handleChange = (event) => {
        console.log(inputValues);
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(
            auth,
            inputValues.email,
            inputValues.password
        )
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        console.log(auth);
        signInWithEmailAndPassword(
            auth,
            inputValues.email,
            inputValues.password
        )
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(auth);
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    return (
        <div>
            <button
                onClick={() => {
                    signInWithRedirect(auth, provider);
                }}
            >
                googz
            </button>
            {!signIn && !signUp && (
                <div>
                    <button
                        onClick={() => {
                            setSignIn(true);
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => {
                            setSignUp(true);
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            )}
            {/* Can probbaly shorten this later
            Should be able to do signUp and signIn as the same form? */}
            {signUp && (
                <form name="signUp" onSubmit={handleSignUp}>
                    <input
                        value={inputValues.email}
                        onChange={handleChange}
                        name="email"
                        type="text"
                        placeholder="email"
                    ></input>
                    <input
                        value={inputValues.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="password"
                    ></input>
                    <input type="submit" name="signUp" value="Sign up"></input>
                </form>
            )}
            {signIn && (
                <form name="signIn" onSubmit={handleSignIn}>
                    <input
                        value={inputValues.email}
                        onChange={handleChange}
                        name="email"
                        type="text"
                        placeholder="email"
                    ></input>
                    <input
                        value={inputValues.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="password"
                    ></input>
                    <input type="submit" name="signIn" value="Sign In"></input>
                </form>
            )}
        </div>
    );
}

export default Auth;
