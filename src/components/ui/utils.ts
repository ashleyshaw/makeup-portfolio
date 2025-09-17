/**
 * @fileoverview Utility functions for className manipulation and styling
 * Provides a cn (className) utility function for combining and deduplicating
 * CSS classes using clsx and tailwind-merge for optimal Tailwind CSS usage.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine and deduplicate CSS class names
 * 
 * Combines multiple class values using clsx and then merges conflicting
 * Tailwind CSS classes using tailwind-merge. This ensures that when
 * multiple Tailwind utilities target the same CSS property, the last
 * one takes precedence without creating duplicate styles.
 * 
 * @param {...ClassValue[]} inputs - Variable number of class values to combine
 *   Can include strings, objects, arrays, and conditional classes
 * 
 * @returns {string} Merged and deduplicated className string
 * 
 * @example
 * // Basic usage with strings
 * cn('px-4', 'py-2', 'bg-blue-500')
 * // Returns: "px-4 py-2 bg-blue-500"
 * 
 * @example
 * // Conditional classes
 * cn('base-class', { 'active-class': isActive, 'disabled-class': isDisabled })
 * 
 * @example
 * // Tailwind class merging (conflicting utilities)
 * cn('px-4 py-2', 'px-6') 
 * // Returns: "py-2 px-6" (px-4 is removed in favor of px-6)
 * 
 * @example
 * // Component usage pattern
 * function Button({ className, variant = 'primary', ...props }) {
 *   return (
 *     <button
 *       className={cn(
 *         'px-4 py-2 rounded font-medium', // base styles
 *         {
 *           'bg-blue-500 text-white': variant === 'primary',
 *           'bg-gray-200 text-gray-900': variant === 'secondary',
 *         },
 *         className // allow override from props
 *       )}
 *       {...props}
 *     />
 *   );
 * }
 * 
 * @performance
 * - Efficient class deduplication prevents unnecessary CSS
 * - Optimized for Tailwind CSS class precedence rules
 * - Minimal runtime overhead for class string processing
 * 
 * @see {@link https://github.com/lukeed/clsx} clsx documentation
 * @see {@link https://github.com/dcastil/tailwind-merge} tailwind-merge documentation
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
