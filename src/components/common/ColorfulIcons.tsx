/**
 * @fileoverview Custom animated SVG icons for Ash Shaw Makeup Portfolio
 * Purpose-built icons representing core brand values with sophisticated gradients and animations
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";

/**
 * Icon component props interface for consistent styling across all custom icons
 * @interface IconProps
 * @property {('sm'|'md'|'lg')} [size='md'] - Size variant affecting icon dimensions
 * @property {string} [className] - Additional CSS classes for styling overrides
 */
interface IconProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * ShineIcon - Radiant star icon representing "Make People Shine"
 *
 * Visual Elements:
 * - Central radial gradient core (gold to deep purple)
 * - Eight directional sparkle rays with dual gradient systems
 * - Four animated ambient sparkles with varying opacity cycles (1.5s-2.5s)
 *
 * Color Story:
 * - Gold center represents precious/valuable nature of making others shine
 * - Deep purple radiates mystery and transformation
 * - Animated sparkles create living, breathing effect
 *
 * @param {IconProps} props - Component properties
 * @returns {JSX.Element} Animated shine/star icon with radial gradients
 *
 * @design
 * - Responsive sizing: 16×16px (sm), 24×24px (md), 32×32px (lg)
 * - Performance: CSS animations only for 60fps smoothness
 */
export function ShineIcon({
  size = "md",
  className = "",
}: IconProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Use className if it contains size classes, otherwise use sizeMap
  const sizeClass = className.includes("w-")
    ? ""
    : sizeMap[size];

  return (
    <svg
      className={`${sizeClass} ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="shineGradient"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#4B0082" />
        </radialGradient>
        <linearGradient
          id="rayGradient1"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#4ECDC4" />
        </linearGradient>
        <linearGradient
          id="rayGradient2"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#45B7D1" />
          <stop offset="100%" stopColor="#F9CA24" />
        </linearGradient>
      </defs>

      {/* Central radiant core */}
      <circle
        cx="32"
        cy="32"
        r="8"
        fill="url(#shineGradient)"
      />

      {/* Main directional rays */}
      <path
        d="M32 4 L34 18 L30 18 Z"
        fill="url(#rayGradient1)"
      />
      <path
        d="M60 32 L46 30 L46 34 Z"
        fill="url(#rayGradient1)"
      />
      <path
        d="M32 60 L30 46 L34 46 Z"
        fill="url(#rayGradient1)"
      />
      <path
        d="M4 32 L18 34 L18 30 Z"
        fill="url(#rayGradient1)"
      />

      {/* Diagonal rays */}
      <path
        d="M50.9 13.1 L42.8 21.2 L39.6 18 Z"
        fill="url(#rayGradient2)"
      />
      <path
        d="M50.9 50.9 L42.8 42.8 L46 39.6 Z"
        fill="url(#rayGradient2)"
      />
      <path
        d="M13.1 50.9 L21.2 42.8 L18 39.6 Z"
        fill="url(#rayGradient2)"
      />
      <path
        d="M13.1 13.1 L21.2 21.2 L24.4 18 Z"
        fill="url(#rayGradient2)"
      />

      {/* Animated sparkles */}
      <circle
        cx="48"
        cy="16"
        r="2"
        fill="#FFD700"
        opacity="0.7"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="16"
        cy="48"
        r="1.5"
        fill="#4ECDC4"
        opacity="0.6"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="48"
        cy="48"
        r="1"
        fill="#FF6B6B"
        opacity="0.8"
      >
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="16"
        cy="16"
        r="1.5"
        fill="#45B7D1"
        opacity="0.5"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/**
 * JoyIcon - Paint palette with heart representing "Brings Me Joy"
 *
 * Visual Elements:
 * - Paint palette base with 6-color linear gradient
 * - Heart shape with warm gradient fill (hot pink to gold)
 * - Realistic paintbrush with multi-colored bristles
 * - Color drops and splashes scattered organically
 * - Two animated sparkles with offset timing
 *
 * Color Story:
 * - Warm pinks and golds represent love and joy
 * - Rainbow palette represents unlimited creativity
 * - Paint drops show the messy, authentic joy of creation
 *
 * @param {IconProps} props - Component properties
 * @returns {JSX.Element} Animated palette and heart icon with paint effects
 */
export function JoyIcon({
  size = "md",
  className = "",
}: IconProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Use className if it contains size classes, otherwise use sizeMap
  const sizeClass = className.includes("w-")
    ? ""
    : sizeMap[size];

  return (
    <svg
      className={`${sizeClass} ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="paletteGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="17%" stopColor="#4ECDC4" />
          <stop offset="33%" stopColor="#45B7D1" />
          <stop offset="50%" stopColor="#FFA07A" />
          <stop offset="67%" stopColor="#98D8C8" />
          <stop offset="100%" stopColor="#F7DC6F" />
        </linearGradient>
        <linearGradient
          id="heartGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#FF69B4" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <linearGradient
          id="brushGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#CD853F" />
          <stop offset="100%" stopColor="#DEB887" />
        </linearGradient>
      </defs>

      {/* Paint palette base */}
      <ellipse
        cx="32"
        cy="40"
        rx="24"
        ry="16"
        fill="url(#paletteGradient)"
        opacity="0.9"
      />

      {/* Palette thumb hole */}
      <ellipse cx="48" cy="36" rx="6" ry="4" fill="white" />

      {/* Heart shape */}
      <path
        d="M32,20 C28,14 20,14 20,22 C20,30 32,42 32,42 C32,42 44,30 44,22 C44,14 36,14 32,20 Z"
        fill="url(#heartGradient)"
      />

      {/* Paintbrush handle */}
      <rect
        x="50"
        y="8"
        width="3"
        height="20"
        fill="url(#brushGradient)"
        transform="rotate(45 51.5 18)"
      />

      {/* Brush ferrule (metal part) */}
      <rect
        x="49"
        y="6"
        width="5"
        height="4"
        fill="#C0C0C0"
        transform="rotate(45 51.5 8)"
      />

      {/* Brush bristles - multiple colors */}
      <path d="M46 4 L48 10 L44 8 Z" fill="#E91E63" />
      <path d="M48 2 L50 8 L46 6 Z" fill="#9C27B0" />
      <path d="M50 3 L52 9 L48 7 Z" fill="#3F51B5" />
      <path d="M52 4 L54 10 L50 8 Z" fill="#2196F3" />
      <path d="M54 2 L56 8 L52 6 Z" fill="#00BCD4" />
      <path d="M56 3 L58 9 L54 7 Z" fill="#4CAF50" />

      {/* Paint drops */}
      <circle
        cx="12"
        cy="30"
        r="2"
        fill="#FF6B6B"
        opacity="0.8"
      />
      <circle
        cx="54"
        cy="50"
        r="1.5"
        fill="#4ECDC4"
        opacity="0.7"
      />
      <circle
        cx="8"
        cy="48"
        r="1"
        fill="#45B7D1"
        opacity="0.6"
      />

      {/* Animated sparkles */}
      <circle
        cx="38"
        cy="12"
        r="1"
        fill="#FFD700"
        opacity="0.8"
      >
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="14"
        cy="18"
        r="1.5"
        fill="#FF69B4"
        opacity="0.6"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/**
 * GrowthIcon - Flowering plant icon representing "To Keep Growing"
 *
 * Visual Elements:
 * - Growth arrow with 5-stop gradient pointing upward
 * - Flowering bloom with central core and 4 petal circles
 * - Progressive stem with leaf elements
 * - Growth stages showing evolution from small to full plant
 * - Three animated sparkles representing ongoing transformation
 *
 * Color Story:
 * - Green spectrum represents growth, nature, and life
 * - Yellow accents represent achievement and enlightenment
 * - Blue elements represent learning and expansion
 *
 * @param {IconProps} props - Component properties
 * @returns {JSX.Element} Animated growth and plant icon with progressive elements
 */
export function GrowthIcon({
  size = "md",
  className = "",
}: IconProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Use className if it contains size classes, otherwise use sizeMap
  const sizeClass = className.includes("w-")
    ? ""
    : sizeMap[size];

  return (
    <svg
      className={`${sizeClass} ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="growthGradient"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#2E7D32" />
          <stop offset="25%" stopColor="#43A047" />
          <stop offset="50%" stopColor="#66BB6A" />
          <stop offset="75%" stopColor="#81C784" />
          <stop offset="100%" stopColor="#A5D6A7" />
        </linearGradient>
        <radialGradient
          id="flowerGradient"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="70%" stopColor="#FFA726" />
          <stop offset="100%" stopColor="#FF7043" />
        </radialGradient>
        <linearGradient
          id="leafGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>
      </defs>

      {/* Growth arrow shaft */}
      <rect
        x="30"
        y="20"
        width="4"
        height="32"
        fill="url(#growthGradient)"
      />

      {/* Arrow head */}
      <path
        d="M32 16 L26 24 L38 24 Z"
        fill="url(#growthGradient)"
      />

      {/* Main flower bloom */}
      <circle
        cx="32"
        cy="22"
        r="3"
        fill="url(#flowerGradient)"
      />

      {/* Flower petals */}
      <circle
        cx="28"
        cy="20"
        r="2"
        fill="#FFA726"
        opacity="0.8"
      />
      <circle
        cx="36"
        cy="20"
        r="2"
        fill="#FFA726"
        opacity="0.8"
      />
      <circle
        cx="30"
        cy="26"
        r="2"
        fill="#FFA726"
        opacity="0.8"
      />
      <circle
        cx="34"
        cy="26"
        r="2"
        fill="#FFA726"
        opacity="0.8"
      />

      {/* Stem segments showing growth stages */}
      <rect
        x="30"
        y="35"
        width="4"
        height="8"
        fill="#4CAF50"
        opacity="0.9"
      />
      <rect
        x="30"
        y="43"
        width="4"
        height="6"
        fill="#66BB6A"
        opacity="0.8"
      />
      <rect
        x="30"
        y="49"
        width="4"
        height="4"
        fill="#81C784"
        opacity="0.7"
      />

      {/* Leaves at different growth stages */}
      <ellipse
        cx="26"
        cy="38"
        rx="4"
        ry="2"
        fill="url(#leafGradient)"
        transform="rotate(-30 26 38)"
      />
      <ellipse
        cx="38"
        cy="42"
        rx="3"
        ry="1.5"
        fill="url(#leafGradient)"
        transform="rotate(30 38 42)"
      />
      <ellipse
        cx="24"
        cy="46"
        rx="2"
        ry="1"
        fill="url(#leafGradient)"
        transform="rotate(-45 24 46)"
      />

      {/* Root system */}
      <path
        d="M30 52 Q24 56 20 58"
        stroke="#8D6E63"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M34 52 Q40 56 44 58"
        stroke="#8D6E63"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M32 52 Q32 58 32 60"
        stroke="#8D6E63"
        strokeWidth="2"
        fill="none"
      />

      {/* Animated growth sparkles */}
      <circle
        cx="42"
        cy="18"
        r="1"
        fill="#FFD700"
        opacity="0.7"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="22"
        cy="32"
        r="1.5"
        fill="#4CAF50"
        opacity="0.6"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="40"
        cy="36"
        r="1"
        fill="#81C784"
        opacity="0.8"
      >
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="2.8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}