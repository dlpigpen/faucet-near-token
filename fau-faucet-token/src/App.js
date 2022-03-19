import React, { useContext } from "react";
import { Routes, Route } from 'react-router-dom'

import { useStore } from './store'
import Navigation from './components/layout/Navigation'
import Home from './pages/Home'
import Wrapper from './pages/Wrapper'


function App() {
  const [state, dispatch] = useStore()
  console.log(state);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Wrapper />} />
      </Routes>
    </>
  )
}


export default App;