/**
 * @fileoverview Two Column Layout component for balanced content presentation
 * Reusable layout pattern for content/image pairs, feature showcases, and split layouts
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";

/**
 * Props interface for TwoColumnLayout
 */
interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  className?: string;
  backgroundGradient?: {
    from: string;
    via?: string;
    to: string;
  };
  columnRatio?: "1:1" | "2:1" | "1:2" | "3:2" | "2:3";
  gap?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  padding?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  verticalAlignment?: "top" | "center" | "bottom";
  reverseOnMobile?: boolean;
  decorativeElements?: React.ReactNode;
}

/**
 * Two Column Layout component for balanced content presentations
 *
 * Use Cases:
 * - Content alongside images or media
 * - Feature descriptions with visuals
 * - About sections with photos
 * - Service offerings with icons
 * - Testimonials with portraits
 * - Contact forms with information
 *
 * Features:
 * - Flexible column ratios and proportions
 * - Responsive mobile stacking with optional reverse
 * - Vertical alignment options
 * - Optional background gradients
 * - Consistent Guidelines.md spacing
 * - Decorative element support
 *
 * @param {TwoColumnLayoutProps} props - Component properties
 * @param {React.ReactNode} props.leftColumn - Content for the left column
 * @param {React.ReactNode} props.rightColumn - Content for the right column
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.backgroundGradient] - Optional gradient background configuration
 * @param {string} [props.columnRatio='1:1'] - Ratio between left and right columns
 * @param {string} [props.gap='2xl'] - Gap between columns using fluid spacing scale
 * @param {string} [props.padding='3xl'] - Vertical padding using fluid spacing scale
 * @param {string} [props.verticalAlignment='center'] - Vertical alignment of columns
 * @param {boolean} [props.reverseOnMobile=false] - Reverse column order on mobile
 * @param {React.ReactNode} [props.decorativeElements] - Optional decorative elements
 *
 * @returns {JSX.Element} Two column layout with responsive design
 *
 * @example
 * <TwoColumnLayout
 *   leftColumn={
 *     <div>
 *       <h2>About Ash Shaw</h2>
 *       <p>Makeup artist story...</p>
 *     </div>
 *   }
 *   rightColumn={
 *     <img src="/photo.jpg" alt="Ash Shaw" />
 *   }
 *   columnRatio="2:1"
 *   reverseOnMobile={true}
 * />
 */
export function TwoColumnLayout({
  leftColumn,
  rightColumn,
  className = "",
  backgroundGradient,
  columnRatio = "1:1",
  gap = "2xl",
  padding = "3xl",
  verticalAlignment = "center",
  reverseOnMobile = false,
  decorativeElements,
}: TwoColumnLayoutProps) {
  const columnRatioClasses = {
    "1:1": "lg:grid-cols-2",
    "2:1": "lg:grid-cols-3 [&>:first-child]:lg:col-span-2",
    "1:2": "lg:grid-cols-3 [&>:last-child]:lg:col-span-2",
    "3:2":
      "lg:grid-cols-5 [&>:first-child]:lg:col-span-3 [&>:last-child]:lg:col-span-2",
    "2:3":
      "lg:grid-cols-5 [&>:first-child]:lg:col-span-2 [&>:last-child]:lg:col-span-3",
  };

  const gapClasses = {
    sm: "gap-fluid-sm",
    md: "gap-fluid-md",
    lg: "gap-fluid-lg",
    xl: "gap-fluid-xl",
    "2xl": "gap-fluid-2xl",
    "3xl": "gap-fluid-3xl",
  };

  const paddingClasses = {
    sm: "py-fluid-sm px-fluid-md",
    md: "py-fluid-md px-fluid-md",
    lg: "py-fluid-lg px-fluid-md",
    xl: "py-fluid-xl px-fluid-md",
    "2xl": "py-fluid-2xl px-fluid-md",
    "3xl": "py-fluid-3xl px-fluid-md",
  };

  const alignmentClasses = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
  };

  const backgroundClass = backgroundGradient
    ? `bg-gradient-to-br from-${backgroundGradient.from} ${
        backgroundGradient.via
          ? `via-${backgroundGradient.via}`
          : ""
      } to-${backgroundGradient.to}`
    : "";

  const mobileOrderClass = reverseOnMobile
    ? "[&>:first-child]:order-2 [&>:last-child]:order-1 lg:[&>:first-child]:order-1 lg:[&>:last-child]:order-2"
    : "";

  return (
    <section
      className={`relative overflow-hidden ${backgroundClass} ${paddingClasses[padding]} ${className}`}
    >
      {/* Decorative Elements */}
      {decorativeElements && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {decorativeElements}
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`grid grid-cols-1 ${columnRatioClasses[columnRatio]} ${gapClasses[gap]} ${alignmentClasses[verticalAlignment]} ${mobileOrderClass}`}
        >
          <div>{leftColumn}</div>
          <div>{rightColumn}</div>
        </div>
      </div>
    </section>
  );
}