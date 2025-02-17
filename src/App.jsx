import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <>
     <Toaster
              toastOptions={{
                className: "toast"
              }}
            />
      <div className='flex flex-col min-h-screen bg-stone-400'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  ) : null
}

export default App