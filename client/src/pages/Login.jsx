import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from '../redux/features/userSlice';

function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const payload = {
    email, password
  }
const validateForm = () => {
        
        let errors = {}
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) {
            return;
        }
      const response = await axios.post(`${baseUrl}/user/login`, payload, { withCredentials: true })
      console.log(response.data.existingUser)

  dispatch(saveUser(response.data.existingUser))
      navigate("/home")
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!');
    }

  }

  return (
    <div className='min-h-screen bg-blue-50 flex flex-col sm:flex-row justify-center items-center '>

      <div></div>
      <div id='Login' className='p-2'>
        <form onSubmit={handleLogin} className='flex flex-col p-4 sm:p-5 gap-2 bg-white shadow rounded   '>
          <input type="email" name="email" placeholder='email' className='p-2 w-[300px] sm:w-[400px] focus:outline-none rounded border border-gray-400'
            onChange={(e) => setEmail(e.target.value)} />
            {formErrors.email && <p className='text-red-500 text-xs '>{formErrors.email}</p>}
          <input type='password' name='password' placeholder='password' className='p-2 w-[300px] sm:w-[400px] focus:outline-none rounded border border-gray-400'
            onChange={(e) => setPassword(e.target.value)} />
            {formErrors.password && <p className='text-red-500 text-xs '>{formErrors.password}</p>}
          <button type='submit' className='bg-blue-600 p-2 text-white rounded w-full font-bold border-none'>LOGIN</button>
          <Link to={"/"}><p className='text-xs text-blue-600 font-bold'>Create an account?</p></Link>
        </form>

      </div>

    </div>
  )
}

export default Login
