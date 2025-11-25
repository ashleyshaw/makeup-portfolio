/**
 * @fileoverview Blog preview section component for homepage
 * 
 * Displays the latest blog posts in a visually appealing grid layout with
 * brand-compliant styling and smooth transitions. Uses the same BlogPostCard
 * component as the main blog page for consistency and proper individual post routing.
 * 
 * Core Features:
 * - Latest blog posts display with featured images and excerpts
 * - Individual blog post navigation with proper routing
 * - Responsive grid layout with mobile-first design
 * - Smooth hover animations and gradient effects
 * - WCAG 2.1 AA compliant accessibility implementation
 * - Integration with blog page navigation
 * 
 * Styling System:
 * - Tailwind V4 with brand-compliant utility classes
 * - Fluid typography and spacing following guidelines
 * - Gradient effects and hover animations per brand standards
 * - Mobile-first responsive design with fluid scaling
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.1.0
 * @since 1.0.0 - Initial blog preview section for homepage integration
 * @since 1.1.0 - Updated to use same BlogPostCard as main blog page for individual post routing
 * @lastModified 2025-01-29
 */

import React, { useCallback } from 'react';
import { useBlogPosts } from '../../hooks/useContentful';
import { type BlogPost } from '../../utils/contentfulService';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ReadMoreButton } from '../ui/ReadMoreButton';
import { ShareComponent } from '../ui/ShareComponent';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

/**
 * Blog preview section props interface
 * 
 * @interface BlogPreviewSectionProps
 */
interface BlogPreviewSectionProps {
  /** Enhanced navigation function supporting blog post routing */
  setCurrentPage: (page: string, slug?: string) => void;
}

/**
 * Blog preview section component for homepage
 * 
 * Showcases the latest 3 blog posts with beautiful cards featuring images,
 * titles, excerpts, and metadata. Provides smooth navigation to the full blog page.
 * 
 * Features:
 * - Responsive grid layout (1 column mobile, 2 columns desktop)
 * - Latest blog posts with featured images and excerpts
 * - Reading time and publication date display
 * - Category and tag indicators with brand colors
 * - Smooth hover animations and scaling effects
 * - Call-to-action button to view all blog posts
 * - Complete accessibility with keyboard navigation
 * 
 * @component
 * @param {BlogPreviewSectionProps} props - Component properties
 * @returns {JSX.Element} Blog preview section with latest posts
 * 
 * @accessibility WCAG 2.1 AA Compliance Details
 * - Semantic HTML structure with proper article landmarks
 * - Keyboard navigation for all interactive elements
 * - Screen reader compatibility with ARIA labels
 * - Alt text for all images and descriptive link text
 * - Focus indicators and hover states for better UX
 * 
 * @responsive Breakpoint Behavior
 * - Mobile (320px-767px): Single column layout with full-width cards
 * - Tablet (768px-1023px): Two column grid with optimized spacing
 * - Desktop (1024px+): Three column grid with enhanced hover effects
 * 
 * @example
 * ```tsx
 * <BlogPreviewSection setCurrentPage={setCurrentPage} />
 * ```
 */
export function BlogPreviewSection({ setCurrentPage }: BlogPreviewSectionProps) {
  // Fetch latest 2 blog posts for homepage preview
  const { 
    data: blogData, 
    loading, 
    error 
  } = useBlogPosts({
    limit: 2,
    sortBy: 'publishedDate',
    sortOrder: 'desc',
    publishedOnly: true,
  });

  /**
   * Navigate to blog page
   */
  const goToBlog = useCallback(() => {
    setCurrentPage('blog');
    
    // Announce navigation to screen readers
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = 'Navigating to blog page';
    }
  }, [setCurrentPage]);

  /**
   * Navigate to single blog post view using the enhanced routing system
   */
  const viewBlogPost = useCallback((slug: string) => {
    setCurrentPage(`blog/${slug}`, slug);
    
    // Announce navigation to screen readers
    const announcement = document.getElementById('announcements');
    if (announcement) {
      announcement.textContent = `Navigating to blog post: ${slug.replace(/-/g, ' ')}`;
    }
  }, [setCurrentPage]);



  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Don't render if no posts and not loading
  if (!loading && (!blogData?.posts || blogData.posts.length === 0)) {
    return null;
  }

  return (
    <section className="py-fluid-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-fluid-md">
        {/* Section header */}
        <div className="text-center mb-fluid-2xl">
          <h2 className="text-section-h2 font-heading font-semibold text-gray-800 mb-fluid-md">
            Latest from the{' '}
            <span className="text-gradient-pink-purple-blue">Blog</span>
          </h2>
          <p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Discover tutorials, behind-the-scenes insights, and creative inspiration from the world of festival and UV makeup artistry.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg mb-fluid-xl">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/80 rounded-xl overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                  <div className="p-fluid-lg">
                    <div className="h-4 bg-gray-200 rounded mb-fluid-sm w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-fluid-sm"></div>
                    <div className="h-4 bg-gray-200 rounded mb-fluid-sm w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-fluid-xl">
            <p className="text-fluid-base font-body text-gray-600 mb-fluid-md">
              Unable to load blog posts at the moment.
            </p>
            <button
              onClick={goToBlog}
              className="bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
            >
              Visit Blog Page
            </button>
          </div>
        )}

        {/* Blog posts grid */}
        {!loading && !error && blogData?.posts && blogData.posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg mb-fluid-xl">
              {blogData.posts.map(post => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onViewPost={viewBlogPost}
                  formatDate={formatDate}
                />
              ))}
            </div>

            {/* View all blog posts button */}
            <div className="text-center">
              <button
                onClick={goToBlog}
                className="inline-flex items-center gap-fluid-sm bg-gradient-blue-teal-green hover:from-blue-700 hover:to-teal-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50"
                aria-label="View all blog posts"
              >
                <span>View All Blog Posts</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/**
 * Blog post card component props interface (shared with main blog page)
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
 * This is the same component used in the main blog page for consistency
 */
function BlogPostCard({ post, onViewPost, formatDate }: BlogPostCardProps) {
  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden relative">
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
            <div className="flex items-center gap-fluid-xs">
              <Clock className="w-4 h-4" />
              <span className="text-fluid-sm font-body">{post.readingTime}m</span>
            </div>
          )}
          <div className="flex items-center gap-fluid-xs">
            <Calendar className="w-4 h-4" />
            <time className="text-fluid-sm font-body" dateTime={post.publishedDate}>
              {formatDate(post.publishedDate)}
            </time>
          </div>
        </div>

        {/* Share component */}
        <div className="mb-fluid-md">

        </div>

        {/* Excerpt */}
        <p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed mb-fluid-md line-clamp-3">
          {post.excerpt}
        </p>

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