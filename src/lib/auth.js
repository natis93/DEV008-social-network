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
      console.log(error.message)
      console.log(error.code)

      // Aquí manejas los errores que puedan ocurrir durante el registro
      if (error.code === 'auth/invalid-email') {
        alert('invalid email')
      }


    });
}

export const Register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'Start your adventure here';
  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Home';
  const form = document.createElement('form');
  form.className = 'form-register';
  const inputUser = document.createElement('input');
  inputUser.className = 'input-user';
  inputUser.type = 'text';
  inputUser.placeholder = 'Username';
  form.appendChild(inputUser);
  const inputEmail = document.createElement('input');
  inputEmail.className = 'input-email';
  inputEmail.placeholder = 'Email';
  form.appendChild(inputEmail);
  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-password';
  inputPassword.placeholder = 'Password';
  form.appendChild(inputPassword);
  const buttonDataRegister = document.createElement('button');
  buttonDataRegister.className = 'button-data-register';
  buttonDataRegister.textContent = 'Register';
  form.appendChild(buttonDataRegister);
  homeDiv.appendChild(form);
  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);
  return homeDiv;
}; (editado) 
