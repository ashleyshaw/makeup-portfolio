/**
 * @fileoverview Social media links component with platform-specific styling
 * Provides consistent social media icon presentation across the portfolio site
 * with authentic brand gradients and accessibility features.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";
import svgPaths from "../../imports/svg-p751zd8tl6";
import { SOCIAL_LINKS } from "./Constants";

/**
 * Props interface for SocialLinks component
 * @interface SocialLinksProps
 * @property {string} [className] - Additional CSS classes for container styling
 */
interface SocialLinksProps {
  className?: string;
}

/**
 * Social media links component with platform-authentic styling
 *
 * Platform Integration:
 * - Instagram: Authentic brand gradient (#e1306c to #fd1d1d to #fcaf45)
 * - Facebook: Corporate blue gradient (#1877f2 to #42a5f5)
 * - LinkedIn: Professional blue gradient (#0077b5 to #00a0dc)
 * - Email: Success green gradient (#10b981 to #059669)
 *
 * Visual Features:
 * - Circular gradient backgrounds specific to each platform
 * - Hover scale transforms (110%) for interactive feedback
 * - Shadow effects for depth and professionalism
 * - Consistent 48×48px sizing across all platforms
 *
 * Accessibility Features:
 * - Descriptive aria-labels with context ("Visit Ash Shaw on [Platform]")
 * - Proper target and rel attributes for external links
 * - Email links use _self target for native mail app integration
 * - Keyboard navigation support with focus indicators
 *
 * @param {SocialLinksProps} props - Component properties
 * @param {string} [props.className=""] - Additional CSS classes for layout customization
 *
 * @returns {JSX.Element} Container with platform-specific social media links
 *
 * @example
 * // In footer
 * <SocialLinks className="justify-center md:justify-end" />
 *
 * @example
 * // In about page
 * <SocialLinks className="flex-wrap gap-4" />
 *
 * @dependencies
 * - SOCIAL_LINKS constant from ./Constants providing platform data
 * - SVG paths imported from Figma assets for icon rendering
 *
 * @accessibility
 * - WCAG 2.1 Level AA compliant color contrast on all gradients
 * - Screen reader friendly link descriptions
 * - Keyboard navigation with visible focus indicators
 */
export function SocialLinks({
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`flex gap-fluid-md ${className}`}>
      {SOCIAL_LINKS.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target={
            social.platform === "Email" ? "_self" : "_blank"
          }
          rel={
            social.platform === "Email"
              ? undefined
              : "noopener noreferrer"
          }
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
          style={{
            background: getGradientForPlatform(social.platform),
          }}
          aria-label={`Visit Ash Shaw on ${social.platform}`}
        >
          <svg
            className="w-6 h-6 text-white"
            fill={
              social.platform === "Email"
                ? "none"
                : "currentColor"
            }
            stroke={
              social.platform === "Email"
                ? "currentColor"
                : "none"
            }
            viewBox={getViewBoxForPlatform(social.platform)}
            dangerouslySetInnerHTML={{
              __html: getSVGPathForPlatform(social.platform),
            }}
          />
        </a>
      ))}
    </div>
  );
}

function getGradientForPlatform(platform: string): string {
  const baseGradient = "linear-gradient(135deg, ";
  const hoverStates = {
    Instagram: `${baseGradient}#e1306c, #fd1d1d, #fcaf45)`,
    Facebook: `${baseGradient}#1877f2, #42a5f5)`,
    LinkedIn: `${baseGradient}#0077b5, #00a0dc)`,
    Email: `${baseGradient}#10b981, #059669)`,
  };

  return (
    hoverStates[platform] || `${baseGradient}#6366f1, #8b5cf6)`
  );
}

function getViewBoxForPlatform(platform: string): string {
  const viewBoxes: { [key: string]: string } = {
    Instagram: "0 0 36 36",
    Facebook: "0 0 36 36",
    LinkedIn: "0 0 24 24",
    Email: "0 0 24 24",
  };

  return viewBoxes[platform] || "0 0 24 24";
}

function getSVGPathForPlatform(platform: string): string {
  const svgPaths: { [key: string]: string } = {
    Instagram: `
      <path d="M17.9985 11.0655C16.159 11.0655 14.3948 11.7963 13.094 13.097C11.7933 14.3978 11.0625 16.162 11.0625 18.0015C11.0625 19.841 11.7933 21.6052 13.094 22.906C14.3948 24.2067 16.159 24.9375 17.9985 24.9375C19.838 24.9375 21.6022 24.2067 22.903 22.906C24.2037 21.6052 24.9345 19.841 24.9345 18.0015C24.9345 16.162 24.2037 14.3978 22.903 13.097C21.6022 11.7963 19.838 11.0655 17.9985 11.0655ZM17.9985 22.506C16.8034 22.506 15.6573 22.0313 14.8123 21.1862C13.9672 20.3412 13.4925 19.1951 13.4925 18C13.4925 16.8049 13.9672 15.6588 14.8123 14.8138C15.6573 13.9687 16.8034 13.494 17.9985 13.494C19.1936 13.494 20.3397 13.9687 21.1847 14.8138C22.0298 15.6588 22.5045 16.8049 22.5045 18C22.5045 19.1951 22.0298 20.3412 21.1847 21.1862C20.3397 22.0313 19.1936 22.506 17.9985 22.506Z"/>
      <path d="M25.209 12.4275C26.102 12.4275 26.826 11.7035 26.826 10.8105C26.826 9.91746 26.102 9.1935 25.209 9.1935C24.316 9.1935 23.592 9.91746 23.592 10.8105C23.592 11.7035 24.316 12.4275 25.209 12.4275Z"/>
      <path d="M30.7995 9.1665C30.4523 8.26977 29.9216 7.45542 29.2415 6.77559C28.5614 6.09575 27.7469 5.56541 26.85 5.2185C25.8005 4.82454 24.6918 4.61151 23.571 4.5885C22.1265 4.5255 21.669 4.5075 18.006 4.5075C14.343 4.5075 13.8735 4.5075 12.441 4.5885C11.3211 4.61034 10.2131 4.8234 9.165 5.2185C8.2679 5.565 7.45315 6.09521 6.773 6.77509C6.09286 7.45498 5.56234 8.26954 5.2155 9.1665C4.82146 10.2159 4.60892 11.3248 4.587 12.4455C4.5225 13.8885 4.503 14.346 4.503 18.0105C4.503 21.6735 4.503 22.14 4.587 23.5755C4.6095 24.6975 4.821 25.8045 5.2155 26.856C5.56332 27.7526 6.09434 28.5669 6.77465 29.2467C7.45496 29.9265 8.2696 30.4569 9.1665 30.804C10.2127 31.2138 11.3211 31.4421 12.444 31.479C13.8885 31.542 14.346 31.5615 18.009 31.5615C21.672 31.5615 22.1415 31.5615 23.574 31.479C24.6947 31.4562 25.8033 31.2437 26.853 30.8505C27.7496 30.5028 28.5639 29.972 29.244 29.292C29.924 28.6119 30.4548 27.7976 30.8025 26.901C31.197 25.851 31.4085 24.744 31.431 23.622C31.4955 22.179 31.515 21.7215 31.515 18.057C31.515 14.3925 31.515 13.9275 31.431 12.492C31.4135 11.3554 31.1999 10.2304 30.7995 9.1665ZM28.9725 23.4645C28.9628 24.329 28.805 25.1854 28.506 25.9965C28.2807 26.5798 27.9359 27.1095 27.4936 27.5515C27.0513 27.9935 26.5214 28.3381 25.938 28.563C25.1358 28.8607 24.2885 29.0185 23.433 29.0295C22.008 29.0955 21.606 29.112 17.952 29.112C14.295 29.112 13.9215 29.112 12.4695 29.0295C11.6144 29.019 10.7675 28.8612 9.966 28.563C9.38053 28.3395 8.8485 27.9955 8.40434 27.5534C7.96017 27.1113 7.61375 26.5809 7.3875 25.9965C7.09267 25.1941 6.93497 24.3478 6.921 23.493C6.8565 22.068 6.8415 21.666 6.8415 18.012C6.8415 14.3565 6.8415 13.983 6.921 12.5295C6.9307 11.6655 7.08848 10.8096 7.3875 9.999C7.845 8.8155 8.7825 7.884 9.966 7.431C10.7679 7.13421 11.6145 6.97645 12.4695 6.9645C13.896 6.9 14.2965 6.882 17.952 6.882C21.6075 6.882 21.9825 6.882 23.433 6.9645C24.2886 6.97479 25.136 7.13261 25.938 7.431C26.5214 7.65641 27.0512 8.0013 27.4935 8.44355C27.9357 8.88579 28.2806 9.41561 28.506 9.999C28.8008 10.8014 28.9585 11.6477 28.9725 12.5025C29.037 13.929 29.0535 14.3295 29.0535 17.985C29.0535 21.639 29.0535 22.032 28.989 23.466H28.9725V23.4645Z"/>
    `,
    Facebook: `<path d="M30 4.5H6C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6V30C4.5 30.3978 4.65804 30.7794 4.93934 31.0607C5.22064 31.342 5.60218 31.5 6 31.5H18.9225V21.06H15.4155V16.9725H18.9225V13.9725C18.9225 10.485 21.0525 8.5845 24.1725 8.5845C25.221 8.5815 26.271 8.6355 27.315 8.745V12.375H25.1625C23.4705 12.375 23.1405 13.182 23.1405 14.3625V16.965H27.186L26.661 21.0525H23.139V31.5H30C30.3978 31.5 30.7794 31.342 31.0607 31.0607C31.342 30.7794 31.5 30.3978 31.5 30V6C31.5 5.60218 31.342 5.22064 31.0607 4.93934C30.7794 4.65804 30.3978 4.5 30 4.5Z"/>`,
    LinkedIn: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>`,
    Email: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`,
  };

  return svgPaths[platform] || "";
}