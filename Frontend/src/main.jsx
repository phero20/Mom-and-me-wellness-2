import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authcontext';
import { ReportProvider } from './context/reportcontext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ReportProvider>
      <App />
    </ReportProvider>
  </AuthProvider>,
)
