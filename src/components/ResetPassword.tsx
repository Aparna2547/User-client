import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { changePassword } from "../apis/user";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  setResetPassword(data: boolean): void;
}

const ResetPassword = ({ setResetPassword }: Props) => {
  const [passwordView, setPasswordView] = useState(false);
  const [newPasswordView, setNewPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSubmit = async (e: any) => {
    e.preventDefault();
    if (password.trim().length < 6) {
      return toast.error("Enter the old password");
    }
    if (newPassword.trim().length < 6) {
      return toast.error("Enter the new password");
    }
    if (confirmPassword.trim().length < 6 || newPassword !== confirmPassword) {
      return toast.error("Confirm  the new password");
    }

    const res = await changePassword(password, newPassword);
    console.log("res change", res);
    if (res) {
      toast.success(res.data.message);
      setResetPassword(false);
    }
  };

  return (
    <div className="flex w-full justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600 bg-opacity-50 px-6">
      <div className="relative bg-white px-6 pt-4 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="flex justify-end mb-2 text-3xl cursor-pointer">
          <IoMdClose onClick={() => setResetPassword(false)} />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Change Password</p>
            </div>
          </div>
          <div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="flex flex-col space-y-16">
                <div className=" justify-center text-center px-2 ">
                  

                  <div className='flex justify-between items-center border-b border-grey-light w-full p-3 rounded mb-4'>
                            <input
                                type={passwordView ? 'text' :"password"}
                                className="block outline-none"
                                placeholder="Enter the  current password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <div className='text-2xl cursor-pointer' onClick={()=>setPasswordView(!passwordView)}>{passwordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                        </div>

                        <div className='flex justify-between items-center border-b border-grey-light w-full p-3 rounded mb-4'>
                            <input
                                type={newPasswordView ? 'text' :"password"}
                                className="block outline-none"
                                placeholder="Enter the  new password"
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                            <div className='text-2xl cursor-pointer' onClick={()=>setNewPasswordView(!newPasswordView)}>{newPasswordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                        </div>

                        <div className='flex justify-between items-center border-b border-grey-light w-full p-3 rounded mb-4'>
                            <input
                                type={confirmPasswordView ? 'text' :"password"}
                                className="block outline-none"
                                placeholder=" confirm new password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                            <div className='text-2xl cursor-pointer' onClick={()=>setConfirmPasswordView(!confirmPasswordView)}>{confirmPasswordView ? <AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                        </div>
                  
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#3A244A] border-none text-white text-sm shadow-sm"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
