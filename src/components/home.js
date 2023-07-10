export const home = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.className = 'container';

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'div-button';
  homeDiv.appendChild(buttonDiv);

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Register';
  buttonRegister.className = 'button button-register';

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Login';
  buttonLogin.className = 'button button-login';
  buttonRegister.addEventListener('click', () => onNavigate('/register'));
  buttonLogin.addEventListener('click', () => onNavigate('/login'));
  buttonDiv.appendChild(buttonRegister);
  buttonDiv.appendChild(buttonLogin);
  return homeDiv;
};
