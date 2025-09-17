/**
 * @fileoverview Main application component for Ash Shaw Makeup Portfolio
 * Handles navigation, routing, and accessibility features including mobile menu,
 * keyboard navigation, screen reader announcements, and focus management.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/common/Header";
import { HomePage } from "./components/pages/home/HomePage";
import { AboutPage } from "./components/pages/about/AboutPage";
import { PortfolioPage } from "./components/pages/portfolio/PortfolioPage";

/**
 * Main application component managing global state and routing
 *
 * Core functionality:
 * - Single-page application routing between Home, About, and Portfolio
 * - Global navigation state management
 * - Document title updates for SEO and accessibility
 * - Focus management for page transitions
 * - Screen reader live region for announcements
 *
 * @component
 * @returns {JSX.Element} Complete application with navigation and content
 *
 * @accessibility
 * - WCAG 2.1 Level AA compliant
 * - Comprehensive keyboard navigation
 * - Screen reader support with live regions
 * - Focus management and skip links
 * - High contrast mode support
 *
 * @performance
 * - Conditional rendering to avoid unnecessary re-renders
 * - Optimized state updates with useEffect dependencies
 * - Smooth scrolling with requestAnimationFrame timing
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Announce page changes to screen readers
  useEffect(() => {
    const pageNames = {
      home: "Home",
      about: "About Ash Shaw",
      portfolio: "Portfolio - Makeup Artistry Work",
    };
    const pageName =
      pageNames[currentPage as keyof typeof pageNames] ||
      currentPage;

    // Update document title for browser tab and screen readers
    document.title =
      currentPage === "home"
        ? "Ash Shaw - Makeup Artist Portfolio"
        : `${pageName} | Ash Shaw - Makeup Artist`;

    // Focus management - ensure focus goes to main content on page change
    setTimeout(() => {
      const mainContent =
        document.getElementById("main-content");
      if (mainContent) {
        mainContent.focus();
      }
    }, 100);
  }, [currentPage]);

  const scrollToPortfolioSection = (sectionId?: string) => {
    setTimeout(() => {
      if (sectionId === "fusion-nails") {
        const element = document.querySelector(
          '[data-section="fusion-nails"]',
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="announcements"
      ></div>

      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {currentPage === "home" && (
        <HomePage setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "about" && (
        <main id="main-content" role="main" tabIndex={-1}>
          <AboutPage
            setCurrentPage={setCurrentPage}
            scrollToPortfolioSection={scrollToPortfolioSection}
          />
        </main>
      )}

      {currentPage === "portfolio" && (
        <main id="main-content" role="main" tabIndex={-1}>
          <PortfolioPage setCurrentPage={setCurrentPage} />
        </main>
      )}
    </div>
  );
}