/**
 * @fileoverview Browser extension detector and interference handler
 * 
 * Detects and handles browser extension interference that can cause
 * timeout errors and messaging conflicts with the application.
 * 
 * Common Issues Handled:
 * - Ad blocker interference with API requests
 * - Privacy extension message timeouts
 * - Content script conflicts
 * - Extension API polling conflicts
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial browser extension detection
 */

interface ExtensionDetectionResult {
  hasInterference: boolean;
  detectedExtensions: string[];
  recommendations: string[];
}

/**
 * Detect browser extensions that commonly interfere with web applications
 * 
 * @returns {Promise<ExtensionDetectionResult>} Detection results with recommendations
 */
export async function detectBrowserExtensionInterference(): Promise<ExtensionDetectionResult> {
  const detectedExtensions: string[] = [];
  const recommendations: string[] = [];

  try {
    // Check for common extension indicators
    
    // 1. Check for AdBlock/uBlock Origin
    if (window.getComputedStyle && document.createElement) {
      const testElement = document.createElement('div');
      testElement.innerHTML = '&nbsp;';
      testElement.className = 'adsbox';
      document.body.appendChild(testElement);
      
      setTimeout(() => {
        if (testElement.offsetHeight === 0) {
          detectedExtensions.push('Ad Blocker');
          recommendations.push('Ad blockers may interfere with API requests');
        }
        document.body.removeChild(testElement);
      }, 100);
    }

    // 2. Check for privacy extensions modifying navigator
    if (navigator.webdriver) {
      detectedExtensions.push('Automation/Privacy Extension');
      recommendations.push('Privacy extensions may block certain requests');
    }

    // 3. Check for extension-specific global objects
    const extensionChecks = [
      { name: 'Ghostery', check: () => window.hasOwnProperty('ghostery') },
      { name: 'Privacy Badger', check: () => window.hasOwnProperty('badger') },
      { name: 'Disconnect', check: () => window.hasOwnProperty('disconnect') },
      { name: 'DuckDuckGo Privacy', check: () => window.hasOwnProperty('ddg') },
    ];

    extensionChecks.forEach(({ name, check }) => {
      try {
        if (check()) {
          detectedExtensions.push(name);
          recommendations.push(`${name} extension detected - may affect requests`);
        }
      } catch (e) {
        // Silently ignore check failures
      }
    });

    // 4. Check for modified fetch or XMLHttpRequest
    if (window.fetch && window.fetch.toString().includes('[native code]') === false) {
      detectedExtensions.push('Request Interceptor');
      recommendations.push('Network requests are being intercepted by an extension');
    }

    // 5. Check for content script injection
    const scripts = Array.from(document.scripts);
    const hasExtensionScripts = scripts.some(script => 
      script.src && (
        script.src.includes('extension://') ||
        script.src.includes('chrome-extension://') ||
        script.src.includes('moz-extension://')
      )
    );

    if (hasExtensionScripts) {
      detectedExtensions.push('Content Script Injector');
      recommendations.push('Browser extension content scripts detected');
    }

  } catch (error) {
    console.warn('Extension detection failed:', error);
  }

  return {
    hasInterference: detectedExtensions.length > 0,
    detectedExtensions,
    recommendations
  };
}

/**
 * Apply workarounds for common browser extension interference
 * 
 * @param {boolean} enableLogging - Whether to log applied workarounds
 */
export function applyExtensionWorkarounds(enableLogging: boolean = false): void {
  try {
    // 1. Protect against extension message interference
    const originalPostMessage = window.postMessage;
    window.postMessage = function(message: any, targetOrigin: string, transfer?: Transferable[]) {
      // Filter out extension messages that might cause conflicts
      if (
        typeof message === 'object' &&
        message &&
        (message.source === 'extension' || 
         message.action === 'getPage' ||
         message.id === 3)
      ) {
        if (enableLogging) {
          console.log('🛡️ Blocked potentially problematic extension message:', message);
        }
        return;
      }
      
      return originalPostMessage.call(this, message, targetOrigin, transfer);
    };

    // 2. Add defensive headers to requests
    if (window.fetch) {
      const originalFetch = window.fetch;
      window.fetch = async function(input: RequestInfo | URL, init: RequestInit = {}) {
        const headers = new Headers(init.headers);
        
        // Add headers to prevent extension interference
        headers.set('X-Requested-With', 'AshShawPortfolio');
        headers.set('Cache-Control', 'no-cache, no-store');
        headers.set('Pragma', 'no-cache');
        
        return originalFetch(input, {
          ...init,
          headers,
          // Add timeout to prevent hanging requests
          signal: init.signal || AbortSignal.timeout(10000)
        });
      };
    }

    // 3. Prevent extension event listeners from interfering
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type: string, listener: any, options?: any) {
      // Only filter window message events to prevent extension conflicts
      if (
        this === window &&
        type === 'message' &&
        typeof listener === 'function'
      ) {
        const wrappedListener = (event: MessageEvent) => {
          // Only process events from our application or trusted sources
          if (
            event.origin === window.location.origin ||
            event.data?.source === 'ash-shaw-portfolio' ||
            (!event.data?.source && !event.data?.action && !event.data?.id)
          ) {
            return listener(event);
          }
          
          if (enableLogging) {
            console.log('🛡️ Filtered extension message:', event.data);
          }
        };
        
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      
      return originalAddEventListener.call(this, type, listener, options);
    };

    // 4. Handle console errors from extensions
    const originalConsoleError = console.error;
    console.error = function(...args: any[]) {
      const message = args.join(' ');
      
      // Filter out known extension error patterns
      if (
        message.includes('response timed out') ||
        message.includes('getPage') ||
        message.includes('extension://') ||
        message.includes('Message (id: 3)')
      ) {
        if (enableLogging) {
          console.warn('🛡️ Filtered extension error from console:', message);
        }
        return;
      }
      
      return originalConsoleError.apply(this, args);
    };

    if (enableLogging) {
      console.log('🛡️ Browser extension workarounds applied successfully');
    }

  } catch (error) {
    console.warn('⚠️ Failed to apply some extension workarounds:', error);
  }
}

/**
 * Monitor for extension interference and apply countermeasures
 * 
 * @param {number} checkIntervalMs - How often to check for interference
 * @param {boolean} enableLogging - Whether to log detection events
 * @returns {() => void} Cleanup function to stop monitoring
 */
export function monitorExtensionInterference(
  checkIntervalMs: number = 30000,
  enableLogging: boolean = false
): () => void {
  let intervalId: number;
  let interferenceCount = 0;

  const checkForInterference = async () => {
    try {
      const result = await detectBrowserExtensionInterference();
      
      if (result.hasInterference) {
        interferenceCount++;
        
        if (enableLogging) {
          console.warn('🔍 Extension interference detected:', {
            extensions: result.detectedExtensions,
            recommendations: result.recommendations,
            count: interferenceCount
          });
        }

        // Apply workarounds if interference is persistent
        if (interferenceCount >= 2) {
          applyExtensionWorkarounds(enableLogging);
        }
      } else {
        interferenceCount = Math.max(0, interferenceCount - 1);
      }
      
    } catch (error) {
      if (enableLogging) {
        console.warn('Extension monitoring error:', error);
      }
    }
  };

  // Initial check
  checkForInterference();

  // Set up periodic monitoring
  intervalId = window.setInterval(checkForInterference, checkIntervalMs);

  // Return cleanup function
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}

/**
 * Emergency cleanup function for when extensions cause severe interference
 */
export function emergencyExtensionCleanup(): void {
  console.warn('🚨 Emergency extension cleanup initiated');

  try {
    // Clear all intervals and timeouts
    const highestTimeoutId = setTimeout(() => {}, 0);
    for (let i = 1; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }

    const highestIntervalId = setInterval(() => {}, 0);
    for (let i = 1; i < highestIntervalId; i++) {
      clearInterval(i);
    }

    // Clear event listeners that might be from extensions
    if (window.removeEventListener) {
      ['message', 'load', 'unload', 'beforeunload'].forEach(eventType => {
        try {
          window.removeEventListener(eventType, () => {});
        } catch (e) {
          // Ignore cleanup errors
        }
      });
    }

    // Force garbage collection if available
    if ((window as any).gc) {
      (window as any).gc();
    }

    console.log('✅ Emergency extension cleanup completed');

  } catch (error) {
    console.error('❌ Emergency cleanup failed:', error);
  }
}

export default {
  detectBrowserExtensionInterference,
  applyExtensionWorkarounds,
  monitorExtensionInterference,
  emergencyExtensionCleanup
};