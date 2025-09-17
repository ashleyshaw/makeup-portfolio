/**
 * @fileoverview Accessibility utilities and components for Ash Shaw Makeup Portfolio
 * Provides comprehensive accessibility support including screen reader announcements,
 * focus management, keyboard navigation, and WCAG 2.1 Level AA compliant components.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";

/**
 * Interface defining accessibility context methods and utilities
 *
 * @interface AccessibilityContextType
 * @property {Function} announceToScreenReader - Function to announce messages to screen readers
 * @property {Function} setFocus - Function to programmatically set focus on elements
 * @property {Function} getFocusableElements - Function to find all focusable elements in a container
 */
interface AccessibilityContextType {
  announceToScreenReader: (
    message: string,
    priority?: "polite" | "assertive",
  ) => void;
  setFocus: (element: HTMLElement | null) => void;
  getFocusableElements: (
    container: HTMLElement,
  ) => HTMLElement[];
}

const AccessibilityContext =
  createContext<AccessibilityContextType | null>(null);

/**
 * Provider component that manages accessibility features across the application
 *
 * Features:
 * - Screen reader live region for announcements
 * - Focus management utilities
 * - Focusable element detection
 * - ARIA live region with polite/assertive priorities
 * - Automatic announcement cleanup
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components that need accessibility context
 *
 * @returns {JSX.Element} Provider with accessibility context and live region
 *
 * @example
 * <AccessibilityProvider>
 *   <App />
 * </AccessibilityProvider>
 */
export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcementRef = useRef<HTMLDivElement>(null);

  /**
   * Announces messages to screen readers using ARIA live regions
   *
   * @param {string} message - Text message to announce
   * @param {'polite'|'assertive'} [priority='polite'] - Announcement priority level
   *   - 'polite': Waits for current speech to finish
   *   - 'assertive': Interrupts current speech immediately
   *
   * @example
   * announceToScreenReader('Page navigation completed', 'polite');
   * announceToScreenReader('Error occurred', 'assertive');
   */
  const announceToScreenReader = useCallback(
    (
      message: string,
      priority: "polite" | "assertive" = "polite",
    ) => {
      if (announcementRef.current) {
        // Clear previous message
        announcementRef.current.textContent = "";

        // Set new message after a brief delay to ensure screen reader picks it up
        setTimeout(() => {
          if (announcementRef.current) {
            announcementRef.current.setAttribute(
              "aria-live",
              priority,
            );
            announcementRef.current.textContent = message;
          }
        }, 100);

        // Clear message after it's been announced
        setTimeout(() => {
          if (announcementRef.current) {
            announcementRef.current.textContent = "";
          }
        }, 1000);
      }
    },
    [],
  );

  /**
   * Sets focus on a specific element if it exists
   *
   * @param {HTMLElement|null} element - Element to focus, or null to do nothing
   *
   * @example
   * setFocus(document.getElementById('main-content'));
   */
  const setFocus = useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        element.focus();
      }
    },
    [],
  );

  /**
   * Finds all focusable elements within a container
   *
   * @param {HTMLElement} container - Container element to search within
   * @returns {HTMLElement[]} Array of all focusable elements
   *
   * @example
   * const focusableElements = getFocusableElements(modalContainer);
   * if (focusableElements.length > 0) {
   *   focusableElements[0].focus();
   * }
   */
  const getFocusableElements = useCallback(
    (container: HTMLElement): HTMLElement[] => {
      const focusableSelectors = [
        "button:not([disabled])",
        "a[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
        "details summary",
        "iframe",
        "audio[controls]",
        "video[controls]",
        '[contenteditable]:not([contenteditable="false"])',
      ].join(", ");

      return Array.from(
        container.querySelectorAll(focusableSelectors),
      ) as HTMLElement[];
    },
    [],
  );

  const value: AccessibilityContextType = {
    announceToScreenReader,
    setFocus,
    getFocusableElements,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {/* Screen reader announcement region */}
      <div
        ref={announcementRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Hook to access accessibility utilities throughout the application
 *
 * @returns {AccessibilityContextType} Object containing accessibility utility functions
 * @throws {Error} If used outside of AccessibilityProvider
 *
 * @example
 * const { announceToScreenReader, setFocus } = useAccessibility();
 * announceToScreenReader('Navigation completed');
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
}

// Hook for managing focus trapping in modals/overlays
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  const { getFocusableElements } = useAccessibility();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        !isActive ||
        !containerRef.current ||
        event.key !== "Tab"
      )
        return;

      const focusableElements = getFocusableElements(
        containerRef.current,
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    },
    [isActive, getFocusableElements],
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return containerRef;
}

// Hook for managing page titles and meta information
export function usePageMetadata(
  title: string,
  description?: string,
) {
  React.useEffect(() => {
    document.title = title;

    if (description) {
      let metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
}

// Component for accessible headings with proper hierarchy
interface AccessibleHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function AccessibleHeading({
  level,
  children,
  className = "",
  id,
}: AccessibleHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={className} id={id}>
      {children}
    </Tag>
  );
}

// Component for accessible buttons with proper labeling
interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function AccessibleButton({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText = "Loading...",
  disabled,
  children,
  className = "",
  ...props
}: AccessibleButtonProps) {
  const baseClasses =
    "font-body font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white",
    secondary:
      "border-2 border-pink-500 text-pink-500 hover:bg-pink-50",
    ghost: "text-gray-700 hover:text-pink-500 hover:bg-pink-50",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}

// Component for accessible skip links
export function SkipLinks() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white text-gray-900 px-4 py-2 rounded-md shadow-lg font-medium text-sm border-2 border-pink-500"
      >
        Skip to main content
      </a>
      <a
        href="#main-navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 focus:z-50 bg-white text-gray-900 px-4 py-2 rounded-md shadow-lg font-medium text-sm border-2 border-pink-500"
      >
        Skip to navigation
      </a>
    </>
  );
}