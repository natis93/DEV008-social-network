import {
    deletePost,
    getDataAuthor,
    updateLikePost,
    getUserByUserID,
    listenToPosts,
    savePost,
    obtenerPost,
    updatePost,
    } from '../lib/firebase.js';
    
    export const feed = (onNavigate) => {
      const homeDiv = document.createElement('div');
      homeDiv.className = 'container__feed';
    
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
                  <a href='#' class='link link--inside'>Profile</a>
                </li>
                <li class='menu__item'>
                  <a href='#' class='link link--inside'>Notifications</a>
                </li>
                <li class='menu__item'>
                  <a href='#' class='link link--inside'>Log Out</a>
                </li>
              </ul>
            </div>
          </header>
          <aside class='container container__profile'>
            <div class='container__picture-profile'>
              <img src='' alt='profile picture' class='icon-profile'>
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
          <main class='container container__feed'>
            <article class='container__post container__create-post'>
              <div class='container__icon'>
                <img src='../Images/icon.png' alt='icon planet' class='icon-planet'>
              </div>
              <form class='container__create-new-post'>
                <textarea id='textarea' placeholder='Lost in space? Send a sign...'></textarea>
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
    
      const showPosts = (posts) => {
        allPostsContainer.innerHTML = '';
    
        posts.forEach((post) => {
         /*  console.log(post.data()); */
          const postElement = createPostElement(post); // Utilizamos la función createPostElement para crear el div del post
          allPostsContainer.appendChild(postElement); // Agregamos el nuevo post a la pantalla
        });
      };
    
      const createPostElement = (post) => {
        console.log(post.id);
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p class='post-content'>${post.data().text}</p>
            <div class='post-icons'>
              <i class='fas fa-trash-alt delete-icon' data-post-id='${post.id}'></i>
              <i class='fas fa-edit edit-icon' data-post-id='${post.id}'></i>
              <i class='fas fa-thumbs-up like-icon' data-post-id='${post.id}'></i>
            </div>
        
        `;
    
        const deleteIcon = postElement.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', async () => {
          const postId = deleteIcon.dataset.postId;
          await deletePost(postId);
          postElement.remove(); // Eliminamos el div del post de la pantalla
        });
    
        const editIcon = postElement.querySelector('.edit-icon');
        editIcon.addEventListener('click', async () => {
          const postId = post.id;
          const newContent = prompt('Enter the new content for the post:');
          console.log(postId);
          console.log(newContent);
          if (newContent) {
            await updatePost(postId, newContent);
            
            post.text = newContent;
            postElement.querySelector('.post-content').textContent = newContent; // Actualizamos el contenido del post en la pantalla
          }
        });
    
        const likeIcon = postElement.querySelector('.like-icon');
        likeIcon.addEventListener('click', async () => {
          const postId = likeIcon.dataset.postId;
          await updateLikePost(postId);
          // PENDIENTE lógica para actualizar el contador de "likes" en la pantalla
        });
    
        return postElement;
      };
    
      createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const textarea = createPostForm.querySelector('#textarea');
        const content = textarea.value.trim();
    
        if (content !== '') {
          const postId = await savePost(content); // Guardamos el post en Firebase y obtenemos su ID
          const newPost = { id: postId, content }; // Creamos un objeto para representar el nuevo post
          const postElement = createPostElement(newPost); // Creamos el elemento HTML del nuevo post
          allPostsContainer.appendChild(postElement); // Agregamos el nuevo post a la pantalla
          textarea.value = ''; // Limpiamos el textarea
        }
      });
    
      const showAllPosts = async () => {
        try {
          /* const posts = await listenToPosts(); // Llama a la función para obtener los posts de Firebase */
          obtenerPost()
          .then((response) => {
            console.log(response);
            showPosts(response); // Muestra los posts en la pantalla
          })
       
  
        } catch (error) {
          console.error('hola, Juan', error);
        }
      };
    
      showAllPosts(); // Llamamos a la función para mostrar los posts cuando la página se carga por primera vez
    
      return homeDiv;
    };
        