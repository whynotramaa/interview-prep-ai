import { cert, getApp, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAD9TMCMd0HDrxZszQVAu-bk9BTPjHjZrk",
  authDomain: "prepper-92b9d.firebaseapp.com",
  projectId: "prepper-92b9d",
  storageBucket: "prepper-92b9d.firebasestorage.app",
  messagingSenderId: "1005282429128",
  appId: "1:1005282429128:web:8962e196479a2f53cc3dfd",
  measurementId: "G-N358FQW1NX"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app);
export const db = getFirestore(app);