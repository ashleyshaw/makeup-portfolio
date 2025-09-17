/**
 * @fileoverview Footer section component for Ash Shaw Makeup Portfolio
 * Provides comprehensive footer with about content, contact form, social links, and navigation.
 * Features responsive layout, gradient backgrounds, and accessibility-compliant structure.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";
import { Logo } from "./Logo";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "./SocialLinks";

/**
 * Props interface for Footer component
 *
 * @interface FooterProps
 * @property {Function} [setCurrentPage] - Optional function to handle page navigation when logo is clicked
 */
interface FooterProps {
  setCurrentPage?: (page: string) => void;
}

/**
 * Footer section component providing site conclusion with contact and navigation
 *
 * Features:
 * - Two-column layout with about content and contact form (responsive stacking)
 * - Gradient background with decorative blur elements
 * - Integrated contact form with full validation
 * - Social media links with accessibility support
 * - Clickable logo for home navigation with smooth scrolling
 * - Responsive design with fluid spacing and typography
 * - Semantic HTML structure for screen readers
 *
 * Layout:
 * - Left column: About Ash content with tagline and contact introduction
 * - Right column: Contact form with validation and submission handling
 * - Bottom row: Logo (left) and social links (right) with separator line
 *
 * @param {FooterProps} props - Component properties
 * @param {Function} [props.setCurrentPage] - Function to handle page navigation
 *
 * @returns {JSX.Element} Complete footer section with all contact elements
 *
 * @accessibility
 * - Semantic section element with contact landmark
 * - Proper heading hierarchy (h2, h3)
 * - Keyboard navigation for all interactive elements
 * - Screen reader accessible decorative elements marked aria-hidden
 * - High contrast support for all text and backgrounds
 *
 * @example
 * <Footer setCurrentPage={setCurrentPage} />
 */
export function Footer({ setCurrentPage }: FooterProps) {
  /**
   * Handles logo click to navigate to home page with smooth scroll to top
   * Only navigates if setCurrentPage function is provided
   */
  const handleLogoClick = () => {
    if (setCurrentPage) {
      setCurrentPage("home");
      // Scroll to top when navigating to home
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-fluid-3xl px-fluid-xl"
    >
      {/* Background decoration - responsive */}
      <div
        className="absolute top-1/4 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full opacity-10 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full opacity-10 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-fluid-2xl">
          <div className="flex-1">
            <h2 className="text-fluid-4xl sm:text-fluid-5xl font-heading font-bold bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent mb-fluid-lg">
              About Ash
            </h2>
            <p className="text-fluid-lg sm:text-fluid-xl font-body font-normal text-gray-600 leading-relaxed mb-fluid-lg">
              I'm Ash Shaw, a makeup artist who started this
              journey in 2019. Over the years, my work has grown
              from festival artistry to UV explorations, mousse
              palettes, and Fusion Nails.
            </p>
            <p className="text-fluid-xl sm:text-fluid-2xl font-body font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-fluid-xl">
              Makeup that shines with colour, energy, and
              connection.
            </p>
            <div className="mb-fluid-xl">
              <h3 className="text-fluid-2xl sm:text-fluid-3xl font-heading font-semibold text-gray-800 mb-fluid-lg">
                Get in Touch
              </h3>
              <p className="text-fluid-lg sm:text-fluid-xl font-body font-normal text-gray-600 leading-relaxed">
                I'd love to hear from you — whether you want to
                collaborate, connect, or just share some love.
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <h3 className="text-fluid-3xl sm:text-fluid-4xl font-heading font-bold bg-gradient-to-r from-gray-800 to-pink-600 bg-clip-text text-transparent mb-fluid-xl">
              Contact Form
            </h3>
            <ContactForm />
          </div>
        </div>

        {/* Separator line with generous spacing above and below */}
        <div className="mt-fluid-3xl mb-fluid-2xl">
          <div className="w-full h-px bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200"></div>
        </div>

        {/* Bottom row with logo left and social icons right */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-fluid-lg">
          <div
            className="order-2 sm:order-1 cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={handleLogoClick}
          >
            <Logo size="sm" />
          </div>
          <SocialLinks className="order-1 sm:order-2" />
        </div>
      </div>
    </section>
  );
}