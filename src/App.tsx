import React from 'react'
import Header from './components/header'
import Home from './components/pages/home'
import About from './components/pages/about'
import {Route, Routes} from "react-router-dom"
import Search from './components/pages/search'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </>
  )
}

export default App