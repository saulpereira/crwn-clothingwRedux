import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

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

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
          console.log('error creating the user', error.message);
      }
    }
   
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }
