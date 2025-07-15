
import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

function Cart() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const [quantity, setQuantity] = useState({});
    const [cart, setCart] = useState([])
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const fetchCart = async () => {
        try {
            const response = await axios.get(`${apiUrl}/cart/getcart`, { withCredentials: true })
            console.log(response.data.cartItems);
            setCart(response.data.cartItems)
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    toast.error(error.response.data.message || 'User not authenticated');
                } else {
                    toast.error('Something went wrong while fetching cart');
                }
            } else {
                toast.error('Network error. Please check your connection.');
            }
            console.error("Error fetching cart:", error);
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchCart();
    }, [])

    const totalItemPrice = useMemo(() => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].product.price * cart[i].quantity;
        }
        return total;
    }, [cart]);

    const grandTotal = useMemo(() => {
        const platformFee = 4;
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].product.price * cart[i].quantity + platformFee;
        }
        return total;
    }, [cart]);
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${apiUrl}/cart/delete/${id}`, { withCredentials: true });
            setCart(prevCart => prevCart.filter(item => item._id !== id));
            toast.success("Removed")
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;

            const response = await axios.post(`${apiUrl}/payment/create-checkout-session`, {
                items: cart.map(item => ({
                    name: item.product.name,
                    image: item.product.image,
                    price: item.product.price,
                    quantity: item.quantity
                }))
            }, { withCredentials: true });

            await stripe.redirectToCheckout({ sessionId: response.data.id });
        } catch (error) {
            console.error("Stripe Checkout Error:", error);
            toast("Error redirecting to payment");
        }
    };

    const handleBuyNow = async (item) => {
        try {
            localStorage.setItem('buyNowItem', JSON.stringify(item));         
        localStorage.setItem('buyNowCartId', item._id);   
        
            const stripe = await stripePromise;

            const response = await axios.post(`${apiUrl}/paymentone/create-checkout-session`, {
                items: [{
                    name: item.product.name,
                    image: item.product.image,
                    price: item.product.price,
                    quantity: item.quantity
                }]
            }, { withCredentials: true });

            await stripe.redirectToCheckout({ sessionId: response.data.id });
        } catch (error) {
            console.error("Buy Now Error:", error);
            toast("Something went wrong");
        }
    };


    return (
        <div id='screen' className='min-h-screen bg-blue-50 p-4 flex flex-col gap-2 justify-center items-center mb-2 mt-21'>
            <h2 className='text-gray-500 font-bold'>My cart</h2>
            {cart.length === 0 ? (<div>Your cart is empty</div>) : (
                <>

                    {cart.map((item, index) => (
                        <div id='main' className='flex flex-row gap-4 p-5 sm:p-3  rounded shadow bg-white ' key={index}>

                            <div id='left' className='flex flex-col gap-4 '>

                                <div className='overflow-hidden w-[150px] md:w-[200px] lg:w-[300px] shadow rounded'><img src={item.product?.image} alt="" className='object-contain' /></div>
                                <p className='text-gray-500 text-sm'>Quantity</p>
                                <select
                                    value={item.quantity}  // Bind current quantity of this item
                                    onChange={(e) => {
                                        const updatedCart = [...cart];
                                        updatedCart[index].quantity = parseInt(e.target.value); // update quantity
                                        setCart(updatedCart); // update state
                                    }}
                                    className='w-[100px] sm:w-[200px] border border-gray-400 rounded'
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>

                            </div>
                            <div id='right' className='flex flex-col sm:justify-center sm:gap-1 p-2 '>
                                <p className='text-gray-600'>{item.product?.name}</p>
                                <p className='text-gray-400'>{item.product?.brand}</p>
                                <p>₹{item.product?.price}</p>
                                <p className='text-gray-500'>Offers</p>
                                <p className='max-w-[400px] md:max-w-[600px] text-xs md:text-md text-justify leading-[1.3] sm:leading-relaxed text-gray-400'>Bank Offer5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarterT&C

                                    Bank Offer5% cashback on Axis Bank Flipkart Debit Card up to ₹750T&C

                                    Bank Offer10% off up to ₹1,250 on Axis Bank Credit Card Txns, Min Txn Value: ₹4,990T&C

                                    Bank Offer10% off up to ₹1,500 on Axis Bank Credit Card EMI Txns, Min Txn Value: ₹4,990T&C</p>
                                <div className='flex flex-row gap-2'><button onClick={(e) => handleRemove(item._id)} className='p-1 sm:p-2 bg-white text-gray-500 text-xs sm:text-sm
                                border border-gray-500 w-[100px] sm:w-[200px] rounded   mt-2'>Remove</button>
                                    <button key={item._id} onClick={() => handleBuyNow(item)} className='p-1 sm:p-2 bg-white text-gray-500 text-xs sm:text-sm
                                border border-gray-500 w-[100px] sm:w-[200px] rounded mt-2 '>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}


                </>)}

            <div id="total">
                {cart.length > 0 && (
                    <div className=' flex flex-col gap-3 mt-2 bg-white shadow p-4 rounded w-[300px] md:w-[500px] lg:w-[600px] items-center text-center'>
                        <h2 className='text-gray-500'> Price ({cart.length} items)</h2>
                        <p>Items Total: ₹{totalItemPrice}</p>
                        <p className='text-gray-400'>Platform Fee: ₹{cart.length * 4}</p>
                        <h3 className='text-lg font-semibold text-blue-700'> Total</h3>
                        <p className='text-xl text-green-600 font-bold'>₹{grandTotal}</p>
                        <button onClick={handleCheckout}
                            className='bg-amber-300 p-2 rounded text-gray-600 font-semibold w-[200px] sm:w-[300px] '> Place Order</button>
                    </div>

                )}
            </div>

        </div>
    )
}

export default Cart
