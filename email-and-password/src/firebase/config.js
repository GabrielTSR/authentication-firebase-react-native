// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxpPI0bnq5c53vnk4l8s1dvfWACoiwi-o",
  authDomain: "poc-teste-dabd7.firebaseapp.com",
  projectId: "poc-teste-dabd7",
  storageBucket: "poc-teste-dabd7.appspot.com",
  messagingSenderId: "784082060967",
  appId: "1:784082060967:web:f89ce00a01d5ac8aed3d82",
  measurementId: "G-CRP0PCBRJ2"
};

const app = initializeApp(firebaseConfig);

const authentication = getAuth(app);
export { firebase, authentication, app };