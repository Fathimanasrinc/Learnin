import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import ProfileCards from '../ProfileCards/ProfileCards'


function Home() {

  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <ProfileCards/>
    </div>
  )
}

export default Home
