/**
 * @fileoverview Brand logo component for Ash Shaw Makeup Portfolio
 * Features the new brand logo image with colorful paintbrush design
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.1.0
 */

import React from "react";
import logoImage from 'figma:asset/428cc40e40184633483ae65f75ced5f46af6821d.png';

/**
 * Logo component props interface for flexible sizing and styling
 * @interface LogoProps
 * @property {('sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'header'|'mobile-sm')} [size='md'] - Size variant affecting both icon and text dimensions
 * @property {string} [className] - Additional CSS classes for layout positioning
 */
interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "header" | "mobile-sm";
  className?: string;
}

/**
 * Brand logo component featuring the new Ash Shaw logo design with colorful paintbrush
 *
 * Visual Elements:
 * - Complete logo image with colorful paintbrush and "AshShaw makeup artist" text
 * - Pink circular background with vibrant paintbrush design
 * - Professional typography integrated within the logo image
 * - Responsive sizing maintaining clarity and impact across all device sizes
 *
 * Design Features:
 * - Colorful paintbrush with rainbow bristles on pink background
 * - "AshShaw" in elegant black typography with pink "makeup artist" text
 * - Complete brand identity in a single cohesive logo image
 * - Optimized for professional presentation across all touchpoints
 *
 * @param {LogoProps} props - Component properties for customization
 * @returns {JSX.Element} Complete brand logo with integrated design
 *
 * @accessibility
 * - Semantic HTML structure with descriptive alt text
 * - Screen reader friendly with complete logo description
 * - High contrast logo design for optimal visibility
 * - Keyboard focusable when used as interactive element
 *
 * @performance
 * - Optimized PNG image with efficient compression
 * - Responsive sizing for different screen densities
 * - Fast loading with proper image optimization
 */
export function Logo({
  size = "md",
  className = "",
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "flex items-center gap-2",
      logo: "h-8",
      name: "text-xl",
      tagline: "text-xs",
    },
    md: {
      container: "flex items-center gap-3",
      logo: "h-10",
      name: "text-2xl",
      tagline: "text-sm",
    },
    lg: {
      container: "flex items-center gap-4",
      logo: "h-12",
      name: "text-3xl",
      tagline: "text-base",
    },
    xl: {
      container: "flex items-center gap-5",
      logo: "h-24", // 3x medium (96px)
      name: "text-4xl",
      tagline: "text-lg",
    },
    '2xl': {
      container: "flex items-center gap-6",
      logo: "h-30", // 3x medium+ (120px) 
      name: "text-5xl",
      tagline: "text-xl",
    },
    '3xl': {
      container: "flex items-center gap-8",
      logo: "h-36", // 3x large (144px)
      name: "text-6xl",
      tagline: "text-2xl",
    },
    header: {
      container: "flex items-center gap-4",
      logo: "w-header-logo", // 220px width for header
      name: "text-4xl",
      tagline: "text-lg",
    },
    'mobile-sm': {
      container: "flex items-center gap-3",
      logo: "h-15", // Half of h-30 (60px) - half the mobile menu size
      name: "text-3xl",
      tagline: "text-base",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`${classes.container} ${className}`}>
      {/* Brand Logo Image with Colorful Paintbrush Design */}
      <img
        src={logoImage}
        alt="AshShaw makeup artist logo featuring colorful paintbrush with rainbow bristles on pink circular background"
        className={`${classes.logo} w-auto object-contain max-[320px]:scale-90`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}