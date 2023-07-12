import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, provider } from './firebase';



export const createUser = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

export const signInUser = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => 
  signInWithPopup(auth, provider); // Return the result of the function execution



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


