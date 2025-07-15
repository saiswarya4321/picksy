import React from 'react'

import Carousel from '../components/Carousel';
import Category from '../components/Category';
import Productlist from './Productlist';
function Home() {
  return (
   
    <div className=' overflow-hidden'>
      <Carousel/>
    <Category/>
    <Productlist/>
    </div>
    
    
  )
}

export default Home
