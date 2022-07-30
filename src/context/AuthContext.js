import { useEffect, useState, createContext } from 'react'
import { auth, db, logout } from '~/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { PropTypes } from 'prop-types'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
  }

  useEffect(() => {
    const unsubcribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        let userRef = doc(db, 'masters', user.uid)

        onSnapshot(userRef, (snapshot) => {
          setCurrentUser(snapshot.data())
        })
      } else {
        setCurrentUser(null)
      }
    })

    return () => unsubcribed()
  }, [])

  return <AuthContext.Provider value={{ currentUser, handleLogout }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
