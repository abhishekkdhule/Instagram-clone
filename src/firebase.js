// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyBe5N25Xjr9fPfu-PDFIgWnzwoFkEbx0gI",
  authDomain: "instaagramm-clone.firebaseapp.com",
  databaseURL: "https://instaagramm-clone-default-rtdb.firebaseio.com",
  projectId: "instaagramm-clone",
  storageBucket: "instaagramm-clone.appspot.com",
  messagingSenderId: "80693977998",
  appId: "1:80693977998:web:88f6981306dce3e3fb7adf",
  measurementId: "G-WR2GRPPJS0"
});


const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};