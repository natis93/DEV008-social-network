import {
  deletePost,
  updateLikePost,
  listenToPosts,
  updatePost,
  db,
  updatePostlikes,
  getCurrentUser,
  auth,
  savePost,
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

// Variable para llevar registro de los posts que ha dado "like" el usuario actual
const likedPostsByAuthor = {};
// Agregar el campo "likes" con valor 0 a los documentos existentes en la colección "post"
const addLikesFieldToExistingPosts = async () => {
  const postsRef = (db, 'post');
  const postsSnapshot = await getDocs(postsRef);
  postsSnapshot.forEach(async (postDoc) => {
    // Verificar si el campo "likes" ya existe en el documento
    if (!postDoc.data().hasOwnProperty('likes')) {
      // Si el campo "likes" no existe, actualizar el documento para agregar el campo con valor 0
      await updateDoc(doc(db, 'post', postDoc.id), { likes: 0 });
    }
  });
};

// Llamar a la función para agregar el campo "likes" a los documentos existentes
addLikesFieldToExistingPosts();
const handleLike = async (event) => {
  const postId = event.target.getAttribute('data-post-id');
  const authorId = event.target.getAttribute('data-author-id');
 
  // Verificar si el autor ya ha dado "like" a este post
  if (likedPostsByAuthor[authorId] && likedPostsByAuthor[authorId][postId]) {
  // Si ya ha dado like, restar el like en la base de datos y eliminarlo del registro local
  await updateLikePost(postId, -1);
  delete likedPostsByAuthor[authorId][postId];
  event.target.classList.remove('liked');
  // Restar un like en el contador de likes en la pantalla
  const likeCountElement = document.querySelector(`[data-post-id='${postId}'] .like-count`);
  likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
} else {
  // Si no ha dado like, sumar el like en la base de datos y agregarlo al registro local
  await updateLikePost(postId, 1);
  likedPostsByAuthor[authorId] = likedPostsByAuthor[authorId] || {};
  likedPostsByAuthor[authorId][postId] = true;
  event.target.classList.add('liked');
  // Sumar un like en el contador de likes en la pantalla
  const likeCountElement = document.querySelector(`[data-post-id='${postId}'] .like-count`);
  if (likeCountElement) {
  likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
}
}
};

//--------------Función para editar--------------
const handleEditPost = (postId, currentText) => {
  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <textarea id='edit-textarea'>${currentText}</textarea>
    <button type='submit'>Save</button>
  `;

  // Mostrar el formulario de edición en el lugar del post original
  const postElement = allPostsContainer.querySelector(`[data-post-id='${postId}']`);
  postElement.replaceWith(editForm);

  // Agregamos evento submit al formulario de edición
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const editTextarea = editForm.querySelector('#edit-textarea');
    const updatedText = editTextarea.value;

    // Actualizamos post en Firebase usando el método updatePost
    updatePost(postId, updatedText)
      .then(() => {
        console.log('Post updated');
      })
      .catch((error) => {
        console.error('Error updating the post:', error);
      });
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
      <span class='like-count' data-post-id='${post.id}'>${post.data().likes.length}</span>
    </div>
  `;
// -------------Para borrar post---------------
const deleteIcon = postElement.querySelector('.delete-icon');
const currentUserEmail = auth.currentUser.email;

//Para verificar si el autor coincide con el usuario de la red social
if (post.data().author === currentUserEmail) {
  deleteIcon.style.display = 'inline-block';
//evento para borrar post
deleteIcon.addEventListener('click', () => {
  const postId = deleteIcon.getAttribute('data-post-id');
  deletePost(postId);
});
} else {
  deleteIcon.style.display = 'none';
}

//--------------Evento editar post---------

const editIcon = postElement.querySelector('.edit-icon');
editIcon.addEventListener('click', () => {
  handleEditPost(post.id, post.data().text);
});

//---------------Para ícono de Like-------
const likeButton = postElement.querySelector('.like-icon');
likeButton.setAttribute('data-author-id', post.data().authorId); // Agregar el ID del autor como atributo
likeButton.addEventListener('click',() => {
const currentUser = getCurrentUser()
const likedBy =post.data().likes
console.log(currentUser)
console.log(post.data().likes)
if (post.data().likes.includes(currentUser)){
  console.log('restar')
const indice = likedBy.indexOf(currentUser); // obtenemos el indice
likedBy.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
updatePostlikes(post.id,likedBy)
}else{
  console.log('sumar')
  likedBy.push(currentUser)
  updatePostlikes(post.id,likedBy)
}
})

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
