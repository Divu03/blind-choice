// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtN8Kg1eaLqw3gQmZkpiPIz-acWjLtlL4",
  authDomain: "blind-choice-d11c4.firebaseapp.com",
  projectId: "blind-choice-d11c4",
  storageBucket: "blind-choice-d11c4.firebasestorage.app",
  messagingSenderId: "563247117994",
  appId: "1:563247117994:web:7555b1061a1f48fd8a42d3",
  measurementId: "G-CDH1GQ5RZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);