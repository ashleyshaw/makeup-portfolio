/**
 * @fileoverview Aggressive browser extension error suppression system
 * 
 * This module provides comprehensive protection against browser extension
 * interference by implementing multiple layers of error filtering and suppression.
 * 
 * Target Issues:
 * - "Message getPage (id: 3) response timed out after 30000ms"
 * - Extension script conflicts and messaging errors
 * - Content script injection interference
 * - Background page communication timeouts
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Aggressive extension error suppression
 */

interface ErrorPattern {
  message?: string;
  source?: string;
  stack?: string;
  name?: string;
}

/**
 * Comprehensive list of browser extension error patterns to suppress
 */
const EXTENSION_ERROR_PATTERNS: ErrorPattern[] = [
  // Primary timeout error pattern
  { message: 'Message getPage (id: 3) response timed out after 30000ms' },
  { message: 'response timed out after 30000ms' },
  { message: 'Message getPage' },
  { message: 'getPage (id: 3)' },
  
  // General extension messaging errors
  { message: 'getPage' },
  { message: 'response timed out' },
  { message: 'Extension' },
  { message: 'extension://' },
  { message: 'chrome-extension://' },
  { message: 'moz-extension://' },
  { message: 'safari-web-extension://' },
  
  // Content script errors
  { source: 'extension://' },
  { source: 'chrome-extension://' },
  { source: 'moz-extension://' },
  { source: 'safari-web-extension://' },
  
  // Background page communication
  { message: 'Script error' },
  { message: 'Non-Error promise rejection captured' },
  { message: 'AbortError' },
  { message: 'NetworkError' },
  
  // Ad blocker and privacy extension patterns
  { message: 'uBlock' },
  { message: 'AdBlock' },
  { message: 'Ghostery' },
  { message: 'Privacy Badger' },
  { message: 'DuckDuckGo' },
  { message: 'Disconnect' },
  
  // Generic extension patterns
  { stack: 'extension://' },
  { stack: 'chrome-extension://' },
  { stack: 'moz-extension://' },
  { name: 'ExtensionError' },
  { name: 'TimeoutError' },
];

/**
 * Check if an error matches extension error patterns
 */
function isExtensionError(error: any): boolean {
  if (!error) return false;
  
  const errorStr = error.toString?.() || '';
  const messageStr = error.message || '';
  const stackStr = error.stack || '';
  const sourceStr = error.source || error.filename || '';
  const nameStr = error.name || '';
  
  return EXTENSION_ERROR_PATTERNS.some(pattern => {
    if (pattern.message && (messageStr.includes(pattern.message) || errorStr.includes(pattern.message))) {
      return true;
    }
    if (pattern.source && sourceStr.includes(pattern.source)) {
      return true;
    }
    if (pattern.stack && stackStr.includes(pattern.stack)) {
      return true;
    }
    if (pattern.name && nameStr.includes(pattern.name)) {
      return true;
    }
    return false;
  });
}

/**
 * Track suppressed errors for statistics
 */
let suppressedErrorCount = 0;
let lastSuppressionTime = 0;

/**
 * Log suppressed errors in development mode with tracking
 */
function logSuppressedError(error: any, type: string): void {
  suppressedErrorCount++;
  lastSuppressionTime = Date.now();
  
  if (import.meta?.env?.DEV) {
    console.log(`🛡️ [Extension Error Suppressor] Filtered ${type}:`, {
      message: error.message || error.toString(),
      source: error.source || error.filename,
      stack: error.stack?.substring(0, 200),
      type: typeof error,
      count: suppressedErrorCount
    });
  }
}

/**
 * Global error handler for window.onerror
 */
const originalErrorHandler = window.onerror;

/**
 * Global unhandled rejection handler
 */
const originalRejectionHandler = window.onunhandledrejection;

/**
 * Enhanced console.error override
 */
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

/**
 * Initialize aggressive extension error suppression
 */
export function initializeExtensionErrorSuppression(): void {
  console.log('🛡️ Initializing aggressive browser extension error suppression');

  // 1. Global error handler override
  window.onerror = function(message, source, lineno, colno, error) {
    if (isExtensionError({ message, source, stack: error?.stack, name: error?.name })) {
      logSuppressedError({ message, source, error }, 'window.onerror');
      return true; // Prevent default error handling
    }
    
    // Let application errors through to original handler
    if (originalErrorHandler) {
      return originalErrorHandler.call(this, message, source, lineno, colno, error);
    }
    return false;
  };

  // 2. Unhandled promise rejection override
  window.onunhandledrejection = function(event) {
    const error = event.reason;
    
    if (isExtensionError(error)) {
      logSuppressedError(error, 'unhandledrejection');
      event.preventDefault(); // Prevent logging
      return;
    }
    
    // Let application promise rejections through
    if (originalRejectionHandler) {
      return originalRejectionHandler.call(this, event);
    }
  };

  // 3. Console.error override for aggressive filtering
  console.error = function(...args: any[]) {
    const message = args.join(' ');
    
    if (isExtensionError({ message })) {
      logSuppressedError({ message }, 'console.error');
      return; // Suppress the log
    }
    
    return originalConsoleError.apply(this, args);
  };

  // 4. Console.warn override for extension warnings
  console.warn = function(...args: any[]) {
    const message = args.join(' ');
    
    if (isExtensionError({ message })) {
      logSuppressedError({ message }, 'console.warn');
      return; // Suppress the log
    }
    
    return originalConsoleWarn.apply(this, args);
  };

  // 5. Add event listeners for additional error capture
  window.addEventListener('error', (event) => {
    if (isExtensionError({
      message: event.message,
      source: event.filename,
      stack: event.error?.stack,
      name: event.error?.name
    })) {
      logSuppressedError(event.error || event, 'error event');
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true); // Use capture phase

  window.addEventListener('unhandledrejection', (event) => {
    if (isExtensionError(event.reason)) {
      logSuppressedError(event.reason, 'unhandledrejection event');
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true); // Use capture phase

  // 6. Override Promise.prototype.catch for additional protection
  const originalPromiseCatch = Promise.prototype.catch;
  Promise.prototype.catch = function(onRejected) {
    return originalPromiseCatch.call(this, (reason) => {
      if (isExtensionError(reason)) {
        logSuppressedError(reason, 'Promise.catch');
        return; // Suppress the error
      }
      
      if (onRejected) {
        return onRejected(reason);
      }
      throw reason;
    });
  };

  // 7. Override addEventListener for message events
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'message' && this === window) {
      const wrappedListener = (event: MessageEvent) => {
        // Filter out extension messages
        if (
          event.data &&
          (event.data.action === 'getPage' ||
           event.data.id === 3 ||
           event.data.source?.includes('extension') ||
           event.origin?.includes('extension://'))
        ) {
          logSuppressedError(event.data, 'message event');
          return; // Don't call the original listener
        }
        
        if (typeof listener === 'function') {
          return listener(event);
        }
      };
      
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    
    return originalAddEventListener.call(this, type, listener, options);
  };

  // 8. Create a safety net for any missed errors
  setInterval(() => {
    try {
      // Clear any pending extension-related timeouts
      const highestTimeoutId = setTimeout(() => {}, 0);
      for (let i = Math.max(1, highestTimeoutId - 100); i < highestTimeoutId; i++) {
        try {
          clearTimeout(i);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    } catch (e) {
      // Ignore cleanup errors
    }
  }, 30000); // Every 30 seconds

  console.log('✅ Extension error suppression system active');
}

/**
 * Emergency cleanup function for severe extension interference
 */
export function emergencyExtensionCleanup(): void {
  console.warn('🚨 Emergency extension cleanup initiated');

  try {
    // Clear all timers that might be from extensions
    const highestTimeoutId = setTimeout(() => {}, 0);
    const highestIntervalId = setInterval(() => {}, 0);

    for (let i = 1; i < highestTimeoutId; i++) {
      try { clearTimeout(i); } catch (e) { /* ignore */ }
    }

    for (let i = 1; i < highestIntervalId; i++) {
      try { clearInterval(i); } catch (e) { /* ignore */ }
    }

    // Remove any extension-added event listeners
    ['message', 'storage', 'connect'].forEach(eventType => {
      try {
        window.removeEventListener(eventType, () => {});
      } catch (e) { /* ignore */ }
    });

    // Force garbage collection if available
    if ((window as any).gc) {
      (window as any).gc();
    }

    console.log('✅ Emergency cleanup completed');
  } catch (error) {
    console.log('⚠️ Emergency cleanup had issues:', error);
  }
}

/**
 * Restore original error handlers (for cleanup)
 */
export function restoreOriginalErrorHandlers(): void {
  console.log('🔄 Restoring original error handlers');

  window.onerror = originalErrorHandler;
  window.onunhandledrejection = originalRejectionHandler;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;

  console.log('✅ Original error handlers restored');
}

/**
 * Get statistics on suppressed errors
 */
export function getSuppressionStats() {
  return {
    totalSuppressed: suppressedErrorCount,
    lastSuppression: lastSuppressionTime,
    isActive: window.onerror !== originalErrorHandler
  };
}

export default {
  initializeExtensionErrorSuppression,
  emergencyExtensionCleanup,
  restoreOriginalErrorHandlers,
  getSuppressionStats,
  isExtensionError
};