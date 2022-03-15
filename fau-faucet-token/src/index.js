import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './global.css'
import { StoreProvider } from './store'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.querySelector('#root')
);

window.openNav = function() {
  var x = document.getElementById("navDemo");
  
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}