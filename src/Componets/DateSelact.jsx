import React, { useEffect, useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronsLeftRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion';

const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24']; // red, blue, green, yellow

function DateSelact({ dateTime, id }) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const OnBookHandler = () => {
    if (!selected) {
      return toast('Please select date')
    }
    navigate(`/movies/${id}/${selected}`)
    scrollTo(0, 0)

  }

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
  return (
    <div id='dateSelect' className='pt-30'


    >
      <motion.div
        animate={controls}
        initial={{ borderColor: colors[0] }}
        className='flex flex-col md:flex-row items-center justify-between gap-10
        relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
        <BlurCircle top='-100px' left='-100px'></BlurCircle>
        <BlurCircle top='100px' left='100px'></BlurCircle>

        <div>
          <p className='text-lg font-semibold'>Choose Date</p>

          <div className='flex items-center gap-6 text-sm mt-5'>
            <ChevronLeftIcon width={28}></ChevronLeftIcon>
            <span className='grid grid-cols-4 md:flex-wrap md:max-w-lg gap-4'>
              {Object.keys(dateTime).map((date) => (
                <button key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center 
                            justify-center h-14 w-14 aspect-square
                             rounded cursor-pointer 
                             ${selected === date ? "bg-primary text-white" : " border border-primary/70"}`}>
                  <span>{new Date(date).getDate()}</span>
                  <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
                </button>
              ))}
            </span>

            <ChevronLeftIcon width={28}></ChevronLeftIcon>


          </div>
        </div>
        <button
          onClick={OnBookHandler}
          className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary transition-all cursor-pointer'> Book Now</button>
      </motion.div>

    </div>
  )
}

export default DateSelact
