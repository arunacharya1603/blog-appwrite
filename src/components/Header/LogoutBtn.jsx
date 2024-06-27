import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.js'
import {logout} from "../../store/authSlice.js"

const LogoutBtn = () => {
    const dispatch = useDispatch()

    const lougoutHandler = async () => {
        try {
            await authService.logout()
            dispatch(logout())
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={lougoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
