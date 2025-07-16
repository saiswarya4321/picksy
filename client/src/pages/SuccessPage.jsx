import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

function SuccessPage() {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return; // already ran, skip
  hasRun.current = true;      // mark as run
    const placeOrder = async () => {
      const itemString = localStorage.getItem('buyNowItem');

      if (itemString) {
        try {
          const item = JSON.parse(itemString);

          // ✅ Step 1: Create order — backend also removes from cart
          await axios.post(`${apiUrl}/order/order-buy`, { item }, { withCredentials: true });

          console.log('Order created & item removed from cart (via backend)');

          // ✅ Step 2: Clean up localStorage
          localStorage.removeItem('buyNowItem');
          localStorage.removeItem('buyNowCartId');
        } catch (error) {
          console.error("Order creation error:", error?.response?.data || error.message);
        }
      }
    };

    placeOrder();
  }, []);

  return (
    <div className='min-h-screen bg-blue-50 flex justify-center items-center'>
      <div className='p-3 bg-green-600 text-white rounded shadow'>
        ✅ Payment Successful! Order Placed.
      </div>
      <Link to={"/orders"}><div className='bg-violet-500 text-white text-center p-3 rounded shadow'>Go to orders</div></Link>
    </div>
  );
}

export default SuccessPage;
