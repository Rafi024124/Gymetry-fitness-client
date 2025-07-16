import React, { useContext } from 'react';
import { FaGoogle} from "react-icons/fa";
import { AuthContext } from '../contexts/authContext/AuthContext';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
const SocialLogin = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';
  const axiosInstance = useAxios()
  const {signInWithGoogle} = useContext(AuthContext);

   const handleSignInWithGoogle = () =>{

      signInWithGoogle()
      .then(async(result)=>{
        const user = result.user;
         const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user',
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }
        const res = await axiosInstance.post('/users',userInfo);
        console.log("user update info : ", res.data.message);
        
        navigate(from);
        
      })
      .catch(error=>{

       console.error(error);
       
      })
  }

    return (
        <div>
            <button
           onClick={handleSignInWithGoogle}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#A259FF] to-[#00F0FF] text-black shadow-glow hover:brightness-110 hover:bg-[#A259FF] hover:text-[#0D0D0D] transition shadow-glow"
            type="button"
          >
            <FaGoogle />
            Google
          </button>
        </div>
    );
};

export default SocialLogin;