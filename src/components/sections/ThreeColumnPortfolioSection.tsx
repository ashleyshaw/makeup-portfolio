/**
 * @fileoverview Enhanced Three Column Portfolio Section with Multi-Image Support
 * Reusable layout component for displaying portfolio entries with image sliders and professional lightbox
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import { PortfolioLightbox } from "../ui/PortfolioLightbox";
import { PortfolioCard } from "../ui/PortfolioCard";
import { SliderCard } from "../ui/SliderCard";

/**
 * Portfolio section interface
 */
interface PortfolioSection {
  id: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  backgroundGradient: string;
  titleGradient: string;
  subtitleGradient: string;
  decorativeColors: string[];
  entries?: PortfolioEntry[];
  cta?: {
    text: string;
    action: () => void;
  };
}

/**
 * Props interface for ThreeColumnPortfolioSection
 */
interface ThreeColumnPortfolioSectionProps {
  section: PortfolioSection;
  sectionIndex: number;
}

/**
 * Enhanced portfolio entry interface supporting multiple images
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
 * Enhanced Three Column Portfolio Section component with multi-image support
 *
 * New Features:
 * - Each portfolio entry can contain multiple images
 * - Image slider within each portfolio card
 * - Professional lightbox with navigation and detailed captions
 * - Responsive grid layout (3-column desktop, 1-column mobile)
 * - Smooth animations and hover effects
 * - Full accessibility support
 *
 * Layout Strategy:
 * - Desktop: 3-column CSS Grid with consistent spacing
 * - Tablet: 2-column responsive layout
 * - Mobile: Single column with full-width cards
 * - Each card contains an image slider with navigation
 * - Click opens professional lightbox with gallery navigation
 *
 * @param {ThreeColumnPortfolioSectionProps} props - Component properties
 * @param {PortfolioSection} props.section - Portfolio section data with images and metadata
 * @param {number} props.sectionIndex - Section index for styling variations
 *
 * @returns {JSX.Element} Three-column portfolio section with enhanced features
 *
 * @accessibility
 * - Semantic HTML structure with proper landmarks
 * - Keyboard navigation for image sliders
 * - Screen reader support for image descriptions
 * - Focus management for lightbox interactions
 * - High contrast mode compatibility
 *
 * @performance
 * - Lazy loading for portfolio images
 * - Optimized slider performance
 * - Efficient state management
 * - Minimal re-renders through proper memoization
 */
export function ThreeColumnPortfolioSection({
  section,
  sectionIndex,
}: ThreeColumnPortfolioSectionProps) {
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      description?: string;
    }>;
    currentIndex: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
  });

  /**
   * Opens lightbox with portfolio entry images
   */
  const openLightbox = (
    entry: PortfolioEntry,
    imageIndex: number = 0,
  ) => {
    setLightboxData({
      isOpen: true,
      images: entry.images,
      currentIndex: imageIndex,
      title: entry.title,
    });
  };

  /**
   * Closes lightbox and resets state
   */
  const closeLightbox = () => {
    setLightboxData({
      isOpen: false,
      images: [],
      currentIndex: 0,
      title: "",
    });
  };

  // Use portfolio entries directly from section data
  const portfolioEntries: PortfolioEntry[] =
    section.entries || [];

  return (
    <>
      <section
        id={section.id}
        data-section={section.id}
        className={`relative bg-gradient-to-br ${section.backgroundGradient} py-fluid-3xl px-fluid-md w-full`}
      >
        {/* Background decorations - varies by section */}
        <div
          className="absolute top-20 left-1/4 w-20 h-20 sm:w-40 sm:h-40 rounded-full opacity-15 animate-pulse"
          style={{
            background: `linear-gradient(135deg, ${section.decorativeColors[0]}, ${section.decorativeColors[1]})`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 right-1/4 w-16 h-16 sm:w-32 sm:h-32 rounded-full opacity-20 animate-pulse delay-1000"
          style={{
            background: `linear-gradient(135deg, ${section.decorativeColors[2]}, ${section.decorativeColors[3]})`,
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-fluid-2xl">
            <h2
              id={section.id}
              className="text-section-h2 font-heading font-bold text-gradient-pink-purple-blue mb-fluid-xl"
            >
              {section.title}
            </h2>
            <p className="text-body-guideline font-body font-normal text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {section.description}
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg mb-fluid-xl max-w-5xl mx-auto">
            {portfolioEntries.map((entry, entryIndex) => (
              <SliderCard
                key={entry.id}
                data={{
                  ...entry,
                  // Ensure compatibility with legacy single image format
                  images:
                    entry.images ||
                    (entry.image
                      ? [
                          {
                            src: entry.image,
                            alt: entry.title,
                            caption: entry.title,
                            description: entry.description,
                          },
                        ]
                      : []),
                }}
                onImageClick={(imageIndex) =>
                  openLightbox(entry, imageIndex)
                }
                gradientConfig={{
                  subtitleGradient:
                    section.subtitleGradient ||
                    "from-pink-700 to-purple-600",
                }}
                className="w-full"
              />
            ))}
          </div>

          {/* Section CTA (if applicable) */}
          {section.cta && (
            <div className="text-center">
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center text-center px-button py-button font-body font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50 text-white"
                style={{
                  background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})`,
                  focusRingColor: section.gradientFrom,
                }}
                onClick={section.cta.action}
                aria-label={`${section.cta.text} - ${section.title} section`}
              >
                {section.cta.text}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Portfolio Lightbox */}
      <PortfolioLightbox
        isOpen={lightboxData.isOpen}
        onClose={closeLightbox}
        images={lightboxData.images}
        currentIndex={lightboxData.currentIndex}
        title={lightboxData.title}
      />
    </>
  );
}