// import * as firebase from "firebase";
// import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyABvnm5Y9G5V7TNkHdKu1_Pg0q_3PBoxUM',
  authDomain: 'wrprojects-b8cd5.firebaseapp.com',
  projectId: 'wrprojects-b8cd5',
  storageBucket: 'wrprojects-b8cd5.appspot.com',
  messagingSenderId: '241070424758',
  appId: '1:241070424758:web:396034e8662df50b529c17',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider(app);
