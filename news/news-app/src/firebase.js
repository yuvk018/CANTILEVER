
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm646BfAd9rAJk_-PHk2w4ltMHpwP9zx8",
  authDomain: "news-website-68875.firebaseapp.com",
  projectId: "news-website-68875",
  storageBucket: "news-website-68875.firebasestorage.app",
  messagingSenderId: "235296820073",
  appId: "1:235296820073:web:42dd1e39078bb715f78bf8",
  measurementId: "G-6R8PQDD4VX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
