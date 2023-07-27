// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDUCgNWPRcNJN-VT3np_vAdZd7VEaNMwcc',
  authDomain: 'social-borrador-5d39c.firebaseapp.com',
  projectId: 'social-borrador-5d39c',
  storageBucket: 'social-borrador-5d39c.appspot.com',
  messagingSenderId: '630047055563',
  appId: '1:630047055563:web:5fc61c529fd7533cea054e',
  measurementId: 'G-K8PCLTY7B2',
};

import {
  setDoc,
  doc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';

// Initialize Firebase
export const provider = new GoogleAuthProvider(); 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Method to delete a post
export const deletePost = async (postId) => {
  await deleteDoc(doc(db, 'post', postId));
};

// Method to get the data of an author
export const getDataAuthor = async (authorId) => {
  const authorRef = doc(db, 'authors', authorId);
  const authorSnapshot = await getDoc(authorRef);
  if (authorSnapshot.exists()) {
    return authorSnapshot.data();
  }
  return null;
};

// Method to save a new post in Firebase
export const savePost = async (text) => (
  addDoc(collection(db, 'post'), {
    text,
    author: auth.currentUser.email,
    timeline: new Date(),
    likes: [],
  })
);

// Method to update a post in Firebase
export const updatePost = async (postId, newContent) => {
  const postRef = doc(db, 'post', postId);
  await updateDoc(postRef, { text: newContent });
};

// Method to update likes
export const updatePostlikes = async (postId, newContent) => {
  const postRef = doc(db, 'post', postId);
  await updateDoc(postRef, { likes: newContent });
};

// Method to listen to changes in the posts and sort
const queryofPost = query(collection(db, 'post'), orderBy('timeline', 'desc'));

export const listenToPosts = (callback) => {
  onSnapshot(queryofPost, callback);
};

export const getCurrentUser = () => auth.currentUser.email;