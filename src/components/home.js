export const home = (onNavigate) => {
    const homeDiv = document.createElement('div');
    const buttonRegister = document.createElement('button');
    const buttonLogin = document.createElement('button');

    buttonRegister.textContent = 'Register';
    buttonLogin.textContent = 'Login';
    buttonRegister.addEventListener('click', () => onNavigate('/register'));
    buttonLogin.addEventListener('click', () => onNavigate('/login'));
    homeDiv.appendChild(buttonRegister);
    homeDiv.appendChild(buttonLogin);
    return homeDiv;
};
