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
