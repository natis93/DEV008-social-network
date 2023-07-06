import { createUser, addUser } from "../lib/auth";

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

  const inputUser = document.createElement("input");
  inputUser.className = "input input-user";
  inputUser.type = "text";
  inputUser.placeholder = "Username";
  form.appendChild(inputUser);

  const inputEmail = document.createElement("input");
  inputEmail.className = "input input-email";
  inputEmail.placeholder = "Email";
  form.appendChild(inputEmail);

  const inputPassword = document.createElement("input");
  inputPassword.className = "input input-password";
  inputPassword.type = "password";
  inputPassword.placeholder = "Password";
  form.appendChild(inputPassword);

  const buttonDataRegister = document.createElement("input");
  buttonDataRegister.className = "button button-register";
  //buttonDataRegister.textContent = "Register";
  buttonDataRegister.type = "submit";
  buttonDataRegister.value = "Register"
  form.appendChild(buttonDataRegister);
  homeDiv.appendChild(form);

  buttonDataRegister.addEventListener("click", (e) => {
    e.preventDefault();
    const registerUserName = inputUser.value;
    const registerEmail = inputEmail.value;
    const registerPassword = inputPassword.value;
    createUser(registerEmail, registerPassword);
  });
  buttonHome.addEventListener("click", () => onNavigate("/"));
  form.appendChild(buttonHome);



  return homeDiv;
};