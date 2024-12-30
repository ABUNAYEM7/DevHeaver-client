import React from 'react'
import Navbar from '../shared/Header/Navbar'
import Footer from '../shared/Footer/Footer'
import { Outlet, useLocation } from 'react-router'
import Banner from '../Components/Banner'

const MainLayout = () => {
    const {pathname} = useLocation()

  return (
   <div className="max-w-screen-2xl mx-auto">
     <header>
      <Navbar/>
      {
        pathname === '/'&& <Banner/>
      }
    </header>
    <main className='max-w-screen-xl min-h-[500px] mx-auto'>
      <Outlet/>
    </main>
    <footer>
      <Footer/>
    </footer>
   </div>
  )
}

export default MainLayout
