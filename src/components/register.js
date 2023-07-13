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
  planetImg.src = '../Images/planet.png';
  planetDiv.append(planetImg);

  const brandDiv = document.createElement('div');
  brandDiv.className = 'container__brand';
  splashScreenDiv.append(brandDiv);

  const brand = document.createElement('img');
  brand.className = 'brand';
  brand.src = '../Images/space-white.png';
  brandDiv.append(brand);

  const sloganDiv = document.createElement('div');
  sloganDiv.className = 'container__slogan';
  splashScreenDiv.append(sloganDiv);

  const slogan = document.createElement('p');
  slogan.className = 'slogan';
  slogan.textContent = 'Connecting the Universe, One Explorer at a Time'
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
  icon.src = '../Images/icon.png';
  iconDiv.appendChild(icon);

  const titleDiv = document.createElement('div');
  titleDiv.textContent = 'Start your adventure here';
  titleDiv.className = 'container__title';
  headerDiv.appendChild(titleDiv);

  const buttonHome = document.createElement('button');
  buttonHome.className = 'button button-home';
  buttonHome.textContent = 'Home';

  // Create form to register
  const form = document.createElement('form');
  form.className = 'form-register';

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
  formDiv.appendChild(form);

  // CODE TO SEE FAILURE TEXT:
  const failureText = document.createElement('p');
  failureText.className = 'failure-text failure-text-hidden';
  form.appendChild(failureText);

  buttonDataRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const registerEmail = inputEmail.value;
    const registerPassword = inputPassword.value;

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
      // If no errors proceed with register
      // {OH} Example of promises Firebase below:
      // createUser(registerEmail, registerPassword)
      // .then((response) => {console.log(response)}).catch((error) => {console.error(error)});
      createUser(registerEmail, registerPassword)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          if (error.code === 'auth/email-already-in-use') {
            failureText.textContent = 'Email already in use';
          } else if (error.code === 'auth/invalid-email') {
            failureText.textContent = 'Invalid email';
          } else {
            failureText.textContent = 'Email already in use';
          }
          failureText.classList.remove('failure-text-hidden');
        });
    }
  });

  // End errors validation

  buttonHome.addEventListener('click', () => onNavigate('/'));
  form.appendChild(buttonHome);

  return homeDiv;
};
