import React from 'react'

import { assets } from '../../../public/assets'
import { Link } from 'react-router-dom'

function AdminNavbar() {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/20'>
        <Link to='/'>
        <img src="image.png" alt=""  className='w-12 h-auto'/>
        </Link>
      
    </div>
  )
}

export default AdminNavbar
