import React from 'react'
import ReactDOM from 'react-dom/client'
// El CSS global se importa ANTES de App para que los módulos CSS
// de cada componente ganen la cascada ante reglas globales de igual especificidad.
import './styles/global.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
