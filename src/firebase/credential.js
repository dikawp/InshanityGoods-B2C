// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
// import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAIRfZkJUmc6F9e6MSjGonlbo40yiKbfOg",
  authDomain: "inshanitygoods-products.firebaseapp.com",
  projectId: "inshanitygoods-products",
  storageBucket: "inshanitygoods-products.appspot.com",
  messagingSenderId: "181033257373",
  appId: "1:181033257373:web:16fd33ac6493a3e2808774",
  measurementId: "G-0XLKX22HD5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIRESTORE = getFirestore(FIREBASE_APP);