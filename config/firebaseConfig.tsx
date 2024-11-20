// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUIrZ-mXzh2uXaUL6UbPEx_0gZZcLtBRU",
  authDomain: "athur-bdee2.firebaseapp.com",
  projectId: "athur-bdee2",
  storageBucket: "athur-bdee2.firebasestorage.app",
  messagingSenderId: "366284766002",
  appId: "1:366284766002:web:c170912e33872725da752b",
  measurementId: "G-QP7T7CPP2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {auth,db,storage}