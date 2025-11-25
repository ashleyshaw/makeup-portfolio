/**
 * @fileoverview Portfolio Image Component for handling both regular URLs and Figma imports
 * 
 * Handles mixed image sources including:
 * - figma:asset/ URLs that need to be imported
 * - https:// URLs that can be used directly
 * - Provides fallback support and error handling
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from 'react';

// Import the Jungle Festival images
import jungleImage1 from 'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png';
import jungleImage2 from 'figma:asset/1cd08d3825ac7cc423a4672f8ed279139fc99d0a.png';
import jungleImage3 from 'figma:asset/3eb83eb2d4eb493b80283c1b75770d8893b2fc6a.png';

// Import the Nation of Gondwana Festival images
import gondwanaImage1 from 'figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png';
import gondwanaImage2 from 'figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png';
import gondwanaImage3 from 'figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png';

/**
 * Map of figma:asset URLs to imported assets
 */
const FIGMA_ASSET_MAP: Record<string, string> = {
  // Jungle Festival Koh Phangan images
  'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png': jungleImage1,
  'figma:asset/1cd08d3825ac7cc423a4672f8ed279139fc99d0a.png': jungleImage2,
  'figma:asset/3eb83eb2d4eb493b80283c1b75770d8893b2fc6a.png': jungleImage3,
  
  // Nation of Gondwana Festival images
  'figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png': gondwanaImage1,
  'figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png': gondwanaImage2,
  'figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png': gondwanaImage3,
};

/**
 * Props interface for PortfolioImage
 */
interface PortfolioImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Portfolio Image component that handles both regular URLs and Figma asset imports
 * 
 * @param props - Component properties
 * @returns Image element with proper source resolution
 */
export function PortfolioImage({ 
  src, 
  alt, 
  className = "", 
  style, 
  onLoad, 
  onError 
}: PortfolioImageProps) {
  // Resolve the image source with comprehensive fallback handling
  const resolvedSrc = (() => {
    // If it's a figma:asset/ URL, try to resolve it
    if (src.startsWith('figma:asset/')) {
      const mapped = FIGMA_ASSET_MAP[src];
      if (mapped) {
        return mapped;
      } else {
        // Figma asset not found, provide a contextual fallback based on filename
        console.warn(`🖼️ PortfolioImage: Figma asset not found: ${src}`);
        
        // Provide different fallbacks based on likely content type
        if (alt.toLowerCase().includes('nail') || alt.toLowerCase().includes('fusion')) {
          return 'https://images.unsplash.com/photo-1590926918555-c058b85940d6?w=800'; // Nail art fallback
        } else if (alt.toLowerCase().includes('uv') || alt.toLowerCase().includes('neon')) {
          return 'https://images.unsplash.com/photo-1602494518965-195c6ec1c980?w=800'; // UV makeup fallback
        } else if (alt.toLowerCase().includes('festival')) {
          return 'https://images.unsplash.com/photo-1603300382284-72ddf4985216?w=800'; // Festival makeup fallback
        } else {
          return 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'; // Default portfolio fallback
        }
      }
    }
    // Return the original URL for regular images
    return src;
  })();
  
  // Debug logging in development
  if (import.meta?.env?.DEV && src.startsWith('figma:asset/')) {
    const resolved = FIGMA_ASSET_MAP[src];
    console.log(`🖼️ PortfolioImage resolving:`, {
      original: src,
      resolved: resolved ? 'Found in map' : 'Not found - using fallback',
      finalSrc: resolvedSrc.substring(0, 100) + '...'
    });
  }
  
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      style={style}
      onLoad={onLoad}
      onError={onError}
    />
  );
}

/**
 * Hook to get resolved image URL for CSS background-image usage
 * 
 * @param src - Image source URL (can be figma:asset/ or regular URL)
 * @returns Resolved image URL for CSS usage
 */
export function usePortfolioImageUrl(src: string): string {
  // Resolve the image source with comprehensive fallback handling
  const resolvedSrc = (() => {
    // If it's a figma:asset/ URL, try to resolve it
    if (src.startsWith('figma:asset/')) {
      const mapped = FIGMA_ASSET_MAP[src];
      if (mapped) {
        return mapped;
      } else {
        // Figma asset not found, provide a contextual fallback
        console.warn(`🎨 usePortfolioImageUrl: Figma asset not found: ${src}`);
        
        // Provide different fallbacks based on likely content type (simple heuristics)
        const srcLower = src.toLowerCase();
        if (srcLower.includes('nail') || srcLower.includes('9e303d') || srcLower.includes('deb2b4') || srcLower.includes('1ec0ba')) {
          return 'https://images.unsplash.com/photo-1590926918555-c058b85940d6?w=800'; // Nail art fallback
        } else if (srcLower.includes('uv') || srcLower.includes('neon') || srcLower.includes('3f84a6')) {
          return 'https://images.unsplash.com/photo-1602494518965-195c6ec1c980?w=800'; // UV makeup fallback
        } else if (srcLower.includes('festival') || srcLower.includes('2fed1a') || srcLower.includes('331df4')) {
          return 'https://images.unsplash.com/photo-1603300382284-72ddf4985216?w=800'; // Festival makeup fallback
        } else {
          return 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'; // Default portfolio fallback
        }
      }
    }
    // Return the original URL for regular images
    return src;
  })();
  
  // Debug logging in development
  if (import.meta?.env?.DEV && src.startsWith('figma:asset/')) {
    const resolved = FIGMA_ASSET_MAP[src];
    console.log(`🎨 usePortfolioImageUrl resolving:`, {
      original: src,
      resolved: resolved ? 'Found in map' : 'Not found - using fallback',
      finalSrc: resolvedSrc.substring(0, 100) + '...'
    });
  }
  
  return resolvedSrc;
}

export default PortfolioImage;