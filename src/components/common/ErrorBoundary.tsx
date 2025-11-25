/**
 * @fileoverview Error Boundary component for catching and handling React errors
 * 
 * Provides comprehensive error catching and user-friendly error display with recovery options.
 * Includes timeout error handling, API error recovery, and accessibility support.
 * 
 * Features:
 * - Catches JavaScript errors anywhere in the child component tree
 * - Logs error details for debugging while showing user-friendly messages
 * - Provides retry functionality for recoverable errors
 * - Handles timeout errors and API failures gracefully
 * - WCAG 2.1 AA compliant error messaging
 * - Automatic error reporting (can be extended with error tracking services)
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial error boundary implementation
 */

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Error boundary props interface
 */
interface ErrorBoundaryProps {
  /** Child components to wrap with error boundary */
  children: ReactNode;
  /** Optional fallback component to render instead of default error UI */
  fallback?: ReactNode;
  /** Optional error callback for custom error handling */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Error boundary state interface
 */
interface ErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error object if available */
  error: Error | null;
  /** Error info from React */
  errorInfo: React.ErrorInfo | null;
  /** Number of retry attempts */
  retryCount: number;
}

/**
 * Error Boundary component for catching and handling React errors
 * 
 * Wraps child components and catches any JavaScript errors that occur during rendering,
 * in lifecycle methods, or in constructors. Provides user-friendly error display with
 * recovery options and accessibility support.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary onError={handleError}>
 *   <App />
 * </ErrorBoundary>
 * 
 * // With custom fallback
 * <ErrorBoundary fallback={<CustomErrorComponent />}>
 *   <PortfolioSection />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  /**
   * Static method to update state when an error occurs
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called when an error occurs
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorMessage = error?.message || error?.toString() || '';
    
    // AGGRESSIVE: Filter out browser extension errors
    if (
      errorMessage.includes('Message getPage (id: 3) response timed out after 30000ms') ||
      errorMessage.includes('response timed out after 30000ms') ||
      errorMessage.includes('getPage') && errorMessage.includes('timed out') ||
      errorMessage.includes('Message getPage') ||
      errorMessage.includes('extension://') ||
      errorMessage.includes('chrome-extension://') ||
      errorMessage.includes('moz-extension://') ||
      error?.stack?.includes('extension://') ||
      error?.name === 'TimeoutError' ||
      error?.name === 'ExtensionError'
    ) {
      console.log('🛡️ Error Boundary: Filtered browser extension error:', errorMessage);
      
      // Reset error state to prevent showing error UI for extension errors
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
      return;
    }

    // Update state with error info for legitimate application errors
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error details for debugging
    console.error('Error Boundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Here you could send the error to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  /**
   * Retry handler to attempt recovery
   */
  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));
  };

  /**
   * Reload the page as last resort
   */
  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, retryCount } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Determine error type for better messaging
      const isTimeoutError = error?.message?.includes('timed out') || 
                            error?.message?.includes('timeout') ||
                            error?.message?.includes('30000ms') ||
                            error?.message?.includes('Message getPage');
      const isNetworkError = error?.message?.includes('network') || 
                            error?.message?.includes('fetch') ||
                            error?.message?.includes('Failed to fetch');
      const isContentError = error?.message?.includes('Contentful') || 
                            error?.message?.includes('CMS') ||
                            error?.message?.includes('content');
      const isBrowserExtensionError = error?.message?.includes('extension') ||
                                     error?.message?.includes('getPage') ||
                                     error?.message?.includes('id:');

      let errorTitle = 'Something went wrong';
      let errorMessage = 'An unexpected error occurred. Please try again.';
      let suggestions: string[] = [];

      if (isBrowserExtensionError) {
        errorTitle = 'Browser Extension Interference';
        errorMessage = 'A browser extension may be interfering with the page. This is a common issue with ad blockers or privacy extensions.';
        suggestions = [
          'Try disabling browser extensions temporarily',
          'Use an incognito/private browsing window',
          'Refresh the page and try again',
          'The page should still function normally',
        ];
      } else if (isTimeoutError) {
        errorTitle = 'Request Timeout';
        errorMessage = 'The request took too long to complete. This might be due to a slow connection or server issues.';
        suggestions = [
          'Check your internet connection',
          'Try refreshing the page',
          'Wait a moment and try again',
        ];
      } else if (isNetworkError) {
        errorTitle = 'Network Error';
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        suggestions = [
          'Check your internet connection',
          'Try refreshing the page',
          'Check if other websites are working',
        ];
      } else if (isContentError) {
        errorTitle = 'Content Loading Error';
        errorMessage = 'Unable to load content from the content management system. The site will use static content instead.';
        suggestions = [
          'The page should still function with static content',
          'Try refreshing to reconnect to the CMS',
          'Content may be temporarily unavailable',
        ];
      }

      return (
        <div 
          className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-fluid-md"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl p-fluid-xl border border-white/50 shadow-xl text-center">
            {/* Error Icon */}
            <div className="mb-fluid-lg">
              <div className="w-16 h-16 mx-auto bg-gradient-pink-purple-blue rounded-full flex items-center justify-center mb-fluid-md">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-fluid-2xl font-heading font-bold text-gray-800 mb-fluid-sm">
                {errorTitle}
              </h1>
              <p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed">
                {errorMessage}
              </p>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-fluid-lg">
                <h2 className="text-fluid-lg font-heading font-semibold text-gray-800 mb-fluid-sm">
                  What you can try:
                </h2>
                <ul className="text-left space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="text-body-guideline font-body text-gray-700 flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-fluid-sm justify-center items-center">
              <button
                onClick={this.handleRetry}
                className="w-full sm:w-auto justify-center text-center bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 flex items-center gap-2"
                aria-label={`Try again (attempt ${retryCount + 1})`}
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>

              {retryCount > 1 && (
                <button
                  onClick={this.handleReload}
                  className="w-full sm:w-auto justify-center text-center bg-gradient-blue-teal-green hover:from-blue-700 hover:to-teal-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50"
                  aria-label="Reload the entire page"
                >
                  Reload Page
                </button>
              )}
            </div>

            {/* Debug Info (Development Only) */}
            {import.meta?.env?.DEV && error && (
              <details className="mt-fluid-lg text-left">
                <summary className="cursor-pointer text-fluid-sm font-body font-medium text-gray-600 hover:text-gray-800">
                  Debug Information (Development Only)
                </summary>
                <div className="mt-fluid-sm p-fluid-md bg-gray-100 rounded-lg text-fluid-xs font-mono text-gray-800 overflow-auto">
                  <p><strong>Error:</strong> {error.toString()}</p>
                  <p><strong>Stack:</strong></p>
                  <pre className="whitespace-pre-wrap">{error.stack}</pre>
                  {this.state.errorInfo && (
                    <>
                      <p><strong>Component Stack:</strong></p>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}

            {/* Retry Count Display */}
            {retryCount > 0 && (
              <p className="mt-fluid-md text-fluid-sm font-body text-gray-600">
                Retry attempts: {retryCount}
              </p>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

/**
 * Higher-order component for wrapping components with error boundary
 * 
 * @param Component - The component to wrap
 * @param errorBoundaryProps - Props for the error boundary
 * @returns Wrapped component with error boundary
 * 
 * @example
 * ```tsx
 * const SafePortfolioPage = withErrorBoundary(PortfolioPage, {
 *   onError: (error) => console.error('Portfolio error:', error)
 * });
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;