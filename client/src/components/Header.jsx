import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../../../../todo/client/src/redux/features/userSlice';

function Header() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user.value);
 


useEffect(() => {
    if(user && user._id){
      setIsLoggedIn(true);
       console.log("header user is",user)
    }
    else{
      setIsLoggedIn(false)
    }
  }, [user]);

   const handleLogout = async () => {
  try {
    await axios.post(`${apiUrl}/user/logout`, {}, { withCredentials: true });

    setIsLoggedIn(false);
    dispatch(removeUser())
    navigate('/login'); // or wherever you want
  } catch (err) {
    console.error("Logout failed", err);
  }
};
  return (
   <header className="flex justify-between items-center w-full p-6 bg-white shadow-md fixed top-0 left-0  z-50 mb-5">
    <div className="text-2xl font-bold flex flex-row justify-center items-center">
        <h1 className='text-[#6C63FF]'>PICKSY</h1><div className='mt-1'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd" />
</svg>


        </div>
      </div>

      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : '☰'}
        </button>
      </div>

      <nav className={`${menuOpen ? 'block' : 'hidden'} sm:flex`}>

        <ul className="flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-6 mt-4 sm:mt-0">
          {isLoggedIn ? (
    <>
      <Link to="/home"><li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
  <path fill-rule="evenodd" d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z" clip-rule="evenodd" />
</svg>
</li></Link>
      <Link to="/cart"><li>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
</svg>

        </li></Link>
      <Link to="/orders"><li>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
</svg>

        </li></Link>
      <li>
        <button onClick={handleLogout} className="text-white bg-amber-800 hover:bg-amber-500 p-3 rounded-3xl shadow font-bold">Logout</button>
      </li>
    </>
  ) : (
    <>
      <Link to="/"><li className='bg-green-600 text-white rounded-3xl p-2 text-xs sm:text-sm sm:p-3 shadow hover:bg-green-300'>Get Start</li></Link>
      <Link to="/login"><li className='bg-amber-600 text-white rounded-3xl p-2 text-xs sm:text-sm sm:p-3 shadow hover:bg-amber-300'>SignIn</li></Link>
    </>
  )}

        </ul>
      </nav>

   </header>

  )
}

export default Header
