import React, { use, useEffect, useState } from 'react'
import { dummyBookingData } from '../../../public/assets'
import Loading from '../../animation/Loading'
import Title from '../../Componets/admins/Titale'
import { datefFormate } from '../../lib/dateFormet'

function ListBooking() {

  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBooking] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getBooking = async () => {
    setBooking(dummyBookingData)
    setLoading(false)
  }

  useEffect(() => {
    getBooking()
  }, [])
  return !isLoading ? (
    <>
      <Title text1={'List'} text2={"Booking"}></Title>

      <div className='max-w-4xl mt-6 overscroll-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>User Name</th>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Seats</th>
              <th className='p-2 font-medium'>Amount</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {bookings.map((items, index) => (
              <tr key={index}
                className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'
              >
                <td className='p-2 min-w-45 pl-5'>{items.user.name}</td>
                <td className='p-2'>{items.show.movie.title}</td>
                <td className='p-2'>{datefFormate(items.show.showDateTime)}</td>
                <td className='p-2'>{Object.keys(items.bookedSeats).map(seat =>
                  items.bookedSeats[seat]).join(", ")}</td>
                <td>{currency}{items.amount}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>


    </>
  ) : <Loading />
}

export default ListBooking
