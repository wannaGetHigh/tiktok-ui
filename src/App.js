import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import DefaultLayout from '~/layouts'

import { useEffect, useState, createContext } from 'react'
import { auth, db, logout } from '~/firebase'
import { query, collection, getDocs, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export const CurrentUserContext = createContext()

function App() {
  const [user, loading] = useAuthState(auth)
  const [currentUser, setCurrentUser] = useState()

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'masters'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setCurrentUser({ name: data.name, avatar: data.avatar, email: data.email })
    } catch (err) {
      console.error(err)
      alert('An error occured while fetching user data')
    }
  }

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
  }

  useEffect(() => {
    if (loading) return
    if (!user) {
      return
    }

    fetchUserName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleLogout }}>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout || DefaultLayout
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
            <Route path="/" element={<Navigate to="/foryou" replace />} />
          </Routes>
        </div>
      </Router>
    </CurrentUserContext.Provider>
  )
}
export default App
