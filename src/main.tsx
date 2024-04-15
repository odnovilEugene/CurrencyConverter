import React from 'react'
import ReactDOM from 'react-dom/client'
import 'styles/index.scss'
import Converter from "components/Converter/Converter.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Converter />
  </React.StrictMode>,
)