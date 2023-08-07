import { createUser } from '../lib/auth.js';

export const register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.className = 'container';

  // Splash screen
  const splashScreenDiv = document.createElement('div');
  splashScreenDiv.className = 'container__splash';
  homeDiv.append(splashScreenDiv);

  const planetDiv = document.createElement('div');
  planetDiv.setAttribute('className', 'container__splash-img');
  splashScreenDiv.append(planetDiv);

  const planetImg = document.createElement('img');
  planetImg.className = 'planet-img';
  planetImg.src = '../picture/planet.png';
  planetDiv.append(planetImg);

  const brandDiv = document.createElement('div');
  brandDiv.className = 'container__brand';
  splashScreenDiv.append(brandDiv);

  const brand = document.createElement('img');
  brand.className = 'brand';
  brand.src = '../picture/space-white.png';
  brandDiv.append(brand);

  const sloganDiv = document.createElement('div');
  sloganDiv.className = 'container__slogan';
  splashScreenDiv.append(sloganDiv);

  const slogan = document.createElement('p');
  slogan.className = 'slogan';
  slogan.textContent = 'Connecting the Universe,\n  One Explorer at a Time'
  sloganDiv.append(slogan);

  const btnStartDiv = document.createElement('div');
  btnStartDiv.className = 'container__btn-start';
  splashScreenDiv.append(btnStartDiv);

  const btnStart = document.createElement('p');
  btnStart.className = 'btn-start';
  btnStart.textContent = 'Start your adventure'
  btnStartDiv.append(btnStart);

  // Form

  const formDiv = document.createElement('div');
  formDiv.className = 'container__form';
  homeDiv.append(formDiv)

  const headerDiv = document.createElement('div');
  headerDiv.className = 'container__header';
  formDiv.appendChild(headerDiv);

  const iconDiv = document.createElement('div');
  iconDiv.className = 'container__icon';
  headerDiv.appendChild(iconDiv);

  const icon = document.createElement('img');
  icon.className = 'icon';
  icon.src = '../picture/icon.png';
  iconDiv.appendChild(icon);

  const titleDiv = document.createElement('div');
  titleDiv.textContent = 'Start your adventure here';
  titleDiv.className = 'container__title';
  headerDiv.appendChild(titleDiv);


  // Create form to register
  const form = document.createElement('form');
  form.className = 'form-register';
  formDiv.appendChild(form);

  // Username Input
  const inputUser = document.createElement('input');
  inputUser.className = 'input input-user';
  inputUser.type = 'text';
  inputUser.placeholder = 'Username';
  form.appendChild(inputUser);

  // Email Input
  const inputEmail = document.createElement('input');
  inputEmail.id = 'email';
  inputEmail.className = 'input input-email';
  inputEmail.placeholder = 'Email';
  form.appendChild(inputEmail);

  // Password Input
  const inputPassword = document.createElement('input');
  inputPassword.id = 'password';
  inputPassword.className = 'input input-password';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Password';
  form.appendChild(inputPassword);

  //Register button
  const buttonDataRegister = document.createElement('input');
  buttonDataRegister.className = 'button button-register';
  buttonDataRegister.type = 'submit';
  buttonDataRegister.value = 'Register';
  form.appendChild(buttonDataRegister);


  // Redirect to Log In
  const redirectSignInDiv = document.createElement('div');
  redirectSignInDiv.className = 'container__redirect container__redirect-login';
  form.appendChild(redirectSignInDiv);

  const descriptionTextLoginDiv = document.createElement('div');
  descriptionTextLoginDiv.className = 'container__description container__description-login--inside';
  redirectSignInDiv.appendChild(descriptionTextLoginDiv);

  const descriptionTextLogin = document.createElement('p');
  descriptionTextLogin.className = 'text-description text-description-login';
  descriptionTextLogin.textContent = 'Already have a Space account?';
  descriptionTextLoginDiv.append(descriptionTextLogin);

  const redirectTextSignIn = document.createElement('span');
  redirectTextSignIn.className = 'text-redirect text-redirect-login';
  redirectTextSignIn.textContent = 'Sign In';
  redirectSignInDiv.append(redirectTextSignIn);

  // Code to see failure text
  const failureText = document.createElement('p');
  failureText.className = 'failure-text failure-text-hidden';
  form.appendChild(failureText);


  // Action of button
  buttonDataRegister.addEventListener('click', (e) => {
    e.preventDefault();
  // Obtiene el valor del campo de entrada de texto del nombre de usuario
    const username = inputUser.value;
    const email = inputEmail.value;
    const password = inputPassword.value;

    failureText.textContent = '';
    failureText.classList.add('failure-text-hidden');

    const errorMessages = {
      emailAndPasswordEmpty:
        'Spaceship Error, we need your email and password!',
      passwordEmpty: 'Enter a cosmic password!',
      emailEmpty: 'Enter your email',
      invalidEmail: 'Wait! Invalid email!',
      shortPassword: 'Spaceship Error! Your password needs 6 characters!',
    };

    const validationErrors = [];

    if (email === '' && password === '') {
      validationErrors.push('emailAndPasswordEmpty');
    } else if (password === '') {
      validationErrors.push('passwordEmpty');
    } else if (email === '') {
      validationErrors.push('emailEmpty');
    } else if (!email.includes('@') || !email.includes('.')) {
      validationErrors.push('invalidEmail');
    } else if (password.length < 6) {
      validationErrors.push('shortPassword');
    }

    if (validationErrors.length > 0) {
      failureText.textContent = errorMessages[validationErrors[0]];
      failureText.classList.remove('failure-text-hidden');
    } else {
      createUser(email, password, username)
        .then(() => {
        console.log('User registered successfully');
        onNavigate('/feed');
      })
        .catch((error) => {
          console.error(error);

          if (error.code === 'auth/email-already-in-use') {
            failureText.textContent = 'Email already in use';
          } else if (error.code === 'auth/invalid-email') {
            failureText.textContent = 'Invalid email';
          }
          console.log(failureText.textContent)
          failureText.classList.remove('failure-text-hidden');
        });
      buttonDataRegister.disabled = true;
    }
  });

  // End errors validation

  redirectTextSignIn.addEventListener('click', () => onNavigate('/login'));

  return homeDiv;
};
