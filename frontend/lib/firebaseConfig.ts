import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDFlQ4ZhPLFC6Ja_oZ0AjRL9BBs7-R9ZsY",
  authDomain: "cycle2u-backend.onrender.com",
  projectId: "cycle2u-70881949-3273a",
  storageBucket: "cycle2u-70881949-3273a.firebasestorage.app",
  messagingSenderId: "86554345025",
  appId: "1:86554345025:web:4ea2afac0d34919f7710c0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;
