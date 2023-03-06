import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0tPKMcN22D2clNUGPM1T9htrv4SwdsLM",
  authDomain: "spritl-app.firebaseapp.com",
  databaseURL: "https://spritl-app-default-rtdb.firebaseio.com",
  projectId: "spritl-app",
  storageBucket: "spritl-app.appspot.com",
  messagingSenderId: "676793086078",
  appId: "1:676793086078:web:0a434ccdb00148b51ce82f"
};

// Initialize Firebase
const fireBaseApp = firebase.initializeApp(firebaseConfig);
const db = fireBaseApp.firestore();
const auth = firebase.auth();

export { auth, db};
