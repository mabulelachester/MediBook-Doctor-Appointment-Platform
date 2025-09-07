import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* -----LEFT SECTION ----- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Your health, our priority – Secure, reliable, and easy appointments.</p>
        </div>

        {/* ---- Centre SECTION */}
        <div >
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-2  text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>

        </div>

        {/* ---- RIGHT SECTION */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2  text-gray-600'>
            <li>011 770 9276</li>
            <li>admin@healthmatters.org.za</li>
          </ul>

        </div>
      </div>
       {/* ------ COPYRIGHT TEXT -----*/}
      <div>
       <hr />
       <p className='py-5 text-sm text-center'>Copyright 2025@ Prescripto . All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
