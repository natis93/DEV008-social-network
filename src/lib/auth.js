import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth, provider } from './firebase';



export const createUser = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

export const signInUser = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

// export const signInGoogle = () => 
//   signInWithRedirect(auth, provider); 

  export const signInGoogle = () => 
  signInWithPopup(auth, provider); 

export const signOutSession = (onNavigate, pathName) => 
signOut(auth)
.then(() => {
  // Sign-out successful.
  onNavigate(`/${pathName}`);
  console.log('sign out')
}).catch((error) => {
// An error happened.
});

  export const stateChanged =  
    onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('auth: signed in')
      return user
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      //const uid = user.uid;
      // ...
    } else {
      console.log('auth: signed out')
      // User is signed out
      // ...
    }
  });
