
import React, { useEffect, useState } from 'react'
import jewllery from '../img/j2.avif'
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;


function Productlist() {

    const [products, setProducts] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    console.log(apiUrl)

    const listProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/products/allproducts`, { withCredentials: true })
            console.log(response.data.products);
            setProducts(response.data.products)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        listProducts();
    }, [])

    return (
        <div className='flex flex-col    bg-blue-50  md:flex-row p-2 gap-2  '>
            <div className=' overflow-hidden min-h-screen w-10 lg:w-[80px] flex items-center justify-center  fixed top-0 left-0 mr-2' id='left'>
                <img src={jewllery} alt="" className=' h-screen   object-cover' /></div>
            <div className='flex  flex-row justify-center items-center ml-5   mt-3 p-3 overflow-hidden' id='right'>

{products.length === 0 ? (
          <div className='flex justify-center items-center bg-red-500 text-white p-3 w-100 '>No products</div>
        ) : (
          <div className='flex flex-row flex-wrap gap-3 justify-center '>
            {products.map((product, index) => (
                <Link to={`/productdetails/${product._id}`} key={index}>
                
                <div key={index} className='basis-[1/3]  md:basis-[1/4] lg:basis-[1/5] flex flex-col rounded shadow gap-2 p-1 bg-white justify-center items-center hover:shadow-2xl hover:bg-amber-50'>
                <div className='overflow-hidden'><img src={product.image} alt=""  className='w-[150px] h-[150px] md:w-[200px] lg:w-[300px] md:h-[300px]  object-contain'/></div>

                <p className='text-gray-800 text-xs sm:text-sm '>{product.brand}</p>
                <p className='text-black text-md'>₹{product.price}</p>
                </div>

                </Link>
              
            ))}
          </div>
        )}
        
                
            </div>
        </div>
    )
}

export default Productlist
