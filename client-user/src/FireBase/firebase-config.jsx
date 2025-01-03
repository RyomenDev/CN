import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  //   OAuthProvider,
  //   TwitterAuthProvider,
  //   GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import firebaseConf from "../conf/firebase-conf.jsx";

const firebaseConfig = {
  apiKey: firebaseConf.FIREBASE_APIKEY,
  authDomain: firebaseConf.FIREBASE_AUTHDOMAIN,
  projectId: firebaseConf.FIREBASE_PROJECTID,
  storageBucket: firebaseConf.FIREBASE_STORAGEBUCKET,
  messagingSenderId: firebaseConf.FIREBASE_MESSAGINGSENDERID,
  appId: firebaseConf.FIREBASE_APPID,
  measurementId: firebaseConf.FIREBASE_MEASUREMENTID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase auth instance
export const auth = getAuth(app);

// Initialize and export Firestore
export const db = getFirestore(app); // Add this line

// Export providers
export const googleProvider = new GoogleAuthProvider();
// export const microsoftProvider = new OAuthProvider("microsoft.com");
// export const twitterProvider = new TwitterAuthProvider();
// export const githubProvider = new GithubAuthProvider();
