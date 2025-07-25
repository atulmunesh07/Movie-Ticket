import React from 'react'
import { assets } from '../../public/assets'
import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CustomCursor from '../animation/mouse'

function HeroSection() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-start justify-center gap-4
    px-6 md:px-16 lg:px-36 bg-[url("backgroundImage.png")] 
    bg-cover bg-center h-screen
    '>
        <CustomCursor></CustomCursor>

            <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20' />
            <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold
        max-w-110'>Guardians <br /> Of the Galaxy</h1>

            <div className='flex items-center gap-4 text-gray-300'>
                <span>Action | Adventure | Sci-Fi</span>
                <div className='flex items-center gap-1'>
                    <Calendar1Icon className='w-4.5 h-4.5' /> 2018
                </div>

                <span>Action | Adventure | Sci-Fi</span>
                <div className='flex items-center gap-1'>
                    <ClockIcon className='w-4.5 h-4.5' /> 2018
                </div>
            </div>
            <p className='mxa-w-md text-gray-300'>
                Find and book tickets for movies of various genres and
                <br /> languages near you with BookMyShow. Explore the <br /> latest Bollywood, Hollywood, Tollywood and Kollywood movies, <br />trailers, reviews
            </p>
            <button className='flex items-center gap-1 px-6 py-3 text-sm bg-primary
            hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
            onClick={()=> navigate('/movies')}
            >Explore Movie
                <ArrowRight className='w-5 h-5'></ArrowRight>
            </button>


        </div>
    )
}

export default HeroSection
