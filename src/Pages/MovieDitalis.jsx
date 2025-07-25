import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../../public/assets'
import SequentialLoadingDots from '../animation/Jumping'
import BlurCircle from '../Componets/BlurCircle'
import { Heart, PlayCircleIcon, StarOff } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelact from '../Componets/DateSelact'
import MovieCard from '../Componets/MovieCard'



function MovieDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShows] = useState()
  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)

    if (show) {
      setShows({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }



  }
  useEffect(() => {
    getShow()

  }, [id])


  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>

      {/* movie detail  */}
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.poster_path} alt="image"
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
        />
        <div className='relative flex flex-col gap'>
          <BlurCircle top='-100px' left='-100px'></BlurCircle>
          <p className='text-primary'>ENGLISH</p>

          <h1>{show.movie.title._id}</h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarOff className='w-5 h-5 text-primary fill-primary'></StarOff>
            {show.movie.vote_average.toFixed(1)} User Rating

          </div>
          <p className='text-gray-300 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
          <p>
            {timeFormat(show.movie.runtime)} . {show.movie.genres.map(genre => genre.name).join(" ,")} .
            {show.movie.release_date.split(" -")[0]}
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-400 hover:bg-gray-900
            transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className='w-5 h-5'></PlayCircleIcon>
              Watch trailer

            </button>
            <a
              className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition
                rounded-md font-medium cursor-pointer active:scale-95 '
              href="#dateSelect">Buy Tickets</a>

            <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
              <Heart className={`w-5 h-5`}></Heart>
            </button>

          </div>

        </div>

      </div>
      {/* end */}


      <div>
        <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>
        <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
          <div className='flex items-center gap-4 w-max px-4'>
            {show.movie.casts.slice(0, 10).map((cast, index) => (
              <div key={index} className='flex flex-col items-center text-center'>
                <img src={cast.profile_path} alt="cast image"
                  className='rounded-full h-20 md:h-20 aspect-square object-cover'
                />
                <p className='font-medium text-xs mt-3'>{cast.name}</p>

              </div>
            ))}

          </div>


        </div>
      </div>

      <div>
        <DateSelact dateTime={show.dateTime} id={id}></DateSelact>
      </div>

      <div>
        <p className='text-lg font-medium mt-20 md-8'>Your May Also like</p>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} ></MovieCard>
          ))}
        </div>
      </div>

      <div className='flex justify-center mt-20'>
        <button
          onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
          className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull
        transition rounded-md font-medium cursor-pointer'
        >
          Show More

        </button>
      </div>
    </div>
  ) : <div className='flex items-center justify-center py-20'>

    <span className='text-5xl m-3'>Loading</span><SequentialLoadingDots></SequentialLoadingDots>

  </div>
}

export default MovieDetails
