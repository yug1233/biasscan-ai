import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'      // your root component (or replace with LandingPage for quick test)
import './index.css'

console.log('Bootstrapping React') // optional — confirms file was loaded

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
