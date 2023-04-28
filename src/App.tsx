import React from 'react'
import Header from './components/header'
import Home from './components/pages/home'
import About from './components/pages/about'
import {Route, Routes} from "react-router-dom"


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </>
  )
}

export default App