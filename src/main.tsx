/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

if (import.meta.env.DEV) {
  const axe = await import('@axe-core/react')
  axe.default(React, ReactDOM, 1000)
}

createRoot(document.getElementById('root')!).render(

  <Router>
    <App />
  </Router>
)
