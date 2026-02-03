import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

// For the following part, I asked AI for tutorial how to initialize 
// the firebase config and storage
const firebaseConfig = {
  apiKey: "AIzaSyCTnosXMjEct5jNNBEwZESDkU90zu6BqPU",
  authDomain: "info340-group3.firebaseapp.com",
  databaseURL: "https://info340-group3-default-rtdb.firebaseio.com/",
  projectId: "info340-group3",
  storageBucket: "info340-group3.firebasestorage.app",
  messagingSenderId: "713625176146",
  appId: "1:713625176146:web:fd4fd30ee57174fda9b78b",
  measurementId: "G-KZYMYG35YJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { app, auth, db, storage };