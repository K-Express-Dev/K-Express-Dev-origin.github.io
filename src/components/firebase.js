
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_ExaBGVmoCVghAoP57EUSOX15m1iIjyU",
  authDomain: "real-k-express.firebaseapp.com",
  databaseURL: "https://real-k-express-default-rtdb.firebaseio.com",
  projectId: "real-k-express",
  storageBucket: "real-k-express.appspot.com",
  messagingSenderId: "197268968087",
  appId: "1:197268968087:web:493a1ee91c04f3487e4fd2",
  measurementId: "G-GZFPNRYHVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { auth, db };
