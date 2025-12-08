import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

console.log('Bootstrapping React')

// Define your component
function App() {
  return (
    <h1>BiasScan AI 🚀</h1>
  )
}

// Mount it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export default App
