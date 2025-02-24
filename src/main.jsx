import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { DataProvider } from './Context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <BrowserRouter basename='/SoftballStatsApp'>
        <App />
        <ToastContainer />
      </BrowserRouter>  
    </DataProvider>
    
  </StrictMode>,
)
