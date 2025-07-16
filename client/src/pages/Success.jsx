import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;




function Success() {
  const hasRun = useRef(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    if (hasRun.current) return; // already ran, skip
  hasRun.current = true;      // mark as run
    const placeCartOrder = async () => {
      try {
        
        await axios.post(`${apiUrl}/order/order-cart`, {}, { withCredentials: true });

        console.log(" Full cart order created & cart cleared");
      } catch (error) {
        console.error(" Cart order error:", error?.response?.data || error.message);
      }
    };

  //  if (!sessionStorage.getItem("cartOrderPlaced")) {
  //   sessionStorage.setItem("cartOrderPlaced", "true");

    // 🔁 Wait for cookie to be available
    setTimeout(() => {
      placeCartOrder();
    }, 500); // ✅ 500ms delay works in most cases
  // }


  }, []);

  return (
    <div className='min-h-screen bg-blue-50 flex flex-col gap-2 justify-center items-center'>
      <div className='p-3 bg-green-600 text-white rounded'>
         Payment Successful! Full Cart Ordered.
      </div>
       <Link to={"/orders"}><div className='bg-violet-500 text-white text-center p-3 rounded shadow'>Go to orders</div></Link>
    </div>
  );
}

export default Success;
