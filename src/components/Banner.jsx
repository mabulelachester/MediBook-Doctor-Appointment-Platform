import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col md:flex-row bg-[#5f6FFF] rounded-lg px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10'>
            
            {/*--------Left Side ------------*/}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p className='whitespace-nowrap'>Book Appointment</p>
                    <p className='mt-4 whitespace-nowrap'>With 100+ Top Doctors</p>
                </div>
                <button
                    onClick={() => { navigate('/login'); scrollTo(0, 0); }}
                    className='mt-6 bg-white text-[#5f6FFF] font-medium px-6 py-3 rounded-full hover:scale-105 transition-transform cursor-pointer'
                >
                    Create Account
                </button>
            </div>
            
            {/*--------Right Side------------*/}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                <img
                    className='w-full h-auto object-contain absolute bottom-0 right-0 max-w-md'
                    src={assets.appointment_img}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Banner;
