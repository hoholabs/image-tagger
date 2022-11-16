// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBw1dOZfjN3IbK1LROXZJAz_in0-YXol8E',
    authDomain: 'image-tagger-e56eb.firebaseapp.com',
    projectId: 'image-tagger-e56eb',
    storageBucket: 'image-tagger-e56eb.appspot.com',
    messagingSenderId: '878003677038',
    appId: '1:878003677038:web:72e7c1f3af8c29c6c4837f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);
export { db, auth };
