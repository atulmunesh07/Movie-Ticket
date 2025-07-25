import { ChartLineIcon, CircleDashedIcon, icons, StarIcon, UsersIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../../public/assets'
import Loading from '../../animation/Loading'
import Title from '../../Componets/admins/Titale'
import BlurCircle from '../../Componets/BlurCircle'
import { datefFormate } from '../../lib/dateFormet'

function DashBoard() {

    const currency = import.meta.env.VITE_CURRENCY

    const [dashBoardData,setDashBoardData] = useState({
        totalBooking:0,
        totalRevenue:0,
        activeShows:[],
        totalUser:0
    })

    const [loading ,setLoading] = useState(true)

    const dasbordCard =[
        {title:"Total Booking", value: dashBoardData.totalBooking || '0' , icon:ChartLineIcon},
        {title:"Total Revenue", value: currency+dashBoardData.totalRevenue || '0' , icon:CircleDashedIcon},
        {title:"Active Show", value: dashBoardData.activeShows.length || '0' , icon:UsersIcon}
        
    ]

    const fetchDashboardData = async ()=>{
        setDashBoardData(dummyDashboardData)
        setLoading(false)
    }
    useEffect(()=>{
        fetchDashboardData()
    },[])





  return !loading ? (
    <>
    <Title text1="Admin" text2='DashBoard' ></Title>

    <div className='relative flex flex-wrap gap-4 mt-6'>
        <BlurCircle left='0' top='100px'></BlurCircle>
        <div className='flex flex-wrap gap-4 w-full cursor-pointer'>
          {dasbordCard.map((card,index)=>(

            <div key={index}
            className='flex items-center justify-between px-4 py-3 bg-primary/10
            border border-primary/20 rounded-md max-w-50 w-full'
            >
                <div>
                    <h1 className='text-sm'>{card.title}</h1>
                    <p className='text-xl font-medium mt-1'>{card.value}</p>
                </div>
                <card.icon className='w-6 h-6'></card.icon>

            </div>
          ))}

        </div>

    </div>

    <p className='mt-10 text-lg font-medium'>Active show</p>

    <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
        <BlurCircle top='100px' left='10px'></BlurCircle>

        {dashBoardData.activeShows.map((show)=>(
            <div
            key={show._id} 
            className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10
            border border-primary/20 hover:translate-y-1 transition duration-300'>
                <img src={show.movie.poster_path} 
                alt=""
                className='h-60 w-full object-cover'
                />
                <p className='font-medium p-2 truncate'>{show.movie.title}</p>

                <div className='flex items-center justify-between px-2'>
                    <p className='text-lg font-medium'>{currency}{show.showPrice}</p>
                    <p className='flex items-center gap-1 text-xs text-gray-400 mt-1 pr-1'>
                        <StarIcon className='w-4 h-4 text-primary fill-primary'>
                        </StarIcon>
                         {show.movie.vote_average.toFixed(1)}
                    </p>
                </div>
                <p className='px-2 pt-2 text-gray-500'>{datefFormate(show.showDateTime)}</p>

            </div>
        ))}


    </div>

      
    </>
  ):(<Loading></Loading>)
}

export default DashBoard
