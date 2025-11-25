/**
 * @fileoverview Featured Work section showcasing latest festival makeup artistry
 * Displays carefully selected portfolio pieces using static data from portfolioService with lightbox functionality
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.1.0 - Static Portfolio Data Integration
 */

import React, { useState, useMemo, useEffect } from "react";
import { EnhancedLightbox } from "../ui/EnhancedLightbox";
import { SliderCard } from "../ui/SliderCard";
import { getFeaturedPortfolioEntries, type UnifiedPortfolioEntry } from "../../utils/portfolioService";

/**
 * Featured Work section component displaying latest festival makeup artistry using static portfolio data
 *
 * New Features (v2.1):
 * - Static portfolio data from portfolioService.ts with working Unsplash images
 * - Consistent data source with PortfolioMainPage
 * - No external dependencies - reliable and fast loading
 * - Comprehensive portfolio entries with proper image validation
 *
 * Layout Strategy:
 * - Desktop: 2-column grid with consistent spacing and alignment
 * - Mobile: Single column with full-width cards
 * - Responsive image containers with aspect-square ratio
 * - Consistent typography hierarchy across all devices
 *
 * Visual Design:
 * - Pink to purple gradient background evoking creative energy
 * - Semi-transparent white cards with backdrop blur for depth
 * - Hover effects with subtle scale transforms and shadow elevation
 * - Ring borders around images for premium appearance
 *
 * Interactive Features:
 * - Click to open images in full-screen lightbox modal
 * - Multi-image sliders for each portfolio entry
 * - Hover state animations for desktop engagement
 * - Focus management for accessibility compliance
 * - Content managed through Contentful CMS
 *
 * @param {Object} props - Component properties
 * @param {Function} props.setCurrentPage - Navigation function to switch to Portfolio page
 *
 * @returns {JSX.Element} Featured work section with responsive gallery and lightbox
 *
 * @design
 * - Uses `gap-fluid-lg` and `max-w-7xl` per Guidelines.md specifications
 * - Matches grid alignment with other homepage sections
 * - Maintains consistent card padding and typography scales
 */
export function FeaturedSection({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  // Use static data only for featured entries
  const featuredLoading = false;
  const featuredError = null;

  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      description?: string;
    }>;
    currentIndex: number;
    title?: string;
    description?: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
    description: "",
  });

  const openLightbox = (
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      description?: string;
    }>,
    currentIndex: number,
    title?: string,
    description?: string,
  ) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex,
      title,
      description,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const navigateLightbox = (newIndex: number) => {
    setLightbox((prev) => ({ ...prev, currentIndex: newIndex }));
  };

  // Development mode check - must be declared early
  const isDevelopment = import.meta?.env?.DEV || false;

  // Get unified portfolio data from portfolioService
  const staticFeaturedEntries = getFeaturedPortfolioEntries(6);
  
  // Debug: Ensure we're getting static data
  useEffect(() => {
    if (isDevelopment) {
      console.log('🎯 Static Featured Entries Check:', staticFeaturedEntries);
      console.log('🎯 Static Entries Length:', staticFeaturedEntries?.length);
      if (staticFeaturedEntries && staticFeaturedEntries.length > 0) {
        console.log('🎯 First Static Entry:', staticFeaturedEntries[0]);
        console.log('🎯 First Static Entry Images:', staticFeaturedEntries[0]?.images);
      }
    }
  }, [staticFeaturedEntries, isDevelopment]);

  // Use static data only - ensures consistency with portfolio page
  const displayData = useMemo(() => {
    console.log('📝 Using unified static data for featured work');
    console.log('📝 Static data:', staticFeaturedEntries);
    console.log('📝 Static data length:', staticFeaturedEntries?.length);
    
    if (isDevelopment && staticFeaturedEntries.length > 0) {
      console.log('📝 First featured entry:', {
        title: staticFeaturedEntries[0].title,
        featured: staticFeaturedEntries[0].featured,
        imageCount: staticFeaturedEntries[0].images?.length,
        firstImageUrl: staticFeaturedEntries[0].images?.[0]?.src?.substring(0, 100) + '...'
      });
    }
    
    return staticFeaturedEntries.slice(0, 2); // Display top 2 featured entries
  }, [staticFeaturedEntries, isDevelopment]);

  const isUsingContentful = false;

  // Debug logging for development
  if (isDevelopment) {
    console.log('🔍 FeaturedSection Debug Info:');
    console.log('  - featuredLoading:', featuredLoading);
    console.log('  - featuredError:', featuredError);
    console.log('  - displayData:', displayData);
    console.log('  - displayData length:', displayData?.length);
    console.log('  - staticFeaturedEntries:', staticFeaturedEntries);
    console.log('  - staticFeaturedEntries length:', staticFeaturedEntries?.length);
    console.log('  - isUsingContentful:', isUsingContentful);
    
    // Debug first entry images
    if (displayData && displayData.length > 0) {
      console.log('  - First entry title:', displayData[0]?.title);
      console.log('  - First entry images:', displayData[0]?.images);
      console.log('  - First image URL:', displayData[0]?.images?.[0]?.src);
    }
  }
  
  // Check if we should render anything - should never happen with unified system
  if (!displayData || displayData.length === 0) {
    console.error('❌ FeaturedSection: No displayData available!');
    console.log('  - staticFeaturedEntries available:', !!staticFeaturedEntries);
    console.log('  - staticFeaturedEntries length:', staticFeaturedEntries?.length || 0);
    
    // Emergency fallback - should not happen with unified system
    return (
      <section
        id="work"
        className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-fluid-3xl px-fluid-lg w-full"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-fluid-2xl">
            <h2 className="text-section-h2 font-heading font-semibold text-gray-800 mb-fluid-md">
              Featured Portfolio Work
            </h2>
            <p className="text-body-guideline font-body text-gray-600">
              Portfolio content is loading. Please check back soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Loading state for featured content (not used with static data)
  if (featuredLoading) {
    return (
      <section
        id="work"
        className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-fluid-3xl px-fluid-lg w-full"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-fluid-2xl">
            <h2 className="text-section-h2 font-heading font-semibold text-gray-800 mb-fluid-md">
              Featured Portfolio Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-lg">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-white/80 backdrop-blur-sm rounded-2xl p-fluid-md border border-white/50">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl mb-fluid-md"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-fluid-sm"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-fluid-sm"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="work"
        className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-fluid-3xl px-fluid-lg w-full"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-fluid-2xl">
            <h2 className="text-section-h2 font-heading font-semibold text-gray-800 mb-fluid-md">
              Featured Work
            </h2>
            <p className="text-body-guideline font-body font-normal text-gray-700 leading-relaxed max-w-3xl mx-auto mb-fluid-lg">
              Discover the artistry and passion behind each creation — from vibrant festival face art to stunning UV-reactive designs that bring joy and connection to every celebration.
            </p>
          </div>

          {/* Static data status for development */}
          {isDevelopment && (
            <div className="text-center mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-green-800 text-sm font-medium mb-1">
                  📝 Static Portfolio System Active
                </p>
                <p className="text-green-700 text-xs">
                  Displaying curated portfolio entries from portfolioService with working Unsplash images.
                </p>
              </div>
            </div>
          )}

          {/* Debug: Show data status */}
          {isDevelopment && (
            <div className="mb-4 text-center bg-gray-100 p-4 rounded">
              <p><strong>Portfolio Debug Info:</strong></p>
              <p>Display data items: {displayData?.length || 0}</p>
              <p>Static data source: portfolioService.ts</p>
              <p>Using Contentful: {isUsingContentful ? 'Yes' : 'No'}</p>
              {displayData && displayData.length > 0 && (
                <div className="mt-2 text-left">
                  <p><strong>First entry:</strong> {displayData[0]?.title}</p>
                  <p><strong>Images:</strong> {displayData[0]?.images?.length || 0}</p>
                  {displayData[0]?.images && displayData[0].images.length > 0 && (
                    <div className="mt-2">
                      <p><strong>First image URL:</strong></p>
                      <p className="text-xs break-all bg-gray-200 p-1 rounded">{displayData[0].images[0]?.src}</p>
                    </div>
                  )}
                  {displayData[1] && (
                    <>
                      <p><strong>Second entry:</strong> {displayData[1]?.title}</p>
                      <p><strong>Second entry images:</strong> {displayData[1]?.images?.length || 0}</p>
                      {displayData[1]?.images && displayData[1].images.length > 0 && (
                        <div className="mt-2">
                          <p><strong>Second image URL:</strong></p>
                          <p className="text-xs break-all bg-gray-200 p-1 rounded">{displayData[1].images[0]?.src}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Emergency fallback display - ALWAYS show something */}
          {(!displayData || displayData.length === 0) && (
            <div className="text-center py-8 bg-red-50 border border-red-200 rounded-lg mb-8">
              <p className="text-red-800 font-medium">⚠️ No portfolio data available</p>
              <p className="text-red-600 text-sm">Static data length: {staticFeaturedEntries?.length || 0}</p>
              <p className="text-red-600 text-sm">Featured entries from service: {getFeaturedPortfolioEntries(6)?.length || 0}</p>
            </div>
          )}

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-fluid-lg mb-fluid-xl max-w-7xl mx-auto">
            {displayData && displayData.length > 0 ? displayData.slice(0, 2).map((work, index) => (
              <SliderCard
                key={work.id || index}
                data={work}
                onImageClick={(imageIndex) => {
                  openLightbox(
                    work.images || [],
                    imageIndex,
                    work.title,
                    work.subtitle ? `${work.subtitle} - ${work.description}` : work.description,
                  );
                }}
                gradientConfig={{
                  subtitleGradient:
                    "from-pink-700 to-purple-600",
                }}
                className="w-full"
              />
            )) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-600">No featured work available</p>
              </div>
            )}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-fluid-lg mb-fluid-xl max-w-5xl mx-auto">
              {displayData && displayData.length > 0 ? displayData.map((work, index) => (
                <SliderCard
                  key={work.id || index}
                  data={work}
                  onImageClick={(imageIndex) => {
                    openLightbox(
                      work.images || [],
                      imageIndex,
                      work.title,
                      work.subtitle ? `${work.subtitle} - ${work.description}` : work.description,
                    );
                  }}
                  gradientConfig={{
                    subtitleGradient:
                      "from-pink-700 to-purple-600",
                  }}
                  className="w-full"
                />
              )) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No featured work available for mobile</p>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentPage("portfolio")}
              className="w-full sm:w-auto justify-center text-center bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 text-white px-button py-button font-body font-medium text-button-fluid transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              aria-label="Navigate to full portfolio page to view all makeup artistry work"
            >
              View Full Portfolio
            </button>
          </div>

          {/* Development status indicator */}
          {isDevelopment && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Using static portfolio data from portfolioService.ts</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      <EnhancedLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        title={lightbox.title}
        description={lightbox.description} className="text-[28px] text-[32px]"
      />
    </>
  );
}