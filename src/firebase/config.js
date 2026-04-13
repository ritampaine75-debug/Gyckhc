import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAKC5znAlxRW77hXi1Pk0JvAy7vAXurU9w",
  authDomain: "tournament-pro-7640a.firebaseapp.com",
  databaseURL: "https://tournament-pro-7640a-default-rtdb.firebaseio.com",
  projectId: "tournament-pro-7640a",
  storageBucket: "tournament-pro-7640a.firebasestorage.app",
  messagingSenderId: "1033810183760",
  appId: "1:1033810183760:web:2e3376b78d95b8a280b355"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
