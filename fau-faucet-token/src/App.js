import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStore } from './store'
import Navigation from './components/layout/Navigation'

function App() {
  const [state, dispatch] = useStore()
  console.log(state);

  return (
    <>
    <Navigation />
  
    </>
  )
}


export default App;