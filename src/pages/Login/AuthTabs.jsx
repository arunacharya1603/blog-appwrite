import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function AuthTabs() {
  return (
    <div className='relative pb-16 bg-gradient-to-br from-rose-50 via-rose-100 to-rose-50 overflow-hidden flex flex-col flex-grow w-full' >
    <div className={'md:pt-20 pt-20 flex-grow flex items-center justify-center relative z-50 '} >
        <Tabs defaultValue="login" className="w-full p-4 max-w-lg border-2 border-rose-500/20 rounded-lg ">
            <TabsList className="grid w-full grid-cols-2  text-slate-400  font-semibold bg-slate-900">
                <TabsTrigger className="data-[state=active]:bg-green-400 " value="login">Login</TabsTrigger>

                <TabsTrigger className="data-[state=active]:bg-green-400 font-semibold" value="signup">SignUp</TabsTrigger>
            </TabsList>
            <Login />
            <Signup />
        </Tabs>
    </div>
</div>
  );
}

export default AuthTabs;