import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;

function CategoryDetails() {
    const { category } = useParams();

    const [products, setProducts] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    console.log(apiUrl)

    const listProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/products/allproducts`, { withCredentials: true })
            const allProducts = response.data.products;
             const filtered = allProducts.filter(product => product.category === category);
      setProducts(filtered);
            console.log(allProducts);
            
        } catch (error) {
            console.log(error.message)
        }
       
    }
    useEffect(() => {
        listProducts();
    }, [])
  return (
    <div className='min-h-screen  bg-blue-50 flex flex-col  p-2 gap-2 mt-21'>
        
        <p className='text-xl text-gray-500 font-semibold'>{category}</p>
     <div className='flex  flex-wrap gap-2 items-center justify-center'>
        {products.map(product=>
(<Link to={`/productdetails/${product._id}`} key={product._id} className=' hover:bg-blue-200'>
<div key={product._id} className='p-2 flex flex-col justify-center items-center  sm:basis-[1/3] lg:basis-[1/4]  shadow rounded gap-2  '>
<div className='overflow-hidden'><img src={product.image} alt={product.name} className="w-[200px] h-[170px] md:w-[200px] lg:w-[300px] md:h-[300px]  object-contain" /></div>
    
            <h2 className="text-sm text-gray-500 font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">₹{product.price}</p>
</div>
</Link>)
        )}
     </div>
     {products.length === 0 && <p className="text-white mt-4 text-center bg-green-500 p-2 md:p-4 rounded shadow ">No products found in this category.</p>}
    </div>
  )
}

export default CategoryDetails
