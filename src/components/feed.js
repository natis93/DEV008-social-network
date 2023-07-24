import {
  deletePost,
  getDataAuthor,
  updateLikePost,
  getUserByUserID,
  listenToPosts,
  updatePost,
  db,
  savePost,
} from '../lib/firebase.js';

//let showFeed = getElementById('root')
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
      <main class='container container__main'>
        <article class='container__post container__create-post'>
          <div class='container__icon'>
            <img src='../Images/icon.png' alt='icono planeta' class='icon-planet'>
          </div>
          <form class='container__create-new-post'>
            <textarea id='textarea' placeholder='¿Lost in space? Send a sign...'></textarea>
            <button class='button button-share' type='submit'>Share</button>
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

  
  // Función para crear un nuevo post en firebase
  const createPostAndShow = (text, username) => {
    savePost(text) // Usamos la función savePost en lugar de addDoc
      .then(() => {
        // El post se ha guardado exitosamente
        console.log('Post saved');
        // Luego, mostramos el post en la pantalla (puedes modificar la lógica según tus necesidades)
        const postElement = createPostElement({ text, authorUsername: username });
        allPostsContainer.appendChild(postElement);
      })
      .catch((error) => {
        // Ocurrió un error al guardar el post
        console.error('Error saving the post:', error);
      });
  };

// Función para crear el elemento HTML que representa un post
const createPostElement = (post) => {
  console.log(post.id);
  const postElement = document.createElement('div');
  postElement.className = 'post';
  postElement.innerHTML = `
    <p class='post-username'>Author: ${post.data().author}</p>
    <p class='post-content'>${post.data().text}</p>
    <div class='post-icons'>
      <i class='fas fa-trash-alt delete-icon' data-post-id='${post.id}'></i>
      <i class='fas fa-edit edit-icon' data-post-id='${post.id}'></i>
      <i class='fas fa-thumbs-up like-icon' data-post-id='${post.id}'></i>
    </div>
  `;
  return postElement;
};

// Función para mostrar los posts en la pantalla
//Esta función recibe una lista de posts y se encarga de recorrer cada uno de ellos.
const showPosts = (posts) => {
  console.log(posts);
  allPostsContainer.innerHTML = '';

  posts.forEach((post) => {
    console.log(post.text);
    const postElement = createPostElement(post);
    allPostsContainer.appendChild(postElement);
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
  const text = textarea.value;

  // Crea el post en Firebase y muéstralo en la pantalla
 
  savePost(text) // Usamos la función savePost en lugar de addDoc
  .then(() => {
    console.log('Post saved');
  })
  .catch((error) => {
    // Ocurrió un error al guardar el post
    console.error('Error saving the post:', error);
  });

  // Limpia el contenido del textarea después de crear el post
  textarea.value = '';
});

  return homeDiv;
};

