import React, { useEffect, useRef } from 'react';
import axios from 'axios';
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

   if (!sessionStorage.getItem("cartOrderPlaced")) {
      sessionStorage.setItem("cartOrderPlaced", "true");
      placeCartOrder();
    }
  }, []);

  return (
    <div className='min-h-screen bg-blue-50 flex justify-center items-center'>
      <div className='p-3 bg-green-600 text-white rounded'>
         Payment Successful! Full Cart Ordered.
      </div>
    </div>
  );
}

export default Success;
