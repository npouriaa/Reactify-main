import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJVMXpkqp2-xo5twy6QJbM6xfrl2m-ufA",
  authDomain: "reactify-2dc51.firebaseapp.com",
  projectId: "reactify-2dc51",
  storageBucket: "reactify-2dc51.appspot.com",
  messagingSenderId: "744722807710",
  appId: "1:744722807710:web:c2522df11c5b353b25b48f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()