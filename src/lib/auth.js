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


