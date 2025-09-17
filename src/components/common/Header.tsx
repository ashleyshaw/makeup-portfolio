/**
 * @fileoverview Header navigation component for Ash Shaw Makeup Portfolio
 * Provides main site navigation with logo, desktop menu, mobile hamburger menu,
 * and comprehensive accessibility features.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";

/**
 * Props interface for Header component
 * @interface HeaderProps
 * @property {string} currentPage - Currently active page identifier
 * @property {Function} setCurrentPage - Function to update the active page state
 */
interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

/**
 * Header navigation component providing desktop and mobile navigation with full accessibility support
 *
 * Features:
 * - Responsive navigation with mobile burger menu
 * - Full-screen mobile overlay with gradient background and decorative elements
 * - Keyboard navigation and focus management (Tab, Escape, Arrow keys)
 * - Screen reader announcements for navigation changes
 * - Focus trapping in mobile menu
 * - Smooth scrolling to page sections
 *
 * @param {HeaderProps} props - Component properties
 * @param {string} props.currentPage - Currently active page ('home', 'about', 'portfolio')
 * @param {Function} props.setCurrentPage - Function to update current page state
 *
 * @example
 * <Header currentPage="home" setCurrentPage={setCurrentPage} />
 *
 * @accessibility
 * - WCAG 2.1 Level AA compliant navigation
 * - Keyboard navigation support with proper focus management
 * - Screen reader announcements for navigation changes
 * - Focus trapping in mobile menu overlay
 */
export function Header({
  currentPage,
  setCurrentPage,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Focus the first focusable element when menu opens
      firstFocusableRef.current?.focus();
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Return focus to menu button when closed
      menuButtonRef.current?.focus();
      // Restore body scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle keyboard events for mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMobileMenuOpen) return;

      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }

      // Focus trapping
      if (event.key === "Tab" && mobileMenuRef.current) {
        const focusableElements =
          mobileMenuRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

        if (focusableElements.length === 0) return;

        const firstElement =
          focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
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
      };
      const pageName =
        pageNames[page as keyof typeof pageNames] || page;
      announceToScreenReader(`Navigated to ${pageName} page`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-gray-900 px-4 py-2 rounded-md shadow-lg font-medium text-sm"
      >
        Skip to main content
      </a>

      <nav
        className="bg-white/95 backdrop-blur-sm h-24 w-full relative flex items-center justify-between px-4 md:px-12 lg:px-20 shadow-sm border-b border-gradient-to-r from-pink-100 to-purple-100 z-40"
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
            <Logo size="md" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center gap-8"
          role="menubar"
        >
          <button
            onClick={() => handleNavigation("home")}
            className={`text-lg font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
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
            className={`text-lg font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
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
            className={`text-lg font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
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
            onClick={() => handleNavigation("home", "contact")}
            className="text-lg font-body font-medium text-gray-700 hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md px-2 py-1"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Content */}
          <div
            ref={mobileMenuRef}
            className="relative w-full h-full bg-gradient-to-br from-white via-pink-50 to-purple-50 flex flex-col items-center justify-center space-y-12"
          >
            {/* Hidden title for screen readers */}
            <h2 id="mobile-menu-title" className="sr-only">
              Mobile Navigation Menu
            </h2>

            {/* Close Button */}
            <button
              ref={firstFocusableRef}
              className="absolute top-8 right-6 flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md p-1"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <span
                className="block w-6 h-0.5 bg-gray-700 rotate-45 translate-y-1.5"
                aria-hidden="true"
              />
              <span
                className="block w-6 h-0.5 bg-gray-700 opacity-0"
                aria-hidden="true"
              />
              <span
                className="block w-6 h-0.5 bg-gray-700 -rotate-45 -translate-y-1.5"
                aria-hidden="true"
              />
            </button>

            {/* Logo in Menu */}
            <div className="cursor-pointer transform hover:scale-105 transition-transform">
              <button
                onClick={() => handleNavigation("home")}
                className="focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md p-2"
                aria-label="Go to home page"
              >
                <Logo size="lg" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav
              className="flex flex-col items-center space-y-8"
              role="menu"
              aria-label="Mobile navigation"
            >
              <button
                onClick={() => handleNavigation("about")}
                className={`text-3xl sm:text-4xl font-heading font-semibold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-4 rounded-md px-4 py-2 ${
                  currentPage === "about"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent"
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
                className={`text-3xl sm:text-4xl font-heading font-semibold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-4 rounded-md px-4 py-2 ${
                  currentPage === "portfolio"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent"
                }`}
                role="menuitem"
                aria-current={
                  currentPage === "portfolio"
                    ? "page"
                    : undefined
                }
              >
                Portfolio
              </button>

              <button
                onClick={() =>
                  handleNavigation("home", "contact")
                }
                className="text-3xl sm:text-4xl font-heading font-semibold text-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-4 rounded-md px-4 py-2"
                role="menuitem"
              >
                Contact
              </button>
            </nav>

            {/* Decorative Elements - hidden from screen readers */}
            <div
              className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full opacity-25 animate-pulse delay-1000"
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 right-1/3 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 animate-pulse delay-2000"
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </>
  );
}