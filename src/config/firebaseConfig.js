import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAhvEPhXOiW2W4irJuX2wD4NhyJpQV2Zv0",
    authDomain: "todo3-b0c89.firebaseapp.com",
    databaseURL: "https://todo3-b0c89.firebaseio.com",
    projectId: "todo3-b0c89",
    storageBucket: "todo3-b0c89.appspot.com",
    messagingSenderId: "409295085735",
    appId: "1:409295085735:web:264634eb91cb70182f7b82",
    measurementId: "G-Z6X0GHX9M5"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;