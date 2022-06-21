// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDW5TLczUzBtpJ-_K9nVCqSppQay50WBqc',
  authDomain: 'tiktok-ui-790f4.firebaseapp.com',
  projectId: 'tiktok-ui-790f4',
  storageBucket: 'tiktok-ui-790f4.appspot.com',
  messagingSenderId: '247086529163',
  appId: '1:247086529163:web:86b738e48ab9a347e9328e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export default db
