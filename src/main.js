import { Home } from './components/Home.js';
import { Register } from './components/Register.js'; 
import { Login } from './components/Login.js';

const rootDiv = document.getElementById('root');
const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
};

const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  
  rootDiv.appendChild(routes[pathname](onNavigate));
};

const component = routes[window.location.pathname];

window.onpopstate = () => {
  rootDiv.appendChild(component(onNavigate));
};

rootDiv.appendChild(component(onNavigate));

