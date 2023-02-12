import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnK47L5oV2dBr-mngeOj0zCaIyj61_szI",
  authDomain: "chat-app-39871.firebaseapp.com",
  projectId: "chat-app-39871",
  storageBucket: "chat-app-39871.appspot.com",
  messagingSenderId: "94838127848",
  appId: "1:94838127848:web:e4a9c3a6b01a6b1ae75d5d",
  measurementId: "G-C0ZZVPLQYY"
};

// Initialize Firebase
// const analytics = getAnalytics(app);
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db =getFirestore();