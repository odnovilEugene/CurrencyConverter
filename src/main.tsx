import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Converter from "pages/Converter/Converter.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Converter />
  </React.StrictMode>,
)
