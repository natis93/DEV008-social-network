<<<<<<< HEAD
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';
import { auth, provider } from './firebase';



export const createUser = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

export const signInUser = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => 
  signInWithRedirect(auth, provider); // Return the result of the function execution
=======
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}
export const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}
export const signInGoogle  = () => {
  return signInWithPopup(auth, provider); // retorna el resultado de la ejecución de una función
}


// getInfo
// export const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;

//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
>>>>>>> feature-natalia


