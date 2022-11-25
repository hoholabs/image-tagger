import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    getAuth,
    signInWithRedirect,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

function Auth({ userInfo, setUserInfo }) {
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
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        const auth = getAuth();

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
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
                // ..
            });
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(
            auth,
            inputValues.email,
            inputValues.password
        )
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    const handleSignOut = () => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };

    async function createUser(uid) {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
            await setDoc(doc(db, 'users', uid), {});
        }
    }

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                //User is signed in

                const uid = user.uid;

                setLoggedIn(true);

                setUserInfo({
                    ...userInfo,
                    uid: uid
                });

                createUser(uid);
            } else {
                // User is signed out
                setLoggedIn(false);
                // ...
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUserInfo, user]);
    return (
        <div id="auth">
            {/* not logged in, signUp not activates signIn not activated */}
            {!loggedIn && !signUp && (
                <div id="signIn">
                    {' '}
                    <span>Sign In</span>
                    {/* Google sign in button */}
                    {!signIn && (
                        <button
                            id="googleSignIn"
                            type="button"
                            onClick={() => {
                                const provider = new GoogleAuthProvider();
                                const auth = getAuth();

                                signInWithRedirect(auth, provider);
                            }}
                        >
                            Google
                        </button>
                    )}
                    {/* Email sign in button */}
                    {!signIn && (
                        <button
                            id="emailSignIn"
                            onClick={() => {
                                setSignIn(true);
                            }}
                        >
                            Email
                        </button>
                    )}
                    {/* Email sign in form */}
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
                            <input
                                type="submit"
                                name="signIn"
                                value="Sign In"
                            ></input>
                        </form>
                    )}
                </div>
            )}

            <div id="signUp">
                {/* Email sign up button */}
                {!signUp && !signIn && !loggedIn && (
                    <button
                        id="emailSignUp"
                        onClick={() => {
                            setSignUp(true);
                        }}
                    >
                        Sign Up with Email
                    </button>
                )}
                {/*signUp with email form */}
                {signUp && (
                    <div>
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
                            <input
                                type="submit"
                                name="signUp"
                                value="Sign up"
                            ></input>
                        </form>
                    </div>
                )}
            </div>
            {/* loggedIn Activted */}
            {loggedIn && <button onClick={handleSignOut}>Sign Out</button>}
        </div>
    );
}

export default Auth;
