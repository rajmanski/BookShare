import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDVvF5hgb9ftkVcmD1Li_dzr6FGUEqVfMs",
  authDomain: "bookshare-e00d2.firebaseapp.com",
  projectId: "bookshare-e00d2",
  storageBucket: "bookshare-e00d2.appspot.com",
  messagingSenderId: "958367402061",
  appId: "1:958367402061:web:0335b00938bdef76bc7404"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);