/**
 * @fileoverview Three Column Layout component for feature grids and service showcases
 * Reusable layout pattern for cards, features, services, and equal-weight content presentation
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";

/**
 * Props interface for ThreeColumnLayout
 */
interface ThreeColumnLayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  backgroundGradient?: {
    from: string;
    via?: string;
    to: string;
  };
  gap?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  padding?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  mobileColumns?: 1 | 2;
  tabletColumns?: 1 | 2 | 3;
  verticalAlignment?: "top" | "center" | "bottom" | "stretch";
  decorativeElements?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Three Column Layout component for equal-weight content presentations
 *
 * Use Cases:
 * - Feature showcases (Why I Do Makeup section)
 * - Service offerings with icons
 * - Team member profiles
 * - Product/skill highlights
 * - Testimonial grids
 * - Icon + text feature blocks
 *
 * Features:
 * - Responsive breakpoint management (3-col desktop, 2-col tablet, 1-col mobile)
 * - Flexible mobile and tablet column configurations
 * - Vertical alignment options including stretch for equal heights
 * - Optional header and footer sections
 * - Consistent Guidelines.md spacing and patterns
 * - Decorative element support
 *
 * @param {ThreeColumnLayoutProps} props - Component properties
 * @param {React.ReactNode} props.children - Content items to display in three columns
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.backgroundGradient] - Optional gradient background configuration
 * @param {string} [props.gap='lg'] - Gap between columns using fluid spacing scale
 * @param {string} [props.padding='3xl'] - Vertical padding using fluid spacing scale
 * @param {number} [props.mobileColumns=1] - Number of columns on mobile devices
 * @param {number} [props.tabletColumns=2] - Number of columns on tablet devices
 * @param {string} [props.verticalAlignment='stretch'] - Vertical alignment of items
 * @param {React.ReactNode} [props.decorativeElements] - Optional decorative elements
 * @param {React.ReactNode} [props.header] - Optional header content above columns
 * @param {React.ReactNode} [props.footer] - Optional footer content below columns
 *
 * @returns {JSX.Element} Three column layout with responsive design
 *
 * @example
 * <ThreeColumnLayout
 *   header={
 *     <div className="text-center mb-fluid-2xl">
 *       <h2>Why I Do Makeup</h2>
 *       <p>Three core reasons that drive my passion</p>
 *     </div>
 *   }
 *   gap="lg"
 *   mobileColumns={1}
 *   tabletColumns={2}
 * >
 *   <FeatureCard icon={<ShineIcon />} title="Make People Shine" />
 *   <FeatureCard icon={<JoyIcon />} title="Brings Me Joy" />
 *   <FeatureCard icon={<GrowthIcon />} title="To Keep Growing" />
 * </ThreeColumnLayout>
 */
export function ThreeColumnLayout({
  children,
  className = "",
  id,
  backgroundGradient,
  gap = "lg",
  padding = "3xl",
  mobileColumns = 1,
  tabletColumns = 2,
  verticalAlignment = "stretch",
  decorativeElements,
  header,
  footer,
}: ThreeColumnLayoutProps) {
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
    stretch: "items-stretch",
  };

  const mobileColumnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
  };

  const tabletColumnClasses = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
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
      id={id}
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
        {/* Header Section */}
        {header && <div className="mb-fluid-2xl">{header}</div>}

        {/* Three Column Grid */}
        <div
          className={`grid ${mobileColumnClasses[mobileColumns]} ${tabletColumnClasses[tabletColumns]} lg:grid-cols-3 ${gapClasses[gap]} ${alignmentClasses[verticalAlignment]}`}
        >
          {children}
        </div>

        {/* Footer Section */}
        {footer && <div className="mt-fluid-2xl">{footer}</div>}
      </div>
    </section>
  );
}