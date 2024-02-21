import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIu7a_ZJI_8MiT5Js-j0D8tiCjiykBcbI",
  authDomain: "reactify-f0dc5.firebaseapp.com",
  projectId: "reactify-f0dc5",
  storageBucket: "reactify-f0dc5.appspot.com",
  messagingSenderId: "665197616908",
  appId: "1:665197616908:web:625cdbaad50d8c02217329",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()