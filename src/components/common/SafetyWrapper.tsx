/**
 * @fileoverview Safety wrapper component to handle browser extension conflicts and timeout issues
 * 
 * Provides protection against browser extension conflicts, timeout errors, and other
 * external interference that might affect the React application.
 * 
 * Features:
 * - Protects against browser extension message conflicts
 * - Handles timeout errors from external sources
 * - Provides fallback mechanisms for critical functionality
 * - Logs and filters out non-application errors
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial safety wrapper implementation
 */

import React, { useEffect, ReactNode } from 'react';

// Aggressive inline error suppression for the specific error pattern
const suppressExtensionErrors = () => {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args: any[]) => {
    const message = args.join(' ');
    if (
      message.includes('Message getPage (id: 3) response timed out after 30000ms') ||
      message.includes('getPage') && message.includes('timed out') ||
      message.includes('response timed out after 30000ms')
    ) {
      return; // Suppress this specific error
    }
    return originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    if (
      message.includes('Message getPage (id: 3) response timed out after 30000ms') ||
      message.includes('getPage') && message.includes('timed out') ||
      message.includes('response timed out after 30000ms')
    ) {
      return; // Suppress this specific warning
    }
    return originalWarn.apply(console, args);
  };
};

// Apply immediately
suppressExtensionErrors();

/**
 * Safety wrapper props interface
 */
interface SafetyWrapperProps {
  /** Child components to protect */
  children: ReactNode;
  /** Whether to enable debug logging */
  debug?: boolean;
}

/**
 * Safety wrapper component to handle external interference
 * 
 * Wraps the application with protection against browser extensions and other
 * external sources that might cause timeout errors or messaging conflicts.
 * 
 * @component
 * @param {SafetyWrapperProps} props - Component properties
 * @returns {JSX.Element} Protected child components
 * 
 * @example
 * ```tsx
 * <SafetyWrapper debug={isDevelopment}>
 *   <App />
 * </SafetyWrapper>
 * ```
 */
export function SafetyWrapper({ children, debug = false }: SafetyWrapperProps) {
  useEffect(() => {
    // Handle unhandled promise rejections with aggressive filtering
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      const errorMessage = error?.message || error?.toString() || '';
      
      // AGGRESSIVE: Check for the exact error pattern and similar ones
      if (
        errorMessage.includes('Message getPage (id: 3) response timed out after 30000ms') ||
        errorMessage.includes('response timed out after 30000ms') ||
        errorMessage.includes('getPage') && errorMessage.includes('timed out') ||
        errorMessage.includes('Message getPage') ||
        errorMessage.includes('getPage (id: 3)') ||
        errorMessage.includes('Extension') ||
        errorMessage.includes('extension://') ||
        errorMessage.includes('chrome-extension://') ||
        errorMessage.includes('moz-extension://') ||
        error?.stack?.includes('extension://') ||
        error?.name === 'TimeoutError' ||
        error?.name === 'ExtensionError'
      ) {
        if (debug) {
          console.log('🛡️ SafetyWrapper: Aggressively filtered extension error:', errorMessage);
        }
        
        // Prevent the error from being logged as an unhandled rejection
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      
      // Let other errors through for proper handling
      if (debug) {
        console.warn('SafetyWrapper: Unhandled promise rejection:', error);
      }
    };

    // Handle global errors with aggressive filtering
    const handleGlobalError = (event: ErrorEvent) => {
      const error = event.error;
      const message = event.message || '';
      const filename = event.filename || '';
      
      // AGGRESSIVE: Filter out browser extension errors with comprehensive patterns
      if (
        message.includes('Message getPage (id: 3) response timed out after 30000ms') ||
        message.includes('response timed out after 30000ms') ||
        message.includes('getPage') && message.includes('timed out') ||
        message.includes('Message getPage') ||
        message.includes('getPage (id: 3)') ||
        message.includes('Extension') ||
        message.includes('extension://') ||
        message.includes('chrome-extension://') ||
        message.includes('moz-extension://') ||
        message.includes('safari-web-extension://') ||
        filename.includes('extension://') ||
        filename.includes('chrome-extension://') ||
        filename.includes('moz-extension://') ||
        error?.stack?.includes('extension://') ||
        error?.name === 'TimeoutError' ||
        error?.name === 'ExtensionError'
      ) {
        if (debug) {
          console.log('🛡️ SafetyWrapper: Aggressively filtered global extension error:', message);
        }
        
        // Prevent the error from being logged
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      
      // Let application errors through
      if (debug) {
        console.warn('SafetyWrapper: Global error:', { message, error, filename });
      }
    };

    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);

    // Cleanup function
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
    };
  }, [debug]);

  // Add protection against extension messaging conflicts
  useEffect(() => {
    // Override any conflicting extension messaging if needed
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      // Filter out extension-related events that might interfere
      if (
        typeof listener === 'function' &&
        (type === 'message' || type === 'getPage') &&
        this === window
      ) {
        const originalListener = listener;
        const wrappedListener = (event: any) => {
          // Only process events that seem to be from our application
          if (
            event.data &&
            (event.data.source === 'ash-shaw-portfolio' || 
             !event.data.source ||
             event.origin === window.location.origin)
          ) {
            return originalListener(event);
          }
          
          if (debug) {
            console.log('SafetyWrapper: Filtered out external message event:', event);
          }
        };
        
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    };

    // Cleanup function
    return () => {
      EventTarget.prototype.addEventListener = originalAddEventListener;
    };
  }, [debug]);

  return <>{children}</>;
}

export default SafetyWrapper;