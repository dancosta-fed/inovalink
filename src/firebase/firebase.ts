import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKIHvGEueegz6gWIB1tyVLQsrVRzL3Fzc",
  authDomain: "inovalink-94386.firebaseapp.com",
  projectId: "inovalink-94386",
  storageBucket: "inovalink-94386.firebasestorage.app",
  messagingSenderId: "98972153449",
  appId: "1:98972153449:web:40982ccfe0443aeb4494f8",
  measurementId: "G-0XXPCEN4CX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support all of the features required for persistence');
  }
});

export { auth, db };