import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSubmit } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../../public/assets'
import Loading from '../animation/Loading'
import { ArrowRight, ClockIcon } from 'lucide-react'
import isoTimeFormate from '../lib/isotime'
import { motion, useAnimation } from "framer-motion";
import BlurCircle from '../Componets/BlurCircle'
import toast from 'react-hot-toast'

function SeatLayout() {
  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const navigate = useNavigate()

  const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24']; // red, blue, green, yellow

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)

    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()

  }, [])

  //=====using to select seat============//
  const groupRows =[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]

  const handlesSeatClick = (seatId)=>{
    if(!selectTime){
      return toast("Please select time first")
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
      return toast("you can only select 5 seats")

    }
    setSelectedSeats(prev =>prev.includes(seatId) ? prev.filter(seat =>seat !== seatId) :[...prev,seatId])
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          return (
            <button key={seatId} onClick={() => handlesSeatClick
              (seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer
               ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}
            >
              {seatId}

            </button>
          )
        })}
      </div>
    </div>

  )

  //======select seat==========//

  //border
  const controls = useAnimation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycle = async () => {
      while (true) {
        await controls.start({
          borderColor: colors[index],
          transition: { duration: 0.6 },
        });
        setIndex((prev) => (prev + 1) % colors.length);
        await new Promise((res) => setTimeout(res, 600));
      }
    };

    cycle();
  }, [controls, index]);

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 '>

      {/* Available Timings */}
      <motion.div
        animate={controls}
        initial={{ borderColor: colors[0] }}
        className='w-60 bg-primary/10 border border-primary/20  rounded-lg py-10
      h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>

        <div className='mt-5 space-y-1'>
          {show.dateTime[date].map((item) => (

            <div key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 
            w-max rounded-r-md cursor-pointer transition
            ${selectTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/70"}
            `}>

              <ClockIcon className='w-4 h-4'></ClockIcon>
              <p className='text-sm'>{isoTimeFormate(item.time)}</p>
            </div>
          ))}
        </div>

      </motion.div>

      {/* seat Layout */}

      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top='-100px' left='-100px'></BlurCircle>
        <BlurCircle bottom='0px' right='0px'></BlurCircle>
        <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>
        
         {/* ---------------------first Row------------------ */}
        <div className='flex flex-col items-center mt-10 text-xs text-gray-400'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 md-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>

           {/* ----------2 row ----------------------------------- */}
        <div className='grid grid-cols-2 gap-11 m-2'>
          {groupRows.slice(1).map((group,idx)=>(
            <div>
              {group.map(row =>renderSeats(row))}
            </div>
          ))}

        </div>
        </div>
        {/* --------------------------end-------------------- */}

        <button 
        onClick={()=>navigate('/my-bookings')}
        className='flex items-center gap-1 mt-20 px-10 py-3 text-sm 
        bg-primary hover:bg-primary-dull transition rounded-full font-medium
        cursor-pointer active:scale-95'
        >Proceed to Checkout <ArrowRight strokeWidth={3} className='w-4 h-4'></ArrowRight></button>

      </div>



    </div>
  ) : (
    <div className='flex items-center justify-center py-20'>
      <Loading></Loading>
    </div>

  )
}

export default SeatLayout
