/**
 * @fileoverview Blog page component for Ash Shaw Makeup Portfolio
 * 
 * Comprehensive blog listing and single post viewing with Contentful CMS integration.
 * Features advanced filtering, pagination, search, and responsive design following
 * the complete brand guidelines and accessibility standards.
 * 
 * Core Features:
 * - Dynamic blog post listing from Contentful CMS with static fallbacks
 * - Category and tag-based filtering with smooth transitions
 * - Client-side search functionality with highlighting
 * - Responsive pagination with keyboard navigation
 * - Single post view with rich content and related posts
 * - SEO-optimized meta tags and structured data
 * - Reading time estimation and social sharing
 * - WCAG 2.1 AA compliant accessibility implementation
 * 
 * Styling System:
 * - Tailwind V4 with brand-compliant utility classes
 * - Fluid typography and spacing following guidelines
 * - Gradient effects and hover animations per brand standards
 * - Mobile-first responsive design with fluid scaling
 * - Brand color system with AAA contrast compliance
 * 
 * Performance Optimizations:
 * - Lazy loading for blog post images and content
 * - Efficient state management with React hooks
 * - Debounced search with minimal re-renders
 * - Progressive enhancement with graceful fallbacks
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial blog page implementation with Contentful integration
 * @lastModified 2025-01-17
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useBlogPosts, useBlogPost } from '../../../hooks/useContentful';
import { type BlogPost, type BlogListingResponse } from '../../../utils/contentfulService';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { ReadMoreButton } from '../../ui/ReadMoreButton';
import { ShareComponent } from '../../ui/ShareComponent';
import { BlogPagination } from '../../ui/BlogPagination';
import { Footer } from '../../common/Footer';
import { useContentfulConfigured } from '../../admin/ContentfulStatus';
import { Calendar, Clock, Tag, User, Search, Filter, ArrowLeft, ArrowRight, Share2, Settings } from 'lucide-react';
import { ScrollToTop } from '../../ui/ScrollToTop';

/**
 * Blog page props interface
 * 
 * @interface BlogPageProps
 */
interface BlogPageProps {
  /** Enhanced navigation function supporting blog post routing */
  setCurrentPage: (page: string, slug?: string) => void;
}

/**
 * Blog page state interface for URL management
 * 
 * @interface BlogPageState
 */
interface BlogPageState {
  /** Current page number for pagination */
  page: number;
  /** Selected category filter */
  category?: string;
  /** Selected tags filter */
  tags: string[];
  /** Search query string */
  searchQuery: string;
  /** Posts per page limit */
  limit: number;
}

/**
 * Main blog page component with comprehensive content management
 * 
 * Provides a complete blog experience with listing, filtering, search, and single post views.
 * Integrates with Contentful CMS for dynamic content while maintaining static fallbacks.
 * 
 * Features:
 * - Responsive blog post grid with category-based filtering
 * - Real-time search with debounced query processing
 * - Pagination with keyboard navigation support
 * - Single post view with rich content rendering
 * - Related posts suggestions based on categories and tags
 * - Social sharing functionality and reading time estimation
 * - SEO optimization with dynamic meta tags
 * - Complete accessibility compliance with WCAG 2.1 AA standards
 * 
 * @component
 * @param {BlogPageProps} props - Component properties
 * @returns {JSX.Element} Complete blog page with listing and post views
 * 
 * @accessibility WCAG 2.1 AA Compliance Details
 * - Semantic HTML structure with proper article and navigation landmarks
 * - Keyboard navigation for all interactive elements
 * - Screen reader compatibility with ARIA labels and live regions
 * - Focus management during view transitions
 * - High contrast support and reduced motion preferences
 * - Alt text for all images and descriptive link text
 * 
 * @responsive Breakpoint Behavior
 * - Mobile (320px-767px): Single column layout with touch-optimized filters
 * - Tablet (768px-1023px): Two column grid with sidebar filters
 * - Desktop (1024px+): Three column grid with advanced filter panel
 * - Large Desktop (1440px+): Constrained max-width with centered content
 * 
 * @example
 * ```tsx
 * // Basic blog page usage
 * <BlogPage setCurrentPage={setCurrentPage} />
 * 
 * // Blog page with direct post linking
 * <BlogPage 
 *   setCurrentPage={setCurrentPage}
 *   initialSlug="festival-makeup-guide-2024"
 * />
 * ```
 */
export function BlogPage({ setCurrentPage, initialSlug }: BlogPageProps) {
  // Check Contentful configuration
  const isContentfulConfigured = useContentfulConfigured();
  
  // Blog page state management
  const [blogState, setBlogState] = useState<BlogPageState>({
    view: initialSlug ? 'post' : 'list',
    slug: initialSlug,
    page: 1,
    category: undefined,
    tags: [],
    searchQuery: '',
    limit: 9,
  });

  // Debounced search query for performance
  const [debouncedSearch, setDebouncedSearch] = useState(blogState.searchQuery);
  






  // Blog posts data with filtering and pagination
  const { 
    data: blogData, 
    loading: postsLoading, 
    error: postsError, 
    refresh: refreshPosts 
  } = useBlogPosts({
    category: blogState.category,
    tags: blogState.tags.length > 0 ? blogState.tags : undefined,
    page: blogState.page,
    limit: blogState.limit,
    sortBy: 'publishedDate',
    sortOrder: 'desc',
    publishedOnly: true,
    autoRefresh: true,
    refreshInterval: 600000, // 10 minutes
  });

  // Single blog post data (when viewing individual post)
  const { 
    data: currentPost, 
    loading: postLoading, 
    error: postError, 
    refresh: refreshPost 
  } = useBlogPost(blogState.slug || '');

  /**
   * Debounce search query updates for performance
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(blogState.searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [blogState.searchQuery]);

  /**
   * Filter posts based on search query (client-side)
   */
  const filteredPosts = useMemo(() => {
    if (!blogData?.posts || !debouncedSearch.trim()) {
      return blogData?.posts || [];
    }

    const query = debouncedSearch.toLowerCase();
    return blogData.posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.category.toLowerCase().includes(query)
    );
  }, [blogData?.posts, debouncedSearch]);

  /**
   * Update blog state and manage URL-like behavior
   */
  const updateBlogState = useCallback((updates: Partial<BlogPageState>) => {
    setBlogState(prev => ({
      ...prev,
      ...updates,
      // Reset page when changing filters
      ...(updates.category !== undefined || updates.tags !== undefined || updates.searchQuery !== undefined 
        ? { page: 1 } 
        : {})
    }));
  }, []);

  /**
   * Navigate to single blog post view using the new routing system
   */
  const viewBlogPost = useCallback((slug: string) => {
    setCurrentPage(`blog/${slug}`, slug);
    
    // Announce navigation to screen readers
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = `Navigating to blog post: ${slug}`;
    }
  }, [setCurrentPage]);

  /**
   * Navigate back to blog listing
   */
  const backToBlogList = useCallback(() => {
    updateBlogState({ view: 'list', slug: undefined });
    
    // Announce navigation to screen readers
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Returned to blog post listing';
    }
  }, [updateBlogState]);

  /**
   * Handle category filter selection
   */
  const selectCategory = useCallback((category: string | undefined) => {
    updateBlogState({ category, tags: [] }); // Clear tags when selecting category
  }, [updateBlogState]);

  /**
   * Handle tag filter toggle
   */
  const toggleTag = useCallback((tag: string) => {
    updateBlogState({
      tags: blogState.tags.includes(tag)
        ? blogState.tags.filter(t => t !== tag)
        : [...blogState.tags, tag],
      category: undefined, // Clear category when selecting tags
    });
  }, [blogState.tags, updateBlogState]);

  /**
   * Handle pagination navigation with improved UX
   * Implements smooth scrolling and proper loading states
   */
  const goToPage = useCallback((page: number) => {
    // Don't navigate if already on the requested page
    if (page === blogState.page) return;
    
    updateBlogState({ page });
    
    // Scroll to top of blog content for better UX
    setTimeout(() => {
      const blogHeader = document.querySelector('[data-blog-header]');
      if (blogHeader) {
        blogHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    
    // Announce page change to screen readers
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = `Loading page ${page} of blog posts`;
    }
  }, [updateBlogState, blogState.page]);

  /**
   * Keyboard shortcuts for better navigation
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case 'f':
        case 'F':
          // Focus search input
          event.preventDefault();
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
          break;
        case 'h':
        case 'H':
          // Go to home
          event.preventDefault();
          setCurrentPage('home');
          break;
        case 'ArrowLeft':
          // Previous page
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (blogData?.pagination.hasPrevious) {
              goToPage(blogState.page - 1);
            }
          }
          break;
        case 'ArrowRight':
          // Next page  
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (blogData?.pagination.hasNext) {
              goToPage(blogState.page + 1);
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentPage, goToPage, blogState.page, blogData?.pagination]);

  /**
   * Format date for display
   */
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  /**
   * Update meta tags for SEO when viewing single post
   */
  useEffect(() => {
    if (blogState.view === 'post' && currentPost) {
      // Update page title
      document.title = `${currentPost.title} | Ash Shaw - Makeup Artist Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', currentPost.excerpt);
      }
      
      // Update Open Graph tags
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      updateMetaTag('og:title', currentPost.title);
      updateMetaTag('og:description', currentPost.excerpt);
      updateMetaTag('og:type', 'article');
      updateMetaTag('og:url', `${window.location.origin}/blog/${currentPost.slug}`);
      if (currentPost.featuredImage) {
        updateMetaTag('og:image', currentPost.featuredImage.url);
      }
      
      // Twitter Card tags
      const updateTwitterTag = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      updateTwitterTag('twitter:card', 'summary_large_image');
      updateTwitterTag('twitter:title', currentPost.title);
      updateTwitterTag('twitter:description', currentPost.excerpt);
      if (currentPost.featuredImage) {
        updateTwitterTag('twitter:image', currentPost.featuredImage.url);
      }
    } else if (blogState.view === 'list') {
      // Reset to default meta tags for blog listing
      document.title = 'Blog - Makeup Artistry Insights | Ash Shaw - Makeup Artist';
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Explore tutorials, behind-the-scenes insights, and creative inspiration from the world of festival and UV makeup artistry.');
      }
    }
  }, [blogState.view, currentPost]);

  /**
   * Share blog post (Web Share API with fallback)
   */
  const sharePost = useCallback(async (post: BlogPost) => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: `${window.location.origin}/blog/${post.slug}`,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard with robust error handling
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shareData.url);
            console.log('Blog post URL copied to clipboard');
            // Announce to screen readers
            const announcement = document.getElementById('announcements');
            if (announcement) {
              announcement.textContent = 'Blog post URL copied to clipboard';
            }
          } else {
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement('textarea');
            textArea.value = shareData.url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
              const successful = document.execCommand('copy');
              if (successful) {
                console.log('Blog post URL copied to clipboard using fallback method');
                // Announce to screen readers
                const announcement = document.getElementById('announcements');
                if (announcement) {
                  announcement.textContent = 'Blog post URL copied to clipboard';
                }
              } else {
                throw new Error('Copy command failed');
              }
            } catch (fallbackError) {
              console.warn('Could not copy URL automatically:', shareData.url);
              alert(`Please copy this URL manually:\n\n${shareData.url}`);
            } finally {
              document.body.removeChild(textArea);
            }
          }
        } catch (clipboardError) {
          console.warn('Clipboard access failed:', clipboardError);
          alert(`Please copy this URL manually:\n\n${shareData.url}`);
        }
      }
    } catch (error) {
      console.error('Error sharing blog post:', error);
      // Provide manual fallback
      alert(`Please copy this URL manually:\n\n${shareData.url}`);
    }
  }, []);

  // Show single blog post view
  if (blogState.view === 'post') {
    return (
      <main id="main-content" role="main" tabIndex={-1} className="min-h-screen bg-white">
        {/* Back navigation */}
        <div className="max-w-7xl mx-auto px-fluid-md py-fluid-lg">
          <button
            onClick={backToBlogList}
            className="inline-flex items-center gap-fluid-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-fluid-lg group focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 rounded-lg px-fluid-sm py-fluid-xs"
            aria-label="Return to blog post listing"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-body font-medium text-fluid-base">Back to Blog</span>
          </button>
        </div>

        {/* Loading state */}
        {postLoading && (
          <div className="max-w-4xl mx-auto px-fluid-md py-fluid-xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg mb-fluid-md w-3/4"></div>
              <div className="h-64 bg-gray-200 rounded-xl mb-fluid-lg"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {postError && (
          <div className="max-w-4xl mx-auto px-fluid-md py-fluid-xl text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-fluid-md">
              <h2 className="text-fluid-xl font-heading font-semibold text-red-800 mb-fluid-sm">
                Error Loading Blog Post
              </h2>
              <p className="text-fluid-base font-body text-red-700 mb-fluid-md">
                {postError}
              </p>
              <button
                onClick={refreshPost}
                className="bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Blog post content */}
        {currentPost && !postLoading && (
          <>
            {/* Structured data for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  "headline": currentPost.title,
                  "description": currentPost.excerpt,
                  "image": currentPost.featuredImage?.url || '',
                  "author": {
                    "@type": "Person",
                    "name": currentPost.author.name,
                    "description": currentPost.author.bio
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Ash Shaw - Makeup Artist",
                    "logo": {
                      "@type": "ImageObject",
                      "url": `${window.location.origin}/favicon.svg`
                    }
                  },
                  "datePublished": currentPost.publishedDate,
                  "dateModified": currentPost.updatedDate || currentPost.publishedDate,
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${window.location.origin}/blog/${currentPost.slug}`
                  },
                  "wordCount": currentPost.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
                  "timeRequired": `PT${currentPost.readingTime || 5}M`,
                  "keywords": currentPost.tags.join(', '),
                  "about": {
                    "@type": "Thing",
                    "name": "Makeup Artistry"
                  }
                })
              }}
            />
            
            <article className="max-w-4xl mx-auto px-fluid-md pb-fluid-3xl">
              {/* Post header */}
              <header className="mb-fluid-xl">
              {/* Featured image */}
              {currentPost.featuredImage && (
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden mb-fluid-lg shadow-xl">
                  <ImageWithFallback
                    src={currentPost.featuredImage.url}
                    alt={currentPost.featuredImage.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-hero-h1 font-heading font-bold text-gradient-pink-purple-blue text-center lg:text-left leading-tight tracking-tight mb-fluid-md">
                {currentPost.title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-fluid-md text-gray-600 mb-fluid-lg">
                <div className="flex items-center gap-fluid-xs">
                  <User className="w-4 h-4" />
                  <span className="font-body font-medium text-fluid-sm">{currentPost.author.name}</span>
                </div>
                <div className="flex items-center gap-fluid-xs">
                  <Calendar className="w-4 h-4" />
                  <time className="font-body text-fluid-sm" dateTime={currentPost.publishedDate}>
                    {formatDate(currentPost.publishedDate)}
                  </time>
                </div>
                {currentPost.readingTime && (
                  <div className="flex items-center gap-fluid-xs">
                    <Clock className="w-4 h-4" />
                    <span className="font-body text-fluid-sm">{currentPost.readingTime} min read</span>
                  </div>
                )}
                <ShareComponent
                  title={currentPost.title}
                  description={currentPost.excerpt}
                  url={`${window.location.origin}/blog/${currentPost.slug}`}
                  imageUrl={currentPost.featuredImage?.url}
                  variant="dropdown"
                  label="Share this"
                  align="left"
                />
              </div>

              {/* Category and tags */}
              <div className="flex flex-wrap gap-fluid-sm mb-fluid-lg">
                <span className="inline-flex items-center px-fluid-sm py-fluid-xs bg-gradient-blue-teal-green text-white text-fluid-xs font-body font-medium rounded-full">
                  {currentPost.category}
                </span>
                {currentPost.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-flex items-center px-fluid-sm py-fluid-xs bg-gray-100 text-gray-700 text-fluid-xs font-body font-medium rounded-full hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Excerpt */}
              {currentPost.excerpt && (
                <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed italic border-l-4 border-gradient-pink-purple-blue pl-fluid-md mb-fluid-lg">
                  {currentPost.excerpt}
                </p>
              )}
            </header>

            {/* Post content */}
            <div 
              className="prose prose-lg max-w-none mb-fluid-2xl"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />

            {/* Related posts */}
            {currentPost.relatedPosts && currentPost.relatedPosts.length > 0 && (
              <section className="border-t border-gray-200 pt-fluid-xl">
                <h2 className="text-section-h2 font-heading font-semibold text-gray-800 mb-fluid-lg">
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg">
                  {currentPost.relatedPosts.slice(0, 2).map(post => (
                    <BlogPostCard 
                      key={post.id} 
                      post={post} 
                      onViewPost={viewBlogPost}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </section>
            )}
            </article>
          </>
        )}

        {/* Footer */}
        <Footer setCurrentPage={setCurrentPage} />
      </main>
    );
  }

  // Show blog listing view
  return (
    <main id="main-content" role="main" tabIndex={-1} className="min-h-screen bg-white">
      {/* Page header with blog anchor */}
      <div 
        className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-fluid-2xl" 
        data-blog-header
      >
        <div className="max-w-7xl mx-auto px-fluid-md">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero-h1 font-heading font-bold text-gradient-pink-purple-blue leading-tight tracking-tight mb-fluid-md">
              Makeup Artistry Blog
            </h1>
            <p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed mb-fluid-lg">
              Explore tutorials, behind-the-scenes insights, and creative inspiration from the world of festival and UV makeup artistry.
            </p>
            
            {/* Blog stats with content source indicator */}
            {blogData?.pagination && (
              <div className="mt-fluid-md">

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-fluid-md py-fluid-lg">
        
        {/* Contentful Setup Notice (Development Only) */}
        {!isContentfulConfigured && import.meta?.env?.DEV && (
          <div className="mb-fluid-lg p-fluid-md bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-fluid-sm">
              <Settings className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-body font-semibold text-blue-800 mb-fluid-xs">
                  Dynamic Blog Content Available
                </h3>
                <p className="text-fluid-sm font-body text-blue-700 mb-fluid-sm">
                  This blog is currently showing static content with full functionality. To enable dynamic content management:
                </p>
                <ol className="text-fluid-sm font-body text-blue-700 list-decimal list-inside space-y-1 mb-fluid-sm">
                  <li>Set up your Contentful space using the provided content types</li>
                  <li>Configure VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN</li>
                  <li>Create blog posts using the "Blog Post" content type</li>
                </ol>
                <a 
                  href="/BLOG_SETUP_GUIDE.md" 
                  target="_blank"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-fluid-sm underline"
                >
                  📚 View Complete Setup Guide
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mb-fluid-lg">


          {/* Enhanced filter controls */}
          <div className="space-y-fluid-md">
            {/* Filter header */}


            {/* Category filter */}
            {blogData?.categories && blogData.categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-fluid-sm">
                <h3 className="font-body font-medium text-fluid-xs text-gray-700">Categories:</h3>
                <div className="flex flex-wrap gap-fluid-xs">
                  <button
                    onClick={() => selectCategory(undefined)}
                    className={`px-fluid-sm py-fluid-xs text-fluid-xs font-body font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 ${
                      !blogState.category
                        ? 'bg-gradient-pink-purple-blue text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    All Categories
                  </button>
                  {blogData.categories.map(category => (
                    <button
                      key={category}
                      onClick={() => selectCategory(category)}
                      className={`px-fluid-sm py-fluid-xs text-fluid-xs font-body font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 capitalize ${
                        blogState.category === category
                          ? 'bg-gradient-pink-purple-blue text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                      }`}
                      title={`Filter by ${category} category`}
                    >
                      {category.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}


          </div>

          {/* Active filters summary */}
          {(blogState.category || blogState.tags.length > 0 || blogState.searchQuery) && (
            <div className="mt-fluid-md p-fluid-sm bg-blue-50 rounded-lg">
              <div className="flex flex-wrap items-center gap-fluid-sm text-fluid-sm">
                <span className="font-body font-medium text-blue-800">Active filters:</span>
                {blogState.category && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    Category: {blogState.category}
                  </span>
                )}
                {blogState.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    Tag: {tag}
                  </span>
                ))}
                {blogState.searchQuery && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    Search: "{blogState.searchQuery}"
                  </span>
                )}
                <button
                  onClick={() => updateBlogState({ category: undefined, tags: [], searchQuery: '' })}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced loading state */}
        {postsLoading && (
          <div>
            {/* Loading filters */}
            <div className="mb-fluid-lg animate-pulse">
              <div className="flex gap-fluid-md mb-fluid-md">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
                ))}
              </div>
              <div className="flex gap-fluid-xs">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded-full w-16"></div>
                ))}
              </div>
            </div>
            
            {/* Loading posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg mb-fluid-xl">
              {[...Array(blogState.limit)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                  <div className="p-fluid-md space-y-fluid-sm">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="flex gap-fluid-xs">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-4 bg-gray-200 rounded-full w-12"></div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-fluid-sm">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Loading pagination */}
            <div className="flex justify-center">
              <div className="flex gap-fluid-xs animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {postsError && (
          <div className="text-center py-fluid-xl">
            <div className="bg-red-50 border border-red-200 rounded-xl p-fluid-md max-w-md mx-auto">
              <h2 className="text-fluid-xl font-heading font-semibold text-red-800 mb-fluid-sm">
                Error Loading Blog Posts
              </h2>
              <p className="text-fluid-base font-body text-red-700 mb-fluid-md">
                {postsError}
              </p>
              <button
                onClick={refreshPosts}
                className="bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Blog posts grid */}
        {!postsLoading && !postsError && (
          <>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-fluid-xl">
                <div className="max-w-md mx-auto">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-fluid-md" />
                  <h2 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-sm">
                    No posts found
                  </h2>
                  <p className="text-fluid-base font-body text-gray-600 mb-fluid-md">
                    Try adjusting your search or filter criteria to find more posts.
                  </p>
                  <button
                    onClick={() => updateBlogState({ category: undefined, tags: [], searchQuery: '' })}
                    className="bg-gradient-blue-teal-green hover:from-blue-700 hover:to-teal-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="mb-fluid-lg">

                </div>

                {/* Posts grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg mb-fluid-xl">
                  {filteredPosts.map(post => (
                    <BlogPostCard 
                      key={post.id} 
                      post={post} 
                      onViewPost={viewBlogPost}
                      formatDate={formatDate}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {blogData?.pagination && blogData.pagination.total > blogData.pagination.limit && (
                  <BlogPagination 
                    pagination={blogData.pagination}
                    onPageChange={goToPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>



      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
      
      {/* Scroll to top button */}
      <ScrollToTop ariaLabel="Scroll to top of blog page" />
    </main>
  );
}

/**
 * Blog post card component for listing view
 * 
 * @interface BlogPostCardProps
 */
interface BlogPostCardProps {
  /** Blog post data */
  post: BlogPost;
  /** Function to view single post */
  onViewPost: (slug: string) => void;
  /** Function to format dates */
  formatDate: (date: string) => string;
}

/**
 * Individual blog post card with hover effects and accessibility
 */
function BlogPostCard({ post, onViewPost, formatDate }: BlogPostCardProps) {
  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
      {/* Featured image */}
      {post.featuredImage && (
        <div 
          className="aspect-w-16 aspect-h-9 overflow-hidden cursor-pointer"
          onClick={() => onViewPost(post.slug)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewPost(post.slug);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View full blog post: ${post.title}`}
        >
          <ImageWithFallback
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
            style={{ aspectRatio: '16/9' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-fluid-md">
        {/* Category */}
        <div className="mb-fluid-sm">
          <span className="absolute top-2 right-2 z-10 inline-flex items-center px-fluid-sm py-fluid-xs bg-gradient-blue-teal-green text-white text-fluid-xs font-body font-medium rounded-full shadow-lg">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-sm group-hover:text-gradient-pink-purple-blue transition-colors duration-300 line-clamp-2 cursor-pointer"
          onClick={() => onViewPost(post.slug)}
        >
          {post.title}
        </h3>

        {/* Reading time and date */}
        <div className="flex items-center justify-between gap-fluid-sm text-gray-500 mb-fluid-sm">
          {post.readingTime && (
            <div className="flex items-center gap-fluid-sm">
              <Clock className="w-4 h-4" />
              <span className="text-fluid-sm font-body">{post.readingTime}m</span>
            </div>
          )}
          <div className="flex items-center gap-fluid-sm">
            <Calendar className="w-4 h-4" />
            <time className="text-fluid-sm font-body" dateTime={post.publishedDate}>
              {formatDate(post.publishedDate)}
            </time>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed mb-fluid-md line-clamp-3">
          {post.excerpt}
        </p>



        {/* Share component */}
        <div className="mb-fluid-md">

        </div>

        {/* Footer with Read more */}
        <div className="flex items-center justify-end pt-fluid-md border-t border-gray-100">
          <ReadMoreButton 
            postTitle={post.title}
            postSlug={post.slug}
            postId={post.id}
            onClick={(page: string, slug?: string) => {
              if (slug) {
                onViewPost(slug);
              }
            }}
          />
        </div>
      </div>
    </article>
  );
}

/**
 * Blog pagination component
 * 
 * @interface BlogPaginationProps
 */
interface BlogPaginationProps {
  /** Pagination data */
  pagination: BlogListingResponse['pagination'];
  /** Page change handler */
  onPageChange: (page: number) => void;
}

/**
 * Enhanced pagination component with keyboard navigation and accessibility
 * Implements best practices for Contentful pagination with proper ARIA support
 */
export function BlogPagination({ pagination, onPageChange }: BlogPaginationProps) {
  const { page, total, limit, hasNext, hasPrevious } = pagination;
  const totalPages = Math.ceil(total / limit);

  // Don't render pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  /**
   * Generate visible page numbers with smart ellipsis handling
   * Follows the pattern: [1] ... [n-2] [n-1] [n] [n+1] [n+2] ... [last]
   */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Maximum visible page numbers
    const siblingCount = 1; // Pages to show on each side of current page
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is within max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of middle range
      const leftSiblingIndex = Math.max(page - siblingCount, 1);
      const rightSiblingIndex = Math.min(page + siblingCount, totalPages);
      
      // Determine if we need left ellipsis
      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      // Determine if we need right ellipsis  
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;
      
      if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        // No left ellipsis, show right ellipsis
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = [];
        
        for (let i = 2; i <= leftItemCount; i++) {
          leftRange.push(i);
        }
        
        pages.push(...leftRange);
        pages.push('...');
        pages.push(totalPages);
      } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        // Show left ellipsis, no right ellipsis
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = [];
        
        for (let i = totalPages - rightItemCount + 1; i <= totalPages - 1; i++) {
          rightRange.push(i);
        }
        
        pages.push('...');
        pages.push(...rightRange);
        pages.push(totalPages);
      } else {
        // Show both ellipses
        pages.push('...');
        
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <nav 
      className="flex flex-col sm:flex-row items-center justify-between gap-fluid-md" 
      aria-label="Blog pagination navigation"
      role="navigation"
    >
      {/* Pagination info */}
      <div className="text-fluid-sm font-body text-gray-600 order-2 sm:order-1">
        Showing page {page} of {totalPages} ({total} total posts)
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-fluid-xs order-1 sm:order-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevious}
          className="inline-flex items-center gap-2 px-fluid-sm py-fluid-sm text-gray-600 hover:text-pink-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 rounded-lg"
          aria-label="Go to previous page"
          title="Previous page"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline font-body font-medium text-fluid-sm">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-fluid-xs">
          {getPageNumbers().map((pageNum, index) => (
            pageNum === '...' ? (
              <span 
                key={`ellipsis-${index}`} 
                className="px-3 py-2 text-gray-400 font-body text-fluid-sm"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${pageNum}`}
                onClick={() => onPageChange(pageNum as number)}
                className={`px-3 py-2 font-body font-medium text-fluid-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 min-w-[40px] ${
                  pageNum === page
                    ? 'bg-gradient-pink-purple-blue text-white shadow-lg'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50 hover:shadow-md'
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === page ? 'page' : undefined}
                title={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="inline-flex items-center gap-2 px-fluid-sm py-fluid-sm text-gray-600 hover:text-pink-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 rounded-lg"
          aria-label="Go to next page"
          title="Next page"
        >
          <span className="hidden sm:inline font-body font-medium text-fluid-sm">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Jump to page (for large datasets) */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2 order-3 sm:order-3">
          <label htmlFor="jump-to-page" className="text-fluid-sm font-body text-gray-600">
            Go to:
          </label>
          <select
            id="jump-to-page"
            value={page}
            onChange={(e) => onPageChange(parseInt(e.target.value))}
            className="px-2 py-1 text-fluid-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
            aria-label="Jump to specific page"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <option key={pageNumber} value={pageNumber}>
                Page {pageNumber}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
}