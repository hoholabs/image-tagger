import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
    onAuthStateChanged,
    signOut
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
    const [user, setUser] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

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
                setUser(userCredential.user);
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
            });
    };

    const handleSignIn = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(
            auth,
            inputValues.email,
            inputValues.password
        )
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user);
                setSignIn(true);
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(uid);
                setLoggedIn(true);
                // ...
            } else {
                // User is signed out
                setLoggedIn(false);
                // ...
            }
        });
    }, [user]);
    return (
        <div>
            <button
                onClick={() => {
                    signInWithRedirect(auth, provider);
                }}
            >
                googz
            </button>
            {!loggedIn && !signUp && !signIn && (
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
            {loggedIn && <button onClick={handleSignOut}>Sign Out</button>}
        </div>
    );
}

export default Auth;
