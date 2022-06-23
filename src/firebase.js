// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, getDocs, addDoc, collection, query, where } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
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

// Authentication Firebase
const auth = getAuth(app)

// Login with Google account if not register with db
const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const master = res.user
    const q = query(collection(db, 'masters'), where('uid', '==', master.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'masters'), {
        uid: master.uid,
        name: master.displayName,
        authProvider: 'google',
        email: master.email,
        avatar: master.photoURL,
      })
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

// Login with email and password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

// Register user with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const master = res.user
    await addDoc(collection(db, 'masters'), {
      uid: master.uid,
      name,
      authProvider: 'local',
      email,
    })
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

// Send password reset link
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}

// Logout
const logout = () => {
  signOut(auth)
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
}
