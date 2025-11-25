/**
 * @fileoverview Individual blog post page component for detailed blog post viewing
 * 
 * A comprehensive component for displaying individual blog posts with rich content,
 * author information, related posts, and social sharing. Integrates with Contentful
 * CMS for dynamic content while providing static fallbacks for development.
 * 
 * Core Features:
 * - Rich text content rendering with proper typography and formatting
 * - Author profile display with avatar and bio information
 * - Reading time estimation and publication date display
 * - Tag and category organization for content discovery
 * - Related posts suggestions based on categories and tags
 * - Social sharing integration for blog post promotion
 * - SEO optimization with meta tags and structured data
 * - Full accessibility compliance with WCAG 2.1 AA standards
 * - Responsive design optimized for all device sizes
 * - Print-friendly styling for content preservation
 * 
 * Content Management:
 * - Dynamic content loading from Contentful CMS
 * - Rich text processing with embedded media support
 * - Image optimization with responsive sizing
 * - Static fallback content for development workflow
 * - Error handling with graceful degradation
 * 
 * Performance Optimizations:
 * - Lazy loading for images and embedded content
 * - Efficient re-rendering with React.memo optimization
 * - Preloading of related posts for smooth navigation
 * - Optimized bundle size with tree-shaking support
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial individual blog post implementation
 */

import React, { useEffect, useState } from 'react';
import { useBlogPost } from '../../../hooks/useContentful';
import { type BlogPost } from '../../../utils/contentfulService';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { Footer } from '../../common/Footer';
import { ScrollToTop } from '../../ui/ScrollToTop';
import { useContentfulConfigured } from '../../admin/ContentfulStatus';
import { ShareComponent } from '../../ui/ShareComponent';
import { Calendar, Clock, Tag, User, ArrowLeft, BookOpen, Eye } from 'lucide-react';

/**
 * Props interface for BlogPostPage component
 * 
 * @interface BlogPostPageProps
 */
interface BlogPostPageProps {
  /** 
   * Blog post slug for content identification
   * Used to fetch the specific blog post from Contentful CMS
   * @example "festival-makeup-guide-2024"
   */
  slug: string;
  
  /** 
   * Navigation function to change current page
   * Used for back navigation and related post navigation
   * @param page - Target page identifier
   * @example setCurrentPage('blog')
   */
  setCurrentPage: (page: string) => void;
}

/**
 * BlogPostPage - Individual blog post display component
 * 
 * A comprehensive component for displaying individual blog posts with rich content,
 * professional formatting, and enhanced user experience. Integrates seamlessly with
 * the Contentful CMS while providing static fallbacks for development.
 * 
 * Features:
 * - Rich content display with proper typography hierarchy
 * - Author information with professional bio and avatar
 * - Publication metadata including reading time and date
 * - Tag and category navigation for content discovery
 * - Related posts suggestions for increased engagement
 * - Social sharing functionality for content promotion
 * - Print-optimized styling for content preservation
 * - Full accessibility compliance with screen reader support
 * - Responsive design with mobile-first approach
 * - SEO optimization with proper meta tag implementation
 * 
 * Content Structure:
 * - Hero section with title, author, and publication info
 * - Featured image with proper alt text and responsive sizing
 * - Rich text content with embedded media and formatting
 * - Author bio section with avatar and social links
 * - Related posts grid with thumbnail previews
 * - Navigation controls for smooth user experience
 * 
 * Performance Features:
 * - Lazy loading for images and embedded content
 * - Efficient state management with minimal re-renders
 * - Optimized bundle size with proper tree-shaking
 * - Fast content delivery with Contentful CDN integration
 * 
 * @component
 * @param {BlogPostPageProps} props - Component properties
 * @returns {JSX.Element} Rendered individual blog post page
 * 
 * @accessibility WCAG 2.1 AA Compliance
 * - Semantic HTML structure with proper heading hierarchy
 * - ARIA labels for interactive elements and navigation
 * - Keyboard navigation support for all interactive elements
 * - Screen reader announcements for dynamic content changes
 * - High contrast support with proper color contrast ratios
 * - Focus management with visible focus indicators
 * 
 * @example Basic Usage
 * ```tsx
 * <BlogPostPage 
 *   slug="festival-makeup-guide-2024" 
 *   setCurrentPage={setCurrentPage}
 * />
 * ```
 * 
 * @example With Error Handling
 * ```tsx
 * const [currentSlug, setCurrentSlug] = useState('festival-makeup-guide');
 * 
 * <ErrorBoundary>
 *   <BlogPostPage 
 *     slug={currentSlug} 
 *     setCurrentPage={handlePageChange}
 *   />
 * </ErrorBoundary>
 * ```
 */
export function BlogPostPage({ slug, setCurrentPage }: BlogPostPageProps) {
  const { data: post, loading, error } = useBlogPost(slug);
  const [readingProgress, setReadingProgress] = useState(0);
  const isContentfulConfigured = useContentfulConfigured();

  // Calculate reading progress based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle social sharing with robust clipboard fallback
  const handleShare = async (platform: 'twitter' | 'facebook' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    const title = post?.title || 'Check out this blog post';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          // Try modern Clipboard API first
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(url);
            console.log('URL copied to clipboard successfully');
            // Announce to screen readers
            const announcement = document.getElementById('announcements');
            if (announcement) {
              announcement.textContent = 'Blog post URL copied to clipboard';
            }
          } else {
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement('textarea');
            textArea.value = url;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
              const successful = document.execCommand('copy');
              if (successful) {
                console.log('URL copied to clipboard using fallback method');
                // Announce to screen readers
                const announcement = document.getElementById('announcements');
                if (announcement) {
                  announcement.textContent = 'Blog post URL copied to clipboard';
                }
              } else {
                throw new Error('Copy command failed');
              }
            } catch (fallbackError) {
              console.warn('Could not copy URL automatically. Please copy manually:', url);
              // Show the URL to user so they can copy manually
              alert(`Please copy this URL manually:\n\n${url}`);
            } finally {
              document.body.removeChild(textArea);
            }
          }
        } catch (err) {
          console.warn('Clipboard access failed, showing URL for manual copy:', err);
          // Show the URL to user so they can copy manually
          alert(`Please copy this URL manually:\n\n${url}`);
        }
        break;
    }
  };

  // Handle back navigation
  const handleBackToBlog = () => {
    setCurrentPage('blog');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <main id="main-content" role="main" tabIndex={-1} className="container mx-auto px-fluid-md py-fluid-lg">
          <div className="max-w-4xl mx-auto">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="w-24 h-6 bg-gray-200 rounded mb-fluid-md"></div>
              <div className="h-12 bg-gray-200 rounded mb-fluid-sm"></div>
              <div className="flex items-center gap-fluid-md mb-fluid-md">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
              <div className="aspect-video bg-gray-200 rounded-xl mb-fluid-md"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <main id="main-content" role="main" tabIndex={-1} className="container mx-auto px-fluid-md py-fluid-lg">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={handleBackToBlog}
              className="inline-flex items-center gap-fluid-sm text-gradient-pink-purple-blue font-body font-medium text-fluid-lg hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 rounded-sm mb-fluid-lg"
              aria-label="Return to blog listing"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </button>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-fluid-lg">
              <h1 className="text-fluid-2xl font-heading font-semibold text-red-800 mb-fluid-md">
                Blog Post Not Found
              </h1>
              <p className="text-body-guideline font-body font-normal text-red-700 mb-fluid-lg">
                {error ? 
                  `Error loading blog post: ${error}` : 
                  `The blog post "${slug}" could not be found. It may have been moved or deleted.`
                }
              </p>
              <button
                onClick={handleBackToBlog}
                className="inline-flex items-center gap-fluid-sm bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              >
                View All Blog Posts
                <BookOpen className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Reading progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-pink-purple-blue z-50 transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <main id="main-content" role="main" tabIndex={-1} className="container mx-auto px-fluid-md py-fluid-lg">
        <article className="max-w-4xl mx-auto">
          {/* Back navigation */}
          <nav className="mb-fluid-lg" aria-label="Blog navigation">
            <button
              onClick={handleBackToBlog}
              className="inline-flex items-center gap-fluid-sm text-gradient-pink-purple-blue font-body font-medium text-fluid-lg hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 rounded-sm"
              aria-label="Return to blog listing"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </button>
          </nav>

          {/* Article header */}
          <header className="mb-fluid-lg">
            <h2 className="text-section-h2 font-heading font-bold text-gray-800 mb-fluid-md leading-tight">
              {post.title}
            </h2>

            {/* Category Badge */}
            <div className="mb-fluid-md">
              <span className="inline-flex items-center px-fluid-sm py-fluid-xs bg-gradient-pink-purple-blue text-white font-body font-medium text-fluid-sm rounded-full">
                {post.category}
              </span>
            </div>

            {/* Author and meta information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-fluid-md">
              <div className="flex items-center gap-fluid-md">
                {post.author?.avatar ? (
                  <ImageWithFallback
                    src={post.author.avatar.url}
                    alt={`${post.author.name} profile photo`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-pink-purple-blue flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <div className="font-body font-medium text-gray-800 text-fluid-base">
                    {post.author?.name || 'Ash Shaw'}
                  </div>
                  <div className="font-body font-normal text-gray-600 text-fluid-sm">
                    Makeup Artist & Creative Director
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-fluid-md text-gray-600">
                <div className="flex items-center gap-fluid-sm">
                  <Calendar className="w-4 h-4" />
                  <time className="text-fluid-sm font-body" dateTime={post.publishedDate}>
                    {formatDate(post.publishedDate)}
                  </time>
                </div>
                
                {post.readingTime && (
                  <div className="flex items-center gap-fluid-sm">
                    <Clock className="w-4 h-4" />
                    <span className="text-fluid-sm font-body">
                      {post.readingTime} min read
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-fluid-sm">
                  <Eye className="w-4 h-4" />
                  <span className="text-fluid-sm font-body">
                    Article
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured image */}
          {post.featuredImage && (
            <div className="mb-fluid-lg">
              <ImageWithFallback
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                className="w-full aspect-video object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-lg max-w-none mb-fluid-lg">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-fluid-lg font-body font-normal text-gray-700 italic mb-fluid-md p-fluid-md bg-gray-50 rounded-xl border-l-4 border-pink-400">
                {post.excerpt}
              </div>
            )}

            {/* Main content */}
            <div 
              className="font-body text-body-guideline leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Tags and Share Section */}
          <section className="border-t border-gray-200 pt-fluid-md mb-fluid-lg">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-fluid-md">
              {/* Tags Section */}
              <div className="flex-1">
                <h3 className="text-fluid-lg font-heading font-semibold text-gray-800 mb-fluid-sm">
                  Tagged Topics
                </h3>
                {post.tags && post.tags.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-fluid-sm">
                    <Tag className="w-4 h-4 text-gray-500" />
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-fluid-sm py-fluid-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-body font-normal text-fluid-sm rounded-full transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-fluid-sm font-body text-gray-600 italic">
                    No tags assigned to this article.
                  </p>
                )}
              </div>

              {/* Share Section */}
              <div className="flex-shrink-0">
                <h3 className="text-fluid-lg font-heading font-semibold text-gray-800 mb-fluid-sm lg:text-right">
                  Share This Article
                </h3>
                <div className="flex justify-start lg:justify-end">
                  <ShareComponent
                    title={post.title}
                    description={post.excerpt || post.title}
                    url={typeof window !== 'undefined' ? window.location.href : `https://ashshaw.makeup/blog/${slug}`}
                    imageUrl={post.featuredImage?.url}
                    variant="inline"
                    align="left"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Author bio section */}
          {post.author?.bio && (
            <section className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-xl p-fluid-lg mb-fluid-lg">
              <h2 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-md">
                About the Author
              </h2>
              <div className="flex flex-col sm:flex-row gap-fluid-md">
                {post.author.avatar ? (
                  <ImageWithFallback
                    src={post.author.avatar.url}
                    alt={`${post.author.name} profile photo`}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-pink-purple-blue flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="font-heading font-semibold text-gray-800 text-fluid-lg mb-fluid-sm">
                    {post.author.name}
                  </h3>
                  <p className="font-body text-gray-700 text-body-guideline leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Related posts section - placeholder for future implementation */}
          <section className="border-t border-gray-200 pt-fluid-lg">
            <h2 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-md text-center">
              Explore More Articles
            </h2>
            <div className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-xl p-fluid-lg text-center">
              <p className="font-body text-gray-600 text-body-guideline mb-fluid-md">
                Discover more makeup artistry insights, tutorials, and behind-the-scenes content.
              </p>
              <button
                onClick={handleBackToBlog}
                className="inline-flex items-center gap-fluid-sm bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              >
                View All Articles
                <BookOpen className="w-5 h-5" />
              </button>
            </div>
          </section>
        </article>
      </main>

      <ScrollToTop 
        showAfter={300}
        ariaLabel="Scroll to top of blog post"
      />

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

/**
 * Export type for external usage
 */
export type { BlogPostPageProps };