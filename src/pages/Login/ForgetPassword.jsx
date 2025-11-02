import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { IoArrowUndoOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import authService from "../../appwrite/auth"


const ForgetPassword = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm()

    const forgotPassword = async (data) => {
        try {
            toast.loading('Sending reset link...')
            const session = await authService.forgotPassword(data)
            if (session) {
                navigate("/")
            }
            toast.success('Reset link sent')
            toast.dismiss()
        } catch (error) {
            toast.error(error.message)
            toast.dismiss()
        }
    }

    const handleBackToLogin = () => {
        navigate('/login')
    }
    return (
        <div className='relative min-h-screen bg-gradient-to-br from-slate-950 to-slate-800 dark:from-pink-200 dark:via-pink-300 dark:to-pink-200 overflow-hidden flex flex-col flex-grow w-full'>
            <div className={`flex-grow flex items-center justify-center relative z-50 w-full`}>
                <Tabs 
                    defaultValue="reset-password" 
                    className="w-full pt-6 max-w-md border bg-slate-900 dark:bg-pink-200 backdrop-blur-md border-green-900 dark:border-pink-700 rounded-xl shadow-2xl overflow-hidden shadow-slate-800 dark:shadow-pink-300/20"
                >
                    <h1 className="text-center text-xl font-normal text-green-400 dark:text-pink-700 font-potta mb-1">
                        Forgot Password
                    </h1>
                    <p className="text-center text-slate-300 dark:text-slate-700 text-sm mb-1">
                        Enter your email address, and we&apos;ll send you a link to reset your password.
                    </p>
                    <TabsContent value="reset-password">
                        <Card className="bg-transparent border-none pt-6 rounded-lg">
                            <form onSubmit={handleSubmit(forgotPassword)}>
                                <CardContent className="px-6">
                                    <div className="flex flex-col gap-3 relative">
                                        <input
                                            type='email'
                                            {...register('yourEmail', {
                                                required: 'Email is required',
                                            })}
                                            placeholder="Your Email"
                                            className='bg-slate-900 dark:bg-pink-300 text-slate-200 dark:text-slate-800 p-2 rounded placeholder:text-sm placeholder:text-slate-500 dark:placeholder:text-slate-700 border-green-900/75 dark:border-pink-700/75 border outline-none focus:outline-1 focus:outline-green-400 dark:focus:outline-pink-700'
                                        />
                                        {errors.yourEmail && (
                                            <p className='absolute -bottom-5 right-1 text-xs text-red-400 dark:text-red-600 font-medium'>
                                                {errors.yourEmail.message}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="ml-4 mr-4 px-2">
                                    <button 
                                        type="submit"
                                        className="w-full py-2 bg-green-500 dark:bg-gradient-to-br dark:from-pink-600 dark:to-pink-900 hover:bg-green-600 dark:hover:opacity-90 text-slate-800 dark:text-white font-semibold rounded-sm"
                                    >
                                        Send Reset Link
                                    </button>
                                </CardFooter>
                            </form>
                        </Card>
                        <TabsList className="flex flex-row bg-slate-900 dark:bg-pink-200 justify-center">
                            <button
                                onClick={handleBackToLogin}
                                className="flex flex-row items-center text-sm text-green-400 dark:text-pink-700 hover:underline dark:hover:text-pink-800 pb-6"
                            >
                                <IoArrowUndoOutline size={20} />
                                <span className="pl-2">Back to Login</span>
                            </button>
                        </TabsList>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default ForgetPassword;