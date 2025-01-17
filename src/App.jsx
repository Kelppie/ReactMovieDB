import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie/:id" element={<MovieDetail />}/>
      </Routes>
    </div>
  )
}
