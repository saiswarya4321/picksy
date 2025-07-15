import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Category from '../components/Category';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
axios.defaults.withCredentials = true;


function ProductDetails() {
     const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    const [product, setProduct] = useState({});


    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();
    console.log(id)
    const fetchProducts = async () => {
        const response = await axios.get(`${apiUrl}/products/product/${id}`, { withCredentials: true })
        console.log(response.data.product);
        setProduct(response.data.product)
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    const addToCart = async () => {
        console.log("Adding product to cart:", product);

        try {
            const payload = {
                productId: product._id,
                quantity: 1
            };
            console.log('Sending to backend:', payload);

            const response = await axios.post(`${apiUrl}/cart/add`, payload, {
                withCredentials: true
            });
            toast.success(response.data.message);
        } catch (error) {
            console.error("Add to cart error:", error.response?.data || error.message);
            toast.error("Failed to add to cart.");
        }
    };
 const handleBuyNow = async (product) => {
  try {
    const buyNowItem = {
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      },
      quantity: 1
    };

    localStorage.setItem('buyNowItem', JSON.stringify(buyNowItem));
    localStorage.setItem('buyNowCartId', product._id);

    const stripe = await stripePromise;

    const response = await axios.post(`${apiUrl}/paymentone/create-checkout-session`, {
      items: [{
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1
      }]
    }, { withCredentials: true });

    await stripe.redirectToCheckout({ sessionId: response.data.id });
  } catch (error) {
    console.error("Buy Now Error:", error);
    toast.error("Something went wrong");
  }
};


    return (
        <div className='min-h-screen flex flex-col md:flex-row p-2 justify-center items-center gap-5 bg-blue-50 mt-21'>

            <div id="first-section" className=' max-w-[600px] overflow-hidden'>
                <img src={product.image} alt="product-img" className='h-90 md:h-120  object-contain'/>
                <div id='buttons' className='flex flex-row items-center justify-center gap-2 p-2 font-bold '>
                    <button className='p-2 bg-amber-400 w-full rounded text-white h-10 text-xs lg:text-md ' onClick={addToCart}>ADD TO CART</button>
                    <button onClick={()=>handleBuyNow(product)} className='w-full bg-amber-500 rounded p-2 text-white h-10 text-xs lg:text-md'>BUY NOW</button>
                </div>
            </div>
            <div id='details' className='flex flex-col gap-2 items-start justify-start p-1 sm:w-300 '>
                <p className='text-md text-gray-600 font-bold'>{product.name}</p>
                <p className='text-sm text-gray-500 '>{product.brand}</p>
                <p className='text-black text-lg font-bold'>₹{product.price}</p>
                <h2 className='text-md'>Available offers</h2>
                <p className='text-gray-500 sm:max-w-[450px]'>Bank Offer5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarterT&C

                    Bank Offer5% cashback on Axis Bank Flipkart Debit Card up to ₹750T&C

                    Bank Offer10% off up to ₹1,500 on BOBCARD EMI Transactions of 6 months and above tenures, Min TxnValue: ₹7,500T&C

                    Combo OfferBuy 2 items save 5%; Buy 3 save 7%; Buy 4+ save 10%See all productsT&C</p>
            </div>
        </div>
    )
}

export default ProductDetails
