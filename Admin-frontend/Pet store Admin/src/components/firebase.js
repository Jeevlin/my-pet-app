

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, limit } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyAHN2ja41kQASZ9Qq79PfbdC3zZ4Vg9fVU",
  
    authDomain: "petstore-d5a99.firebaseapp.com",
  
    projectId: "petstore-d5a99",
  
    storageBucket: "petstore-d5a99.appspot.com",
  
    messagingSenderId: "278201150955",
  
    appId: "1:278201150955:web:0cf713372526be25b9fdae",
  
    measurementId: "G-13HQZP9D68"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db=getFirestore(app);
export default app;