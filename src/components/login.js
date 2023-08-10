import { signInUser, signInGoogle } from '../lib/auth.js';
import pricipalPlanet from '../picture/planet.png';
import logoWhite from '../picture/space-white.png';
import iconMiniaturePlanet from '../picture/icon.png';
import googleIcon from '../picture/google.svg';

export const login = (onNavigate) => { 
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
  planetImg.src = pricipalPlanet;
  planetDiv.append(planetImg);

  const brandDiv = document.createElement('div');
  brandDiv.className = 'container__brand';
  splashScreenDiv.append(brandDiv);

  const brand = document.createElement('img');
  brand.className = 'brand';
  brand.src = logoWhite;
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
  btnStart.textContent = 'Start your adventure';
  btnStartDiv.append(btnStart);

  // Form
  const formDiv = document.createElement('div');
  formDiv.className = 'container__form';
  homeDiv.append(formDiv);

  const headerDiv = document.createElement('div');
  headerDiv.className = 'container__header';
  formDiv.appendChild(headerDiv);

  const iconDiv = document.createElement('div');
  iconDiv.className = 'container__icon';
  headerDiv.appendChild(iconDiv);

  const icon = document.createElement('img');
  icon.className = 'icon';
  icon.src = iconMiniaturePlanet;
  iconDiv.appendChild(icon);

  const titleDiv = document.createElement('div');
  titleDiv.textContent = 'Welcome back to the orbit!';
  titleDiv.className = 'container__title';
  headerDiv.appendChild(titleDiv);

  const signInDiv = document.createElement('div');
  signInDiv.textContent = 'Sign In';
  signInDiv.className = 'container__singin';
  headerDiv.appendChild(signInDiv);

  const buttonHome = document.createElement('button');
  buttonHome.className = 'button button-home';
  buttonHome.textContent = 'Home';

  // Create form to login
  const form = document.createElement('form');
  form.className = 'form-login';

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

  //Sign In button
  const buttonDataLogin = document.createElement('input');
  buttonDataLogin.className = 'button button-login';
  buttonDataLogin.type = 'submit';
  buttonDataLogin.value = 'Login';
  form.appendChild(buttonDataLogin);
  formDiv.appendChild(form);

  const optionalDiv = document.createElement('div');
  optionalDiv.className = 'container__optional';
  form.appendChild(optionalDiv);

  const lineOne = document.createElement('div');
  lineOne.className = 'line line-one';
  optionalDiv.appendChild(lineOne);

  const textOptional = document.createElement('div');
  textOptional.className = 'or';
  textOptional.textContent = 'or';
  optionalDiv.appendChild(textOptional);

  const lineTwo = document.createElement('div');
  lineTwo.className = 'line line-two';
  optionalDiv.appendChild(lineTwo);

  //sign in google
  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button button-google';
  form.appendChild(buttonGoogle);

  const textButtonGoogleDiv = document.createElement('div');
  textButtonGoogleDiv.className = 'container__text-google';
  buttonGoogle.append(textButtonGoogleDiv);

  const textButtonGoogle = document.createElement('p');
  textButtonGoogle.className = 'text-google';
  textButtonGoogle.textContent = 'Login with google';
  textButtonGoogleDiv.appendChild(textButtonGoogle);

  const iconGoogleDiv = document.createElement('div');
  iconGoogleDiv.className = 'container__icon-google';
  buttonGoogle.append(iconGoogleDiv);

  const iconGoogle = document.createElement('img');
  iconGoogle.className = 'icon-google';
  iconGoogle.src = googleIcon;
  iconGoogleDiv.appendChild(iconGoogle);

  // Redirect to Register
  const redirectSignUpDiv = document.createElement('div');
  redirectSignUpDiv.className = 'container__redirect container__redirect-register';
  form.appendChild(redirectSignUpDiv);

  const descriptionTextRegisterDiv = document.createElement('div');
  descriptionTextRegisterDiv.className = 'container__description container__description-register--inside';
  redirectSignUpDiv.appendChild(descriptionTextRegisterDiv);

  const descriptionTextRegister = document.createElement('p');
  descriptionTextRegister.className = 'text-description text-description-register';
  descriptionTextRegister.textContent = 'Don\'t have an account?';
  descriptionTextRegisterDiv.append(descriptionTextRegister);

  const redirectTextSignUp = document.createElement('span');
  redirectTextSignUp.className = 'text-redirect text-redirect-register';
  redirectTextSignUp.textContent = ' Create one here.';
  redirectSignUpDiv.append(redirectTextSignUp);

  // Code to see failure text
  const failureText = document.createElement('p');
  failureText.className = 'failure-text failure-text-hidden';
  form.appendChild(failureText);

  buttonDataLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    failureText.textContent = '';

    console.log(email, password);
    const errorMessages = {
      passwordEmpty: 'Enter a cosmic password!',
      emailEmpty: 'Enter your email',
      invalidEmail: 'Wait! Invalid email!',
    };

    const validationErrors = [];

    if (password === '') {
      validationErrors.push('passwordEmpty');
    } else if (email === '') {
      validationErrors.push('emailEmpty');
    } else if (!email.includes('@') || !email.includes('.')) {
      validationErrors.push('invalidEmail');
    }

    if (validationErrors.length > 0) {
      failureText.textContent = errorMessages[validationErrors[0]];
      failureText.classList.remove('failure-text-hidden');
    } else {
      signInUser(email, password)
        .then((response) => {
          const user = response.user;
          console.log(response);
          // buttonDataLogin.addEventListener('click', () => onNavigate('/feed'));
          onNavigate('/feed');
          // IdP data available using getAdditionalUserInfo(response)
          // ...
        })
        .catch((error) => {
          console.log(error);
          // Handle Errors here.
          if (error.code === 'auth/invalid-email') {
            failureText.textContent = 'Invalid email';
          } else if (error.code === 'auth/wrong-password') {
            failureText.textContent = 'Incorrect password';
          } else if (error.code === 'auth/user-not-found') {
            failureText.textContent = 'This user does not exist';
          }
          failureText.classList.remove('failure-text-hidden');
        });
    }
  });

  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();

    signInGoogle()
      .then((response) => {

        // The signed-in user info.
        const user = response.user;
        console.log(response);
        onNavigate('/feed');
        // IdP data available using getAdditionalUserInfo(response)
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
      });
  });
  redirectTextSignUp.addEventListener('click', () => onNavigate('/register'));

  return homeDiv; 
};