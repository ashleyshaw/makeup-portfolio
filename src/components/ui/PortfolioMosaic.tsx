/**
 * @fileoverview Portfolio Mosaic component for hero sections
 * Creates an overlapping mosaic of featured portfolio images with guidelines-compliant styling
 * and enhanced lightbox functionality with mobile-friendly navigation
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EnhancedLightbox } from './EnhancedLightbox';

/**
 * Portfolio Mosaic component featuring 6 overlapping featured images with lightbox functionality
 * 
 * Design Features:
 * - 6 overlapping images with soft shadows and rounded corners
 * - Spill-over effect that extends beyond section boundaries
 * - Responsive scaling and positioning
 * - Guidelines-compliant styling with gradient accents
 * - Enhanced lightbox with mobile swipe navigation and pagination dots
 * - Click-to-open functionality for all images
 * - Accessibility features with proper alt text
 * 
 * @component
 * @returns {JSX.Element} Mosaic layout with featured portfolio images and lightbox
 * 
 * @accessibility
 * - Comprehensive alt text for all images
 * - Keyboard navigation support in lightbox
 * - Screen reader announcements for lightbox state
 * - Focus management and escape key support
 * 
 * @responsive
 * - Mobile: Compact stacked layout with touch swipe navigation
 * - Tablet: Medium overlap positioning with enhanced touch targets
 * - Desktop: Full mosaic effect with maximum visual impact and mouse navigation
 */
export function PortfolioMosaic() {
  // Lightbox state management
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [] as Array<{ src: string; alt: string; caption: string; description: string }>,
    currentIndex: 0,
    title: '',
    description: ''
  });

  const openLightbox = (images: Array<{ src: string; alt: string; caption: string; description: string }>, index: number, title: string, description: string) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: index,
      title,
      description
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };
  const portfolioImages = [
    {
      src: "https://images.unsplash.com/photo-1637862666931-be59da5dd8ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMG1ha2V1cCUyMGZhY2UlMjBhcnQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NTc1OTI0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Festival makeup with colorful face art and creative expression",
      caption: "Festival Artistry",
      description: "Vibrant festival makeup showcasing colorful face art and creative expression that captures the energy of live events",
      className: "absolute top-0 left-4 w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 rotate-[-8deg] z-10"
    },
    {
      src: "https://images.unsplash.com/photo-1602494518965-195c6ec1c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMGdsb3clMjBuZW9uJTIwYmxhY2tsaWdodHxlbnwxfHx8fDE3NTc1OTI0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "UV reactive makeup glowing under blacklight with neon effects",
      caption: "UV Exploration",
      description: "Innovative UV reactive makeup that comes alive under blacklight, creating magical neon effects perfect for underground scenes",
      className: "absolute top-8 right-0 w-40 h-52 md:w-56 md:h-72 lg:w-64 lg:h-80 rotate-[12deg] z-20"
    },
    {
      src: "https://images.unsplash.com/photo-1719429873442-e894bc0ca520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG5haWwlMjBhcnQlMjByYWluYm93JTIwY29sb3JzfGVufDF8fHx8MTc1NzU5MjQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Creative nail art with rainbow colors and artistic design",
      caption: "Fusion Nails",
      description: "Creative nail art featuring rainbow colors and artistic designs that complement makeup looks with coordinated artistry",
      className: "absolute bottom-4 left-0 w-36 h-48 md:w-48 md:h-64 lg:w-56 lg:h-72 rotate-[15deg] z-15"
    },
    {
      src: "https://images.unsplash.com/photo-1576135711730-51049b41de78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMHBvcnRyYWl0JTIwY29sb3JmdWwlMjBmYWNlJTIwcGFpbnR8ZW58MXx8fHwxNzU3NTkyNDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Artistic makeup portrait with colorful face paint and creative styling",
      caption: "Portrait Artistry",
      description: "Professional artistic makeup portrait showcasing colorful face paint and creative styling for editorial and creative shoots",
      className: "absolute top-16 left-24 w-44 h-56 md:w-60 md:h-76 lg:w-68 lg:h-88 rotate-[-4deg] z-25"
    },
    {
      src: "https://images.unsplash.com/photo-1687152271728-f04baaefebab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwbWFrZXVwJTIwc3BhcmtsZSUyMGZhbnRhc3l8ZW58MXx8fHwxNzU3NTkyNDIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Glitter makeup with sparkle and fantasy elements",
      caption: "Fantasy Glitter",
      description: "Enchanting glitter makeup with sparkle and fantasy elements that transform faces into magical canvases of light and color",
      className: "absolute bottom-12 right-8 w-42 h-54 md:w-52 md:h-68 lg:w-60 lg:h-76 rotate-[-10deg] z-30"
    },
    {
      src: "https://images.unsplash.com/photo-1585049303349-6680e6179692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2xkJTIwZXllJTIwbWFrZXVwJTIwYXJ0aXN0aWMlMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzU3NTkyNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Bold eye makeup with artistic editorial styling",
      caption: "Editorial Eyes",
      description: "Bold editorial eye makeup with artistic styling that pushes creative boundaries for fashion and editorial photography",
      className: "absolute top-32 right-20 w-38 h-50 md:w-50 md:h-64 lg:w-58 lg:h-72 rotate-[8deg] z-35"
    }
  ];

  // Transform images for lightbox compatibility
  const lightboxImages = portfolioImages.map(img => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption,
    description: img.description
  }));

  return (
    <div className="flex-1 max-w-2xl relative w-full">
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Main overlapping portfolio images */}
        <div
          className="absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-pink-200/50 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundImage: `url("${portfolioImages[0].src}")` }}
          onClick={() => openLightbox(lightboxImages, 0, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey")}
          role="button"
          tabIndex={0}
          aria-label={`View ${portfolioImages[0].caption} in lightbox gallery`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(lightboxImages, 0, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey");
            }
          }}
        />
        
        <div
          className="absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-purple-200/50 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundImage: `url("${portfolioImages[1].src}")` }}
          onClick={() => openLightbox(lightboxImages, 1, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey")}
          role="button"
          tabIndex={0}
          aria-label={`View ${portfolioImages[1].caption} in lightbox gallery`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(lightboxImages, 1, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey");
            }
          }}
        />
        
        <div
          className="absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-blue-200/50 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundImage: `url("${portfolioImages[2].src}")` }}
          onClick={() => openLightbox(lightboxImages, 2, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey")}
          role="button"
          tabIndex={0}
          aria-label={`View ${portfolioImages[2].caption} in lightbox gallery`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(lightboxImages, 2, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey");
            }
          }}
        />

        {/* Additional smaller overlapping images */}
        <div
          className="absolute top-16 left-24 w-32 h-40 sm:w-48 sm:h-60 md:w-56 md:h-68 rounded-2xl bg-cover bg-center shadow-lg transform -rotate-4 z-25 border-4 border-white ring-4 ring-yellow-200/50 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundImage: `url("${portfolioImages[3].src}")` }}
          onClick={() => openLightbox(lightboxImages, 3, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey")}
          role="button"
          tabIndex={0}
          aria-label={`View ${portfolioImages[3].caption} in lightbox gallery`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(lightboxImages, 3, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey");
            }
          }}
        />
        
        <div
          className="absolute bottom-12 right-8 w-36 h-44 sm:w-52 sm:h-64 md:w-60 md:h-72 rounded-2xl bg-cover bg-center shadow-lg transform -rotate-10 z-30 border-4 border-white ring-4 ring-green-200/50 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundImage: `url("${portfolioImages[4].src}")` }}
          onClick={() => openLightbox(lightboxImages, 4, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey")}
          role="button"
          tabIndex={0}
          aria-label={`View ${portfolioImages[4].caption} in lightbox gallery`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(lightboxImages, 4, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey");
            }
          }}
        />
        
        <div
          className="absolute top-32 right-20 w-28 h-36 sm:w-44 sm:h-56 md:w-52 md:h-64 rounded-2xl bg-cover bg-center shadow-lg transform rotate-8 z-35 border-4 border-white ring-4 ring-rose-200/50 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundImage: `url("${portfolioImages[5].src}")` }}
          onClick={() => openLightbox(lightboxImages, 5, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey")}
          role="button"
          tabIndex={0}
          aria-label={`View ${portfolioImages[5].caption} in lightbox gallery`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(lightboxImages, 5, "Portfolio Showcase", "Explore Ash Shaw's creative makeup artistry journey");
            }
          }}
        />

        {/* Animated colorful dots scattered throughout */}
        <div className="absolute top-10 right-8 sm:top-20 sm:right-16 w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-70 animate-pulse z-30 shadow-lg" aria-hidden="true" />
        <div className="absolute bottom-16 right-4 sm:bottom-32 sm:right-8 w-3 h-3 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full opacity-70 animate-pulse delay-300 z-30 shadow-lg" aria-hidden="true" />
        <div className="absolute top-20 left-1 sm:top-40 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-70 animate-pulse delay-700 z-30 shadow-lg" aria-hidden="true" />
        <div className="absolute bottom-8 left-10 sm:bottom-16 sm:left-20 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse delay-1000 z-30 shadow-lg" aria-hidden="true" />

        {/* Additional scattered dots for richness */}
        <div className="absolute top-1/3 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-teal-400 to-green-500 rounded-full opacity-60 animate-pulse delay-1500 z-30 shadow-lg" aria-hidden="true" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-60 animate-pulse delay-2000 z-30 shadow-lg" aria-hidden="true" />

        {/* Subtle background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-blue-100/30 rounded-3xl pointer-events-none z-40" aria-hidden="true" />
      </div>

      {/* Enhanced Lightbox */}
      <EnhancedLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        title={lightbox.title}
        description={lightbox.description}
      />
    </div>
  );
}