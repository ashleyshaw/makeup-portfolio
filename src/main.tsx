/**
 * @fileoverview Main entry point for the Ash Shaw Makeup Portfolio application
 * Bootstraps React app with proper error handling and performance monitoring
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';
import { SafetyWrapper } from './components/common/SafetyWrapper';

// Initialize aggressive extension error suppression immediately
import('./utils/extensionErrorSuppressor').then(({ initializeExtensionErrorSuppression }) => {
  initializeExtensionErrorSuppression();
}).catch(() => {
  // Silently fail if module not available
});

// Ensure we have a root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.');
}

// Create React root and render the application
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SafetyWrapper debug={import.meta.env.DEV}>
      <App />
    </SafetyWrapper>
  </React.StrictMode>
);

// Add performance monitoring in development
if (import.meta.env.DEV) {
  // @ts-ignore - reportWebVitals is optional
  import('./reportWebVitals.ts').then(({ reportWebVitals }) => {
    reportWebVitals(console.log);
  }).catch(() => {
    // reportWebVitals is optional, silently fail if not available
  });
}

// Register service worker for production caching (optional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}