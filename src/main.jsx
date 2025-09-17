import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Ensure fresh loads always start at the top/Hero and do not restore prior scroll/hash
try {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  if (window.location.hash) {
    // Remove any hash so the browser does not auto-scroll to anchors on initial load
    const { pathname, search } = window.location
    window.history.replaceState(null, '', pathname + search)
  }
  // Reset scroll position synchronously before React mounts
  window.scrollTo(0, 0)
} catch (_) {
  // no-op
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
