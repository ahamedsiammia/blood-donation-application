// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZvkENoY6mg3Lj6Dzl4jFKndAaKHBgNjk",
  authDomain: "project11-client.firebaseapp.com",
  projectId: "project11-client",
  storageBucket: "project11-client.firebasestorage.app",
  messagingSenderId: "273006783652",
  appId: "1:273006783652:web:e52f0954f06515ceb34a31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);