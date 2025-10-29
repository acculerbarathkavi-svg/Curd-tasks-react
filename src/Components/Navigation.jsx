import React from 'react'
import Home from './Home'
import MuiNavbar from './MuiNavbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Navigation = () => {
  return (
    <> 
      <BrowserRouter basename="/Curd-tasks-react">
        <Routes>
          <Route path='/' element={<Home/>} />
          {/* <Route path='/home' element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Navigation
