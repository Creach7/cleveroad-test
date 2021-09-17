// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAskY_IqIUIDUanOeYz__CvNEykXTwGlZw",
  authDomain: "cleveroad-test-1c158.firebaseapp.com",
  projectId: "cleveroad-test-1c158",
  storageBucket: "cleveroad-test-1c158.appspot.com",
  messagingSenderId: "298455748492",
  appId: "1:298455748492:web:978e72811e4165be4310a9",
  measurementId: "G-3B1QRQQLVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);