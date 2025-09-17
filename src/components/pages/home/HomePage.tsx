/**
 * @fileoverview HomePage component for Ash Shaw Makeup Portfolio
 * Combines all homepage sections with proper semantic structure and accessibility
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { HeroLayout } from "../../sections/HeroLayout";
import { HeroSection } from "../../sections/HeroSection";
import { WhySection } from "../../sections/WhySection";
import { FeaturedSection } from "../../sections/FeaturedSection";
import { FusionNailsSection } from "../../sections/FusionNailsSection";
import { Footer } from "../../common/Footer";
import { HOMEPAGE_HERO_IMAGES } from "../../common/Constants";

/**
 * Props interface for HomePage component
 * @interface HomePageProps
 * @property {Function} setCurrentPage - Function to navigate between pages
 */
interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

/**
 * HomePage component rendering the main landing page content
 *
 * Contains all homepage sections in proper semantic order:
 * - Hero section with image mosaic and tagline
 * - Why I Do Makeup section with custom icons
 * - Featured Work showcase
 * - Fusion Nails preview
 * - Footer with contact form
 *
 * @param {HomePageProps} props - Component properties
 * @param {Function} props.setCurrentPage - Function to navigate between pages
 *
 * @accessibility
 * - Uses semantic HTML5 main element
 * - Proper heading hierarchy maintained across sections
 * - All interactive elements keyboard accessible
 *
 * @performance
 * - Efficiently renders section components without unnecessary re-renders
 * - Optimized state management for navigation updates
 */
export function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <main id="main-content" role="main">
      {/* Hero Section with Portfolio Gallery */}
      <HeroLayout
        title="Hi, I'm Ash Shaw"
        subtitle={
          <>
            Makeup that shines with{" "}
            <em className="italic bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              colour
            </em>
            ,{" "}
            <em className="italic bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
              energy
            </em>
            , and{" "}
            <em className="italic bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              connection
            </em>
            .
          </>
        }
        description="Makeup is my art, my joy, and my way of bringing people together. From festivals to the dance floor, I use colour and light to create looks that make people feel radiant, confident, and alive. ✨ This portfolio is a growing collection of that journey."
        size="xl"
        layout="split"
        backgroundGradient={{
          from: "pink-50",
          via: "purple-50",
          to: "blue-50",
        }}
        titleGradient={{ from: "pink-500", to: "purple-600" }}
        scrollArrowTarget="why-section"
        heroImages={HOMEPAGE_HERO_IMAGES}
        lightboxTitle="Ash Shaw Makeup Artistry"
        enableLightbox={true}
        actions={
          <button
            onClick={() => setCurrentPage("portfolio")}
            className="w-full sm:w-auto px-button py-button bg-gradient-pink-purple-blue text-white font-body font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50 justify-center text-center"
            aria-label="Navigate to portfolio page to view makeup artistry work"
          >
            Explore My Portfolio
          </button>
        }
        decorativeElements={
          <>
            <div
              className="absolute top-10 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"
              aria-hidden="true"
            ></div>
            <div
              className="absolute top-20 right-8 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full opacity-25 animate-pulse delay-1000"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-16 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full opacity-15 animate-pulse delay-2000"
              aria-hidden="true"
            ></div>
          </>
        }
      />

      <WhySection setCurrentPage={setCurrentPage} />
      <FeaturedSection setCurrentPage={setCurrentPage} />
      <FusionNailsSection setCurrentPage={setCurrentPage} />
      <Footer setCurrentPage={setCurrentPage} />
    </main>
  );
}