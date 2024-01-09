import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import DetailMovie from './pages/DetailMovie'
import TvShow from './pages/TvShow'
import DetailTv from './pages/DetailTv'


function App() {


  return (
    <Router>
      <Routes>
        < Route path='/' element={<Dashboard/>} />
        < Route path='/tvshow' element={<TvShow/>} />

        < Route path='/movie/:id' element={<DetailMovie/>} />
        < Route path='/tv/:id' element={<DetailTv/>} />


      </Routes>
    </Router>
  )
}

export default App
