import React from 'react';
import { FaGoogle} from "react-icons/fa";
const SocialLogin = () => {
    return (
        <div>
            <button
            onClick={() => alert("Google login placeholder")}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#A259FF] text-[#A259FF] hover:bg-[#A259FF] hover:text-[#0D0D0D] transition shadow-glow"
            type="button"
          >
            <FaGoogle />
            Google
          </button>
        </div>
    );
};

export default SocialLogin;