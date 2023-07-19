import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, provider } from './firebase';



export const createUser = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

export const signInUser = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => 
  signInWithRedirect(auth, provider); // Return the result of the function execution

export const stateChanged = () =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
