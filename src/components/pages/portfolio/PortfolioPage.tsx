/**
 * @fileoverview Enhanced Portfolio page component for Ash Shaw Makeup Portfolio
 * Features Contentful CMS integration, multi-image portfolio entries with advanced lightbox functionality and responsive design
 *
 * @author Ash Shaw Portfolio Team
 * @version 3.0.0 - Contentful CMS Integration
 */

import React, { useMemo } from "react";
import { HeroLayout } from "../../sections/HeroLayout";
import { ThreeColumnPortfolioSection } from "../../sections/ThreeColumnPortfolioSection";
import { Footer } from "../../common/Footer";
import {
  PORTFOLIO_SECTIONS,
  PORTFOLIO_HERO_IMAGES,
} from "../../common/Constants";
import { usePortfolioSections } from "../../../hooks/useContentful";
import { PortfolioEntry } from "../../../utils/contentfulService";
import { ScrollToTop } from "../../ui/ScrollToTop";

/**
 * Props interface for PortfolioPage component
 * @interface PortfolioPageProps
 * @property {Function} setCurrentPage - Function to update the active page state
 */
interface PortfolioPageProps {
  setCurrentPage: (page: string) => void;
}

/**
 * Enhanced Portfolio page component showcasing complete makeup artistry work
 *
 * New Features (v3.0):
 * - Contentful CMS integration for dynamic content management
 * - Real-time content updates without code deployment
 * - Enhanced error handling and loading states
 * - Offline support with intelligent caching
 * - Multi-image portfolio entries with image sliders
 * - Professional lightbox with navigation and captions
 * - Improved responsive design and accessibility
 * - Enhanced user interaction patterns
 *
 * Portfolio Structure (Dynamic via Contentful):
 * - Featured Work: Curated standout pieces across all categories
 * - Category-based sections: Festival, UV, Editorial, Nails, etc.
 * - Rich metadata including tags, dates, and detailed descriptions
 * - SEO-optimized content with meta descriptions and keywords
 *
 * Content Management:
 * - Portfolio entries managed through Contentful CMS
 * - Fallback to static content when Contentful is unavailable
 * - Automatic image optimization via Contentful delivery API
 * - Rich text support for detailed descriptions
 *
 * @returns {JSX.Element} Complete portfolio page with Contentful integration
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - Comprehensive keyboard navigation support
 * - Screen reader friendly image descriptions
 * - Focus management for modal interactions
 * - High contrast mode compatibility
 * - Loading states with descriptive aria-labels
 *
 * @performance
 * - Lazy loading for portfolio images
 * - Optimized Contentful image delivery
 * - Intelligent caching and offline support
 * - Efficient state management with React hooks
 * - Progressive loading with skeleton states
 */
export function PortfolioPage({
  setCurrentPage,
}: PortfolioPageProps) {
  // Fetch portfolio sections with tag-based Contentful integration
  const { 
    sectionData: dynamicSections, 
    loading: portfolioLoading, 
    error: portfolioError,
    refresh: refreshPortfolio 
  } = usePortfolioSections(PORTFOLIO_SECTIONS);

  // Compute all portfolio entries from sections for loading/error state checks
  const allPortfolioEntries = useMemo(() => {
    return dynamicSections.flatMap(section => section.entries || []);
  }, [dynamicSections]);

  // Loading state component
  const LoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Unable to Load Portfolio</h2>
          <p className="text-gray-600 mb-6">
            {portfolioError || "There was an issue loading the portfolio content. Please try again."}
          </p>
        </div>
        <div className="space-x-4">
          <button
            onClick={refreshPortfolio}
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
    </div>
  );

  // Show loading state while fetching portfolio data
  if (portfolioLoading && !allPortfolioEntries) {
    return <LoadingState />;
  }

  // Show error state if portfolio failed to load and no cached data
  if (portfolioError && !allPortfolioEntries) {
    return <ErrorState />;
  }

  return (
    <main id="main-content" role="main" tabIndex={-1} className="bg-gradient-to-br from-white via-pink-50 to-purple-50 min-h-screen">
      {/* Portfolio Header with Mosaic */}
      <HeroLayout
        title="Portfolio"
        subtitle="A journey through colour, creativity, and connection"
        description="From festival stages to intimate celebrations, from UV explorations to precision nail art – each piece represents a moment of creative expression and human connection."
        size="lg"
        layout="split"
        backgroundGradient={{
          from: "white",
          via: "pink-50",
          to: "purple-50",
        }}
        titleGradient={{
          from: "gray-800",
          via: "purple-700",
          to: "pink-600",
        }}
        subtitleGradient={{
          from: "pink-500",
          to: "purple-500",
        }}
        scrollArrowTarget="featured-work"
        heroImages={PORTFOLIO_HERO_IMAGES}
        lightboxTitle="Portfolio Gallery"
        enableLightbox={true}
        decorativeElements={
          <>
            <div
              className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full opacity-25 animate-pulse delay-1000"
              aria-hidden="true"
            ></div>
          </>
        }
      />

      {/* Content Status Indicator */}
      {portfolioLoading && allPortfolioEntries && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Updating content...</span>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Sections - Dynamic from Contentful */}
      {dynamicSections.map((section, index) => (
        <ThreeColumnPortfolioSection
          key={section.id}
          section={section}
          sectionIndex={index}
        />
      ))}

      {/* No Content Message */}
      {!portfolioLoading && (!allPortfolioEntries || allPortfolioEntries.length === 0) && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-xl p-12 shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-purple-500 text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              Portfolio content is being prepared and will be available shortly. 
              Check back soon to explore the latest makeup artistry work.
            </p>
            <button
              onClick={refreshPortfolio}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Check for Updates
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
      
      {/* Scroll to top button */}
      <ScrollToTop ariaLabel="Scroll to top of portfolio gallery" />
    </main>
  );
}