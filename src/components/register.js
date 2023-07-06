import { createUser } from '../lib/firebase';
export const register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  const icon = document.createElement('img');

  icon.className = 'icon';
  homeDiv.appendChild(icon);
  icon.src = '../Images/icon.png';

  const titleDiv = document.createElement('div');
  titleDiv.textContent = 'Start your adventure here';
  titleDiv.className = 'div-title';
  homeDiv.appendChild(titleDiv);

  const buttonHome = document.createElement('button');
  buttonHome.className = 'button button-home';
  buttonHome.textContent = 'Home';

  const form = document.createElement('form');
  form.className = 'form-register';
  const inputUser = document.createElement('input');
  inputUser.className = 'input input-user';
  inputUser.type = 'text';
  inputUser.placeholder = 'Username';
  form.appendChild(inputUser);
  const inputEmail = document.createElement('input');
  inputEmail.className = 'input input-email';
  inputEmail.placeholder = 'Email';
  form.appendChild(inputEmail);
  const inputPassword = document.createElement('input');
  inputPassword.className = 'input input-password';
  inputPassword.placeholder = 'Password';
  form.appendChild(inputPassword);
  const buttonDataRegister = document.createElement('button');
  buttonDataRegister.className = 'button button-register';
  buttonDataRegister.textContent = 'Register';
  buttonDataRegister.type = 'submit';
  form.appendChild(buttonDataRegister);
  homeDiv.appendChild(form);
  buttonDataRegister.addEventListener('click', (e) => {
    e.preventDefault();

    const registerEmail = inputEmail.value;
    const registerPassword = inputPassword.value;
    createUser(registerEmail, registerPassword)
      .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;
        console.log(user);
        onNavigate('/timeline');
      })
      .catch((error) => {
        // Mostrar mensaje de error
        errorText.textContent = error.message;
        errorText.classList.remove('error-text-hidden');
      });
  });
  buttonHome.addEventListener('click', () => onNavigate('/'));
  form.appendChild(buttonHome);

  const divError = document.createElement('div');
  divError.className = 'div-error';
  form.appendChild(divError);

  const errorText = document.createElement('p');
  errorText.classList.add('error-text-register', 'error-text-hidden');
  divError.appendChild(errorText);

  return homeDiv;
};