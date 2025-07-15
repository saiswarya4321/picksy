// VerifyOtp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/features/userSlice';
axios.defaults.withCredentials = true;


function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log(baseUrl);

  const handleVerify = async (e) => {
    e.preventDefault();
    const {name, email, password } = JSON.parse(localStorage.getItem('signupData'));

    try {
      const res = await axios.post(`${baseUrl}/otp/verify-otp`, { email, otp });

      if (res.data.success) {
        // Register user
      const res=  await axios.post(`${baseUrl}/user/create`, { name,email, password });
        localStorage.removeItem('signupData');
        console.log("registered user",res.data.saved)
        dispatch(saveUser(res.data.saved))
        navigate('/home');
      } else {
        toast.error('otp error in verify');
      }
    } catch (error) {
      console.error(error);
      toast.error('error in Verification');
    }
  };

  return (
    <div className='min-h-screen bg-blue-50 flex justify-center items-center p-2'>
      <form onSubmit={handleVerify}  
      className='bg-white  p-2 gap-3 border border-none shadow rounded'>
      <input type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required 
      className='min-w-[200px] sm:min-w-[400px] focus:outline-none p-2 '/>
      <button type="submit" className='bg-red-600 text-white p-3 rounded border border-none font-bold'>Verify OTP</button>
    </form>
    </div>
    
  );
}

export default VerifyOtp;
