/**
 * @fileoverview Enhanced Portfolio Card with Multi-Image Slider
 * Universal card component for all portfolio sections with advanced slider functionality
 *
 * @author Ash Shaw Portfolio Team
 * @version 3.0.0
 */

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolioImageUrl } from "./PortfolioImage";

/**
 * Image interface for slider functionality
 */
interface SliderImage {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
}

/**
 * Enhanced card data interface supporting single or multiple images
 */
interface CardData {
  id?: string;
  title: string;
  subtitle?: string;
  location?: string;
  description: string;
  image?: string; // Legacy single image support
  images?: SliderImage[]; // New multi-image support
  category?: string;
}

/**
 * Props interface for SliderCard
 */
interface SliderCardProps {
  data: CardData;
  onImageClick: (imageIndex: number) => void;
  gradientConfig?: {
    background?: string;
    subtitleGradient?: string;
  };
  className?: string;
}

/**
 * Enhanced SliderCard component with multi-image carousel functionality
 *
 * Features:
 * - Seamless single/multi-image support
 * - Touch-friendly navigation with swipe gestures
 * - Keyboard accessibility (arrow keys, enter, space)
 * - Smooth transitions and hover effects
 * - Progressive image loading
 * - Mobile-optimized controls
 * - Screen reader support
 *
 * @param {SliderCardProps} props - Component properties
 * @param {CardData} props.data - Card content with image(s) and metadata
 * @param {Function} props.onImageClick - Callback when image is clicked for lightbox
 * @param {Object} props.gradientConfig - Optional gradient styling configuration
 * @param {string} props.className - Additional CSS classes
 *
 * @returns {JSX.Element} Enhanced card with slider functionality
 *
 * @accessibility
 * - WCAG 2.1 AA compliant
 * - Keyboard navigation support
 * - Screen reader optimized
 * - High contrast mode compatible
 * - Focus management
 *
 * @mobile
 * - Touch gesture support
 * - Swipe navigation
 * - Responsive controls
 * - Optimized for thumb interaction
 */
export function SliderCard({
  data,
  onImageClick,
  gradientConfig,
  className = "",
}: SliderCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(
    null,
  );
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // Handle legacy single image format
  const images: SliderImage[] =
    data.images ||
    (data.image
      ? [
          {
            src: data.image,
            alt: data.title,
            caption: data.title,
            description: data.description,
          },
        ]
      : []);

  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || {
    src: "",
    alt: data.title,
    caption: data.title,
    description: data.description,
  };



  // Resolve image URL for CSS background usage
  const resolvedImageUrl = usePortfolioImageUrl(currentImage.src);

  // Minimum swipe distance for touch navigation - reduced for better mobile responsiveness
  const minSwipeDistance = 30;

  /**
   * Handle touch start for swipe gesture
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(false);
    // Prevent scrolling while swiping horizontally
    e.currentTarget.style.touchAction = 'pan-y';
  };

  /**
   * Handle touch move for swipe gesture
   */
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // Calculate current swipe distance
    const distance = Math.abs(touchStart - currentTouch);
    
    // If we're starting to swipe horizontally, prevent vertical scrolling and set swiping state
    if (distance > 10) {
      e.preventDefault();
      setIsSwiping(true);
    }
  };

  /**
   * Handle touch end and execute swipe navigation
   */
  const onTouchEnd = (e: React.TouchEvent) => {
    // Reset touch action and swiping state
    e.currentTarget.style.touchAction = 'auto';
    
    // Delay hiding the swiping state to allow for smooth transition
    setTimeout(() => {
      setIsSwiping(false);
    }, 300);
    
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      goToNext();
      // Haptic feedback on supported devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
    if (isRightSwipe && hasMultipleImages) {
      goToPrevious();
      // Haptic feedback on supported devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  };

  /**
   * Navigate to previous image
   */
  const goToPrevious = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  /**
   * Navigate to next image
   */
  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
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
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onImageClick(currentImageIndex);
    } else if (e.key === "ArrowLeft" && hasMultipleImages) {
      e.preventDefault();
      goToPrevious();
    } else if (e.key === "ArrowRight" && hasMultipleImages) {
      e.preventDefault();
      goToNext();
    }
  };

  const subtitleText = data.subtitle || data.location;
  const defaultGradient = "from-pink-700 to-purple-600";
  const subtitleGradient =
    gradientConfig?.subtitleGradient || defaultGradient;

  return (
    <div
      className={`group cursor-pointer bg-white/80 backdrop-blur-sm rounded-xl p-fluid-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 ${className}`}
      onClick={() => onImageClick(currentImageIndex)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${data.title} in lightbox. ${hasMultipleImages ? `${images.length} images available. Use arrow keys to navigate.` : ""}`}
    >
      {/* Image Container with Slider */}
      <div
        className="relative w-full aspect-square bg-cover bg-center rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105 mb-fluid-md ring-4 ring-white/50 overflow-hidden touch-manipulation select-none"
        style={{
          backgroundImage: `url('${resolvedImageUrl}')`,
          touchAction: 'pan-y', // Allow vertical scrolling but handle horizontal swipes
          userSelect: 'none', // Prevent text selection during swipe
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Category Chip - Top right corner (always visible when category exists) */}
        {data.category && (
          <div className="absolute top-3 right-3 bg-gradient-pink-purple-blue text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg backdrop-blur-sm z-20">
            {data.category}
          </div>
        )}

        {/* Multi-image Navigation Controls */}
        {hasMultipleImages && (
          <>
            {/* Desktop Navigation Arrows - Hover only with reduced opacity */}
            <div className="hidden sm:block">
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-60 hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black/20 shadow-md hover:shadow-lg z-10"
                aria-label="Previous image"
                tabIndex={-1}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-60 hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black/20 shadow-md hover:shadow-lg z-10"
                aria-label="Next image"
                tabIndex={-1}
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Mobile Indicator - Swipe text or Counter based on swiping state */}
            <div className="sm:hidden absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full opacity-90 backdrop-blur-sm transition-all duration-300">
              {isSwiping ? (
                // Show counter when swiping
                <span>{currentImageIndex + 1}/{images.length}</span>
              ) : (
                // Show swipe indicator when not swiping
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Swipe
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              )}
            </div>

            {/* Simple Pagination Dots - Smaller with reduced opacity */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={`transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-black/20 touch-manipulation rounded-full ${
                    index === currentImageIndex
                      ? "w-2 h-2 bg-white/80 shadow-sm"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                  style={{ 
                    minWidth: '12px', 
                    minHeight: '12px',
                    touchAction: 'manipulation'
                  }}
                  aria-label={`Go to image ${index + 1} of ${images.length}`}
                  tabIndex={-1}
                />
              ))}
            </div>

            {/* Desktop Image Counter - Hover only with reduced opacity */}
            <div className="hidden sm:block absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300">
              {currentImageIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="space-y-fluid-xs">
        <h3 className="text-fluid-xl font-heading font-semibold text-gray-800">
          {data.title}
        </h3>

        {subtitleText && (
          <p
            className={`text-fluid-lg font-body font-medium bg-gradient-to-r ${subtitleGradient} bg-clip-text text-transparent`}
          >
            {subtitleText}
          </p>
        )}

        <p className="text-body-guideline font-body font-normal text-gray-500 leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}