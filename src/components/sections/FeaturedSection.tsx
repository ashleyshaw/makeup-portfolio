/**
 * @fileoverview Featured Work section showcasing latest festival makeup artistry
 * Displays carefully selected portfolio pieces with lightbox functionality
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { FEATURED_WORK_DATA } from "../common/Constants";
import { EnhancedLightbox } from "../ui/EnhancedLightbox";
import { SliderCard } from "../ui/SliderCard";

/**
 * Featured Work section component displaying latest festival makeup artistry
 *
 * Layout Strategy:
 * - Desktop: 3-column grid with consistent spacing and alignment
 * - Mobile: Horizontal scrollable slider with snap-scroll behavior
 * - Responsive image containers with aspect-square ratio
 * - Consistent typography hierarchy across all devices
 *
 * Visual Design:
 * - Blue to teal to green gradient background evoking natural festival energy
 * - Semi-transparent white cards with backdrop blur for depth
 * - Hover effects with subtle scale transforms and shadow elevation
 * - Ring borders around images for premium appearance
 *
 * Interactive Features:
 * - Click to open images in full-screen lightbox modal
 * - Smooth scrolling behavior on mobile slider
 * - Hover state animations for desktop engagement
 * - Focus management for accessibility compliance
 *
 * @param {Object} props - Component properties
 * @param {Function} props.setCurrentPage - Navigation function to switch to Portfolio page
 *
 * @returns {JSX.Element} Featured work section with responsive gallery and lightbox
 *
 * @design
 * - Uses `gap-fluid-lg` and `max-w-5xl` per Guidelines.md specifications
 * - Matches grid alignment with other homepage sections
 * - Maintains consistent card padding and typography scales
 */
export function FeaturedSection({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      description?: string;
    }>;
    currentIndex: number;
    title?: string;
    description?: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
    description: "",
  });

  const openLightbox = (
    images: Array<{
      src: string;
      alt: string;
      caption?: string;
      description?: string;
    }>,
    currentIndex: number,
    title?: string,
    description?: string,
  ) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex,
      title,
      description,
    });
  };

  const closeLightbox = () => {
    setLightbox({
      isOpen: false,
      images: [],
      currentIndex: 0,
      title: "",
      description: "",
    });
  };

  return (
    <>
      <section
        id="work"
        className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-fluid-3xl px-fluid-xl w-full"
      >
        {/* Background decoration - responsive */}
        <div className="absolute top-20 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-fluid-3xl">
            <h2
              id="work"
              className="text-fluid-4xl sm:text-fluid-5xl lg:text-fluid-6xl font-heading font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-fluid-xl"
            >
              Featured Work
            </h2>
            <p className="text-fluid-lg font-body font-normal text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Highlighting my most recent festival creations —
              each piece captures the unique energy and spirit
              of these incredible celebrations.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-fluid-lg max-w-5xl mx-auto">
            {FEATURED_WORK_DATA.map((work, index) => (
              <SliderCard
                key={work.id || index}
                data={{
                  ...work,
                  // Enhance with additional placeholder images to ensure 3-4 images per card
                  images: [
                    ...(work.images || []),
                    // Add supplementary placeholder images based on the work type
                    ...(work.id === "featured-euphoria"
                      ? [
                          {
                            src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3xlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                            alt: "Festival Euphoria - bright colorful face paint at outdoor festival",
                            caption: "Vibrant Colors",
                            description:
                              "Bright colorful face paint capturing festival energy",
                          },
                          {
                            src: "https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBtb2hhd2slMjBmZXN0aXZhbCUyMG1ha2V1cHxlbnwxfHx8fDE3NTc1OTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                            alt: "Festival Euphoria - purple mohawk festival style",
                            caption: "Mohawk Style",
                            description:
                              "Purple mohawk complementing the festival euphoria look",
                          },
                        ]
                      : work.id === "featured-warrior"
                        ? [
                            {
                              src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Forest Warrior - glitter face makeup art details",
                              caption: "Glitter Details",
                              description:
                                "Close-up of glitter face makeup art creating warrior effect",
                            },
                            {
                              src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3xlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Forest Warrior - fierce festival makeup application",
                              caption: "Fierce Application",
                              description:
                                "Application process of the fierce forest warrior look",
                            },
                          ]
                        : work.id === "featured-magic"
                          ? [
                              {
                                src: "https://images.unsplash.com/photo-1755223736694-3863b2f81de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBibHVlJTIwbWFrZXVwJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzU3NTk4MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "New Year Magic - golden and blue artistic makeup",
                                caption: "Golden Artistry",
                                description:
                                  "Golden and blue artistic makeup for New Year magic",
                              },
                              {
                                src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "New Year Magic - contemplative forest energy details",
                                caption: "Forest Energy",
                                description:
                                  "Contemplative details capturing peaceful forest energy",
                              },
                            ]
                          : []),
                  ].slice(0, 4), // Ensure maximum 4 images per card
                }}
                onImageClick={(imageIndex) => {
                  const enhancedImages = [
                    ...(work.images || []),
                    ...(work.id === "featured-euphoria"
                      ? [
                          {
                            src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3xlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                            alt: "Festival Euphoria - bright colorful face paint at outdoor festival",
                            caption: "Vibrant Colors",
                            description:
                              "Bright colorful face paint capturing festival energy",
                          },
                          {
                            src: "https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBtb2hhd2slMjBmZXN0aXZhbCUyMG1ha2V1cHxlbnwxfHx8fDE3NTc1OTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                            alt: "Festival Euphoria - purple mohawk festival style",
                            caption: "Mohawk Style",
                            description:
                              "Purple mohawk complementing the festival euphoria look",
                          },
                        ]
                      : work.id === "featured-warrior"
                        ? [
                            {
                              src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Forest Warrior - glitter face makeup art details",
                              caption: "Glitter Details",
                              description:
                                "Close-up of glitter face makeup art creating warrior effect",
                            },
                            {
                              src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3xlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Forest Warrior - fierce festival makeup application",
                              caption: "Fierce Application",
                              description:
                                "Application process of the fierce forest warrior look",
                            },
                          ]
                        : work.id === "featured-magic"
                          ? [
                              {
                                src: "https://images.unsplash.com/photo-1755223736694-3863b2f81de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBibHVlJTIwbWFrZXVwJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzU3NTk4MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "New Year Magic - golden and blue artistic makeup",
                                caption: "Golden Artistry",
                                description:
                                  "Golden and blue artistic makeup for New Year magic",
                              },
                              {
                                src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "New Year Magic - contemplative forest energy details",
                                caption: "Forest Energy",
                                description:
                                  "Contemplative details capturing peaceful forest energy",
                              },
                            ]
                          : []),
                  ].slice(0, 4);

                  openLightbox(
                    enhancedImages,
                    imageIndex,
                    work.title,
                    `${work.subtitle} - ${work.description}`,
                  );
                }}
                gradientConfig={{
                  subtitleGradient:
                    "from-pink-700 to-purple-600",
                }}
                className="w-full"
              />
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-fluid-lg max-w-5xl mx-auto">
              {FEATURED_WORK_DATA.map((work, index) => (
                <SliderCard
                  key={work.id || index}
                  data={{
                    ...work,
                    // Enhance with additional placeholder images to ensure 3-4 images per card
                    images: [
                      ...(work.images || []),
                      // Add supplementary placeholder images based on the work type
                      ...(work.id === "featured-euphoria"
                        ? [
                            {
                              src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3xlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Festival Euphoria - bright colorful face paint at outdoor festival",
                              caption: "Vibrant Colors",
                              description:
                                "Bright colorful face paint capturing festival energy",
                            },
                            {
                              src: "https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBtb2hhd2slMjBmZXN0aXZhbCUyMG1ha2V1cHxlbnwxfHx8fDE3NTc1OTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Festival Euphoria - purple mohawk festival style",
                              caption: "Mohawk Style",
                              description:
                                "Purple mohawk complementing the festival euphoria look",
                            },
                          ]
                        : work.id === "featured-warrior"
                          ? [
                              {
                                src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "Forest Warrior - glitter face makeup art details",
                                caption: "Glitter Details",
                                description:
                                  "Close-up of glitter face makeup art creating warrior effect",
                              },
                              {
                                src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3xlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "Forest Warrior - fierce festival makeup application",
                                caption: "Fierce Application",
                                description:
                                  "Application process of the fierce forest warrior look",
                              },
                            ]
                          : work.id === "featured-magic"
                            ? [
                                {
                                  src: "https://images.unsplash.com/photo-1755223736694-3863b2f81de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBibHVlJTIwbWFrZXVwJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzU3NTk4MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                  alt: "New Year Magic - golden and blue artistic makeup",
                                  caption: "Golden Artistry",
                                  description:
                                    "Golden and blue artistic makeup for New Year magic",
                                },
                                {
                                  src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                  alt: "New Year Magic - contemplative forest energy details",
                                  caption: "Forest Energy",
                                  description:
                                    "Contemplative details capturing peaceful forest energy",
                                },
                              ]
                            : []),
                    ].slice(0, 4), // Ensure maximum 4 images per card
                  }}
                  onImageClick={(imageIndex) => {
                    const enhancedImages = [
                      ...(work.images || []),
                      ...(work.id === "featured-euphoria"
                        ? [
                            {
                              src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3hlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Festival Euphoria - bright colorful face paint at outdoor festival",
                              caption: "Vibrant Colors",
                              description:
                                "Bright colorful face paint capturing festival energy",
                            },
                            {
                              src: "https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBtb2hhd2slMjBmZXN0aXZhbCUyMG1ha2V1cHxlbnwxfHx8fDE3NTc1OTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                              alt: "Festival Euphoria - purple mohawk festival style",
                              caption: "Mohawk Style",
                              description:
                                "Purple mohawk complementing the festival euphoria look",
                            },
                          ]
                        : work.id === "featured-warrior"
                          ? [
                              {
                                src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "Forest Warrior - glitter face makeup art details",
                                caption: "Glitter Details",
                                description:
                                  "Close-up of glitter face makeup art creating warrior effect",
                              },
                              {
                                src: "https://images.unsplash.com/photo-1730738228877-ae09a433b209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMGJyaWdodCUyMGNvbG9yc3hlbnwxfHx8fDE3NTc1OTgyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                alt: "Forest Warrior - fierce festival makeup application",
                                caption: "Fierce Application",
                                description:
                                  "Application process of the fierce forest warrior look",
                              },
                            ]
                          : work.id === "featured-magic"
                            ? [
                                {
                                  src: "https://images.unsplash.com/photo-1755223736694-3863b2f81de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBibHVlJTIwbWFrZXVwJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzU3NTk4MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                  alt: "New Year Magic - golden and blue artistic makeup",
                                  caption: "Golden Artistry",
                                  description:
                                    "Golden and blue artistic makeup for New Year magic",
                                },
                                {
                                  src: "https://images.unsplash.com/photo-1677808566807-1097fc06b472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGl0dGVyJTIwZmFjZSUyMG1ha2V1cCUyMGFydHxlbnwxfHx8fDE3NTc1OTgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                                  alt: "New Year Magic - contemplative forest energy details",
                                  caption: "Forest Energy",
                                  description:
                                    "Contemplative details capturing peaceful forest energy",
                                },
                              ]
                            : []),
                    ].slice(0, 4);

                    openLightbox(
                      enhancedImages,
                      imageIndex,
                      work.title,
                      `${work.subtitle} - ${work.description}`,
                    );
                  }}
                  gradientConfig={{
                    subtitleGradient:
                      "from-pink-700 to-purple-600",
                  }}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-fluid-2xl">
            <button
              onClick={() => setCurrentPage("portfolio")}
              className="w-full sm:w-auto justify-center text-center bg-gradient-pink-purple-blue text-white px-button py-button rounded-lg font-body font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
              aria-label="Navigate to Portfolio page to view all makeup artistry work"
            >
              View Full Portfolio
            </button>
          </div>
        </div>
      </section>

      <EnhancedLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        title={lightbox.title}
        description={lightbox.description}
      />
    </>
  );
}