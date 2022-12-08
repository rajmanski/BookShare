import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBsthzw_MxeS0mQwJVq5sAxZiX2BgNaI7A",
  authDomain: "bookshare2-4c1ad.firebaseapp.com",
  projectId: "bookshare2-4c1ad",
  storageBucket: "bookshare2-4c1ad.appspot.com",
  messagingSenderId: "722330696307",
  appId: "1:722330696307:web:5115b20a4e9cbd8abd0806"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);