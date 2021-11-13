// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, Auth } from "firebase/auth";
import React from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlqB_0nI-CGH1UI23XeveLabHwiMDXX5c",
  authDomain: "dorogadobra-85fd2.firebaseapp.com",
  projectId: "dorogadobra-85fd2",
  storageBucket: "dorogadobra-85fd2.appspot.com",
  messagingSenderId: "888417216434",
  appId: "1:888417216434:web:57d27244768edbeea6e6ab",
  measurementId: "G-5XSCSWLNVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
// export const database = getDatabase();

export const AuthContext = React.createContext({
    auth, provider
});