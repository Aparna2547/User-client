import { useState } from 'react'
import signupImg from '../../assets/signup.png'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { signUp } from '../../apis/user';
import OtpForm from '../../components/OtpForm';


const Signup = () => {

    const [passwordView, setPasswordView] = useState(false)
    const [retypePasswordView, setRetypePasswordView] = useState(false)
    const [userDetails,setUserDetails] = useState({
        firstName: '',
        lastName : '',
        password : '',
        confirmPassword : '',
        email : ''
    })

    const [otpForm,setOtpForm] = useState(false)


    const handleSignup = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = (email:string) => emailRegex.test(email);

        if(userDetails.firstName.trim().length < 2){
            return toast.error('Enter first name')
        }

        if(userDetails.lastName.trim().length < 2){
            return toast.error('Enter last name')
        }

        if(userDetails.password.trim().length < 6){
            return toast.error('Password length must be 6 letters')
        }

        if(userDetails.password.trim() !== userDetails.confirmPassword.trim()){
            return toast.error('Passwords are not same')
        }

        if(!isValidEmail(userDetails.email)){
            return toast.error('Enter a valid email')
        }


        const res = await signUp(userDetails)
        console.log('res signup',res)
        if( res && !res.data){
            setOtpForm(true)
        }


    }


    const handleUserDetails = (key:string, value:string) => {
        setUserDetails(prevUser => ({
          ...prevUser,
          [key]: value,
        }));
     };


    return (
        <>
        <div className="flex justify-center items-center min-h-[100vh] flex-wrap gap-5">
            <div className='p-1'>
                <img src={signupImg} width={590} alt="signup" />
            </div>
            <div className="bg-grey-lighter min-h-screen flex flex-col ">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-4">
                    <form onSubmit={handleSignup} className="bg-white px-8 py-8 rounded drop-shadow-lg text-black w-[26rem]">
                        <div className='flex items-center justify-between mb-8'>
                            <div className='flex gap-1'>
                                <h1 className=" text-3xl text-center font-extrabold text-[#3A244A]">Let us know</h1>
                                <h1 className=" text-3xl text-center font-extrabold text-[#D72638]">!</h1>
                            </div>
                            <Link to={'/signin'} className='flex gap-1 text-lg font-semibold cursor-pointer underline'>
                                <h1 className='text-[#3A244A]'>Sign</h1>
                                <h1 className='text-[#D72638]'>In</h1>
                            </Link>
                        </div>
                        <input
                            type="text"
                            className="block border-b border-grey-light w-full p-3 rounded mb-4 outline-none"
                            name="firstName"
                            placeholder="First Name"
                            value={userDetails.firstName}
                            onChange={e => handleUserDetails('firstName',e.target.value)}
                        />
                        <input
                            type="text"
                            className="block border-b border-grey-light w-full p-3 rounded mb-4 outline-none"
                            name="lastName"
                            placeholder="Last Name"
                            value={userDetails.lastName}
                            onChange={e => handleUserDetails('lastName',e.target.value)}
                        />
                        <div className='flex justify-between items-center border-b border-grey-light w-full p-3 rounded mb-4'>
                            <input
                                type={passwordView ? 'text' :"password"}
                                className="block outline-none"
                                name="password"
                                placeholder="Set Password"
                                value={userDetails.password}
                                onChange={e => handleUserDetails('password',e.target.value)}
                            />
                            <div className='text-2xl cursor-pointer' onClick={()=>setPasswordView(!passwordView)}>{passwordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                        </div>
                        <div className='flex justify-between items-center border-b border-grey-light w-full p-3 rounded mb-4'>
                            <input
                                type={retypePasswordView ? "text":"password"}
                                className="block outline-none "
                                name="confirm_password"
                                placeholder="Retype Password"
                                value={userDetails.confirmPassword}
                                onChange={e => handleUserDetails('confirmPassword',e.target.value)}
                            />
                            <div className='text-2xl cursor-pointer' onClick={()=>setRetypePasswordView(!retypePasswordView)}>{retypePasswordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                        </div>
                        <input
                            type="text"
                            className="block border-b border-grey-light w-full p-3 rounded mb-4 outline-none"
                            name="email"
                            placeholder="Email"
                            value={userDetails.email}
                            onChange={e => handleUserDetails('email',e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded-xl bg-[#3A244A] text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            Sign Up
                        </button>

                    </form>
                </div>
            </div>

        </div>
        {otpForm && <OtpForm setOtpForm={setOtpForm}/>}
        </>
    )
}

export default Signup
