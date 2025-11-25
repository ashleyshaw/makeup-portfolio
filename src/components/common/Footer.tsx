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
      className="relative bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 px-fluid-md"
      style={{
        paddingTop: 'clamp(2rem, 8vh, 4rem)',
        paddingBottom: 'clamp(2rem, 8vh, 4rem)'
      }}
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
        <div className="flex flex-col lg:flex-row gap-fluid-xl">
          <div className="flex-1">
            <h2 className="text-section-h2 font-heading font-bold text-gradient-blue-teal-green mb-fluid-sm">
              About Ash
            </h2>
            <p className="text-body-guideline font-body font-normal text-gray-600 leading-relaxed mb-fluid-sm">
              I'm Ash Shaw, a makeup artist who started this
              journey in 2019. Over the years, my work has grown
              from festival artistry to UV explorations, mousse
              palettes, and Fusion Nails.
            </p>
            <p className="text-quote-large font-body font-medium text-gradient-pink-purple-blue mb-fluid-lg">
              Makeup that shines with colour, energy, and
              connection.
            </p>
            <div className="mb-fluid-lg">
              <h3 className="text-fluid-2xl font-heading font-semibold text-gray-800 mb-fluid-sm">
                Get in Touch
              </h3>
              <p className="text-body-guideline font-body font-normal text-gray-600 leading-relaxed">
                I'd love to hear from you — whether you want to
                collaborate, connect, or just share some love.
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <h2 className="text-section-h2 font-heading font-bold text-gradient-gold-peach-coral mb-fluid-sm">
              Contact Form
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Separator line with generous spacing above and below */}
        <div className="mt-fluid-xl mb-fluid-lg">
          <div className="w-full h-px bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200"></div>
        </div>

        {/* Bottom row with logo left and social icons right */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-fluid-md">
          <div
            className="order-2 sm:order-1 cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={handleLogoClick}
          >
            <Logo size="xl" />
          </div>
          <SocialLinks className="order-1 sm:order-2" />
        </div>
      </div>
    </section>
  );
}