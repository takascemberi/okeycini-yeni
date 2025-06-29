import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';  // Firestore'u ekleyin

const firebaseConfig = {
  apiKey: 'AIzaSyCbPwJfUagbCa_QjSdhhCbhqaODEy6l4Hs',
  authDomain: 'okeycini-ca604.firebaseapp.com',
  projectId: 'okeycini-ca604',
  storageBucket: 'okeycini-ca604.appspot.com',
  messagingSenderId: '22354367058',
  appId: '1:22354367058:web:63f7dda0b5aed05302458b',
  measurementId: 'G-ZM74BBQTYH',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);  // Firestore bağlantısını ekleyin

export { auth, storage, db };  // db'yi de dışa aktarın
