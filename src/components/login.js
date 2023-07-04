

export const Login = (onNavigate) => { // Define una función llamada "login" que recibe un parámetro "onNavigate"
    const homeDiv = document.createElement('div');// Crear un div principal
    homeDiv.textContent = 'Welcome back to the orbit!';// Establecer el texto del div principal

    const buttonHome = document.createElement('button');// Crear un botón para ir atrás
    buttonHome.textContent = 'Go back';

const inputMailL= document.createElement('input');// Crear inputs para el correo electrónico y la contraseña
const inputPassL= document.createElement('input');

const buttonLoginL= document.createElement('button'); // Crear un botón para iniciar sesión
buttonLoginL.textContent= 'Login';

const buttonLoginG= document.createElement('button');// Crear un botón para iniciar sesión con Google
buttonLoginG.textContent= 'Login with google';
 // Agregar los inputs y los botones al div principal
homeDiv.appendChild(inputMailL);
homeDiv.appendChild(inputPassL);
homeDiv.appendChild(buttonLoginL);
homeDiv.appendChild(buttonLoginG);


 // Agregar un evento al botón de ir atrás para llamar a la función "onNavigate" cuando se haga clic
    buttonHome.addEventListener('click', () => onNavigate('/'));
    homeDiv.appendChild(buttonHome);
    // Retornar el div principal
    return homeDiv;
  };