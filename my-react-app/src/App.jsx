import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './Sidebar/Sidebar.jsx'
import './App.css'
import Signup from './Signup/Signup.jsx'
import Login from './Login/Login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Signup/>
    </>
  )
}

export default App
