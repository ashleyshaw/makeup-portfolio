/**
 * @fileoverview Contentful status indicator for development environment
 * 
 * Shows unobtrusive notification when Contentful CMS is not configured,
 * helping developers understand the current content management state.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial Contentful status indicator
 * @lastModified 2025-01-17
 */

import React, { useState, useEffect } from 'react';

/**
 * Props interface for ContentfulStatus component
 * 
 * @interface ContentfulStatusProps
 */
interface ContentfulStatusProps {
  /** Whether to show the status indicator */
  show?: boolean;
  /** Whether this is development environment */
  isDevelopment?: boolean;
}

/**
 * Contentful status indicator component
 * 
 * Displays an unobtrusive notification when Contentful CMS is not configured.
 * Only shows in development environment to help developers understand the
 * current content management state without affecting production users.
 * 
 * Features:
 * - Auto-dismissible notification
 * - Development-only display
 * - Helpful setup guidance
 * - Minimal visual footprint
 * 
 * @param {ContentfulStatusProps} props - Component properties
 * @returns {JSX.Element | null} Status indicator or null if hidden
 * 
 * @example
 * ```tsx
 * // Show in development when Contentful not configured
 * <ContentfulStatus 
 *   show={!isContentfulConfigured} 
 *   isDevelopment={process.env.NODE_ENV === 'development'}
 * />
 * ```
 */
export function ContentfulStatus({ 
  show = false, 
  isDevelopment = false 
}: ContentfulStatusProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(show);
  const [isMinimized, setIsMinimized] = useState(false);

  // Update visibility when show prop changes
  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  // Don't show in production or when not needed
  if (!isDevelopment || !isVisible) {
    return null;
  }

  // Minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors text-sm font-medium"
          aria-label="Show Contentful status"
        >
          CMS
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">
                Contentful CMS
              </h4>
              <p className="text-xs text-blue-700 mb-2">
                Using static content. Configure environment variables for dynamic content management.
              </p>
              <button
                onClick={() => window.open('/CONTENTFUL_SETUP_GUIDE.md', '_blank')}
                className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
              >
                View Setup Guide
              </button>
            </div>
          </div>
          <div className="flex space-x-1 ml-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-blue-400 hover:text-blue-600 p-1"
              aria-label="Minimize status"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-blue-400 hover:text-blue-600 p-1"
              aria-label="Close status"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to detect if Contentful is configured
 * 
 * @function useContentfulConfigured
 * @returns {boolean} Whether Contentful environment variables are configured
 * 
 * @example
 * ```tsx
 * const isConfigured = useContentfulConfigured();
 * 
 * return (
 *   <div>
 *     <ContentfulStatus 
 *       show={!isConfigured} 
 *       isDevelopment={process.env.NODE_ENV === 'development'}
 *     />
 *   </div>
 * );
 * ```
 */
export function useContentfulConfigured(): boolean {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Safely check environment variables
    const envVars = import.meta?.env || {};
    const hasSpaceId = !!envVars.VITE_CONTENTFUL_SPACE_ID;
    const hasAccessToken = !!envVars.VITE_CONTENTFUL_ACCESS_TOKEN;
    
    setIsConfigured(hasSpaceId && hasAccessToken);
  }, []);

  return isConfigured;
}