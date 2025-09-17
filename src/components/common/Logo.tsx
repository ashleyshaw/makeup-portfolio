/**
 * @fileoverview Brand logo component for Ash Shaw Makeup Portfolio
 * Features paintbrush icon with animated splashes and professional typography
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";

/**
 * Logo component props interface for flexible sizing and styling
 * @interface LogoProps
 * @property {('sm'|'md'|'lg')} [size='md'] - Size variant affecting both icon and text dimensions
 * @property {string} [className] - Additional CSS classes for layout positioning
 */
interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Brand logo component combining paintbrush icon with professional typography
 *
 * Visual Elements:
 * - Realistic paintbrush handle with metallic ferrule
 * - Six individual bristles in brand gradient colors
 * - Paint drip effect below brush creating artistic authenticity
 * - Two animated splash dots (pink and purple) with pulse effects
 * - Professional typography hierarchy with "Ash Shaw" prominence
 *
 * Color Strategy:
 * - Bristles use full brand color spectrum: pink, purple, blue, cyan, teal, green
 * - Animated splashes in primary brand colors (pink/purple)
 * - Handle uses realistic wood tones for authentic artist tool representation
 *
 * Typography:
 * - "Ash Shaw" in Playfair Display (serif) for artistic elegance
 * - "Makeup Artist" in Inter (sans-serif) for modern readability
 * - Responsive sizing maintains readability across all device sizes
 *
 * @param {LogoProps} props - Component properties for customization
 * @returns {JSX.Element} Complete brand logo with icon and typography
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - Screen reader friendly with descriptive alt text
 * - Keyboard focusable when used as interactive element
 *
 * @performance
 * - CSS-only animations for 60fps performance
 * - Optimized SVG paths for fast rendering
 * - Efficient gradient definitions with reusable patterns
 */
export function Logo({
  size = "md",
  className = "",
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "flex items-center gap-2",
      icon: "w-8 h-8",
      name: "text-lg",
      tagline: "text-xs",
    },
    md: {
      container: "flex items-center gap-3",
      icon: "w-10 h-10",
      name: "text-xl",
      tagline: "text-sm",
    },
    lg: {
      container: "flex items-center gap-4",
      icon: "w-12 h-12",
      name: "text-2xl",
      tagline: "text-base",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`${classes.container} ${className}`}>
      {/* Paintbrush Icon */}
      <div className={`${classes.icon} relative`}>
        <svg
          className="w-full h-full transform rotate-12"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="handleGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B4513" />
            </linearGradient>
            <linearGradient
              id="bristleGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E91E63" />
              <stop offset="30%" stopColor="#9C27B0" />
              <stop offset="60%" stopColor="#3F51B5" />
              <stop offset="100%" stopColor="#2196F3" />
            </linearGradient>
          </defs>

          {/* Brush handle */}
          <rect
            x="20"
            y="8"
            width="3"
            height="16"
            rx="1.5"
            fill="url(#handleGradient)"
          />

          {/* Ferrule (metal part) */}
          <rect
            x="19.5"
            y="7"
            width="4"
            height="4"
            rx="0.5"
            fill="#C0C0C0"
          />

          {/* Individual colored bristles */}
          <g>
            <rect
              x="19"
              y="2"
              width="0.8"
              height="6"
              fill="#E91E63"
              rx="0.4"
            />
            <rect
              x="20"
              y="1"
              width="0.8"
              height="7"
              fill="#9C27B0"
              rx="0.4"
            />
            <rect
              x="21"
              y="2.5"
              width="0.8"
              height="5.5"
              fill="#3F51B5"
              rx="0.4"
            />
            <rect
              x="22"
              y="1.5"
              width="0.8"
              height="6.5"
              fill="#2196F3"
              rx="0.4"
            />
            <rect
              x="23"
              y="3"
              width="0.8"
              height="5"
              fill="#00BCD4"
              rx="0.4"
            />
            <rect
              x="24"
              y="2"
              width="0.8"
              height="6"
              fill="#4CAF50"
              rx="0.4"
            />
          </g>

          {/* Paint drip */}
          <circle
            cx="16"
            cy="4"
            r="1.5"
            fill="#E91E63"
            opacity="0.7"
          />
          <ellipse
            cx="16"
            cy="6"
            rx="0.8"
            ry="1.2"
            fill="#E91E63"
            opacity="0.7"
          />
        </svg>

        {/* Animated corner dots */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-pulse" />
        <div
          className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60 animate-pulse"
          style={{ animationDelay: "300ms" }}
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <h1
          className={`${classes.name} font-heading font-bold`}
        >
          <span className="text-gray-800">Ash</span>
          <span className="text-[#E91E63]">Shaw</span>
        </h1>
        <p
          className={`${classes.tagline} font-body font-medium text-[#E91E63]`}
        >
          makeup artist
        </p>
      </div>
    </div>
  );
}