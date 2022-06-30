// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, addDoc, collection, setDoc } from 'firebase/firestore'
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
  databaseURL: 'https://tiktok-ui-790f4-default-rtdb.asia-southeast1.firebasedatabase.app',
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

// Dispatch error to client side
function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case 'auth/invalid-password':
      return 'Password provided is not corrected'

    case 'auth/invalid-email':
      return 'Email provided is invalid'

    case 'auth/user-not-found':
      return 'User not found'

    case 'auth/email-already-in-use':
      return 'Email has alreadry used'

    case 'auth/weak-password':
      return 'Password should be at least 6 characters'

    // Many more authCode mapping here...

    default:
      return ''
  }
}

// Login with Google account if not register with db
const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const master = res.user
    const masterRef = doc(db, 'masters', master.uid)
    const masterSnap = await getDoc(masterRef)
    if (!masterSnap.exists()) {
      await setDoc(doc(db, 'masters', master.uid), {
        uid: master.uid,
        name: master.displayName,
        authProvider: 'google',
        email: master.email,
        avatar: master.photoURL,
        followedUserList: [],
        likedPostList: [],
      })
    }
  } catch (err) {
    console.error(err)
  }
}

// Login with email and password
const logInWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.log(err)
      dispatch({ type: 'authError', message: mapAuthCodeToMessage(err.code) })
    }
  }
}

// Register user with email and password
const registerWithEmailAndPassword = (name, email, password) => {
  return async (dispatch) => {
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
      dispatch({ type: 'authError', message: mapAuthCodeToMessage(err.code) })
    }
  }
}

// Send password reset link
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (err) {
    console.error(err)
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
