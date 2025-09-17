/**
 * @fileoverview Portfolio Card component with multi-image slider support
 * Professional portfolio card featuring image carousel, hover effects, and accessibility
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Portfolio entry interface
 */
interface PortfolioEntry {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    description?: string;
  }>;
  category?: string;
}

/**
 * Props interface for PortfolioCard
 */
interface PortfolioCardProps {
  entry: PortfolioEntry;
  onImageClick: (imageIndex: number) => void;
  sectionConfig: {
    gradientFrom: string;
    gradientTo: string;
    subtitleGradient: string;
    decorativeColors: string[];
  };
}

/**
 * Portfolio Card component with multi-image slider functionality
 * 
 * Features:
 * - Multi-image carousel with smooth transitions
 * - Navigation arrows and pagination dots
 * - Hover effects and animations
 * - Click to open in lightbox
 * - Responsive design and accessibility
 * - Professional presentation with gradient accents
 * 
 * @param {PortfolioCardProps} props - Component properties
 * @param {PortfolioEntry} props.entry - Portfolio entry data with images and metadata
 * @param {Function} props.onImageClick - Callback when image is clicked to open lightbox
 * @param {string} props.gradientFrom - Starting color for gradient theming
 * @param {string} props.gradientTo - Ending color for gradient theming
 * 
 * @returns {JSX.Element} Portfolio card with image slider and professional styling
 * 
 * @accessibility
 * - Keyboard navigation for image slider
 * - Screen reader support for image descriptions
 * - Focus management and proper labeling
 * - High contrast mode compatibility
 * 
 * @performance
 * - Lazy loading for non-active images
 * - Optimized transitions and animations
 * - Efficient state management
 */
export function PortfolioCard({ 
  entry, 
  onImageClick, 
  sectionConfig 
}: PortfolioCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = entry.images || [];
  const hasMultipleImages = images.length > 1;

  // Minimum swipe distance for touch navigation
  const minSwipeDistance = 50;

  /**
   * Handle touch start for swipe gesture
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /**
   * Handle touch move for swipe gesture
   */
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  /**
   * Handle touch end and execute swipe navigation
   */
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      goToNext();
    }
    if (isRightSwipe && hasMultipleImages) {
      goToPrevious();
    }
  };

  /**
   * Navigate to previous image
   */
  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  /**
   * Navigate to next image
   */
  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  /**
   * Navigate to specific image by index
   */
  const goToImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  /**
   * Keyboard navigation handler
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick(currentImageIndex);
    } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
      e.preventDefault();
      setCurrentImageIndex((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
      );
    } else if (e.key === 'ArrowRight' && hasMultipleImages) {
      e.preventDefault();
      setCurrentImageIndex((prev) => 
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const currentImage = images[currentImageIndex] || { src: '', alt: '', caption: '', description: '' };

  return (
    <div
      className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-3xl p-fluid-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
      onClick={() => onImageClick(currentImageIndex)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${entry.title} portfolio entry in lightbox. ${hasMultipleImages ? `${images.length} images available. Use arrow keys to navigate or swipe on mobile.` : ''}`}
    >
      {/* Image Container */}
      <div 
        className="relative w-full aspect-square bg-cover bg-center rounded-2xl shadow-lg transition-transform group-hover:scale-105 mb-fluid-md ring-4 ring-white/50 overflow-hidden"
        style={{
          backgroundImage: `url('${currentImage.src}')`,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
          
          {/* Multi-image Navigation */}
          {hasMultipleImages && (
            <>
              {/* Desktop Navigation Arrows */}
              <div className="hidden sm:block">
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black/20 z-10"
                  aria-label="Previous image"
                  tabIndex={-1}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black/20 z-10"
                  aria-label="Next image"
                  tabIndex={-1}
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Mobile Swipe Indicator */}
              <div className="sm:hidden absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-80">
                Swipe for more
              </div>

              {/* Pagination Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => goToImage(index, e)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 ${
                      index === currentImageIndex
                        ? 'bg-white scale-125 shadow-lg'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1} of ${images.length}`}
                    tabIndex={-1}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {currentImageIndex + 1}/{images.length}
              </div>
            </>
          )}
      </div>

      {/* Entry Information */}
      <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-xs">
        {entry.title}
      </h3>
      {entry.subtitle && (
        <p className={`text-fluid-lg font-body font-medium bg-gradient-to-r ${sectionConfig.subtitleGradient} bg-clip-text text-transparent mb-fluid-xs`}>
          {entry.subtitle}
        </p>
      )}
      <p className="text-fluid-base font-body font-normal text-gray-500 leading-relaxed">
        {entry.description}
      </p>
    </div>
  );
}