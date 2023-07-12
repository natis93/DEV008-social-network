import { createUser } from '../lib/auth';
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

  const brand = document.createElement('h3');
  brand.className = 'brand';
  brand.textContent = 'SPACE'
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

  const form = document.createElement('form');
  form.className = 'form-register';

  // Username Input
  const usernamelDiv = document.createElement('div');
  usernamelDiv.className = 'container-input container-input__username';
  form.appendChild(usernamelDiv);

  const inputUser = document.createElement('input');
  inputUser.className = 'input input-user';
  inputUser.type = 'text';
  inputUser.placeholder = 'Username';
  usernamelDiv.appendChild(inputUser);

  // Email Input
  const emailDiv = document.createElement('div');
  emailDiv.className = 'container-input container-input__email';
  form.appendChild(emailDiv);

  const inputEmail = document.createElement('input');
  inputEmail.className = 'input input-email';
  inputEmail.placeholder = 'Email';
  emailDiv.appendChild(inputEmail);

  // Password Input
  const passwordDiv = document.createElement('div');
  passwordDiv.className = 'container-input container-input__password';
  form.appendChild(passwordDiv);

  const inputPassword = document.createElement('input');
  inputPassword.className = 'input input-password';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Password';
  passwordDiv.appendChild(inputPassword);

  // Button form
  const buttonDataRegister = document.createElement('input');
  buttonDataRegister.className = 'button button-register';
  buttonDataRegister.type = 'submit';
  buttonDataRegister.value = 'Register';
  form.appendChild(buttonDataRegister);
  formDiv.appendChild(form);

  // Code to see failure text:
  const failureTextUsername = document.createElement('p');
  failureTextUsername.className = 'failure-text failure-text-hidden';
  usernamelDiv.append(failureTextUsername);

  const failureTextEmail = document.createElement('p');
  failureTextEmail.className = 'failure-text failure-text-hidden';
  emailDiv.append(failureTextEmail);

  const failureTextPassword = document.createElement('p');
  failureTextPassword.className = 'failure-text failure-text-hidden';
  passwordDiv.append(failureTextPassword);


  // Code to see snackbar
  // const snackbarDiv = createElement('div');
  // snackbarDiv.className = 'snackbar';
  // const snackbarText = createElement('p');
  // snackbarText.className = 'snackbar-text';
  // snackbarDiv.appendChild(snackbarText);
  // form.appendChild(snackbarDiv);

  buttonDataRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const username = inputUser.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    const arrayInput = Array(username, email, password);

    failureTextUsername.textContent = '';
    failureTextEmail.textContent = '';
    failureTextPassword.textContent = '';

    const errorMessages = {
      usernameEmpty: 'Username cannot be blank',
      passwordEmpty: 'Password cannot be blank',
      emailEmpty: 'Email cannot be blank',
      invalidEmail: 'Wait! Invalid email!',
      shortPassword: 'Spaceship Error! Your password needs minimum 6 characters!',
    };

    // All cases empty
  const validarCamposVacios = (valueEntered) => {
    arrayInput.forEach()
    // switch('') {
    //   case username :
    //     failureTextUsername.textContent = errorMessages['usernameEmpty'];
    //   case email : 
    //     failureTextEmail.textContent = errorMessages['emailEmpty'];
    //   case password :
    //     failureTextPassword.textContent = errorMessages['passwordEmpty'];
    // }
  } 

  const validarErrores = () => {
    if (!email.includes('@') || !email.includes('.')) {
      failureTextEmail.textContent = errorMessages['invalidEmail'];
    };
  
    if (password.length < 6) {
      failureTextPassword.textContent = errorMessages['shortPassword'];
    };
  }
  
// If not complied with 
    if (failureTextUsername.textContent !== '') {
      failureTextUsername.classList.remove('failure-text-hidden');
    } else if(failureTextEmail.textContent !== '') {
      failureTextEmail.classList.remove('failure-text-hidden');
    } else if(failureTextPassword.textContent !== '') {
      failureTextPassword.classList.remove('failure-text-hidden');
    } else {
      // If no errors proceed with register
      createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Aquí puedes realizar acciones adicionales después de que el usuario se haya registrado exitosamente
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // Aquí manejas los errores que puedan ocurrir durante el registro
      });
      buttonDataRegister.disabled = true;
    }

  });
  // End errors validation
  buttonHome.addEventListener('click', () => onNavigate('/'));
  form.appendChild(buttonHome);

  return homeDiv;
};

  
      //function validationForm =
      //const validationErrors = [];
  
      // if (email === "" && password === "" && username === '') {
      //   validationErrors.push("emailAndPasswordEmptyAndUsername");
      // } else if (username === '') {
      //   validationErrors.push('usernameEmpty');
      // } else if (password === "") {
      //   validationErrors.push("passwordEmpty");
      // } else if (email === "") {
      //   validationErrors.push("emailEmpty");
      // } else if ( email.length === 0 || !email.includes("@") || !email.includes(".")) {
      //   validationErrors.push("invalidEmail");
      // } else if (password.length < 6) {
      //   validationErrors.push("shortPassword");
      // }
  
      // if (validationErrors.length > 0) {
      //   failureText.textContent = errorMessages[validationErrors[0]];
      //   failureText.classList.remove("failure-text-hidden");
      //   console.log(validationErrors)
      // } else {
      //   // If no errors proceed with register
      //   addUser(email, password);
      // }