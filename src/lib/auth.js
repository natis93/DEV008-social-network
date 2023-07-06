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
  const registerUserName = registerForm.querySelector(".input-user").value;
  const registerEmail = registerForm.querySelector(".input-email").value;
  const registerPassword = registerForm.querySelector(".input-password").value;
  console.log(registerUserName, registerEmail, registerPassword);
});
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
      // Aquí manejas los errores que puedan ocurrir durante el registro
      if (error.code === 'auth/invalid-email') {
        alert('invalid email')
      }


    });
};