import React, { useContext } from 'react'


import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
      <h1 className='text-3xl font-medium'>Our Top Doctors ready to be Booked</h1>
      <p className='sm:w-1/3 text-center text-sm '>Check out our top doctors who are ready to help you</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {doctors.slice(0,10).map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer  hover:translate-y-[-10px]  transition-all duration-500' key={index}>
                <img className='bg-blue-50 ' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-[#5f6FFF] text-white px-12 py-3 rounded-full mt-10 cursor-pointer hover:bg-blue-500 transition-colors'>
  More
</button>


    </div>
  )
}

export default TopDoctors
