import React, { useEffect, useState } from 'react'
import banner from '../img/banner.jpg';
import images1 from '../img/image2.jpg'
import images2 from '../img/image1.jpg'

function Carousel() {
    const images = [banner, images1, images2];
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Slide changes every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);
  return (
   <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen overflow-hidden relative  mt-21">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {images.map((img, index) => (
      <div key={index} className="w-full flex-shrink-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen">
        <img
          src={img}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>
  )
}

export default Carousel
