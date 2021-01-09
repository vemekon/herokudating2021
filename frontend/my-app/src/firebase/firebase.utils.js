import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBSN5u6GVnRMdNumbQ6MZHPg5LtzXQzRkA",
  authDomain: "mekele-77f49.firebaseapp.com",
  databaseURL: "https://mekele-77f49.firebaseio.com",
  projectId: "mekele-77f49",
  storageBucket: "mekele-77f49.appspot.com",
  messagingSenderId: "311057503081",
  appId: "1:311057503081:web:c25b11c6c73f32680723f8",
};

firebase.initializeApp(config);

export const createUserProfileDocument = () => {};

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
