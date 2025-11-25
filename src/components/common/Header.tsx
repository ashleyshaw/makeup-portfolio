/**
 * @fileoverview Header navigation component for Ash Shaw Makeup Portfolio
 * 
 * Core Features:
 * - Responsive navigation with desktop menu and mobile burger button
 * - Extracted mobile menu into separate MobileMenu component for better organization
 * - 220px wide logo in header for enhanced brand presence
 * - Full keyboard navigation with Tab, Enter, Escape support
 * - Screen reader announcements for navigation changes and page transitions
 * - Logo component integration with clickable home navigation
 * 
 * Dependencies:
 * - React 18+ for concurrent features and proper focus management
 * - Logo component for brand consistency across all pages
 * - MobileMenu component for mobile navigation overlay
 * - Tailwind CSS for responsive styling and gradient utilities
 * 
 * Accessibility:
 * - WCAG 2.1 AA compliant navigation with proper ARIA implementation
 * - Keyboard navigation support with visible focus indicators
 * - Screen reader compatibility with semantic HTML and ARIA labels
 * - Focus management with return focus to menu button when mobile menu closes
 * - Live region announcements for navigation state changes
 * 
 * Performance:
 * - Simplified state management with MobileMenu component extraction
 * - Efficient focus management with useRef hooks
 * - Smooth transitions with hardware-accelerated CSS transforms
 * - Reduced component complexity with separation of concerns
 * 
 * @author Ash Shaw Portfolio Team
 * @version 2.2.0
 * @since 1.0.0 - Initial header navigation implementation
 * @since 2.0.0 - Enhanced accessibility with focus trapping and announcements
 * @since 2.1.0 - Comprehensive JSDoc documentation and performance optimizations
 * @since 2.2.0 - Extracted mobile menu into separate component, improved logo sizing
 * @lastModified 2025-01-29
 */

import React, { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { useModal } from "./ModalContext";

/**
 * Props interface for Header component with comprehensive type safety
 * 
 * @interface HeaderProps
 * @description Defines all properties accepted by the Header component with validation
 */
interface HeaderProps {
  /** 
   * Currently active page identifier for navigation state management
   * Controls which navigation item displays as active with visual indicators
   * @example "home" | "about" | "portfolio"
   */
  currentPage: string;
  
  /** 
   * Function to update the active page state and trigger navigation
   * Handles client-side routing and page transitions with focus management
   * @param page - Target page identifier to navigate to
   */
  setCurrentPage: (page: string) => void;
}

/**
 * Header - Comprehensive navigation component with accessibility and mobile optimization
 * 
 * A fully responsive header component implementing desktop navigation and mobile overlay
 * with complete accessibility compliance, keyboard navigation, and focus management.
 * 
 * @component
 * @param {HeaderProps} props - Component properties with type safety
 * @returns {JSX.Element} Rendered header with navigation and accessibility features
 */
export function Header({
  currentPage,
  setCurrentPage,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  // Modal context for managing mobile menu overlay state
  const { registerModal, updateModal, unregisterModal } = useModal();

  // Register mobile menu modal with context on mount
  useEffect(() => {
    registerModal('mobile-menu', 'drawer', { component: 'Header' });
    
    return () => {
      unregisterModal('mobile-menu');
    };
  }, [registerModal, unregisterModal]);

  // Update modal state when mobile menu opens/closes
  useEffect(() => {
    updateModal('mobile-menu', isMobileMenuOpen, { component: 'Header' });
  }, [updateModal, isMobileMenuOpen]);

  // Focus management for mobile menu button when menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      // Return focus to menu button when closed
      menuButtonRef.current?.focus();
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Announce navigation to screen readers
      const announcement = `Navigated to ${sectionId.replace("-", " ")} section`;
      announceToScreenReader(announcement);
    }
  };

  const handleNavigation = (
    page: string,
    sectionId?: string,
  ) => {
    setIsMobileMenuOpen(false);

    if (sectionId && page === "home") {
      if (currentPage !== "home") {
        setCurrentPage("home");
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        scrollToSection(sectionId);
      }
    } else {
      setCurrentPage(page);
      // Announce page change to screen readers
      const pageNames = {
        home: "Home",
        about: "About",
        portfolio: "Portfolio",
        blog: "Blog",
      };
      const pageName =
        pageNames[page as keyof typeof pageNames] || page;
      announceToScreenReader(`Navigated to ${pageName} page`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Screen reader announcement helper
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.setAttribute("class", "sr-only");
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(
      () => document.body.removeChild(announcement),
      1000,
    );
  };

  return (
    <>


      <nav
        className="bg-white/95 backdrop-blur-sm h-24 w-full relative flex items-center justify-between px-fluid-md shadow-sm border-b border-gradient-to-r from-pink-100 to-purple-100 z-40"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo - clickable to home */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation("home")}
            className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md p-1"
            aria-label="Go to home page"
          >
            <Logo size="header" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center gap-8"
          role="menubar"
        >
          <button
            onClick={() => handleNavigation("home")}
            className={`text-fluid-lg font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
              currentPage === "home"
                ? "text-pink-500"
                : "text-gray-700 hover:text-pink-500"
            }`}
            role="menuitem"
            aria-current={
              currentPage === "home" ? "page" : undefined
            }
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("about")}
            className={`text-fluid-lg font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
              currentPage === "about"
                ? "text-pink-500"
                : "text-gray-700 hover:text-pink-500"
            }`}
            role="menuitem"
            aria-current={
              currentPage === "about" ? "page" : undefined
            }
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("portfolio")}
            className={`text-fluid-lg font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
              currentPage === "portfolio"
                ? "text-pink-500"
                : "text-gray-700 hover:text-pink-500"
            }`}
            role="menuitem"
            aria-current={
              currentPage === "portfolio" ? "page" : undefined
            }
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavigation("blog")}
            className={`text-fluid-lg font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
              currentPage === "blog"
                ? "text-pink-500"
                : "text-gray-700 hover:text-pink-500"
            }`}
            role="menuitem"
            aria-current={
              currentPage === "blog" ? "page" : undefined
            }
          >
            Blog
          </button>
          <button
            onClick={() => handleNavigation("home", "contact")}
            className="text-fluid-lg font-body font-medium text-gray-700 hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1"
            role="menuitem"
          >
            Contact
          </button>
        </div>

        {/* Mobile Burger Menu Button */}
        <button
          ref={menuButtonRef}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 z-50 relative focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md p-1"
          onClick={toggleMobileMenu}
          aria-label={
            isMobileMenuOpen
              ? "Close mobile menu"
              : "Open mobile menu"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen
                ? "rotate-45 translate-y-1.5"
                : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMobileMenuOpen
                ? "-rotate-45 -translate-y-1.5"
                : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        currentPage={currentPage}
        onNavigation={handleNavigation}
      />
    </>
  );
}