import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

//signUp
const registerForm = homeDiv.querySelector(".form-register");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();


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
      // Aquí puedes realizar acciones adicionales después de que el usuario se haya registrado exitosamente
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Aquí manejas los errores que puedan ocurrir durante el registro
    });
};
