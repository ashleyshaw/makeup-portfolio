/**
 * @fileoverview Preview mode banner component for Contentful draft content
 * 
 * Displays a fixed banner at the top of the page when viewing draft content,
 * providing visual feedback and controls to exit preview mode.
 * 
 * Core Features:
 * - Fixed position banner with high z-index
 * - Preview status information (duration, entry info)
 * - Exit preview button with confirmation
 * - Responsive design for mobile/desktop
 * - Keyboard accessible controls
 * - Auto-hide option after delay
 * 
 * Design:
 * - Brand-compliant gradient background
 * - Clear typography and spacing
 * - Smooth animations and transitions
 * - Mobile-optimized layout
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial preview banner implementation
 * @lastModified 2025-01-25
 */

import React, { useState, useEffect } from 'react';
import { Eye, X, RefreshCw, ExternalLink } from 'lucide-react';
import { 
  disablePreviewMode, 
  getPreviewStatus, 
  isPreviewEnabled 
} from '../../utils/contentfulPreview';

/**
 * Preview banner props interface
 * 
 * @interface PreviewBannerProps
 */
interface PreviewBannerProps {
  /** Optional entry information to display */
  entryInfo?: {
    contentType: string;
    entryId: string;
    title?: string;
  };
  /** Whether to show refresh button */
  showRefresh?: boolean;
  /** Callback when refresh is clicked */
  onRefresh?: () => void;
  /** Whether banner can be minimized */
  allowMinimize?: boolean;
}

/**
 * Preview banner component
 * 
 * Displays when preview mode is active, providing visual feedback and controls.
 * Fixed at top of viewport with high z-index to ensure visibility.
 * 
 * Features:
 * - Visual preview mode indicator with branded styling
 * - Duration display showing how long preview has been active
 * - Exit preview button with page reload
 * - Optional refresh button for content updates
 * - Minimize/expand functionality
 * - Responsive design for all screen sizes
 * - Keyboard navigation support
 * 
 * @component
 * @param {PreviewBannerProps} props - Component properties
 * @returns {JSX.Element | null} Preview banner or null if not in preview mode
 * 
 * @accessibility WCAG 2.1 AA Compliance
 * - Keyboard navigation with Tab and Enter
 * - Screen reader announcements via aria-live
 * - Proper button labels and descriptions
 * - High contrast mode support
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <PreviewBanner />
 * 
 * // With entry information
 * <PreviewBanner 
 *   entryInfo={{
 *     contentType: 'blogPost',
 *     entryId: 'abc123',
 *     title: 'Festival Makeup Guide'
 *   }}
 *   showRefresh={true}
 *   onRefresh={handleRefresh}
 * />
 * ```
 */
export function PreviewBanner({
  entryInfo,
  showRefresh = false,
  onRefresh,
  allowMinimize = true,
}: PreviewBannerProps): JSX.Element | null {
  const [isMinimized, setIsMinimized] = useState(false);
  const [status, setStatus] = useState(getPreviewStatus());
  const [isExiting, setIsExiting] = useState(false);

  // Update status every minute
  useEffect(() => {
    if (!isPreviewEnabled()) {
      return;
    }

    const interval = setInterval(() => {
      setStatus(getPreviewStatus());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Don't render if preview mode is not enabled
  if (!isPreviewEnabled()) {
    return null;
  }

  /**
   * Handle exit preview mode
   */
  const handleExitPreview = () => {
    setIsExiting(true);
    
    // Disable preview mode
    disablePreviewMode();
    
    // Reload page to show published content
    setTimeout(() => {
      window.location.href = window.location.pathname;
    }, 300);
  };

  /**
   * Handle refresh
   */
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  /**
   * Format duration for display
   */
  const formatDuration = (minutes: number | null): string => {
    if (minutes === null) return '';
    
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute';
    if (minutes < 60) return `${minutes} minutes`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour';
    return `${hours} hours`;
  };

  // Minimized state
  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 z-[9999]">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 bg-gradient-pink-purple-blue text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-body font-medium text-sm"
          aria-label="Expand preview banner"
        >
          <Eye className="w-4 h-4" />
          <span>Preview Mode</span>
        </button>
      </div>
    );
  }

  // Full banner
  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[9998] bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 shadow-lg border-b-4 border-yellow-500 transition-all duration-300 ${isExiting ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}
      role="banner"
      aria-live="polite"
      aria-label="Content preview mode active"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left side: Status and info */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Preview icon and label */}
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-body font-bold text-white text-sm">
                  Preview Mode Active
                </div>
                {status.durationMinutes !== null && (
                  <div className="font-body text-white/90 text-xs">
                    Active for {formatDuration(status.durationMinutes)}
                  </div>
                )}
              </div>
            </div>

            {/* Entry information */}
            {entryInfo && (
              <>
                <div className="hidden sm:block w-px h-8 bg-white/30" />
                <div className="font-body text-white/90 text-sm">
                  <span className="font-semibold">{entryInfo.contentType}</span>
                  {entryInfo.title && (
                    <>
                      {' • '}
                      <span className="italic">{entryInfo.title}</span>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-2">
            {/* Refresh button */}
            {showRefresh && (
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg transition-all duration-200 font-body font-medium text-sm"
                aria-label="Refresh preview content"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}

            {/* Contentful link */}
            {entryInfo && (
              <a
                href={`https://app.contentful.com/spaces/${import.meta?.env?.VITE_CONTENTFUL_SPACE_ID || ''}/entries/${entryInfo.entryId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg transition-all duration-200 font-body font-medium text-sm"
                aria-label="Open entry in Contentful"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </a>
            )}

            {/* Minimize button */}
            {allowMinimize && (
              <button
                onClick={() => setIsMinimized(true)}
                className="flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white w-8 h-8 rounded-lg transition-all duration-200"
                aria-label="Minimize preview banner"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}

            {/* Exit preview button */}
            <button
              onClick={handleExitPreview}
              className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 px-4 py-1.5 rounded-lg transition-all duration-200 font-body font-semibold text-sm shadow-md"
              aria-label="Exit preview mode and return to published content"
            >
              <X className="w-4 h-4" />
              <span>Exit Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Preview mode is active. You are viewing draft content. Click "Exit Preview" to return to published content.
      </div>
    </div>
  );
}

/**
 * Preview mode spacer component
 * 
 * Adds top padding to page content when preview banner is visible
 * to prevent content from being hidden under the fixed banner.
 * 
 * @component
 * @returns {JSX.Element | null} Spacer div or null if not in preview mode
 * 
 * @example
 * ```tsx
 * <PreviewBannerSpacer />
 * <main>
 *   {/* Page content */}
 * </main>
 * ```
 */
export function PreviewBannerSpacer(): JSX.Element | null {
  if (!isPreviewEnabled()) {
    return null;
  }

  return <div className="h-16 sm:h-14" aria-hidden="true" />;
}

/**
 * Draft badge component for individual content items
 * 
 * Displays a small badge indicating draft/preview status on content cards.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {any} props.entry - Contentful entry to check status
 * @returns {JSX.Element | null} Badge or null if not applicable
 * 
 * @example
 * ```tsx
 * <div className="relative">
 *   <DraftBadge entry={blogPost} />
 *   <h2>{blogPost.title}</h2>
 * </div>
 * ```
 */
export function DraftBadge({ entry }: { entry: any }): JSX.Element | null {
  if (!isPreviewEnabled() || !entry) {
    return null;
  }

  // Check if entry is draft
  const isDraft = entry.sys && !entry.sys.publishedVersion;
  const hasChanges = entry.sys && entry.sys.version > (entry.sys.publishedVersion || 0) + 1;

  if (!isDraft && !hasChanges) {
    return null;
  }

  const badgeConfig = isDraft
    ? { text: 'Draft', bg: 'bg-yellow-500' }
    : { text: 'Modified', bg: 'bg-blue-500' };

  return (
    <div 
      className={`absolute top-2 right-2 ${badgeConfig.bg} text-white px-2 py-1 rounded-md font-body font-semibold text-xs shadow-md z-10`}
      role="status"
      aria-label={`Content status: ${badgeConfig.text}`}
    >
      {badgeConfig.text}
    </div>
  );
}
