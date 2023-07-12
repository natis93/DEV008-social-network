import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';


// signUp
export const createUser = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

// logOn
export const loginUser = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
}
  
  // export const createUser = (email, password) =>
  //   createUserWithEmailAndPassword(auth, email, password);
  // export const signInUser = (email, password) =>
  //   signInWithEmailAndPassword(auth, email, password);
  //   // retorna el resultado de la ejecución de una función
  // export const signInGoogle = () => signInWithPopup(auth, provider);