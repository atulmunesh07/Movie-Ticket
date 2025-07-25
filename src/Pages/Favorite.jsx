
import React from 'react'
import {dummyShowsData} from '../../public/assets'
import MovieCard from '../Componets/MovieCard'
import BlurCircle from '../Componets/BlurCircle'
import TypingText from '../animation/Typetext'
import TypingLoop from '../animation/Typetext'

function Favorite() {
    return dummyShowsData.length > 0 ? (
      <div className='relative my-40 md-60 px-6 md:px-16 lg:px-40 xl:px-44
      overflow-hidden min-[80vh]:'>
        <BlurCircle top='150px' left='0px'></BlurCircle>
         <BlurCircle bottom='50px' right='50px'></BlurCircle>
        {/* <h1 className='flex-lg font-medium my-4'>Your Favorite Movies</h1> */}
        {/* <TypingText text='Your Favorite Movies' ></TypingText> */}
         <TypingLoop text="Your Favorite Movies..." speed={100} pause={1000}  className='my-4'/>
  
        <div className='flex flex-wrap max-sm:justify-center mt-5  gap-8'>
          {dummyShowsData.map((movie)=>(
            <MovieCard movie={movie} key={movie._id}></MovieCard>
          ))}
        </div>
      </div>
    ):(
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>No Movies Available</h1>
      </div>
      
    )
}

export default Favorite
