import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBNCoHuUv5ycbOu-7AA7cdS1j8aZbvLo54",
    authDomain: "crwn-db-9850b.firebaseapp.com",
    databaseURL: "https://crwn-db-9850b.firebaseio.com",
    projectId: "crwn-db-9850b",
    storageBucket: "crwn-db-9850b.appspot.com",
    messagingSenderId: "878231926683",
    appId: "1:878231926683:web:c536c010354e92be91d33e",
    measurementId: "G-JGKNR35T00"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);