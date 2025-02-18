import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../store/authSlice'
import { Button } from "../../components"
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { useForm } from "react-hook-form"
import { TabsContent } from '../../components/ui/tabs'
import { Card, CardContent, CardFooter } from '../../components/ui/card'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const login = async (data) => {
        try {
            toast.loading('Logging in...')
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
            toast.success('Login successful')
            toast.dismiss()
        } catch (error) {
            toast.error(error.message)
            toast.dismiss()
        }
    }

    return (
        <TabsContent value="login" className="mt-4">
        <Card className="bg-transparent p-0 border-0">
            <form onSubmit={handleSubmit(login)}>
                <CardContent className="space-y-5 p-0 w-full max-w-lg">
                    <div className="flex flex-col gap-3 relative">
                        <input
                            type='text'
                            {...register('email', {
                                required: 'Email or Username is required',
                                validate: (value) => {
                                    const trimmedValue = value.trim();
                                    if (trimmedValue === '') {
                                        return 'Email or Username cannot be empty';
                                    }
                                    return true;
                                },
                            })}
                            placeholder="Email or Username"
                            className="bg-black/10 text-black p-2 rounded placeholder:text-sm placeholder:text-slate-500 border-slate-700/75 border focus:outline-none focus:ring-1 focus:ring-amber-800"
                        />
                        {errors.email && <p className="absolute -bottom-4 right-1 text-xs text-red-400 font-medium">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="off"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must have at least 8 characters'
                                }
                            })}
                            className="bg-black/10 text-black p-2 rounded placeholder:text-sm placeholder:text-slate-500 border-slate-700/75 border focus:outline-none focus:ring-1 focus:ring-amber-800"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 focus:outline-none"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && <p className="absolute -bottom-4 right-1 text-xs text-green-400 font-medium">{errors.password.message}</p>}
                    </div>
                </CardContent>
                <CardFooter className="p-0 mt-4">
                    <Button
                        type="submit"
                        className="w-full bg-amber-800 hover:bg-amber-900 text-white"
                    >
                        Login
                    </Button>
                </CardFooter>
            </form>
            <div className="my-4 flex flex-row justify-between">
                {/* <p className='text-center text-slate-400 text-sm' ><span className='text-green-400 cursor-pointer' onClick={() => navigate('/changepassword')} >Change Password</span></p> */}
                <p className="text-center text-slate-900 text-sm">
                    Didn&apos;t remember your password?
                    <span
                        className="text-amber-800 cursor-pointer pl-2 hover:underline"
                        onClick={() => navigate('/resetpassword')}
                    >
                        Forget Password
                    </span>
                </p>
            </div>
            <div className="h-px my-4 bg-slate-600"></div>
           
        </Card>
    </TabsContent>
    )
}

export default Login