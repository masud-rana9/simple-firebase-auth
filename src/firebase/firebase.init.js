// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAUg6bPnRQLyOhak8td90JmL-k_wCB0BE",
  authDomain: "fir-reactsimpleauth.firebaseapp.com",
  projectId: "fir-reactsimpleauth",
  storageBucket: "fir-reactsimpleauth.appspot.com",
  messagingSenderId: "691243833249",
  appId: "1:691243833249:web:d6efb0f5703335006d1de0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
