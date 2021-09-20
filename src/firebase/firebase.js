// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
const db = getFirestore();

function signIn(email, password, successFun, errorFun) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      successFun(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
      errorFun();
    });
}

async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const ret = [];
  querySnapshot.forEach((doc) => {
    // console.dir(doc);
    // console.log(`${doc.id} => ${doc.data().photo}`);
    ret.push({
      ...doc.data(),
      id: doc.id
    });
  });
  return ret;
}

export { app, analytics, db, signIn, getProducts };