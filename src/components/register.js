import { createUser } from '../lib/auth.js';

export const register = (onNavigate) => {
    const homeDiv = document.createElement("div");
    homeDiv.className = "container";
  
    const headerDiv = document.createElement("div");
    headerDiv.className = "container__header";
    homeDiv.appendChild(headerDiv);
  
    const iconDiv = document.createElement("div");
    iconDiv.className = "container__icon";
    headerDiv.appendChild(iconDiv);
  
    const icon = document.createElement("img");
    icon.className = "icon";
    icon.src = "../Images/icon.png";
    iconDiv.appendChild(icon);
  
    const titleDiv = document.createElement("div");
    titleDiv.textContent = "Start your adventure here";
    titleDiv.className = "container__title";
    headerDiv.appendChild(titleDiv);
  
    const buttonHome = document.createElement("button");
    buttonHome.className = "button button-home";
    buttonHome.textContent = "Home";
  
    const form = document.createElement("form");
    form.className = "form-register";
  
    // Username Input
    const inputUser = document.createElement("input");
    inputUser.className = "input input-user";
    inputUser.type = "text";
    inputUser.placeholder = "Username";
    form.appendChild(inputUser);
  
    // Email Input
    const inputEmail = document.createElement("input");
    inputEmail.className = "input input-email";
    inputEmail.placeholder = "Email";
    form.appendChild(inputEmail);
  
   // Password Input
    const inputPassword = document.createElement("input");
    inputPassword.className = "input input-password";
    inputPassword.type = "password";
    inputPassword.placeholder = "Password";
    form.appendChild(inputPassword);
  
    const buttonDataRegister = document.createElement("input");
    buttonDataRegister.className = "button button-register";
    buttonDataRegister.type = "submit";
    buttonDataRegister.value = "Register";
    form.appendChild(buttonDataRegister);
    homeDiv.appendChild(form);
  
    // CODE TO SEE FAILURE TEXT:
    const failureText = document.createElement("p");
    failureText.className = "failure-text failure-text-hidden";
    failureText.classList.add("custom-failure-text");
    form.appendChild(failureText);
   
  
    buttonDataRegister.addEventListener("click", (e) => {
      e.preventDefault();
      const registerUserName = inputUser.value;
      const registerEmail = inputEmail.value;
      const registerPassword = inputPassword.value;
  
      const email = inputEmail.value;
      const password = inputPassword.value;
  
      failureText.textContent = "";
      failureText.classList.add("failure-text-hidden");
  
      const errorMessages = {
        emailAndPasswordEmpty: "Spaceship Error, we need your email and password!",
        passwordEmpty: "Enter a cosmic password!",
        emailEmpty: "Enter your email",
        invalidEmail: "Wait! Invalid email!",
        shortPassword: "Spaceship Error! Your password needs 6 characters!",
      };
  
      const validationErrors = [];
  
      if (email === "" && password === "") {
        validationErrors.push("emailAndPasswordEmpty");
      } else if (password === "") {
        validationErrors.push("passwordEmpty");
      } else if (email === "") {
        validationErrors.push("emailEmpty");
      } else if (email.length === 0 || !email.includes("@") || !email.includes(".")) {
        validationErrors.push("invalidEmail");
      } else if (password.length < 6) {
        validationErrors.push("shortPassword");
      }
  
      if (validationErrors.length > 0) {
        failureText.textContent = errorMessages[validationErrors[0]];
        failureText.classList.remove("failure-text-hidden");
      } else {
        // If no errors proceed with register
        createUser(registerEmail, registerPassword);
      }
    });
    // End errors validation
  
    buttonHome.addEventListener("click", () => onNavigate("/"));
    form.appendChild(buttonHome);
  
    return homeDiv;
  };
