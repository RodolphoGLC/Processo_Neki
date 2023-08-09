import React from 'react';
import ReactDOM from 'react-dom/client';
import './Global.css';
import { Rotas } from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Rotas />
  </React.StrictMode>,
)
