import { collection, doc, setDoc, addDoc, getDocs, onSnapshot, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from '../lib/firebase.js';

export const feed = (onNavigate) => {
    let showFeed = () => {
        `<div class='homeDiv'>
            <header class='menu'>
                <div class='logo'>
                    <img src='../Images/space-purple.png' alt='logo space'>
                </div>
                <div class='menu__burger'>
                    <ul class='menu__inside'>
                        <li class='menu__item'>
                            <a href='#' class='link--inside'>Profile</a>
                        </li>
                        <li class='menu__item'>
                            <a href='#' class='link--inside'>Notifications</a>
                        </li>
                        <li class='menu__item'>
                            <a href='#' class='link--inside'>Log Out</a>
                        </li>
                    </ul>
                </div>
            </header>
            <aside class='container container__profile'>
                <div class='container__picture-profile'>
                    <img src=${doc.img} alt='profile picture' class='icon-profile'>
                </div>
                <div class='container__explorer'>
                    <h5 class='explorer'>Explorer</h5>
                </div>
                <div class='container__username'>
                    <h6 class='username'>${doc.user}</h6>
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
                        <button class='share'>Share</button>
                    </form>
                </article>
                <section class='container__post container__all-posts'></section>
            </main>
        </div>`}
}
// const homeDiv = document.createElement('div');
// homeDiv.className = 'container';

// const buttonHome = document.createElement('button');
// buttonHome.className = 'button button-home';
// buttonHome.textContent = 'Home';



// buttonHome.addEventListener('click', () => onNavigate('/'));
// homeDiv.appendChild(buttonHome);

// return homeDiv;