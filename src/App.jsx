
import NavBar from './Componets/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePAge from './Pages/Home'

import MoviePage from './Pages/Movie'
import MovieDetails from './Pages/MovieDitalis'
import SeatLayout from './Pages/SealtLayout'
import MyBooking from './Pages/MyBooking'
import Favorite from './Pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './Componets/Footer'
import Layout from './Pages/Addmin/Layout.jsx'
import DashBoard from './Pages/Addmin/DashBoard'
import AddShows from './Pages/Addmin/AddShows'
import ListShows from './Pages/Addmin/ListShows'
import ListBooking from './Pages/Addmin/ListBooking'

function App() {
  const isAdminRouter = useLocation().pathname.startsWith('/admin')
  return (
    <div>
      
      <Toaster></Toaster>
      {!isAdminRouter && <NavBar></NavBar>}

      <Routes>
        <Route path='/' element={<HomePAge></HomePAge>}></Route>
        <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
        <Route path='/movies/:id' element={<MovieDetails></MovieDetails>}></Route>
        <Route path='/movies/:id/:date' element={<SeatLayout></SeatLayout>}></Route>
        <Route path='/my-bookings' element={<MyBooking></MyBooking>}></Route>
        <Route path='/favorite' element={<Favorite></Favorite>}></Route>
{/* ==================this routing to used Admin pages================== */}
        <Route path='/admin/*' element={<Layout></Layout>}>
        <Route index element={<DashBoard></DashBoard>}/>
        <Route path='add-shows' element={<AddShows></AddShows>} />
        <Route path='list-show' element={<ListShows></ListShows>}/>
        <Route  path='list-bookings' element={<ListBooking></ListBooking>}/>
        </Route>
        {/* ==================end====================================== */}
      </Routes>
      {!isAdminRouter && <Footer></Footer>}

      
  
  </div>
  
  )
}

export default App
