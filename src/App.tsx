import React from 'react'
import Header from './components/navigation/Header'
import Footer from './components/navigation/Footer'
import Home from './components/pages/Home'
import About from './components/pages/About'
import {Route, Routes} from "react-router-dom"
import Search from './components/pages/search/Search'
import { WordProvider } from './components/pages/search/WordContext'


function App() {
  return (
    <>
      <Header />
      {/* <div className='app-container'> */}
      <div className='component-container'>
        <WordProvider>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </WordProvider>
      </div>
      <Footer />
    </>
  )
}

export default App