import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

function AuthTabs() {
  return (
    <div className='relative pb-16 bg-gradient-to-b from-white/20 to-amber-600/20 overflow-hidden flex flex-col flex-grow w-full' >
    <div className={'md:pt-20 pt-20 flex-grow flex items-center justify-center relative z-50 '} >
        <Tabs defaultValue="login" className="w-full p-4 max-w-lg bg-gradient-to-b from-white/50 to-white/20 border-2 border-rose-500/20 rounded-lg ">
            <TabsList className="grid w-full grid-cols-2  text-slate-900  font-semibold bg-black/10">
                <TabsTrigger className="data-[state=active]:bg-amber-800 data-[state=active]:text-white text-black   " value="login">Login</TabsTrigger>

                <TabsTrigger className="data-[state=active]:bg-amber-800 data-[state=active]:text-white text-black " value="signup">SignUp</TabsTrigger>
            </TabsList>
            <Login />
            <Signup />
        </Tabs>
    </div>
</div>
  );
}

export default AuthTabs;