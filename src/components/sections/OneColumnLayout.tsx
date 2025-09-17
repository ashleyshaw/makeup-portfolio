/**
 * @fileoverview One Column Layout component for single-focus content sections
 * Reusable layout pattern for hero sections, testimonials, and centered content
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";

/**
 * Props interface for OneColumnLayout
 */
interface OneColumnLayoutProps {
  children: React.ReactNode;
  className?: string;
  backgroundGradient?: {
    from: string;
    via?: string;
    to: string;
  };
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  padding?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  textAlign?: "left" | "center" | "right";
  decorativeElements?: React.ReactNode;
}

/**
 * One Column Layout component for centered content presentations
 *
 * Use Cases:
 * - Hero sections with centered messaging
 * - Testimonials and quotes
 * - Single-focus content areas
 * - Call-to-action sections
 * - About introductions
 *
 * Features:
 * - Responsive max-width containers
 * - Flexible padding and spacing
 * - Optional background gradients
 * - Decorative element support
 * - Typography alignment options
 * - Consistent Guidelines.md spacing
 *
 * @param {OneColumnLayoutProps} props - Component properties
 * @param {React.ReactNode} props.children - Content to display in the single column
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.backgroundGradient] - Optional gradient background configuration
 * @param {string} [props.maxWidth='4xl'] - Maximum width constraint for content
 * @param {string} [props.padding='3xl'] - Vertical padding using fluid spacing scale
 * @param {string} [props.textAlign='center'] - Text alignment for the content
 * @param {React.ReactNode} [props.decorativeElements] - Optional decorative elements
 *
 * @returns {JSX.Element} Single column layout with responsive design
 *
 * @example
 * <OneColumnLayout
 *   maxWidth="4xl"
 *   textAlign="center"
 *   backgroundGradient={{ from: 'pink-50', to: 'purple-50' }}
 *   decorativeElements={<DecorativeCircles />}
 * >
 *   <h1>Hero Title</h1>
 *   <p>Hero description content</p>
 *   <Button>Call to Action</Button>
 * </OneColumnLayout>
 */
export function OneColumnLayout({
  children,
  className = "",
  backgroundGradient,
  maxWidth = "4xl",
  padding = "3xl",
  textAlign = "center",
  decorativeElements,
}: OneColumnLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  };

  const paddingClasses = {
    sm: "py-fluid-sm px-fluid-xl",
    md: "py-fluid-md px-fluid-xl",
    lg: "py-fluid-lg px-fluid-xl",
    xl: "py-fluid-xl px-fluid-xl",
    "2xl": "py-fluid-2xl px-fluid-xl",
    "3xl": "py-fluid-3xl px-fluid-xl",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const backgroundClass = backgroundGradient
    ? `bg-gradient-to-br from-${backgroundGradient.from} ${
        backgroundGradient.via
          ? `via-${backgroundGradient.via}`
          : ""
      } to-${backgroundGradient.to}`
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
      <div
        className={`${maxWidthClasses[maxWidth]} mx-auto relative z-10 ${textAlignClasses[textAlign]}`}
      >
        {children}
      </div>
    </section>
  );
}