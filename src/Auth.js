import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Auth(props) {
    const defaultValues = {
        email: '',
        password: ''
    };
    const [inputValues, setInputValues] = useState(defaultValues);

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
    return (
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
                <input type="submit" name="signUp" value="Sign up"></input>
            </form>
        </div>
    );
}

export default Auth;
