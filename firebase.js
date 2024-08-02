// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3W-sNTsQ8eCYABYX1ITfwxe99FNrDBlo",
  authDomain: "pantry-tracker-8d9ad.firebaseapp.com",
  projectId: "pantry-tracker-8d9ad",
  storageBucket: "pantry-tracker-8d9ad.appspot.com",
  messagingSenderId: "1017491406031",
  appId: "1:1017491406031:web:548faaecc7979985f84bba",
  measurementId: "G-KYM89BXGEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export {firestore, storage};