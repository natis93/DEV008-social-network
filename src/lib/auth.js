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


  //signUp
export const addUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(userCredential)
      // Aquí puedes realizar acciones adicionales después de que el usuario se haya registrado exitosamente
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      // Aquí manejas los errores que puedan ocurrir durante el registro
    });
};
