import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
axios.defaults.withCredentials = true;

function Orders() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [orders, setOrders] = useState([])
  const getOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/order/orders`, { withCredentials: true })
      console.log("Orders API Response:", response.data.orders);
      setOrders(response.data.orders)
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }
  useEffect(() => {
    getOrders();
  }, [])

  return (
    <div className='min-h-screen bg-blue-50 flex flex-col flex-wrap gap-4 p-5 items-center mt-21'>
  {orders.map(order => (
    <div
      key={order._id}
      className='basis-full sm:basis-1/2 lg:basis-1/4 bg-white rounded shadow p-4 md:w-[700px]'>
      <p><strong>Order Id:</strong> {order._id}</p>
      <p><strong>Total Items:</strong> {order.items.length}</p>
      <p><strong>Total amount:</strong> ₹{order.totalAmount}</p>

      {order.items.map((item, index) => (
        <div key={index} className='flex gap-4 mt-2'>
          <img src={item.product?.image} className='w-24 h-24 object-contain rounded' />
          <div>
            <p><strong>Name:</strong> {item.product?.name}</p>
            <p><strong>Brand:</strong> {item.product?.brand}</p>
            <p><strong>Price:</strong> ₹{item.product?.price}</p>
          </div>
        </div>
      ))}
    </div>
    
  ))}
  {orders.length===0 && (<div className='text-center bg-red-600 text-white p-3 rounded shadow'>You have no orders</div>)}
</div>

  )
}

export default Orders
