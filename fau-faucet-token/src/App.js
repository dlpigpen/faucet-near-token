import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom'

import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import Wrapper from './pages/Wrapper'
import Faucet from './pages/Faucet'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
      <Route path="/" element={<Faucet />} />
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/wrapper" element={<Wrapper />} />
        
      </Routes>
      <Footer />
    </>
  )
}


export default App;