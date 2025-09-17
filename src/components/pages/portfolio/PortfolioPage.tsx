/**
 * @fileoverview Enhanced Portfolio page component for Ash Shaw Makeup Portfolio
 * Features multi-image portfolio entries with advanced lightbox functionality and responsive design
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import { HeroLayout } from "../../sections/HeroLayout";
import { ThreeColumnPortfolioSection } from "../../sections/ThreeColumnPortfolioSection";
import { Footer } from "../../common/Footer";
import {
  PORTFOLIO_SECTIONS,
  PORTFOLIO_HERO_IMAGES,
} from "../../common/Constants";

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
 * New Features:
 * - Multi-image portfolio entries with image sliders
 * - Professional lightbox with navigation and captions
 * - Improved responsive design and accessibility
 * - Enhanced user interaction patterns
 *
 * Portfolio Structure:
 * - Featured Work: Standout pieces across all categories
 * - Festivals: Large-scale event makeup and festival artistry
 * - Thailand Adventures: Travel-themed makeup exploration
 * - Shankra 2023: Swiss mountain festival documentation
 * - Reiserfieber: Alpine celebration makeup
 * - UV & Blacklight: Electric nightlife artistry
 * - Fusion Nails: Creative nail artistry and design work
 *
 * @returns {JSX.Element} Complete portfolio page with enhanced gallery sections
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - Comprehensive keyboard navigation support
 * - Screen reader friendly image descriptions
 * - Focus management for modal interactions
 * - High contrast mode compatibility
 *
 * @performance
 * - Lazy loading for portfolio images
 * - Optimized lightbox rendering
 * - Efficient state management
 * - Responsive image loading
 */
export function PortfolioPage({
  setCurrentPage,
}: PortfolioPageProps) {
  return (
    <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 min-h-screen">
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

      {/* Portfolio Sections */}
      {PORTFOLIO_SECTIONS.map((section, index) => (
        <ThreeColumnPortfolioSection
          key={section.id}
          section={section}
          sectionIndex={index}
        />
      ))}

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}