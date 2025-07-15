// Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
axios.defaults.withCredentials = true;


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
  setEmail('');
  setPassword('');
}, []);
console.log(baseUrl);
const [formErrors, setFormErrors] = useState({ email: "", password: "",name:"" })

const validateForm = () => {
        
        let errors = {}
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(name===''){
          errors.name='Please enter your name';
          isValid=false;
        }
        if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email!';
            isValid = false;
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long!';
            isValid = false;
        }
        setFormErrors(errors)
        return isValid;
    }

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
            return;
        }
    try {
      await axios.post(`${baseUrl}/otp/send-otp`, { email });
      localStorage.setItem('signupData', JSON.stringify({ email, password ,name}));
      setEmail('');
    setPassword('');
    setName('')
      navigate('/verify-otp');
    } catch (error) {
      console.error(error);
      toast.error('OTP error.');
    }
  };

  return (
    <div className='min-h-screen bg-blue-50 flex justify-center items-center p-2'>
    <form onSubmit={handleSendOtp} className='flex flex-col gap-2 border border-none shadow rounded p-6 bg-white ' autoComplete="off">
      
      <input type='text' name='name' id='name' placeholder='Name' onChange={(e) => setName(e.target.value)} 
      className=' border border-gray-200  rounded p-2  min-w-[300px] sm:min-w-[400px] focus:outline-none'/>
       {formErrors.name && <p className='text-red-500 text-xs '>{formErrors.name}</p>}
      <input type="email" placeholder="Email" name='email' onChange={(e) => setEmail(e.target.value)}
       className=' border border-gray-200 rounded p-2  min-w-[300px] sm:min-w-[400px] focus:outline-none' />
        {formErrors.email && <p className='text-red-500 text-xs '>{formErrors.email}</p>}
      <input type="password" placeholder="Password" name='password' onChange={(e) => setPassword(e.target.value)} 
       className=' border border-gray-200 rounded p-2  min-w-[300px] sm:min-w-[400px] focus:outline-none'/>
        {formErrors.password && <p className='text-red-500 text-xs '>{formErrors.password}</p>}
      <button type="submit" className='bg-blue-700 text-white p-3 rounded font-bold'>Send OTP</button>
      <Link to={"/login"}><p className='text-xs text-blue-600 font-bold'>Already have an account?</p></Link>
    </form>
    </div>
  );
}

export default Signup;
