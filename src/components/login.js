export const login = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.className = 'container';
  homeDiv.textContent = 'Welcome back to the orbit!';

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Go back';

  const inputMailL = document.createElement('input');
  const inputPassL = document.createElement('input');

  const buttonLoginL = document.createElement('button');
  buttonLoginL.textContent = 'Login';

  const buttonLoginG = document.createElement('button');
  buttonLoginG.textContent = 'Login with google';

  homeDiv.appendChild(inputMailL);
  homeDiv.appendChild(inputPassL);
  homeDiv.appendChild(buttonLoginL);
  homeDiv.appendChild(buttonLoginG);
  buttonHome.addEventListener('click', () => onNavigate('/'));

  homeDiv.appendChild(buttonHome);
  return homeDiv;
};
