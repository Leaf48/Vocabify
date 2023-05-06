import React from 'react'
import Header from './components/navigation/Header'
import Footer from './components/navigation/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import {Route, Routes} from "react-router-dom"
import Search from './components/pages/Search'


function App() {
  return (
    <>
      <Header />
      <div className='app-container'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App