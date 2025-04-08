// firebase/client.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAD9TMCMd0HDrxZszQVAu-bk9BTPjHjZrk",
  authDomain: "prepper-92b9d.firebaseapp.com",
  projectId: "prepper-92b9d",
  storageBucket: "prepper-92b9d.appspot.com",
  messagingSenderId: "1005282429128",
  appId: "1:1005282429128:web:8962e196479a2f53cc3dfd",
  measurementId: "G-N358FQW1NX"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
