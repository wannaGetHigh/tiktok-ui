import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { publicRoutes } from '~/routes'
import DefaultLayout from '~/layouts'

function App() {
  return (
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
  )
}
export default App
