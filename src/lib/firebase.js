// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
/*export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();*/
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
/* const provider = new GoogleAuthProvider();
 */
export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signInGoogle() {
  return signInWithPopup(auth, provider); // retorna el resultado de la ejecución de una función
}

export const savePost = (description) => {
 console.log(description);
}