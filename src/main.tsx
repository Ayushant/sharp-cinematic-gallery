
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider'
import { ThemeProvider } from '@/components/theme-provider'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <ThemeProvider defaultTheme="light">
          <App />
        </ThemeProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
