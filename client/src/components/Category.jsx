import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import electronics from '../img/electronics.jpg';
import jewellery from '../img/j1.jpg';
import kids from '../img/kids.jpg';
import mens from '../img/mens.jpg';
import womens from '../img/womens.jpeg';
import axios from 'axios';

const Category = () => {
   

  return (
    <div className="w-full bg-blue-50 p-3 overflow-x-auto whitespace-nowrap ml-5">
      <div className="inline-block w-[250px] sm:w-[300px] md:w-[350px] mr-4 bg-white shadow-xl p-2 rounded hover:shadow-2xl">
        <Link to={`/categorydetails/Electronics`}>
          <img
            src={electronics}
            alt="Electronics"
            className="object-cover w-full h-[80px] sm:h-[120px] md:h-[180px]"
          />
          <p className="text-xs sm:text-sm text-center">Electronics</p>
        </Link>
      </div>

      <div className="inline-block w-[250px] sm:w-[300px] md:w-[350px] mr-4 bg-white shadow-xl p-2 rounded hover:shadow-2xl">
        <Link  to={`/categorydetails/men's wear`}>
          <img
            src={mens}
            alt="Men's clothing"
            className="object-cover w-full h-[80px] sm:h-[120px] md:h-[180px]"
          />
          <p className="text-xs sm:text-sm text-center">Men's clothing</p>
        </Link>
      </div>

      <div className="inline-block w-[250px] sm:w-[300px] md:w-[350px] mr-4 bg-white shadow-xl p-2 rounded hover:shadow-2xl">
        <Link to={`/categorydetails/Women's wear`}>
          <img
            src={womens}
            alt="Women's wear"
            className="object-cover w-full h-[80px] sm:h-[120px] md:h-[180px]"
          />
          <p className="text-xs sm:text-sm text-center">Women's wear</p>
        </Link>
      </div>

      <div className="inline-block w-[250px] sm:w-[300px] md:w-[350px] mr-4 bg-white shadow-xl p-2 rounded hover:shadow-2xl">
        <Link to={`/categorydetails/Kid's wear`}>
          <img
            src={kids}
            alt="Kids wear"
            className="object-cover w-full h-[80px] sm:h-[120px] md:h-[180px]"
          />
          <p className="text-xs sm:text-sm text-center">Kids wear</p>
        </Link>
      </div>

      <div className="inline-block w-[250px] sm:w-[300px] md:w-[350px] mr-4 bg-white shadow-xl p-2 rounded hover:shadow-2xl">
        <Link to={"/categorydetails/Jewellery"}>
          <img
            src={jewellery}
            alt="Jewellery"
            className="object-cover w-full h-[80px] sm:h-[120px] md:h-[180px]"
          />
          <p className="text-xs sm:text-sm text-center">Jewellery</p>
        </Link>
      </div>
    </div>
  );
};

export default Category;
