import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../public/assets'
import BlurCircle from '../Componets/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { datefFormate } from '../lib/dateFormet'




function MyBooking() {
  const currency = import.meta.env.VITE_CURRENCY
  const [booking,setBooking] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  const getMyBooking =()=>{
    setBooking(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(()=>{
    getMyBooking()

  })
  
  


  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <div>
        <BlurCircle top='100px' left='100px'></BlurCircle>
        <BlurCircle bottom='0px' right='500px'></BlurCircle>
      </div>
      <h1 className='text-lg font-semibold md-4'>My Booking</h1>
      {booking.map((items,index)=>(
        <div key={index}
        className='flex flex-col md:flex-row justify-between
        bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'
        >
          <div 
          className='flex flex-col md:flex-row'
          >
            <img src={items.show.movie.poster_path} alt=""
            className='md:max-w-45 aspect-video h-auto object-bottom rounded'
            />

            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{items.show.movie.title}</p>
              <p className='text-gray-300 text-sm'>{timeFormat(items.show.movie.runtime)}</p>
               <p className='text-gray-300 text-sm mt-auto'>{datefFormate(items.show.showDateTime)}</p>
            </div>

            <div className=' flex flex-col md:items-end justify-between  md:text-right  p-4'>
              <div className='flex items-center gap-4'>
                <p className='text-2xl font-semibold md-3'>{currency}{items.amount}</p>
                {!items.isPaid && <button className='bg-primary px-4 py-1.5 md-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}
              </div>

              <div className='text-sm'>
                <p><span className='text-gray-400'>Total Tickets : </span> {items.bookedSeats.length}</p>
                <p><span className='text-gray-400'>Seat Number : </span> {items.bookedSeats.join(", ")}</p>
            
              </div>

            </div>


          </div>
        </div>
      ))}
       
      
    </div>
  ) : (
    <div></div>
  )
}

export default MyBooking
