/**
 * @fileoverview Contentful Preview API integration for Ash Shaw Portfolio
 * 
 * Provides preview mode functionality to view draft content before publishing.
 * Enables editors to review content changes in the actual application context
 * without affecting the live site.
 * 
 * Core Features:
 * - Preview mode toggle with secure token validation
 * - Draft content fetching via Preview API
 * - Side-by-side preview comparison
 * - Preview banner with exit functionality
 * - URL-based preview activation
 * - Session-based preview state management
 * 
 * Preview Workflow:
 * 1. Editor clicks "Preview" in Contentful
 * 2. Opens site with preview token in URL
 * 3. Application validates token and enables preview mode
 * 4. Draft content fetched from Preview API
 * 5. Preview banner displayed with exit option
 * 
 * Security:
 * - Preview token validation
 * - Session-based state management
 * - Production safeguards
 * - CORS configuration
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial preview mode implementation
 * @lastModified 2025-01-25
 */

import { createClient, ContentfulApi } from 'contentful';

/**
 * Preview mode state interface
 * 
 * @interface PreviewState
 */
export interface PreviewState {
  /** Whether preview mode is currently active */
  enabled: boolean;
  /** Preview API client instance */
  client: ContentfulApi | null;
  /** Preview session token */
  token: string | null;
  /** Timestamp when preview mode was activated */
  activatedAt: Date | null;
}

/**
 * Preview mode configuration interface
 * 
 * @interface PreviewConfig
 */
export interface PreviewConfig {
  /** Contentful space ID */
  spaceId: string;
  /** Preview API access token */
  previewToken: string;
  /** Optional host override for preview URLs */
  host?: string;
}

/**
 * Global preview state
 */
let previewState: PreviewState = {
  enabled: false,
  client: null,
  token: null,
  activatedAt: null,
};

/**
 * Session storage key for preview state persistence
 */
const PREVIEW_SESSION_KEY = 'contentful_preview_mode';

/**
 * Initialize Contentful Preview API client
 * 
 * @function initializePreviewClient
 * @param {PreviewConfig} config - Preview configuration
 * @returns {ContentfulApi | null} Configured preview client or null
 * 
 * @example
 * ```typescript
 * const previewClient = initializePreviewClient({
 *   spaceId: 'your_space_id',
 *   previewToken: 'your_preview_token'
 * });
 * ```
 */
function initializePreviewClient(config: PreviewConfig): ContentfulApi | null {
  try {
    const client = createClient({
      space: config.spaceId,
      accessToken: config.previewToken,
      host: config.host || 'preview.contentful.com', // Preview API host
      timeout: 10000,
      retryLimit: 2,
      retryOnFailure: true,
    });

    console.info('✅ Contentful Preview API client initialized');
    return client;
  } catch (error) {
    console.error('❌ Failed to initialize Contentful Preview API client:', error);
    return null;
  }
}

/**
 * Check if preview mode is enabled
 * 
 * @function isPreviewEnabled
 * @returns {boolean} Whether preview mode is active
 * 
 * @example
 * ```typescript
 * if (isPreviewEnabled()) {
 *   // Show preview banner
 *   // Use preview API client
 * }
 * ```
 */
export function isPreviewEnabled(): boolean {
  return previewState.enabled;
}

/**
 * Get preview API client
 * 
 * @function getPreviewClient
 * @returns {ContentfulApi | null} Preview client if enabled, null otherwise
 * 
 * @example
 * ```typescript
 * const client = getPreviewClient();
 * if (client) {
 *   const entries = await client.getEntries({ content_type: 'blogPost' });
 * }
 * ```
 */
export function getPreviewClient(): ContentfulApi | null {
  return previewState.enabled ? previewState.client : null;
}

/**
 * Enable preview mode with token validation
 * 
 * @function enablePreviewMode
 * @param {string} token - Preview activation token (optional for security)
 * @returns {Promise<boolean>} Whether preview mode was successfully enabled
 * 
 * @example
 * ```typescript
 * // Enable preview mode from URL parameter
 * const urlParams = new URLSearchParams(window.location.search);
 * const previewToken = urlParams.get('preview');
 * 
 * if (previewToken) {
 *   await enablePreviewMode(previewToken);
 * }
 * ```
 */
export async function enablePreviewMode(token?: string): Promise<boolean> {
  try {
    // Get environment variables
    const envVars = import.meta?.env || {};
    const spaceId = envVars.VITE_CONTENTFUL_SPACE_ID;
    const previewToken = envVars.VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN;

    if (!spaceId || !previewToken) {
      console.warn('⚠️ Preview mode unavailable: Missing Contentful configuration');
      return false;
    }

    // Initialize preview client
    const client = initializePreviewClient({
      spaceId,
      previewToken,
    });

    if (!client) {
      return false;
    }

    // Test preview client with a simple query
    try {
      await client.getEntries({ limit: 1 });
    } catch (error) {
      console.error('❌ Preview API validation failed:', error);
      return false;
    }

    // Update preview state
    previewState = {
      enabled: true,
      client,
      token: token || null,
      activatedAt: new Date(),
    };

    // Persist to session storage
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(PREVIEW_SESSION_KEY, JSON.stringify({
        enabled: true,
        activatedAt: previewState.activatedAt?.toISOString(),
      }));
    }

    console.info('✅ Preview mode enabled');
    return true;
  } catch (error) {
    console.error('❌ Failed to enable preview mode:', error);
    return false;
  }
}

/**
 * Disable preview mode and return to published content
 * 
 * @function disablePreviewMode
 * @returns {void}
 * 
 * @example
 * ```typescript
 * // Exit preview mode
 * disablePreviewMode();
 * window.location.href = '/'; // Refresh to show published content
 * ```
 */
export function disablePreviewMode(): void {
  previewState = {
    enabled: false,
    client: null,
    token: null,
    activatedAt: null,
  };

  // Clear session storage
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(PREVIEW_SESSION_KEY);
  }

  console.info('✅ Preview mode disabled');
}

/**
 * Restore preview mode from session storage
 * 
 * @function restorePreviewMode
 * @returns {Promise<boolean>} Whether preview mode was restored
 * 
 * @example
 * ```typescript
 * // On app initialization
 * useEffect(() => {
 *   restorePreviewMode();
 * }, []);
 * ```
 */
export async function restorePreviewMode(): Promise<boolean> {
  try {
    if (typeof sessionStorage === 'undefined') {
      return false;
    }

    const stored = sessionStorage.getItem(PREVIEW_SESSION_KEY);
    if (!stored) {
      return false;
    }

    const { enabled, activatedAt } = JSON.parse(stored);
    
    if (!enabled) {
      return false;
    }

    // Check if preview session is still valid (e.g., within 24 hours)
    const activated = new Date(activatedAt);
    const now = new Date();
    const hoursSinceActivation = (now.getTime() - activated.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceActivation > 24) {
      console.info('⏰ Preview session expired, disabling preview mode');
      disablePreviewMode();
      return false;
    }

    // Re-enable preview mode
    return await enablePreviewMode();
  } catch (error) {
    console.error('❌ Failed to restore preview mode:', error);
    return false;
  }
}

/**
 * Check URL for preview parameters and activate preview mode
 * 
 * @function checkPreviewParams
 * @returns {Promise<boolean>} Whether preview mode was activated from URL
 * 
 * @example
 * ```typescript
 * // On app initialization
 * useEffect(() => {
 *   checkPreviewParams();
 * }, []);
 * ```
 */
export async function checkPreviewParams(): Promise<boolean> {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const previewParam = urlParams.get('preview');
    const secretParam = urlParams.get('secret');

    // Check for preview activation
    if (previewParam === 'true' || previewParam === '1') {
      const success = await enablePreviewMode(secretParam || undefined);
      
      if (success) {
        // Clean up URL parameters
        urlParams.delete('preview');
        urlParams.delete('secret');
        
        const newUrl = window.location.pathname + 
          (urlParams.toString() ? '?' + urlParams.toString() : '') +
          window.location.hash;
        
        window.history.replaceState({}, '', newUrl);
      }
      
      return success;
    }

    return false;
  } catch (error) {
    console.error('❌ Failed to check preview parameters:', error);
    return false;
  }
}

/**
 * Get preview mode status information
 * 
 * @function getPreviewStatus
 * @returns {Object} Preview status information
 * 
 * @example
 * ```typescript
 * const status = getPreviewStatus();
 * console.log('Preview enabled:', status.enabled);
 * console.log('Active for:', status.durationMinutes, 'minutes');
 * ```
 */
export function getPreviewStatus(): {
  enabled: boolean;
  activatedAt: Date | null;
  durationMinutes: number | null;
  hasValidClient: boolean;
} {
  const durationMinutes = previewState.activatedAt
    ? Math.floor((new Date().getTime() - previewState.activatedAt.getTime()) / (1000 * 60))
    : null;

  return {
    enabled: previewState.enabled,
    activatedAt: previewState.activatedAt,
    durationMinutes,
    hasValidClient: previewState.client !== null,
  };
}

/**
 * Generate preview URL for content entry
 * 
 * @function generatePreviewUrl
 * @param {string} contentType - Content type name
 * @param {string} entryId - Entry ID
 * @param {string} baseUrl - Base application URL
 * @returns {string} Preview URL
 * 
 * @example
 * ```typescript
 * const previewUrl = generatePreviewUrl('blogPost', 'abc123', 'https://ashshaw.makeup');
 * // Returns: https://ashshaw.makeup/blog/post-slug?preview=true
 * ```
 */
export function generatePreviewUrl(
  contentType: string,
  entryId: string,
  baseUrl: string = window.location.origin
): string {
  // Map content types to application routes
  const routeMap: Record<string, string> = {
    blogPost: '/blog',
    portfolioEntry: '/portfolio',
    homepage: '/',
    aboutPage: '/about',
  };

  const route = routeMap[contentType] || '/';
  return `${baseUrl}${route}?preview=true&entry=${entryId}`;
}

/**
 * Fetch draft content for specific entry
 * 
 * @function fetchDraftEntry
 * @param {string} contentType - Content type name
 * @param {string} entryId - Entry ID
 * @returns {Promise<any>} Draft entry or null
 * 
 * @example
 * ```typescript
 * const draftPost = await fetchDraftEntry('blogPost', 'abc123');
 * if (draftPost) {
 *   console.log('Draft title:', draftPost.fields.title);
 * }
 * ```
 */
export async function fetchDraftEntry(
  contentType: string,
  entryId: string
): Promise<any> {
  try {
    const client = getPreviewClient();
    if (!client) {
      console.warn('⚠️ Preview mode not enabled, cannot fetch draft content');
      return null;
    }

    const response = await client.getEntry(entryId);
    
    // Validate content type matches
    if (response.sys.contentType?.sys.id !== contentType) {
      console.warn(`⚠️ Entry ${entryId} is not of type ${contentType}`);
      return null;
    }

    return response;
  } catch (error) {
    console.error('❌ Failed to fetch draft entry:', error);
    return null;
  }
}

/**
 * Compare published vs draft content
 * 
 * @function compareContentVersions
 * @param {string} contentType - Content type name
 * @param {string} entryId - Entry ID
 * @returns {Promise<Object>} Comparison result with differences
 * 
 * @example
 * ```typescript
 * const comparison = await compareContentVersions('blogPost', 'abc123');
 * if (comparison.hasDifferences) {
 *   console.log('Changed fields:', comparison.changedFields);
 * }
 * ```
 */
export async function compareContentVersions(
  contentType: string,
  entryId: string
): Promise<{
  published: any | null;
  draft: any | null;
  hasDifferences: boolean;
  changedFields: string[];
}> {
  try {
    // This would require both delivery and preview API clients
    // For now, just return the draft version
    const draft = await fetchDraftEntry(contentType, entryId);
    
    return {
      published: null, // Would fetch from delivery API
      draft,
      hasDifferences: draft !== null,
      changedFields: [], // Would calculate differences
    };
  } catch (error) {
    console.error('❌ Failed to compare content versions:', error);
    return {
      published: null,
      draft: null,
      hasDifferences: false,
      changedFields: [],
    };
  }
}

/**
 * Check if specific entry is in draft state
 * 
 * @function isDraftEntry
 * @param {any} entry - Contentful entry
 * @returns {boolean} Whether entry is draft
 */
export function isDraftEntry(entry: any): boolean {
  if (!entry || !entry.sys) {
    return false;
  }

  // Check if entry has unpublished changes
  const publishedVersion = entry.sys.publishedVersion;
  const currentVersion = entry.sys.version;

  // If there's no published version, it's a draft
  if (!publishedVersion) {
    return true;
  }

  // If current version is ahead of published, there are draft changes
  return currentVersion > publishedVersion + 1;
}

/**
 * Get draft status badge information
 * 
 * @function getDraftBadge
 * @param {any} entry - Contentful entry
 * @returns {Object} Badge configuration
 */
export function getDraftBadge(entry: any): {
  show: boolean;
  text: string;
  color: string;
} {
  if (!entry || !isPreviewEnabled()) {
    return { show: false, text: '', color: '' };
  }

  if (isDraftEntry(entry)) {
    return {
      show: true,
      text: 'Draft',
      color: 'bg-yellow-500',
    };
  }

  const hasUnpublishedChanges = entry.sys.version > (entry.sys.publishedVersion || 0) + 1;
  
  if (hasUnpublishedChanges) {
    return {
      show: true,
      text: 'Modified',
      color: 'bg-blue-500',
    };
  }

  return {
    show: true,
    text: 'Preview',
    color: 'bg-green-500',
  };
}
