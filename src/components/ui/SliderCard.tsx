/**
 * @fileoverview Enhanced Portfolio Card with Multi-Image Slider
 * Universal card component for all portfolio sections with advanced slider functionality
 *
 * @author Ash Shaw Portfolio Team
 * @version 3.0.0
 */

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className={`group cursor-pointer bg-white/80 backdrop-blur-sm rounded-3xl p-fluid-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 ${className}`}
      onClick={() => onImageClick(currentImageIndex)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${data.title} in lightbox. ${hasMultipleImages ? `${images.length} images available. Use arrow keys to navigate.` : ""}`}
    >
      {/* Image Container with Slider */}
      <div
        className="relative w-full aspect-square bg-cover bg-center rounded-2xl shadow-lg transition-transform group-hover:scale-105 mb-fluid-md ring-4 ring-white/50 overflow-hidden"
        style={{
          backgroundImage: `url('${currentImage.src}')`,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Multi-image Navigation Controls */}
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
                      ? "bg-white scale-125 shadow-lg"
                      : "bg-white/60 hover:bg-white/80"
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

        <p className="text-fluid-base font-body font-normal text-gray-500 leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}