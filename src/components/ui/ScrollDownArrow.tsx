/**
 * @fileoverview Scroll Down Arrow component for hero sections
 * Animated arrow with circle background that scrolls to next section on click
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Props interface for ScrollDownArrow component
 */
interface ScrollDownArrowProps {
  /** Optional target section ID to scroll to. If not provided, scrolls to next section */
  targetSectionId?: string;
  /** Optional aria label for accessibility */
  ariaLabel?: string;
  /** Optional additional CSS classes */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Animated scroll-down arrow component for hero sections
 * 
 * Features:
 * - Circular background with gradient border
 * - Smooth bounce animation
 * - Hover and focus states with scale effects
 * - Accessibility compliant with proper ARIA labels
 * - Smooth scrolling to target section
 * 
 * @param {ScrollDownArrowProps} props - Component properties
 * @param {string} [props.targetSectionId] - ID of section to scroll to
 * @param {string} [props.ariaLabel] - Custom aria label for accessibility
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Animated scroll down arrow button
 * 
 * @accessibility
 * - Keyboard accessible with proper focus states
 * - Screen reader friendly with descriptive labels
 * - High contrast support
 * 
 * @example
 * <ScrollDownArrow targetSectionId="why-section" />
 */
export function ScrollDownArrow({ 
  targetSectionId, 
  ariaLabel = "Scroll to next section",
  className = "",
  onClick
}: ScrollDownArrowProps) {
  
  const handleClick = () => {
    // Use custom onClick if provided
    if (onClick) {
      onClick();
      return;
    }

    let targetElement: Element | null = null;
    
    if (targetSectionId) {
      // Scroll to specific section
      targetElement = document.getElementById(targetSectionId);
    } else {
      // Find the next section after current hero
      const heroSections = document.querySelectorAll('section');
      if (heroSections.length > 1) {
        targetElement = heroSections[1]; // Second section (after hero)
      }
    }
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Announce to screen readers
      const announcement = `Scrolled to ${targetSectionId || 'next section'}`;
      const ariaLive = document.createElement('div');
      ariaLive.setAttribute('aria-live', 'polite');
      ariaLive.setAttribute('class', 'sr-only');
      ariaLive.textContent = announcement;
      document.body.appendChild(ariaLive);
      setTimeout(() => document.body.removeChild(ariaLive), 1000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2
        w-14 h-14 md:w-16 md:h-16
        bg-white/95 backdrop-blur-sm
        border border-pink-200/50
        rounded-full
        shadow-md shadow-pink-200/20
        flex items-center justify-center
        transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-lg hover:shadow-pink-200/30
        focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:ring-offset-2
        animate-subtle-float
        z-50
        ${className}
      `}
      aria-label={ariaLabel}
      type="button"
    >
      {/* Subtle gradient border effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* Inner circle */}
      <div className="relative w-full h-full rounded-full bg-white/98 flex items-center justify-center">
        <ChevronDown 
          className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-pink-500 transition-colors duration-500" 
          strokeWidth={2}
        />
      </div>
      
      {/* Subtle pulsing ring animation */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 opacity-10 animate-ping" style={{
        animationDuration: '4s'
      }} />
    </button>
  );
}