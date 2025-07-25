import { Link, useNavigate } from 'react-router-dom'
import { motion, useAnimation } from "motion/react"
import { TiThMenu } from "react-icons/ti";

import { assets } from '../../public/assets'
import { SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24']; // red, blue, green, yellow

function NavBar() {

  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser() //this heat the clerk lib
  const { openSignIn } = useClerk()

  const navigate = useNavigate()


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
    <div className='fixed top-0 last-0 z-50 w-full flex items-center
    justify-between px-6 md:px-16 lg:px-36 py-5'>
      {/* ---logo--- */}
      <Link to={'/'} className='max-md:flex-1' >
        <motion.img
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          src='image.png' alt="" className='w-13 h-auto text-white shadow-2xl shadow-amber-500' />
      </Link>
      {/* ---end-log--- */}


      {/* ---menu to big screen to-- */}
      <motion.div 
        animate={controls}
        initial={{ borderColor: colors[0] }}
      className={`max-md:absolute max-md:top-0 max-md:last-0 max-md:font-medium 
      max-md:text-lg z-50 flex flex-col md:flex-row items-center
      max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
      min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
      border-gray-300/20 overflow-hidden transition-[width] duration-300  ${isOpen ? "max-md:w-full" : "max-md:w-0"}`}>

        {/* ---mobile-icons */}
        <XIcon
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' />


        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to={'/'}>Home</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to={'/movies'}>Movies</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to={'/'}>Theaters</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to={'/'}>Releases</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to={'/favorite'}>Favorites</Link>

      </motion.div>
      {/* ----end menu---------- */}

      {/* -search-- */}
      <div className='flex items-center gap-8'>
        <SearchIcon className='max-md:hidden w-6 cursor-pointer' />


        {
          !user ? (
            <button
              onClick={openSignIn}
              className='px-4 py-1 sm:px-7 sm:py-2 bg-primary
        hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>LogIn</button>)
            : (
              // this using to clerk 
             <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action 
                label="My Bookings"
                labelIcon={<TicketPlus width={15}/>}
                onClick={()=>navigate('/my-bookings')}

                />
              </UserButton.MenuItems>

             </UserButton>
             //end 
            )

        }


      </div>
      {/* --end search-- */}


      {/* --- Mobile menu icon-- */}
      <TiThMenu
        onClick={() => setIsOpen(!isOpen)}
        className='max-md:ml-4 md:hidden w-8 h-10 cursor-pointer text-white' />
      {/* ---end menu----- */}
    </div>
  )
}

export default NavBar
