import { useEffect, useState } from "react";
import welcome from "../../assets/welcome.jpeg";
import ResetPassword from "../../components/ResetPassword";
import { userData } from "../../apis/user";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logout, setToken } from "../../Store/Slice";

interface RootState{
  auth:{
      token: string
  }
  }
const Dashboard = () => {
  const [resetPassword,setResetPassword] = useState(false)
  const [name,setName] = useState(null)
  const [email,setEmail] = useState(null)
 const dispatch = useDispatch()

 const {token} = useSelector((state:RootState)=>state.auth)

  useEffect(()=>{
    const fetchData = async () =>{
      const res = await userData()
      console.log('sd',res)
      if(res && res.data){
        setName(res.data.firstName)
        setEmail(res.data.email)
      }
      console.log('hello bye');
      
    }
    fetchData()
  },[])


  const handleLogout = async () =>{
    dispatch(logout())
    toast.success("logged out successfully")
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] w-full gap-2 ">
      <div className="flex p-5 gap-3">
        <div className="border border-gray-300 p-5 lg:w-2/4 w-full rounded">
          <img src={welcome} width={200} alt="" />
          <h1 className="text-2xl text-center">WELCOME TO USER DASHBOARD</h1>
        
        </div>
        <div className="border border-gray-300 p-5 lg:w-1/2 w-full rounded">
          <h1 className="text-2xl text-center font-bold">USER DETAILS</h1>
          <hr className="mb-5" />
          <div className="flex mt-2 items-center">
            <h1 className="mx-3 font-bold">Name: </h1>
            <h1 className="block border-b border-grey-light w-full p-3 rounded  outline-none">{name}</h1>
          </div>
          <div className="flex mt-2 items-center">
            <h1 className="mx-3 font-bold">Email: </h1>
            <h1 className="block border-b border-grey-light w-full p-3 rounded  outline-none">{ email}</h1>
          </div>

          <div className="mb-0 ">
          <button className="px-4 py-1 bg-blue-800 text-2xl font-semibold text-white rounded-md mt-3 w-full" onClick={()=>setResetPassword(true)}>
            Change Password
          </button>
          <button className="px-4 py-1 bg-red-800 text-2xl font-semibold text-white rounded-md mt-3  w-full" onClick={handleLogout}>
            Logout
          </button>
          </div>
        </div>
      </div>
      {resetPassword && <ResetPassword setResetPassword={setResetPassword} />}
    </div>
  );
};

export default Dashboard;
