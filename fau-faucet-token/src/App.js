import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom'

import { useStore } from './store'
import Navigation from './components/layout/Navigation'
import Home from './pages/Home'
import Wrapper from './pages/Wrapper'


function App() {
  return (
    <>
      <Navigation />
      <Routes>
      <Route path="/" element={<Wrapper />} />
        <Route path="/wrapper" element={<Wrapper />} />
      </Routes>
    </>
  )
}


export default App;