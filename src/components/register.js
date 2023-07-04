import { createUser } from '../lib/firebase';

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

  buttonDataRegister.addEventListener('click', (e) => {
    e.preventDefault();
    
    const registerUserName = inputUser.value;
    const registerEmail = inputEmail.value;
    const registerPassword = inputPassword.value;
    createUser( registerEmail, registerPassword );
  });
  

  buttonHome.addEventListener('click', () => onNavigate('/'));
  homeDiv.appendChild(buttonHome);
  return homeDiv;
};
//comentario