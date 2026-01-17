import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppProvider } from './contexts/AppContext.tsx'

// Import design system styles - using 2010s era flat design
import '@wees/design-system/src/styles/base.css'
import '@wees/design-system/src/styles/components.css'
import '@wees/design-system/src/styles/10s.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
