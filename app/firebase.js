// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACsXIcUoHy62y1KGIdc36Fp_Gj-IqzGag",
  authDomain: "desserts-decoded.firebaseapp.com",
  projectId: "desserts-decoded",
  storageBucket: "desserts-decoded.appspot.com",
  messagingSenderId: "670606156410",
  appId: "1:670606156410:web:e43644654d7b5ac7bfd1c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { getAuth, onAuthStateChanged, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };