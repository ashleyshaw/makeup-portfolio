/**
 * @fileoverview HomePage component for Ash Shaw Makeup Portfolio
 * Combines all homepage sections with Contentful CMS integration and proper semantic structure
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Contentful CMS Integration
 */

import React, { useState } from "react";
import { HeroLayout } from "../../sections/HeroLayout";
import { HeroSection } from "../../sections/HeroSection";
import { WhySection } from "../../sections/WhySection";
import { FeaturedSection } from "../../sections/FeaturedSection";
import { BlogPreviewSection } from "../../sections/BlogPreviewSection";
import { FusionNailsSection } from "../../sections/FusionNailsSection";
import { Footer } from "../../common/Footer";
import { HOMEPAGE_HERO_IMAGES } from "../../common/Constants";
import { useHomepageContent } from "../../../hooks/useContentful";
import { ScrollToTop } from "../../ui/ScrollToTop";

/**
 * Props interface for HomePage component
 * @interface HomePageProps
 * @property {Function} setCurrentPage - Function to navigate between pages
 */
interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

/**
 * HomePage component rendering the main landing page content with Contentful CMS integration
 *
 * New Features (v2.0):
 * - Dynamic content loading from Contentful CMS
 * - Fallback to static content when Contentful unavailable
 * - Real-time content updates without deployment
 * - Enhanced loading states and error handling
 *
 * Contains all homepage sections in proper semantic order:
 * - Dynamic hero section with Contentful-managed content
 * - Why I Do Makeup section with custom icons
 * - Featured Work showcase (dynamic from Contentful)
 * - Blog Preview section with latest posts
 * - Fusion Nails preview
 * - Footer with contact form
 *
 * @param {HomePageProps} props - Component properties
 * @param {Function} props.setCurrentPage - Function to navigate between pages
 *
 * @accessibility
 * - Uses semantic HTML5 main element
 * - Proper heading hierarchy maintained across sections
 * - All interactive elements keyboard accessible
 * - Loading states with appropriate aria-labels
 *
 * @performance
 * - Efficiently renders section components without unnecessary re-renders
 * - Optimized state management for navigation updates
 * - Intelligent content caching and background refresh
 */
export function HomePage({ setCurrentPage }: HomePageProps) {
  // Fetch dynamic homepage content from Contentful
  const { 
    data: homepageContent, 
    loading: contentLoading, 
    error: contentError,
    refresh: refreshContent 
  } = useHomepageContent();

  // Loading state component
  const LoadingState = () => (
    <main id="main-content" role="main" className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg w-80 mx-auto mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-48 mx-auto"></div>
          </div>
        </div>
      </div>
    </main>
  );

  // Error state component with retry functionality
  const ErrorState = () => (
    <main id="main-content" role="main" className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Content Temporarily Unavailable</h1>
          <p className="text-gray-600 mb-6">
            {contentError || "There was an issue loading the homepage content. Please try again."}
          </p>
        </div>
        <div className="space-x-4">
          <button
            onClick={refreshContent}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </main>
  );

  // Show loading state while fetching initial content
  if (contentLoading && !homepageContent) {
    return <LoadingState />;
  }

  // Show error state if content failed to load and no cached data
  if (contentError && !homepageContent) {
    return <ErrorState />;
  }

  // Extract content with fallbacks to static content
  const heroTitle = homepageContent?.hero.title || "Hi, I'm Ash Shaw";
  const heroDescription = homepageContent?.hero.description || "Makeup is my art, my joy, and my way of bringing people together. From festivals to the dance floor, I use colour and light to create looks that make people feel radiant, confident, and alive. ✨ This portfolio is a growing collection of that journey.";
  const ctaText = homepageContent?.hero.ctaText || "Explore My Portfolio";
  const heroBackgroundImages = homepageContent?.hero.backgroundImages?.length > 0 
    ? homepageContent.hero.backgroundImages.map(img => ({
        src: img.url,
        alt: img.alt,
        title: img.title
      }))
    : HOMEPAGE_HERO_IMAGES;

  return (
    <main id="main-content" role="main">
      {/* Content loading indicator */}
      {contentLoading && homepageContent && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Updating content...</span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Hero Section with Contentful content */}
      <HeroLayout
        title={heroTitle}
        subtitle={
          <>
            Makeup that shines with{" "}
            <em className="italic bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              colour
            </em>
            ,{" "}
            <em className="italic bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
              energy
            </em>
            , and{" "}
            <em className="italic bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              connection
            </em>
            .
          </>
        }
        description={heroDescription}
        size="xl"
        layout="split"
        backgroundGradient={{
          from: "pink-50",
          via: "purple-50",
          to: "blue-50",
        }}
        titleGradient={{ from: "pink-500", to: "purple-600" }}
        scrollArrowTarget="why-section"
        heroImages={heroBackgroundImages}
        lightboxTitle="Ash Shaw Makeup Artistry"
        enableLightbox={true}
        actions={
          <button
            onClick={() => setCurrentPage("portfolio")}
            className="w-full sm:w-auto px-button py-button bg-gradient-pink-purple-blue text-white font-body font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 justify-center text-center"
            style={{ fontFamily: 'var(--font-body)' }}
            aria-label="Navigate to portfolio page to view makeup artistry work"
          >
            {ctaText}
          </button>
        }
        decorativeElements={
          <>
            <div
              className="absolute top-10 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"
              aria-hidden="true"
            ></div>
            <div
              className="absolute top-20 right-8 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full opacity-25 animate-pulse delay-1000"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-16 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full opacity-15 animate-pulse delay-2000"
              aria-hidden="true"
            ></div>
          </>
        }
      />

      {/* Static sections - these can be enhanced with Contentful later */}
      <WhySection setCurrentPage={setCurrentPage} />
      
      {/* Featured Section - will use Contentful portfolio data */}
      <FeaturedSection setCurrentPage={setCurrentPage} />
      
      {/* Blog Preview Section - showcases latest blog posts */}
      <BlogPreviewSection setCurrentPage={setCurrentPage} />
      
      <FusionNailsSection setCurrentPage={setCurrentPage} />
      <Footer setCurrentPage={setCurrentPage} />
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </main>
  );
}