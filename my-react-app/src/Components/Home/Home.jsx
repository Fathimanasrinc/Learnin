import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import ProfileCards from '../ProfileCards/ProfileCards'
import ProfilePage from '../ProfilePage/ProfilePage'
import TasksPage from '../TasksPage/TasksPage'
import RequestBox from '../RequestBox/RequestBox'
import AcceptBox from '../AcceptBox/AcceptBox'


function Home() {
   

  return (
    <div>
      <Navbar/>
      <Sidebar/>
    <AcceptBox/>
    </div>
  )
}

export default Home
