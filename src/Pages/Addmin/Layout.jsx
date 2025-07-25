import React from 'react'
import AdminNavbar from '../../Componets/admins/AdminNavbar'
import AdminSidebar from '../../Componets/admins/AdminSidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <AdminNavbar/>
    <div className='flex'>
        <AdminSidebar></AdminSidebar>

        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)]
        overflow-y-auto
        '>
            <Outlet/>
        </div>
    </div>
      
    </>
  )
}

export default Layout
