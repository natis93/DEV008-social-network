import { signOutSession, stateChanged } from '../lib/auth';
import {
  deletePost,
  listenToPosts,
  updatePost,
  db,
  updatePostlikes,
  getCurrentUser,
  auth,
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
              <a href='#' class='link link--inside'id='profile'>Profile</a>
            </li>
            <li class='menu__item'>
              <a href='#' class='link link--inside'id='notifications'>Notifications</a>
            </li>
            <li class='menu__item'>
              <a href='#' class='link link--inside'id='logOut'>Log Out</a>
            </li>
          </ul>
        </div>
      </header>
      <div class= 'Box__aside__main'>
        <aside class='container container__profile'>
          <div class='container__picture-profile'>
            <i class="fas fa-user-circle icon-profile"></i>
          </div>
          <div class='container__explorer'>
            <h5 class='explorer'>Explorer</h5>
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
              <div class='container__button_share'>
                <button class='button button-share' type='submit'>Share</button>
              </div>
            </form>
          </article>
          <section class='container__post container__all-posts'></section>
        </main>
      </div>
    </div>`;

  homeDiv.innerHTML = showFeed;

  const containerProfile = homeDiv.querySelector('.container__profile');
  const pictureProfile = containerProfile.querySelector('.icon-profile');
  const username = containerProfile.querySelector('.username');
  const createPostForm = homeDiv.querySelector('.container__create-new-post');
  const allPostsContainer = homeDiv.querySelector('.container__all-posts');

  // Función para crear el elemento HTML que representa un post
  const createPostElement = (post) => {
    console.log(post.id);
    console.log(auth.currentUser.displayName);
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
    <p class='post-username'>Author: ${post.data().author}</p>
    <p class='post-content'>${post.data().text}</p>
    <div class='post-icons'>
      <i class='fas fa-thumbs-up like-icon' data-post-id='${post.id}'></i>
      <span class='like-count' data-post-id='${post.id}'>${
      post.data().likes.length
    }</span>
      <i class='fas fa-edit edit-icon' data-post-id='${post.id}'></i>
      <i class='fas fa-trash-alt delete-icon' data-post-id='${post.id}'></i>
    </div>
  `;

    //---------------Usuario actual----------------
    const currentUser = getCurrentUser();

    // -------------Función para borrar post---------------
    const deleteIcon = postElement.querySelector('.delete-icon');

    //Para verificar si el autor coincide con el usuario de la red social
    if (post.data().author === currentUser) {
      deleteIcon.style.display = 'inline-block';
      //evento para borrar post
      deleteIcon.addEventListener('click', () => {
        const postId = deleteIcon.getAttribute('data-post-id');
        deletePost(postId);
      });
    } else {
      deleteIcon.style.display = 'none';
    }

    //--------------Función para actualizar la publicación--------------

    const handleEditPost = (postId, currentText) => {
      const editForm = document.createElement('form');
      editForm.innerHTML = `
      <textarea id='${postId}' class='edit-textarea'>${currentText}</textarea>
      <button type='submit' class='button button-save'>Save</button>
    `;

      // Mostrar el formulario de edición en el lugar del post original
      const postElement = allPostsContainer.querySelector(
        `[data-post-id='${postId}']`
      );
      //postElement.toggle('editForm');
      postElement.replaceWith(editForm);

      // Agregamos evento submit al formulario de edición
      editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const editTextarea = document.getElementById(postId).value;
        console.log(postId);
        console.log(editTextarea);
        // Actualizamos post en Firebase usando el método updatePost
        updatePost(postId, editTextarea)
          .then(() => {
            console.log('Post updated');
          })
          .catch((error) => {
            console.error('Error updating the post:', error);
          });
      });
    };
    //--------------Evento editar post---------

    const editIcon = postElement.querySelector('.edit-icon');

    if (post.data().author === currentUser) {
      editIcon.style.display = 'inline-block';
      editIcon.addEventListener('click', () => {
        handleEditPost(post.id, post.data().text);
      });
    } else {
      editIcon.style.display = 'none';
    }

    //---------------Evento like post-------
    const likeButton = postElement.querySelector('.like-icon');
    likeButton.addEventListener('click', () => {
      const likedBy = post.data().likes;
      console.log(currentUser);
      console.log(post.data().likes);
      if (post.data().likes.includes(currentUser)) {
        console.log('restar');
        const indice = likedBy.indexOf(currentUser); // obtenemos el indice
        likedBy.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
        updatePostlikes(post.id, likedBy);
      } else {
        console.log('sumar');
        likedBy.push(currentUser);
        updatePostlikes(post.id, likedBy);
      }
    });

    return postElement;
  };

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

  const logOut = homeDiv.querySelector('#logOut');
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    signOutSession(onNavigate, 'login');
  });

  return homeDiv;
};
