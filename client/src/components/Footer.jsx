import React from 'react'

function Footer() {
  return (
   <footer className="bg-gray-100 text-gray-700 mt-2 w-full relative bottom-0 right-0 ">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {/* Brand Section */}
      <div>
        <h2 className="text-2xl font-bold text-[#6C63FF] mb-2">Picksy</h2>
        <p className="text-sm">Your one-stop shop for curated fashion, accessories, and more.</p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
        <ul className="space-y-1 text-sm">
          <li><a href="/home" className="hover:text-[#6C63FF]">Home</a></li>
          <li><a href="/productlist" className="hover:text-[#6C63FF]">Products</a></li>
          <li><a href="/cart" className="hover:text-[#6C63FF]">Cart</a></li>
          <li><a href="/orders" className="hover:text-[#6C63FF]">orders</a></li>
        </ul>
      </div>

      {/* Customer Service */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
        <ul className="space-y-1 text-sm">
          <li><a href="/home" className="hover:text-[#6C63FF]">FAQs</a></li>
          <li><a href="/home" className="hover:text-[#6C63FF]">Shipping</a></li>
          <li><a href="/home" className="hover:text-[#6C63FF]">Returns</a></li>
          <li><a href="/home" className="hover:text-[#6C63FF]">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
        <p className="text-sm">Email: <a href="mailto:support@picksy.com" className="hover:text-[#6C63FF]">support@picksy.com</a></p>
        <p className="text-sm">Phone: <a href="tel:+919876543210" className="hover:text-[#6C63FF]">+91 98765 43210</a></p>
        
      </div>

    </div>
  </div>

  {/* Bottom Bar */}
  <div className="bg-gray-200 text-center py-4 text-sm text-gray-600">
    &copy; {new Date().getFullYear()} Picksy. All rights reserved.
  </div>
</footer>


  )
}

export default Footer
