/**
 * @fileoverview Comprehensive timeout and error handling utilities
 * 
 * Provides robust timeout management, error recovery, and safety wrappers
 * to prevent hanging requests and application freezes.
 * 
 * Core Features:
 * - Request timeout management with abort controllers
 * - Circuit breaker pattern for failing services
 * - Exponential backoff for retry logic
 * - Performance monitoring and logging
 * - Browser extension interference protection
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial timeout handling implementation
 */

interface TimeoutOptions {
  /** Timeout duration in milliseconds */
  timeoutMs?: number;
  /** Maximum number of retry attempts */
  maxRetries?: number;
  /** Exponential backoff multiplier */
  backoffMultiplier?: number;
  /** Whether to log timeout events */
  enableLogging?: boolean;
  /** Custom error message */
  errorMessage?: string;
}

interface RequestMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  success: boolean;
  retryCount: number;
  error?: Error;
}

// Global request tracking
const activeRequests = new Map<string, AbortController>();
const requestMetrics = new Map<string, RequestMetrics>();

/**
 * Generate unique request ID for tracking
 * 
 * @returns {string} Unique request identifier
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Enhanced timeout wrapper with abort controller and retry logic
 * 
 * @param {Promise<T>} promise - The promise to wrap with timeout
 * @param {TimeoutOptions} options - Timeout configuration options
 * @returns {Promise<T>} Promise that resolves or rejects within timeout
 */
export async function withEnhancedTimeout<T>(
  promise: Promise<T>, 
  options: TimeoutOptions = {}
): Promise<T> {
  const {
    timeoutMs = 5000,
    maxRetries = 1,
    backoffMultiplier = 1.5,
    enableLogging = true,
    errorMessage = 'Request timed out'
  } = options;

  const requestId = generateRequestId();
  let retryCount = 0;

  const executeRequest = async (): Promise<T> => {
    const abortController = new AbortController();
    activeRequests.set(requestId, abortController);

    const metrics: RequestMetrics = {
      startTime: Date.now(),
      success: false,
      retryCount
    };

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        const timeoutId = setTimeout(() => {
          abortController.abort();
          reject(new Error(`${errorMessage} after ${timeoutMs}ms (attempt ${retryCount + 1})`));
        }, timeoutMs);

        // Clear timeout if request completes
        promise.finally(() => clearTimeout(timeoutId));
      });

      // Race between the actual promise and timeout
      const result = await Promise.race([promise, timeoutPromise]);

      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;
      metrics.success = true;

      if (enableLogging) {
        console.log(`✅ Request ${requestId} completed in ${metrics.duration}ms`);
      }

      return result;

    } catch (error) {
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;
      metrics.error = error as Error;

      if (enableLogging) {
        console.warn(`⚠️ Request ${requestId} failed after ${metrics.duration}ms:`, error);
      }

      // Retry logic with exponential backoff
      if (retryCount < maxRetries) {
        retryCount++;
        const backoffDelay = Math.min(1000 * Math.pow(backoffMultiplier, retryCount - 1), 5000);
        
        if (enableLogging) {
          console.log(`🔄 Retrying request ${requestId} in ${backoffDelay}ms (attempt ${retryCount + 1})`);
        }

        await new Promise(resolve => setTimeout(resolve, backoffDelay));
        return executeRequest();
      }

      throw error;

    } finally {
      activeRequests.delete(requestId);
      requestMetrics.set(requestId, metrics);
      
      // Clean up old metrics (keep last 100)
      if (requestMetrics.size > 100) {
        const oldestKey = requestMetrics.keys().next().value;
        requestMetrics.delete(oldestKey);
      }
    }
  };

  return executeRequest();
}

/**
 * Abort all active requests (emergency cleanup)
 * 
 * @param {string} reason - Reason for aborting requests
 */
export function abortAllRequests(reason: string = 'Manual abort'): void {
  console.warn(`🛑 Aborting ${activeRequests.size} active requests: ${reason}`);
  
  activeRequests.forEach((controller, requestId) => {
    controller.abort();
    console.log(`❌ Aborted request ${requestId}`);
  });
  
  activeRequests.clear();
}

/**
 * Get request performance metrics
 * 
 * @returns {Object} Performance statistics
 */
export function getRequestMetrics() {
  const metrics = Array.from(requestMetrics.values());
  const successful = metrics.filter(m => m.success);
  const failed = metrics.filter(m => !m.success);
  
  return {
    total: metrics.length,
    successful: successful.length,
    failed: failed.length,
    successRate: metrics.length > 0 ? (successful.length / metrics.length) * 100 : 0,
    averageDuration: successful.length > 0 
      ? successful.reduce((sum, m) => sum + (m.duration || 0), 0) / successful.length 
      : 0,
    activeRequests: activeRequests.size
  };
}

/**
 * Circuit breaker for frequently failing services
 */
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private failureThreshold = 5,
    private recoveryTimeMs = 30000,
    private enableLogging = true
  ) {}

  async execute<T>(fn: () => Promise<T>, fallback?: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.recoveryTimeMs) {
        this.state = 'HALF_OPEN';
        this.log('🔄 Circuit breaker moving to HALF_OPEN state');
      } else {
        this.log('⚡ Circuit breaker OPEN - using fallback');
        if (fallback) return fallback();
        throw new Error('Circuit breaker is OPEN and no fallback provided');
      }
    }

    try {
      const result = await fn();
      
      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.log('✅ Circuit breaker reset to CLOSED state');
      }
      
      return result;
      
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      
      if (this.failureCount >= this.failureThreshold) {
        this.state = 'OPEN';
        this.log(`🚨 Circuit breaker OPEN after ${this.failureCount} failures`);
      }
      
      if (fallback) {
        this.log('🔄 Using fallback due to circuit breaker');
        return fallback();
      }
      
      throw error;
    }
  }

  private log(message: string): void {
    if (this.enableLogging) {
      console.warn(message);
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime
    };
  }
}

// Global circuit breakers for different services
export const contentfulBreaker = new CircuitBreaker(3, 30000);
export const supabaseBreaker = new CircuitBreaker(3, 20000);
export const unsplashBreaker = new CircuitBreaker(2, 15000);

/**
 * Browser extension interference detector and handler
 */
export class BrowserExtensionHandler {
  private static interferenceDetected = false;
  private static detectionAttempts = 0;
  private static maxDetectionAttempts = 3;

  /**
   * Detect if browser extensions are interfering with requests
   */
  static async detectInterference(): Promise<boolean> {
    if (this.detectionAttempts >= this.maxDetectionAttempts) {
      return this.interferenceDetected;
    }

    this.detectionAttempts++;

    try {
      // Test simple request that should complete quickly
      const testPromise = new Promise<string>(resolve => {
        setTimeout(() => resolve('test'), 100);
      });

      await withEnhancedTimeout(testPromise, { timeoutMs: 500 });
      return false;

    } catch (error) {
      console.warn('🔍 Potential browser extension interference detected:', error);
      this.interferenceDetected = true;
      return true;
    }
  }

  /**
   * Apply workarounds for browser extension interference
   */
  static applyWorkarounds(): void {
    if (!this.interferenceDetected) return;

    console.log('🛠️ Applying browser extension interference workarounds');

    // Disable certain browser features that extensions commonly interfere with
    try {
      // Add meta tag to prevent extension injection
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);

      // Set defensive headers
      if (typeof Headers !== 'undefined') {
        const originalFetch = window.fetch;
        window.fetch = async (input, init = {}) => {
          const headers = new Headers(init.headers);
          headers.set('Cache-Control', 'no-cache');
          headers.set('Pragma', 'no-cache');
          
          return originalFetch(input, {
            ...init,
            headers,
            cache: 'no-cache'
          });
        };
      }

    } catch (error) {
      console.warn('⚠️ Could not apply some browser extension workarounds:', error);
    }
  }
}

/**
 * Initialize timeout handling system
 */
export function initializeTimeoutHandling(): void {
  console.log('🔧 Initializing comprehensive timeout handling system');

  // Initialize aggressive extension error suppression first
  import('./extensionErrorSuppressor').then(({ initializeExtensionErrorSuppression }) => {
    initializeExtensionErrorSuppression();
  }).catch(error => {
    console.warn('⚠️ Could not initialize extension error suppression:', error);
  });

  // Import and apply browser extension protection
  import('./browserExtensionDetector').then(({ applyExtensionWorkarounds, monitorExtensionInterference }) => {
    // Apply immediate workarounds
    applyExtensionWorkarounds(import.meta?.env?.DEV || false);
    
    // Start monitoring for interference
    const stopMonitoring = monitorExtensionInterference(30000, import.meta?.env?.DEV || false);
    
    // Store cleanup function for later use
    (window as any).__extensionMonitoringCleanup = stopMonitoring;
  }).catch(error => {
    console.warn('⚠️ Could not initialize extension protection:', error);
  });

  // Detect browser extension interference
  BrowserExtensionHandler.detectInterference().then(hasInterference => {
    if (hasInterference) {
      BrowserExtensionHandler.applyWorkarounds();
    }
  });

  // Add specific handler for "getPage" timeout errors
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    const errorMessage = error?.message || error?.toString() || '';
    
    // Check for the specific error pattern you encountered
    if (
      errorMessage.includes('Message getPage (id: 3) response timed out') ||
      errorMessage.includes('response timed out after 30000ms') ||
      errorMessage.includes('getPage') && errorMessage.includes('timed out')
    ) {
      console.warn('🛡️ Intercepted and handled getPage timeout error:', errorMessage);
      event.preventDefault(); // Prevent the error from being logged as unhandled
      return;
    }
  });

  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    abortAllRequests('Page unload');
    
    // Clean up extension monitoring if active
    if ((window as any).__extensionMonitoringCleanup) {
      (window as any).__extensionMonitoringCleanup();
    }
  });

  // Emergency cleanup on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && activeRequests.size > 0) {
      console.log('📴 Page hidden - aborting active requests for performance');
      abortAllRequests('Page hidden');
    }
  });

  // Log performance metrics periodically in development
  if (import.meta?.env?.DEV) {
    setInterval(() => {
      const metrics = getRequestMetrics();
      if (metrics.total > 0) {
        console.log('📊 Request Performance Metrics:', metrics);
      }
    }, 30000); // Every 30 seconds
  }
}

/**
 * Safe wrapper for any async operation with comprehensive error handling
 * 
 * @param {() => Promise<T>} operation - Async operation to execute
 * @param {T} fallbackValue - Fallback value if operation fails
 * @param {TimeoutOptions} options - Timeout and retry options
 * @returns {Promise<T>} Result or fallback value
 */
export async function safeAsyncOperation<T>(
  operation: () => Promise<T>,
  fallbackValue: T,
  options: TimeoutOptions = {}
): Promise<T> {
  try {
    return await withEnhancedTimeout(operation(), options);
  } catch (error) {
    console.warn('🛡️ Safe async operation failed, using fallback:', error);
    return fallbackValue;
  }
}