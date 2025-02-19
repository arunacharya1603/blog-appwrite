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
    
    onClick={lougoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
