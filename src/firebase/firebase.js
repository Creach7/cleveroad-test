// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

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
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const db = getFirestore();

function signIn(email, password, successFun, errorFun) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.dir(auth);
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
function create(email, password, successFun, errorFun) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      successFun(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
      errorFun();
    });
}


async function getProducts(setProductsFun) {
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
  setProductsFun(ret);
}


function loadImage(productID, file, fun) {
  const storage = getStorage();
  // // Create the file metadata
  // /** @type {any} */
  // const metadata = {
  //   contentType: 'image/jpeg'
  // };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, `${productID}/image.${file.name.split('.').pop()}`);
  // const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        // ...
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        fun(downloadURL);
      });
    }
  );
}

function deleteImage(id, format) {
  const storage = getStorage();
  const desertRef = ref(storage, `${id}/image.${format}`);
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
}

async function updateProduct(id, update_date) {
  const ref = doc(db, "products", id);
  await updateDoc(ref, update_date);
}

async function addProduct(product, fun) {
  try {
    const ph = product.photo;
    product.photo = '';

    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
    loadImage(docRef.id, ph, (downloadURL) => {
      // product.photo = downloadURL;
      console.log(downloadURL);
      updateProduct(docRef.id, { photo: downloadURL });
    });
    fun();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert('addProduct Error');
  }
}

async function deleteProduct(id, format) {
  await deleteDoc(doc(db, "products", id));
  deleteImage(id, format);
}

export { signIn, create, getProducts, addProduct, updateProduct, deleteProduct, loadImage, deleteImage };