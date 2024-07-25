// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUN6ujpwj_XKVxCkJ4mZjFG8X3oZrYi_M",
  authDomain: "autenticacion-pf.firebaseapp.com",
  projectId: "autenticacion-pf",
  storageBucket: "autenticacion-pf.appspot.com",
  messagingSenderId: "763580375983",
  appId: "1:763580375983:web:c85dbb1c56519196db855a",
  measurementId: "G-MJW4P02J1V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);