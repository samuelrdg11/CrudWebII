import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD3Xj8GlKIJ64BK2GWDMKu66QrYqI7-3Kk",
    authDomain: "crudweb-4586e.firebaseapp.com",
    projectId: "crudweb-4586e",
    storageBucket: "crudweb-4586e.appspot.com",
    messagingSenderId: "65057343702",
    appId: "1:65057343702:web:366e7d6ac571f8c9fea177"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export {firebase}