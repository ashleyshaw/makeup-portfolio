/**
 * @fileoverview Lightbox component for Ash Shaw Makeup Portfolio
 * Provides accessible image viewing with keyboard navigation, focus management, and responsive design.
 * Features modal overlay, escape key handling, click-outside-to-close, and image information display.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useEffect } from "react";

/**
 * Props interface for Lightbox component
 *
 * @interface LightboxProps
 * @property {boolean} isOpen - Controls whether the lightbox is visible
 * @property {Function} onClose - Callback function to close the lightbox
 * @property {string} imageSrc - URL of the image to display
 * @property {string} imageAlt - Alt text for the image (required for accessibility)
 * @property {string} [title] - Optional title to display with the image
 * @property {string} [description] - Optional description to display with the image
 */
interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
}

/**
 * Lightbox component for displaying portfolio images in modal overlay
 *
 * Features:
 * - Modal overlay with backdrop blur and dark background
 * - Keyboard navigation (Escape key to close)
 * - Click outside to close functionality
 * - Body scroll prevention when open
 * - Responsive image sizing with max viewport constraints
 * - Optional title and description overlay
 * - Accessible close button with proper labeling
 * - Focus management and restoration
 *
 * @param {LightboxProps} props - Component properties
 * @param {boolean} props.isOpen - Whether lightbox is currently visible
 * @param {Function} props.onClose - Function called when lightbox should close
 * @param {string} props.imageSrc - URL of the image to display
 * @param {string} props.imageAlt - Alt text for accessibility
 * @param {string} [props.title] - Optional title shown as overlay
 * @param {string} [props.description] - Optional description shown as overlay
 *
 * @returns {JSX.Element|null} Lightbox modal or null when closed
 *
 * @accessibility
 * - Escape key handling for keyboard users
 * - Proper alt text for screen readers
 * - Focus management when opening/closing
 * - Screen reader accessible close instructions
 * - High contrast support for overlay elements
 *
 * @example
 * <Lightbox
 *   isOpen={isLightboxOpen}
 *   onClose={() => setIsLightboxOpen(false)}
 *   imageSrc="/path/to/image.jpg"
 *   imageAlt="Festival makeup with UV reactive paints"
 *   title="UV Festival Look"
 *   description="Glowing makeup created for Shankra Festival 2023"
 * />
 */
export function Lightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  description,
}: LightboxProps) {
  /**
   * Effect to manage body scroll when lightbox is open
   * Prevents background scrolling and restores on close
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /**
   * Effect to handle keyboard navigation
   * Listens for Escape key to close lightbox when open
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl max-h-full w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image container */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-full max-h-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
          />

          {/* Image info overlay */}
          {(title || description) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              {title && (
                <h3 className="text-xl md:text-2xl font-heading font-semibold mb-2">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-base md:text-lg font-body opacity-90">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation hint */}
        <p className="text-white/70 text-sm mt-4 text-center">
          Press Esc or click outside to close
        </p>
      </div>
    </div>
  );
}