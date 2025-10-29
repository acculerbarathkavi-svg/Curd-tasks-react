
import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import DrawerAppBar from './Components/MuiNavbar'
import {Routes,Route} from 'react-router-dom'
import Navigation from './Components/Navigation'
import View from './Components/View'


const App = () => {
  return (
    <> 
    <DrawerAppBar/>
    
    <Routes >
      <Route path='/' element={<Home/>}/>
      <Route path='/view' element={<View/>}/>
    </Routes>
   

    
    {/* <Home/> */}

    {/* <Navbar />     */}
    {/* <MuiNavbar/>
    <Home /> */}
    </>
  )
}

export default App