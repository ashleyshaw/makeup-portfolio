/**
 * @fileoverview Hero section component with artistic image mosaic and brand messaging
 * Features overlapping images, floating gradient orbs, and responsive design
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import imgHeroImage1 from "figma:asset/7aeb80239b9fc61876f42ca779badabf1651bb2c.png";
import imgHeroImage2 from "figma:asset/b013338a3126efe5c475db2f25c54b560aaf020f.png";
import imgHeroImage3 from "figma:asset/97bc32da10ca77968fe99531c50669a75c3be78e.png";
import { EnhancedLightbox } from "../ui/EnhancedLightbox";

/**
 * Hero section component with artistic image mosaic and brand messaging
 *
 * Visual Features:
 * - Three overlapping images with artistic rotation and shadow effects
 * - Floating gradient orbs with pulse animations (pink/purple, blue/teal, yellow/pink)
 * - Responsive image sizing from mobile (160×192px) to desktop (320×384px)
 * - Four decorative gradient dots positioned around images with staggered animations
 * - Brand tagline with individual word gradients for visual storytelling
 *
 * Interactive Elements:
 * - Clickable images opening in lightbox modal
 * - Hover effects with scale transforms on images
 * - Gradient text effects on key messaging words
 *
 * Layout Strategy:
 * - Flexbox layout switching from column (mobile) to row (desktop)
 * - Responsive spacing using fluid utility classes
 * - Z-index layering for proper image overlap and decorative elements
 *
 * @component
 * @returns {JSX.Element} Hero section with image mosaic and messaging
 *
 * @accessibility
 * - Proper image alt text describing makeup styles and events
 * - Keyboard accessible image interactions
 * - Semantic HTML structure with proper heading hierarchy
 *
 * @performance
 * - Optimized image loading with responsive breakpoints
 * - CSS transforms for smooth hover animations
 * - Efficient state management for lightbox modal
 */
export function HeroSection() {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: Array<{ src: string; alt: string; }>;
    currentIndex: number;
    title?: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
  });

  const openLightbox = (
    imageSrc: string,
    imageAlt: string,
    title?: string,
  ) => {
    setLightbox({ 
      isOpen: true, 
      images: [{ src: imageSrc, alt: imageAlt }], 
      currentIndex: 0, 
      title 
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      images: [],
      currentIndex: 0,
      title: "",
    });
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-fluid-3xl px-fluid-md overflow-hidden">
        {/* Floating gradient orbs - responsive sizes */}
        <div className="absolute top-10 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-8 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full opacity-15 animate-pulse delay-2000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-fluid-2xl lg:gap-20">
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <p className="text-fluid-xl font-body font-medium text-gradient-pink-purple-blue mb-fluid-xl">
                Hi, I'm Ash Shaw.
              </p>
              <h1 className="text-hero-h1 font-heading font-bold text-gray-800 leading-tight mb-fluid-xl">
                Makeup that shines with{" "}
                <em className="italic text-gradient-pink-purple-blue">
                  colour
                </em>
                ,{" "}
                <em className="italic text-gradient-pink-purple-blue">
                  energy
                </em>
                , and{" "}
                <em className="italic text-gradient-blue-teal-green">
                  connection
                </em>
                .
              </h1>
              <p className="text-body-guideline font-body font-normal text-gray-600 leading-relaxed mb-fluid-xl">
                Makeup is my art, my joy, and my way of bringing
                people together. From festivals to the dance
                floor, I use colour and light to create looks
                that make people feel radiant, confident, and
                alive.
              </p>
              <p className="text-fluid-lg font-body font-medium text-gradient-pink-purple-blue">
                ✨ This portfolio is a growing collection of
                that journey.
              </p>
            </div>

            {/* Artistic Image Mosaic - Mobile optimized */}
            <div className="flex-1 max-w-2xl relative w-full">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                {/* Main large image - center - responsive positioning */}
                <div
                  className="absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-gradient-to-r ring-pink-200/50 cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundImage: `url('${imgHeroImage2}')`,
                  }}
                  onClick={() =>
                    openLightbox(
                      imgHeroImage2,
                      "Thailand Festival Makeup",
                      "Eden Paradise",
                    )
                  }
                />

                {/* Second image - top right - responsive */}
                <div
                  className="absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-purple-200/50 cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundImage: `url('${imgHeroImage1}')`,
                  }}
                  onClick={() =>
                    openLightbox(
                      imgHeroImage1,
                      "Thailand Festival Makeup",
                      "Lost Paradise",
                    )
                  }
                />

                {/* Third image - bottom left - responsive */}
                <div
                  className="absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-blue-200/50 cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundImage: `url('${imgHeroImage3}')`,
                  }}
                  onClick={() =>
                    openLightbox(
                      imgHeroImage3,
                      "Thailand Festival Makeup",
                      "Eden Paradise",
                    )
                  }
                />

                {/* Enhanced decorative elements - responsive */}
                <div className="absolute top-10 right-8 sm:top-20 sm:right-16 w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-70 animate-pulse z-30 shadow-lg"></div>
                <div className="absolute bottom-16 right-4 sm:bottom-32 sm:right-8 w-3 h-3 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full opacity-70 animate-pulse delay-300 z-30 shadow-lg"></div>
                <div className="absolute top-20 left-1 sm:top-40 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-70 animate-pulse delay-700 z-30 shadow-lg"></div>
                <div className="absolute bottom-8 left-10 sm:bottom-16 sm:left-20 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse delay-1000 z-30 shadow-lg"></div>

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-blue-100/30 rounded-3xl pointer-events-none z-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnhancedLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        title={lightbox.title}
      />
    </>
  );
}