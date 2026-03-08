// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB40850BzeDcH4oo_Zsm8ankBywJEKj7k",
  authDomain: "user-email-password-auth-2b925.firebaseapp.com",
  projectId: "user-email-password-auth-2b925",
  storageBucket: "user-email-password-auth-2b925.firebasestorage.app",
  messagingSenderId: "608621319724",
  appId: "1:608621319724:web:8aa54255c1d3f9c9eb2389",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
