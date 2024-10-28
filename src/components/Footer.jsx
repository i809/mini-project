import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo_new} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Welcome to our tech accessories store! We're a team of tech enthusiasts offering innovative, high-quality, and stylish gadgets to enhance your digital experience. We curate our collection with a focus on functionality, design, and variety to meet diverse needs and preferences. Our commitment to you includes reliable customer service, flexible returns, and secure payment options. Thank you for choosing us. Explore our site to find the perfect tech accessories for you!
                        </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
            <li><a href="/">Home</a></li>
                <li><a href="/about">About us</a></li>
                <li><a href="/contact">Contact us</a></li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 7592400825 </li>
                <li>contact@wetech.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ wetech.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
