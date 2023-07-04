export const register = (onNavigate) => {
    const homeDiv = document.createElement('div');
    homeDiv.textContent = 'Start your adventure here';
    const buttonHome = document.createElement('button');
    buttonHome.textContent = 'Home';
    const inputUser = document.createElement('input');
    const inputEmail = document.createElement('input');
    const inputPassword = document.createElement('input');
    const buttonDataRegister = document.createElement('button');
    buttonDataRegister.textContent = 'Create account';

    homeDiv.appendChild(inputUser);
    homeDiv.appendChild(inputEmail);
    homeDiv.appendChild(inputPassword);
    homeDiv.appendChild(buttonDataRegister);

    buttonHome.addEventListener('click', () => onNavigate('/'));
    homeDiv.appendChild(buttonHome);
    return homeDiv;
};