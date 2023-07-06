// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUCgNWPRcNJN-VT3np_vAdZd7VEaNMwcc",
  authDomain: "social-borrador-5d39c.firebaseapp.com",
  projectId: "social-borrador-5d39c",
  storageBucket: "social-borrador-5d39c.appspot.com",
  messagingSenderId: "630047055563",
  appId: "1:630047055563:web:5fc61c529fd7533cea054e",
  measurementId: "G-K8PCLTY7B2"
};

// Initialize Firebase
/*export const provider = new GoogleAuthProvider();*/
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


export const savePost = (description) => {
  console.log(description);
}