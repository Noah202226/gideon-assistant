// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoIiAWAGpZf0YK6omoslKLauZR1E7faD8",
  authDomain: "gideon-assistant.firebaseapp.com",
  projectId: "gideon-assistant",
  storageBucket: "gideon-assistant.appspot.com",
  messagingSenderId: "920666652128",
  appId: "1:920666652128:web:8568166b2a7320a4bcff85",
  measurementId: "G-SW520KX8J0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
