/**
 * @fileoverview Simple Lightbox component for Ash Shaw Makeup Portfolio
 * Clean, centered design matching the original site aesthetic
 * 
 * @author Ash Shaw Portfolio Team
 * @version 3.0.0
 */

import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioImage } from './PortfolioImage';
import { useIsMobile } from './use-mobile';
import { useModal } from '../common/ModalContext';

/**
 * Portfolio image interface
 */
interface PortfolioImage {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
}

/**
 * Props interface for EnhancedLightbox
 */
interface EnhancedLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: PortfolioImage[];
  currentIndex: number;
  onNavigate?: (index: number) => void;
  title?: string;
  description?: string;
}

/**
 * Simple Lightbox component with clean, centered design
 * 
 * Features:
 * - Clean white card layout centered on screen
 * - Close button positioned above and to the right
 * - Large image with object-contain to maintain aspect ratio  
 * - Bottom gradient overlay with title text
 * - Simple instruction text below the card
 * - Keyboard navigation (Escape to close)
 * - Click outside to close
 * - Responsive design
 * - Comprehensive accessibility
 * 
 * @param {EnhancedLightboxProps} props - Component properties
 * @returns {JSX.Element|null} Simple lightbox modal or null when closed
 */
export function EnhancedLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
  title,
  description
}: EnhancedLightboxProps) {
  const [localCurrentIndex, setLocalCurrentIndex] = useState(currentIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const isMobile = useIsMobile();
  
  // Modal context for managing global modal state
  const { registerModal, updateModal, unregisterModal } = useModal();
  
  // Register modal with context on mount
  useEffect(() => {
    registerModal('enhanced-lightbox', 'lightbox', { title, description, images });
    
    return () => {
      unregisterModal('enhanced-lightbox');
    };
  }, [registerModal, unregisterModal, title, description, images]);

  // Update modal state when isOpen changes
  useEffect(() => {
    updateModal('enhanced-lightbox', isOpen, { title, description, images, currentIndex: localCurrentIndex });
  }, [updateModal, isOpen, title, description, images, localCurrentIndex]);

  // Update local index when prop changes
  useEffect(() => {
    setLocalCurrentIndex(currentIndex);
  }, [currentIndex]);
  
  const hasMultipleImages = images.length > 1;
  
  // Navigation functions
  const goToPrevious = () => {
    if (!hasMultipleImages) return;
    const newIndex = localCurrentIndex === 0 ? images.length - 1 : localCurrentIndex - 1;
    setLocalCurrentIndex(newIndex);
    onNavigate?.(newIndex);
  };
  
  const goToNext = () => {
    if (!hasMultipleImages) return;
    const newIndex = localCurrentIndex === images.length - 1 ? 0 : localCurrentIndex + 1;
    setLocalCurrentIndex(newIndex);
    onNavigate?.(newIndex);
  };
  
  const goToImage = (index: number) => {
    setLocalCurrentIndex(index);
    onNavigate?.(index);
  };

  // Touch handlers for swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    const distance = Math.abs(touchStart - currentTouch);
    
    if (distance > 10) {
      setIsSwiping(true);
    }
  };

  const onTouchEnd = () => {
    setTimeout(() => {
      setIsSwiping(false);
    }, 300);
    
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
   * Effect to manage body scroll when lightbox is open
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /**
   * Keyboard navigation handler
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        e.preventDefault();
        goToNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, hasMultipleImages, localCurrentIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[localCurrentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div 
        className="relative w-full h-full flex flex-col items-center justify-start overflow-y-auto scrollbar-hide py-4 px-4"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Large Centered Image with Navigation and Overlaid Pagination */}
        <div 
          className="flex-shrink-0 flex items-center justify-center w-full relative group my-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <PortfolioImage
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-[90vw] max-h-[70vh] w-auto h-auto object-contain shadow-2xl rounded-lg"
          />
          
          {/* Desktop Navigation Arrows - Only show for multiple images and desktop */}
          {hasMultipleImages && !isMobile && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center opacity-60 hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center opacity-60 hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
          
          {/* Pagination Dots - Overlaid on bottom center of image */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-black ${
                    index === localCurrentIndex
                      ? "bg-white/80"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${index + 1} of ${images.length}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile Swipe Indicator - Top right corner of image, hidden when swiping */}
        {hasMultipleImages && isMobile && !isSwiping && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm font-body font-medium">Swipe</span>
              <ChevronRight className="w-4 h-4 text-white/80" />
            </div>
          </div>
        )}

        {/* Text Content Below Image - Expandable and Naturally Scrollable */}
        <div className="w-full max-w-3xl text-center text-white mt-6 mb-8 px-4 flex-shrink-0">
          <h3 id="lightbox-title" className="text-lg md:text-xl font-heading font-medium mb-3">
            {currentImage.caption || title || "Portfolio Image"}
          </h3>
          {(currentImage.description || description) && (
            <div className="text-sm md:text-base font-body opacity-80 leading-relaxed mb-4">
              {(currentImage.description || description)?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          {/* Simple instruction text */}
          <p className="text-white/50 text-xs mt-4">
            {hasMultipleImages && !isMobile ? "Use arrow keys or click arrows to navigate • " : ""}
            {hasMultipleImages && isMobile ? "Swipe left or right to navigate • " : ""}
            Press Esc or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}