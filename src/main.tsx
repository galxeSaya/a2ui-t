import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './a2ui/register'
import { applyThemeMode, getInitialThemeMode } from './theme'
import App from './App'
import './index.css'

applyThemeMode(getInitialThemeMode())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

