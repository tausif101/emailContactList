// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQ-_3y7Ls7BxHXSyfZlwSkhcSPbKaazuE",
    authDomain: "vite-contact-736a9.firebaseapp.com",
    projectId: "vite-contact-736a9",
    storageBucket: "vite-contact-736a9.appspot.com",
    messagingSenderId: "666421599445",
    appId: "1:666421599445:web:e63001870b246fa134d65c",
    measurementId: "G-2DQ8D96Q88"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

