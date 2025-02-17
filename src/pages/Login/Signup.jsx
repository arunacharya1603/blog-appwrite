import authService from "../../appwrite/auth"
import {useNavigate} from "react-router-dom"
import {useState} from 'react'
import Button from "../../components/Button"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {login} from "../../store/authSlice"
import { TabsContent } from "../../components/ui/tabs"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, watch, formState: {errors}} = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const password = watch('password')

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const create = async (data) => {
        try {
            console.log(data);
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({userData}))
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <TabsContent value="signup" className="mt-4" >
        <Card className="p-0 bg-transparent border-0" >
            <form onSubmit={handleSubmit(create)}>
                <CardContent className="space-y-4 p-0">
                    <div className="flex flex-col gap-3 relative">
                        <input 
                            type='text'
                            placeholder="Name"
                            {...register('name', {
                                required: 'Name is required',
                                validate: (value) => {
                                    const trimmedValue = value.trim();
                                    return trimmedValue.length > 3 || 'Name must be at least 4 characters long';
                                },
                            })}
                            className="bg-slate-900 text-white p-2 rounded placeholder:text-sm placeholder:text-slate-500 border border-slate-700/75 focus:outline-none focus:ring-1 focus:ring-green-400"
                        />
                        {errors.name && <p className="absolute -bottom-4 right-1 text-xs text-green-400 font-medium">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 relative">
                        <input 
                            type='text'
                            placeholder="Username"
                            {...register('username', {
                                required: 'Username is required',
                                validate: (value) => {
                                    const trimmedValue = value.trim();
                                    return trimmedValue.length > 4 || 'Username must be at least 5 characters long';
                                },
                            })}
                            className="bg-slate-900 text-white p-2 rounded placeholder:text-sm placeholder:text-slate-500 border border-slate-700/75 focus:outline-none focus:ring-1 focus:ring-green-400"
                        />
                        {errors.username && <p className="absolute -bottom-4 right-1 text-xs text-green-400 font-medium">{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 relative">
                        <input 
                            type='email'
                            placeholder="Email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Invalid email format'
                                }
                            })}
                            className="bg-slate-900 text-white p-2 rounded placeholder:text-sm placeholder:text-slate-500 border border-slate-700/75 focus:outline-none focus:ring-1 focus:ring-green-400"
                        />
                        {errors.email && <p className="absolute -bottom-4 right-1 text-xs text-green-400 font-medium">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3 relative">
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                autoComplete="off"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must have at least 8 characters',
                                    },
                                })}
                                className="bg-slate-900 text-white p-2 rounded placeholder:text-sm placeholder:text-slate-500 border border-slate-700/75 pr-10 w-full focus:outline-none focus:ring-1 focus:ring-green-400"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="absolute -bottom-4 right-1 text-xs text-green-400 font-medium">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 relative">
                        <div className="relative">
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                autoComplete="off"
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: value =>
                                        value === password || 'The passwords do not match'
                                })}
                                className="bg-slate-900 text-white p-2 rounded placeholder:text-sm placeholder:text-slate-500 border border-slate-700/75 focus:outline-none focus:ring-1 focus:ring-green-400 pr-10 w-full"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 focus:outline-none"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="absolute -bottom-4 right-1 text-xs text-green-400 font-medium">{errors.confirmPassword.message}</p>}
                    </div>
                </CardContent>
                <CardFooter className="p-0 mt-5" >
                    <Button 
                        type="submit" 
                        className="w-full bg-green-400 hover:bg-green-500 text-black"
                    >
                        SignUp
                    </Button>
                </CardFooter>
            </form>
            <div className="h-px my-2 bg-slate-600"></div>
            
        </Card>
    </TabsContent>
    );
}

export default Signup