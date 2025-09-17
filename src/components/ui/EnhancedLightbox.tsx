/**
 * @fileoverview Simple Lightbox component for Ash Shaw Makeup Portfolio
 * Clean, centered design matching the original site aesthetic
 * 
 * @author Ash Shaw Portfolio Team
 * @version 3.0.0
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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
  title,
  description
}: EnhancedLightboxProps) {
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
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Large Centered Image */}
        <div className="flex-1 flex items-center justify-center w-full">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-[95vw] max-h-[85vh] w-auto h-auto object-contain shadow-2xl rounded-lg"
          />
        </div>

        {/* Text Content Below Image */}
        <div className="w-full max-w-4xl text-center text-white mt-6 mb-8 px-4">
          <h3 id="lightbox-title" className="text-2xl md:text-3xl font-heading font-semibold mb-3">
            {currentImage.caption || title || "Portfolio Image"}
          </h3>
          {(currentImage.description || description) && (
            <p className="text-base md:text-lg font-body opacity-90 leading-relaxed">
              {currentImage.description || description}
            </p>
          )}
          
          {/* Simple instruction text */}
          <p className="text-white/60 text-sm mt-4">
            Press Esc or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}