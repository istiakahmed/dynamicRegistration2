// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBtaH3iwNkwZpiHXQALMXRxeSBt8RJMGZc",
  authDomain: "dynamicregistration-9f9ed.firebaseapp.com",
  projectId: "dynamicregistration-9f9ed",
  storageBucket: "dynamicregistration-9f9ed.firebasestorage.app",
  messagingSenderId: "280318243051",
  appId: "1:280318243051:web:ca3fe826edad7e01860eae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app