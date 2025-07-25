import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../../public/assets'
import Loading from '../../animation/Loading'
import Title from '../../Componets/admins/Titale'
import { datefFormate } from '../../lib/dateFormet'

function ListShows() {
  const currency = import.meta.env.VITE_CURRENCY

  const [show, setShow] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllShows = async () => {
    try {
      setShow([{
        movie: dummyShowsData[0],
        showDateTime: '2025-06-30T02:30:00.000Z',
        showPrince: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3"
        }
      }])

      setLoading(false)
    } catch (error) {
      console.error(error.message)

    }
  }

  useEffect(() => {
    getAllShows()

  }, [])
  return !loading ? (
    <>
      <Title text1='List' text2="Shows" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden
      text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Booking</th>
              <th className='p-2 font-medium'>Earnings</th>

            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {show.map((show, index) => (
              <tr key={index}
                className='border-b border-primary/10 bg-primary/5  even:bg-primary/10'
              >
                <td className='p-2 min-w-40 pl-5'>{show.movie.title}</td>
                <td className='p-2'>{datefFormate(show.showDateTime)}</td>
                <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                <td className='p-2'>{currency}{Object.keys(show.occupiedSeats).length * show.showPrince}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </>
  ) : (
    <Loading></Loading>
  )
}

export default ListShows
