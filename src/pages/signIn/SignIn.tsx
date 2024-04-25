import { useEffect, useState } from 'react'
import signinImg from '../../assets/signin.png'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signIn } from '../../apis/user';

const SignIn = () => {

    const [passwordView, setPasswordView] = useState(false)

    const [userDetails,setUserDetails] = useState({
        email : '',
        password : ''
    })


    const navigate = useNavigate()

   
    const handleSignIn = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = (email:string) => emailRegex.test(email);

        if(!isValidEmail(userDetails.email)){
            return toast.error('Enter a valid emai')
        }

        if(userDetails.password.trim().length < 6){
            return toast.error('Enter minimum 6 characters')
        }

        const res = await signIn(userDetails)
        console.log('res login',res)
        if (res && res.data) {
            localStorage.setItem('token', res.data.token);
            toast.success(res.data.message);
            console.log('Before navigation');
            navigate('/');
            console.log('After navigation');
        }

    }


    return (
        <div className="flex justify-center items-center min-h-[100vh] flex-wrap gap-5">
            <div className=''>
                <img src={signinImg} width={590} alt="signup" />
            </div>
            <div className="bg-grey-lighter min-h-screen flex flex-col ">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-4">
                    <form onSubmit={handleSignIn} className="bg-white px-8 py-8 rounded drop-shadow-lg text-black w-[26rem]">
                        <div className='flex items-center justify-between mb-8'>
                            <div className='flex gap-1'>
                                <h1 className=" text-3xl text-center font-extrabold text-[#3A244A]">Fill what we know</h1>
                                <h1 className=" text-3xl text-center font-extrabold text-[#D72638]">!</h1>
                            </div>
                        </div>
                        <input
                            type="text"
                            className="block border-b border-grey-light w-full p-3 rounded mb-4 outline-none"
                            name="email"
                            placeholder="Email"
                            value={userDetails.email}
                            onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                        />
                        <div className='flex justify-between items-center border-b border-grey-light w-full p-3 rounded mb-4'>
                            <input
                                type={passwordView ? 'text' :"password"}
                                className="block outline-none"
                                name="password"
                                placeholder="Set Password"
                                value={userDetails.password}
                                onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                            />
                            <div className='text-2xl cursor-pointer' onClick={()=>setPasswordView(!passwordView)}>{passwordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-center py-3 font-semibold rounded-xl bg-[#3A244A] text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            Sign In
                        </button>
                        <Link to={'/signup'}>
                        <div
                            className="w-full text-center py-3 font-semibold border-2 border-[#3A244A] rounded-xl bg-white text-[#3A244A] hover:bg-green-dark focus:outline-none my-1"
                        >
                            Sign Up
                        </div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
