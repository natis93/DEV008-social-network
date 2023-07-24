import {
  deletePost,
  getDataAuthor,
  updateLikePost,
  getUserByUserID,
  listenToPosts,
  savePost,
  obtenerPost,
  updatePost,
  db,
} from '../lib/firebase.js';

export const feed = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.className = 'container__feed';

  // Contenido de la página de feed
  const showFeed = `
    <div class='homeDiv'>
      <header class='menu'>
        <div class='logo'>
          <img src='../Images/space-purple.png' alt='logo space'>
        </div>
        <div class='menu__burger'>
          <div class='bars'>
            <img src='../Images/bars.svg' alt='menu'>
          </div>
          <ul class='menu__inside'>
            <li class='menu__item'>
              <a href='#' class='link link--inside'>Perfil</a>
            </li>
            <li class='menu__item'>
              <a href='#' class='link link--inside'>Notificaciones</a>
            </li>
            <li class='menu__item'>
              <a href='#' class='link link--inside'>Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </header>
      <aside class='container container__profile'>
        <div class='container__picture-profile'>
          <img src='' alt='foto de perfil' class='icon-profile'>
        </div>
        <div class='container__explorer'>
          <h5 class='explorer'>Explorador</h5>
        </div>
        <div class='container__username'>
          <h6 class='username'></h6>
        </div>
        <div class='container__description'>
          <p class='description'></p>
        </div>
      </aside>
      <main class='container container__feed'>
        <article class='container__post container__create-post'>
          <div class='container__icon'>
            <img src='../Images/icon.png' alt='icono planeta' class='icon-planet'>
          </div>
          <form class='container__create-new-post'>
            <textarea id='textarea' placeholder='¿Perdido en el espacio? Envía una señal...'></textarea>
            <button class='button button-share' type='submit'>Enviar</button>
          </form>
        </article>
        <section class='container__post container__all-posts'></section>
      </main>
    </div>`;

  homeDiv.innerHTML = showFeed;

  const containerProfile = homeDiv.querySelector('.container__profile');
  const pictureProfile = containerProfile.querySelector('.icon-profile');
  const username = containerProfile.querySelector('.username');
  const createPostForm = homeDiv.querySelector('.container__create-new-post');
  const allPostsContainer = homeDiv.querySelector('.container__all-posts');

  // Función para crear un nuevo post y mostrarlo en la pantalla
  const createPostAndShow = (text, authorEmail, username) => {
    db.collection('post')
      .add({
        text: text,
        authorUsername: username, // Guarda el nombre de usuario en el post
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // El post se ha guardado exitosamente
        console.log('¡Post guardado exitosamente!');

        // Aquí puedes realizar cualquier otra acción después de guardar el post si es necesario

        // Luego, muestra el post en la pantalla (puedes modificar la lógica según tus necesidades)
        const postElement = createPostElement({ text, authorUsername: username });
        allPostsContainer.appendChild(postElement);
      })
      .catch((error) => {
        // Ocurrió un error al guardar el post
        console.error('Error al guardar el post:', error);
        throw new Error('Error al guardar el post');
      });
  };

  // Mostrar los posts en la pantalla cuando la página se carga inicialmente
  listenToPosts((posts) => {
    showPosts(posts);
  });

  // Evento 'submit' del formulario para crear un nuevo post
  createPostForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtén el texto del post del textarea
    const textarea = createPostForm.querySelector('#textarea');
    const postText = textarea.value;

    // Obtén el correo electrónico del autor actualmente autenticado (puedes obtenerlo de tu sistema de autenticación)
    const authorEmail = 'example@example.com'; // Reemplaza con el correo electrónico del usuario autenticado

    // Crea el post en Firebase y muéstralo en la pantalla
    createPostAndShow(postText, authorEmail, username);

    // Limpia el contenido del textarea después de crear el post
    textarea.value = '';
  });
};
