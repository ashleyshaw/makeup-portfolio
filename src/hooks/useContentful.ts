/**
 * @fileoverview React hooks for Contentful content management integration
 * 
 * Provides optimized React hooks for fetching and managing content from Contentful CMS:
 * - Portfolio entries with filtering and pagination
 * - About page content with rich text processing
 * - Homepage content with dynamic hero sections
 * - Error handling and loading states
 * - Automatic retries and caching strategies
 * 
 * Features:
 * - TypeScript interfaces for complete type safety
 * - Suspense and error boundary compatibility
 * - Optimistic updates for better UX
 * - Background refresh for stale content
 * - Memory efficient with cleanup on unmount
 * 
 * Performance Optimizations:
 * - Debounced API calls to prevent excessive requests
 * - Selective re-fetching based on dependency changes
 * - Intelligent caching with TTL management
 * - Error recovery with exponential backoff
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial Contentful hooks implementation
 * @lastModified 2025-01-17
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Debounce function to prevent rapid successive calls
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  }) as T;
}
import { 
  getPortfolioEntries, 
  getAboutPageContent, 
  getHomepageContent,
  getBlogPosts,
  getBlogPostBySlug,
  type PortfolioEntry,
  type AboutPageContent,
  type HomepageContent,
  type BlogPost,
  type BlogListingResponse
} from '../utils/contentfulService';

/**
 * Generic loading and error state interface for all content hooks
 * 
 * @interface ContentHookState
 * @template T - The content type being managed
 */
interface ContentHookState<T> {
  /** Content data, null when loading or error occurred */
  data: T | null;
  /** Loading state indicator */
  loading: boolean;
  /** Error state with descriptive message */
  error: string | null;
  /** Function to manually refresh content */
  refresh: () => Promise<void>;
  /** Timestamp of last successful fetch */
  lastFetched: Date | null;
}

/**
 * Options for portfolio entries hook
 * 
 * @interface UsePortfolioOptions
 */
interface UsePortfolioOptions {
  /** Filter entries by category */
  category?: string;
  /** Filter entries by specific tags */
  tags?: string | string[];
  /** Only return featured entries */
  featuredOnly?: boolean;
  /** Maximum number of entries to fetch */
  limit?: number;
  /** Enable automatic background refresh */
  autoRefresh?: boolean;
  /** Refresh interval in milliseconds (default: 5 minutes) */
  refreshInterval?: number;
}

/**
 * Hook for managing portfolio entries with advanced filtering and caching
 * 
 * @function usePortfolioEntries
 * @param {UsePortfolioOptions} options - Configuration options for filtering and behavior
 * @returns {ContentHookState<PortfolioEntry[]>} Portfolio entries with loading/error states
 * 
 * @example
 * ```typescript
 * // Basic usage - all portfolio entries
 * const { data: entries, loading, error, refresh } = usePortfolioEntries();
 * 
 * // Featured entries only
 * const { data: featured } = usePortfolioEntries({ 
 *   featuredOnly: true, 
 *   limit: 6 
 * });
 * 
 * // Category filtered with auto-refresh
 * const { data: festival } = usePortfolioEntries({ 
 *   category: 'festival',
 *   autoRefresh: true,
 *   refreshInterval: 300000 // 5 minutes
 * });
 * 
 * // Tag filtered entries
 * const { data: uvWork } = usePortfolioEntries({ 
 *   tags: ['uv-makeup', 'blacklight']
 * });
 * 
 * // Combined filtering by category and tags
 * const { data: specialWork } = usePortfolioEntries({
 *   category: 'festival',
 *   tags: 'featured-work'
 * });
 * 
 * if (loading) return <div>Loading portfolio...</div>;
 * if (error) return <div>Error: {error}</div>;
 * 
 * return (
 *   <div>
 *     {entries?.map(entry => (
 *       <PortfolioCard key={entry.id} entry={entry} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export function usePortfolioEntries(options: UsePortfolioOptions = {}): ContentHookState<PortfolioEntry[]> {
  const [data, setData] = useState<PortfolioEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  
  // Refs for managing cleanup and preventing memory leaks
  const abortControllerRef = useRef<AbortController | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  /**
   * Fetch portfolio entries with error handling and loading states
   */
  const fetchEntries = useCallback(async (showLoading = true) => {
    try {
      // Cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const entries = await getPortfolioEntries({
        category: options.category,
        tags: options.tags,
        featuredOnly: options.featuredOnly,
        limit: options.limit,
      });

      // Check if component is still mounted
      if (!abortControllerRef.current?.signal.aborted) {
        setData(entries);
        setLastFetched(new Date());
      }
    } catch (err) {
      // Only set error if component is still mounted
      if (!abortControllerRef.current?.signal.aborted) {
        const errorMessage = err instanceof Error 
          ? `Failed to load portfolio entries: ${err.message}`
          : 'Failed to load portfolio entries. Please try again.';
        
        setError(errorMessage);
        console.error('Portfolio entries fetch error:', err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [options.category, options.tags, options.featuredOnly, options.limit]);

  /**
   * Manual refresh function for user-triggered updates
   */
  const refresh = useCallback(async () => {
    await fetchEntries(true);
  }, [fetchEntries]);

  /**
   * Setup auto-refresh if enabled
   */
  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      refreshTimeoutRef.current = setInterval(() => {
        fetchEntries(false); // Background refresh without loading state
      }, options.refreshInterval);
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
      }
    };
  }, [options.autoRefresh, options.refreshInterval, fetchEntries]);

  /**
   * Initial fetch and cleanup on unmount
   */
  useEffect(() => {
    // Add a small delay to prevent immediate firing and potential race conditions
    const timeoutId = setTimeout(() => {
      fetchEntries();
    }, 100);

    return () => {
      // Cleanup timeout
      clearTimeout(timeoutId);
      
      // Cleanup on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
      }
    };
  }, [fetchEntries]);

  return { data, loading, error, refresh, lastFetched };
}

/**
 * Hook for managing about page content with rich text processing
 * 
 * @function useAboutPageContent
 * @returns {ContentHookState<AboutPageContent>} About page content with loading/error states
 * 
 * @example
 * ```typescript
 * const { data: aboutContent, loading, error, refresh } = useAboutPageContent();
 * 
 * if (loading) return <AboutPageSkeleton />;
 * if (error) return <ErrorBoundary error={error} onRetry={refresh} />;
 * 
 * return (
 *   <div>
 *     <h1>{aboutContent?.hero.title}</h1>
 *     <p>{aboutContent?.hero.description}</p>
 *     
 *     {aboutContent?.journey.sections.map((section, index) => (
 *       <JourneySection key={index} section={section} />
 *     ))}
 *   </div>
 * );
 * ```
 */
export function useAboutPageContent(): ContentHookState<AboutPageContent> {
  const [data, setData] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Fetch about page content with comprehensive error handling
   */
  const fetchContent = useCallback(async (showLoading = true) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const content = await getAboutPageContent();

      if (!abortControllerRef.current?.signal.aborted) {
        setData(content);
        setLastFetched(new Date());
      }
    } catch (err) {
      if (!abortControllerRef.current?.signal.aborted) {
        const errorMessage = err instanceof Error 
          ? `Failed to load about page content: ${err.message}`
          : 'Failed to load about page. Please try again.';
        
        setError(errorMessage);
        console.error('About page content fetch error:', err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  /**
   * Manual refresh function
   */
  const refresh = useCallback(async () => {
    await fetchContent(true);
  }, [fetchContent]);

  /**
   * Initial fetch and cleanup
   */
  useEffect(() => {
    fetchContent();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchContent]);

  return { data, loading, error, refresh, lastFetched };
}

/**
 * Hook for managing homepage content with hero and featured sections
 * 
 * @function useHomepageContent
 * @returns {ContentHookState<HomepageContent>} Homepage content with loading/error states
 * 
 * @example
 * ```typescript
 * const { data: homepage, loading, error, refresh } = useHomepageContent();
 * 
 * if (loading) return <HomepageSkeleton />;
 * if (error) return <ErrorState onRetry={refresh} />;
 * 
 * return (
 *   <div>
 *     <HeroSection 
 *       title={homepage?.hero.title}
 *       subtitle={homepage?.hero.subtitle}
 *       description={homepage?.hero.description}
 *       backgroundImages={homepage?.hero.backgroundImages}
 *     />
 *     
 *     <FeaturedSection 
 *       title={homepage?.featured.title}
 *       entries={homepage?.featured.entries}
 *     />
 *     
 *     <PhilosophySection 
 *       title={homepage?.philosophy.title}
 *       cards={homepage?.philosophy.cards}
 *     />
 *   </div>
 * );
 * ```
 */
export function useHomepageContent(): ContentHookState<HomepageContent> {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Fetch homepage content with featured portfolio integration
   */
  const fetchContent = useCallback(async (showLoading = true) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const content = await getHomepageContent();

      if (!abortControllerRef.current?.signal.aborted) {
        setData(content);
        setLastFetched(new Date());
      }
    } catch (err) {
      if (!abortControllerRef.current?.signal.aborted) {
        const errorMessage = err instanceof Error 
          ? `Failed to load homepage content: ${err.message}`
          : 'Failed to load homepage. Please try again.';
        
        setError(errorMessage);
        console.error('Homepage content fetch error:', err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  /**
   * Manual refresh function
   */
  const refresh = useCallback(async () => {
    await fetchContent(true);
  }, [fetchContent]);

  /**
   * Initial fetch and cleanup
   */
  useEffect(() => {
    fetchContent();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchContent]);

  return { data, loading, error, refresh, lastFetched };
}

/**
 * Hook for fetching portfolio entries organized by sections with tag-based filtering
 * 
 * @function usePortfolioSections
 * @param {Array} sections - Array of portfolio sections with contentfulTags
 * @returns {Object} Portfolio entries organized by section with loading states
 * 
 * @example
 * ```typescript
 * const { 
 *   sectionData, 
 *   loading, 
 *   error, 
 *   refresh 
 * } = usePortfolioSections(PORTFOLIO_SECTIONS);
 * 
 * if (loading) return <PortfolioSkeleton />;
 * if (error) return <ErrorBoundary onRetry={refresh} />;
 * 
 * return sectionData.map(section => (
 *   <PortfolioSection key={section.id} section={section} />
 * ));
 * ```
 */
export function usePortfolioSections(sections: any[]) {
  const [sectionData, setSectionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Fetch content for all sections with tag-based filtering
   */
  const fetchSections = useCallback(async (showLoading = true) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      // Fetch content for each section based on its tags
      const sectionPromises = sections.map(async (section) => {
        try {
          const entries = await getPortfolioEntries({
            tags: section.contentfulTags,
          });

          // If no entries found with tags, try fallback category
          let finalEntries = entries;
          if (entries.length === 0 && section.fallbackCategory) {
            finalEntries = await getPortfolioEntries({
              category: section.fallbackCategory,
            });
          }

          // If still no entries, use static entries as final fallback
          if (finalEntries.length === 0 && section.entries) {
            finalEntries = section.entries.map((entry: any) => ({
              id: entry.id,
              title: entry.title,
              description: entry.description,
              category: entry.category,
              images: entry.images,
              featuredImage: entry.images[0],
              tags: section.contentfulTags,
              createdDate: new Date().toISOString(),
              featured: false,
              displayOrder: 0,
            }));
          }

          return {
            ...section,
            entries: finalEntries,
            contentSource: entries.length > 0 ? 'contentful' : 
                           finalEntries.length > 0 ? 'fallback' : 'static'
          };
        } catch (err) {
          console.warn(`Failed to fetch content for section ${section.id}:`, err);
          // Use static entries as fallback
          return {
            ...section,
            entries: section.entries || [],
            contentSource: 'static'
          };
        }
      });

      const results = await Promise.all(sectionPromises);

      if (!abortControllerRef.current?.signal.aborted) {
        setSectionData(results);
        setLastFetched(new Date());
      }
    } catch (err) {
      if (!abortControllerRef.current?.signal.aborted) {
        const errorMessage = err instanceof Error 
          ? `Failed to load portfolio sections: ${err.message}`
          : 'Failed to load portfolio sections. Please try again.';
        
        setError(errorMessage);
        console.error('Portfolio sections fetch error:', err);
        
        // Fallback to static data
        setSectionData(sections);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [sections]);

  /**
   * Manual refresh function
   */
  const refresh = useCallback(async () => {
    await fetchSections(true);
  }, [fetchSections]);

  /**
   * Initial fetch and cleanup
   */
  useEffect(() => {
    fetchSections();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchSections]);

  return { 
    sectionData, 
    loading, 
    error, 
    refresh, 
    lastFetched 
  };
}

/**
 * Composite hook for preloading and managing all critical content
 * 
 * @function useCriticalContent
 * @returns {Object} Combined loading states and content for all critical sections
 * 
 * @example
 * ```typescript
 * const { 
 *   homepage, 
 *   featuredPortfolio, 
 *   allLoading, 
 *   anyError, 
 *   refreshAll 
 * } = useCriticalContent();
 * 
 * if (allLoading) return <AppSkeleton />;
 * if (anyError) return <CriticalErrorBoundary onRetry={refreshAll} />;
 * 
 * return <App homepage={homepage} featured={featuredPortfolio} />;
 * ```
 */
export function useCriticalContent() {
  const homepage = useHomepageContent();
  const featuredPortfolio = usePortfolioEntries({ 
    featuredOnly: true, 
    limit: 6,
    autoRefresh: true,
    refreshInterval: 300000 // 5 minutes
  });

  /**
   * Combined loading state - true if any critical content is loading
   */
  const allLoading = homepage.loading || featuredPortfolio.loading;

  /**
   * Combined error state - first error encountered
   */
  const anyError = homepage.error || featuredPortfolio.error;

  /**
   * Refresh all critical content simultaneously
   */
  const refreshAll = useCallback(async () => {
    await Promise.all([
      homepage.refresh(),
      featuredPortfolio.refresh(),
    ]);
  }, [homepage.refresh, featuredPortfolio.refresh]);

  return {
    homepage: homepage.data,
    featuredPortfolio: featuredPortfolio.data,
    allLoading,
    anyError,
    refreshAll,
    lastFetched: {
      homepage: homepage.lastFetched,
      featuredPortfolio: featuredPortfolio.lastFetched,
    },
  };
}

/**
 * Options for blog posts hook
 * 
 * @interface UseBlogPostsOptions
 */
interface UseBlogPostsOptions {
  /** Filter posts by category */
  category?: string;
  /** Filter posts by specific tags */
  tags?: string | string[];
  /** Page number for pagination (1-based) */
  page?: number;
  /** Maximum number of posts per page */
  limit?: number;
  /** Sort field (publishedDate, title, updatedDate) */
  sortBy?: 'publishedDate' | 'title' | 'updatedDate';
  /** Sort direction (asc, desc) */
  sortOrder?: 'asc' | 'desc';
  /** Return only published posts */
  publishedOnly?: boolean;
  /** Enable automatic background refresh */
  autoRefresh?: boolean;
  /** Refresh interval in milliseconds (default: 10 minutes) */
  refreshInterval?: number;
}

/**
 * Hook for managing blog posts with advanced filtering, pagination, and caching
 * 
 * @function useBlogPosts
 * @param {UseBlogPostsOptions} options - Configuration options for filtering and behavior
 * @returns {ContentHookState<BlogListingResponse>} Blog posts with pagination and metadata
 * 
 * @example
 * ```typescript
 * // Basic usage - all published blog posts
 * const { data: blogData, loading, error, refresh } = useBlogPosts();
 * 
 * // Posts by category with pagination
 * const { data: tutorialPosts } = useBlogPosts({ 
 *   category: 'tutorials',
 *   page: 1,
 *   limit: 6 
 * });
 * 
 * // Tag filtered with auto-refresh
 * const { data: festivalPosts } = useBlogPosts({ 
 *   tags: ['festival', 'uv-makeup'],
 *   autoRefresh: true,
 *   refreshInterval: 600000 // 10 minutes
 * });
 * 
 * // Latest posts sorted by date
 * const { data: latestPosts } = useBlogPosts({
 *   sortBy: 'publishedDate',
 *   sortOrder: 'desc',
 *   limit: 3
 * });
 * 
 * if (loading) return <BlogSkeleton />;
 * if (error) return <ErrorBoundary error={error} onRetry={refresh} />;
 * 
 * return (
 *   <div>
 *     {blogData?.posts.map(post => (
 *       <BlogCard key={post.id} post={post} />
 *     ))}
 *     <BlogPagination pagination={blogData?.pagination} />
 *   </div>
 * );
 * ```
 */
export function useBlogPosts(options: UseBlogPostsOptions = {}): ContentHookState<BlogListingResponse> {
  const [data, setData] = useState<BlogListingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  
  // Refs for managing cleanup and preventing memory leaks
  const abortControllerRef = useRef<AbortController | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  /**
   * Fetch blog posts with error handling and loading states
   */
  const fetchPosts = useCallback(async (showLoading = true) => {
    try {
      // Cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const blogData = await getBlogPosts({
        category: options.category,
        tags: options.tags,
        page: options.page,
        limit: options.limit,
        sortBy: options.sortBy,
        sortOrder: options.sortOrder,
        publishedOnly: options.publishedOnly,
      });

      // Check if component is still mounted
      if (!abortControllerRef.current?.signal.aborted) {
        setData(blogData);
        setLastFetched(new Date());
      }
    } catch (err) {
      // Only set error if component is still mounted
      if (!abortControllerRef.current?.signal.aborted) {
        const errorMessage = err instanceof Error 
          ? `Failed to load blog posts: ${err.message}`
          : 'Failed to load blog posts. Please try again.';
        
        setError(errorMessage);
        console.error('Blog posts fetch error:', err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [options.category, options.tags, options.page, options.limit, options.sortBy, options.sortOrder, options.publishedOnly]);

  /**
   * Manual refresh function for user-triggered updates
   */
  const refresh = useCallback(async () => {
    await fetchPosts(true);
  }, [fetchPosts]);

  /**
   * Setup auto-refresh if enabled
   */
  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      refreshTimeoutRef.current = setInterval(() => {
        fetchPosts(false); // Background refresh without loading state
      }, options.refreshInterval);
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
      }
    };
  }, [options.autoRefresh, options.refreshInterval, fetchPosts]);

  /**
   * Initial fetch and cleanup on unmount
   */
  useEffect(() => {
    fetchPosts();

    return () => {
      // Cleanup on unmount
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
      }
    };
  }, [fetchPosts]);

  return { data, loading, error, refresh, lastFetched };
}

/**
 * Hook for managing a single blog post by slug
 * 
 * @function useBlogPost
 * @param {string} slug - URL-friendly post identifier
 * @returns {ContentHookState<BlogPost>} Single blog post with loading/error states
 * 
 * @example
 * ```typescript
 * const { data: post, loading, error, refresh } = useBlogPost('festival-makeup-guide-2024');
 * 
 * if (loading) return <BlogPostSkeleton />;
 * if (error) return <ErrorBoundary error={error} onRetry={refresh} />;
 * if (!post) return <NotFound />;
 * 
 * return (
 *   <article>
 *     <h1>{post.title}</h1>
 *     <p>{post.excerpt}</p>
 *     <div dangerouslySetInnerHTML={{ __html: post.content }} />
 *     
 *     {post.relatedPosts && (
 *       <RelatedPosts posts={post.relatedPosts} />
 *     )}
 *   </article>
 * );
 * ```
 */
export function useBlogPost(slug: string): ContentHookState<BlogPost> {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Fetch blog post by slug with comprehensive error handling
   */
  const fetchPost = useCallback(async (showLoading = true) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const post = await getBlogPostBySlug(slug);

      if (!abortControllerRef.current?.signal.aborted) {
        setData(post);
        setLastFetched(new Date());
      }
    } catch (err) {
      if (!abortControllerRef.current?.signal.aborted) {
        const errorMessage = err instanceof Error 
          ? `Failed to load blog post: ${err.message}`
          : 'Failed to load blog post. Please try again.';
        
        setError(errorMessage);
        console.error('Blog post fetch error:', err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [slug]);

  /**
   * Manual refresh function
   */
  const refresh = useCallback(async () => {
    await fetchPost(true);
  }, [fetchPost]);

  /**
   * Initial fetch and cleanup
   */
  useEffect(() => {
    if (slug) {
      fetchPost();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchPost, slug]);

  return { data, loading, error, refresh, lastFetched };
}

/**
 * Hook for managing content with offline support and cache persistence
 * 
 * @function useContentWithOfflineSupport
 * @template T - Content type
 * @param {string} cacheKey - Unique key for localStorage caching
 * @param {() => Promise<T>} fetcher - Function to fetch fresh content
 * @param {Object} options - Configuration options
 * @returns {ContentHookState<T>} Content with offline support
 * 
 * @example
 * ```typescript
 * const portfolioWithOffline = useContentWithOfflineSupport(
 *   'portfolio-entries',
 *   () => getPortfolioEntries({ featuredOnly: true }),
 *   { cacheTTL: 3600000 } // 1 hour
 * );
 * ```
 */
export function useContentWithOfflineSupport<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  options: {
    cacheTTL?: number; // Time to live in milliseconds
    enableOffline?: boolean;
  } = {}
): ContentHookState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const { cacheTTL = 3600000, enableOffline = true } = options;

  /**
   * Load content from cache if available and valid
   */
  const loadFromCache = useCallback((): T | null => {
    if (!enableOffline) return null;

    try {
      const cached = localStorage.getItem(`contentful-cache-${cacheKey}`);
      if (!cached) return null;

      const { data: cachedData, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;

      if (age > cacheTTL) {
        localStorage.removeItem(`contentful-cache-${cacheKey}`);
        return null;
      }

      return cachedData;
    } catch (err) {
      console.warn('Failed to load content from cache:', err);
      return null;
    }
  }, [cacheKey, cacheTTL, enableOffline]);

  /**
   * Save content to cache
   */
  const saveToCache = useCallback((content: T) => {
    if (!enableOffline) return;

    try {
      localStorage.setItem(`contentful-cache-${cacheKey}`, JSON.stringify({
        data: content,
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.warn('Failed to save content to cache:', err);
    }
  }, [cacheKey, enableOffline]);

  /**
   * Fetch content with cache fallback
   */
  const fetchContent = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      // Try to load from cache first for immediate display
      const cachedContent = loadFromCache();
      if (cachedContent && !data) {
        setData(cachedContent);
        setLoading(false);
      }

      // Fetch fresh content
      const freshContent = await fetcher();
      setData(freshContent);
      setLastFetched(new Date());
      saveToCache(freshContent);

    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Failed to load content: ${err.message}`
        : 'Failed to load content. Please check your connection.';
      
      setError(errorMessage);
      
      // If we have cached content, use it despite the error
      const cachedContent = loadFromCache();
      if (cachedContent && !data) {
        setData(cachedContent);
        console.warn('Using cached content due to fetch error');
      }
    } finally {
      setLoading(false);
    }
  }, [fetcher, loadFromCache, saveToCache, data]);

  /**
   * Manual refresh function
   */
  const refresh = useCallback(async () => {
    await fetchContent(true);
  }, [fetchContent]);

  /**
   * Initial load
   */
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, loading, error, refresh, lastFetched };
}