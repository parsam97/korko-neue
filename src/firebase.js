import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9nfFCvsb2v-NvGHDibKHcylkJKY2HQFU",
    authDomain: "korko-backend.firebaseapp.com",
    projectId: "korko-backend",
    storageBucket: "korko-backend.appspot.com",
    messagingSenderId: "34348217060",
    appId: "1:34348217060:web:03b650cf9c8bcd603b72f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };