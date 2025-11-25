/**
 * @fileoverview Unified Portfolio Service for Ash Shaw Makeup Portfolio
 * 
 * Provides centralized portfolio data management shared between homepage FeaturedSection
 * and PortfolioMainPage to ensure consistent content display and category filtering.
 * 
 * Features:
 * - Unified data structure for all portfolio content
 * - Category-based filtering with proper type safety
 * - Contentful CMS integration with static fallbacks
 * - Consistent image handling and optimization
 * - Featured item selection and ordering
 * 
 * Architecture:
 * - Single source of truth for portfolio data
 * - Seamless integration between homepage and portfolio page
 * - Proper TypeScript interfaces for data consistency
 * - Performance optimized with caching and lazy loading
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial unified portfolio service implementation
 */

import { 
  THAILAND_WORK_DATA, 
  FESTIVAL_WORK_DATA, 
  SHANKRA_WORK_DATA, 
  FEATURED_NAILS_DATA 
} from '../components/common/Constants';

/**
 * Portfolio category configuration matching PortfolioMainPage structure
 * Defines the 6 main categories with visual styling and metadata
 */
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: 'all',
    name: 'All Work',
    description: 'Complete portfolio showcasing diverse makeup artistry',
    gradient: 'bg-gradient-pink-purple-blue',
  },
  {
    id: 'Festival Makeup',
    name: 'Festival',
    description: 'Vibrant festival artistry and celebration makeup',
    gradient: 'bg-gradient-blue-teal-green',
  },
  {
    id: 'UV Makeup',
    name: 'UV & Blacklight',
    description: 'Electric nightlife artistry with UV-reactive paints',
    gradient: 'bg-gradient-gold-peach-coral',
  },
  {
    id: 'Swiss Festivals',
    name: 'Swiss Festivals',
    description: 'Alpine festival experiences and mountain celebrations',
    gradient: 'bg-gradient-blue-teal-green',
  },
  {
    id: 'Fusion Nails',
    name: 'Fusion Nails',
    description: 'Creative nail artistry with vibrant designs',
    gradient: 'bg-gradient-pink-purple-blue',
  },
  {
    id: 'Thailand Adventures',
    name: 'Thailand',
    description: 'Tropical festival experiences and cultural immersion',
    gradient: 'bg-gradient-gold-peach-coral',
  },
];

/**
 * Image interface for consistent image handling
 */
export interface PortfolioImage {
  src: string;
  alt: string;
  caption: string;
  description: string;
}

/**
 * Portfolio category configuration
 */
export interface PortfolioCategory {
  id: string;
  name: string;
  description: string;
  gradient?: string; // Optional gradient class for UI
}

/**
 * Unified portfolio entry interface
 * Used by both homepage FeaturedSection and PortfolioMainPage
 */
export interface UnifiedPortfolioEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: PortfolioImage[];
  category: string; // Must match PORTFOLIO_CATEGORIES id
  featured?: boolean; // For homepage featured section
  displayOrder?: number; // For consistent ordering
  tags?: string[]; // For additional filtering
}

/**
 * Helper function to validate image URLs for browser compatibility
 * Updated to allow figma:asset/ URLs for imported Figma assets and filter out problematic entries
 */
function hasValidImageURLs(entry: any): boolean {
  const hasValidImages = entry.images && entry.images.length > 0 && 
    entry.images.some((img: any) => {
      if (!img.src) return false;
      // Allow https:// URLs and data URLs (known to work)
      if (img.src.startsWith('https://') || img.src.startsWith('data:')) {
        return true;
      }
      // For figma:asset/ URLs, only allow ones that are mapped in PortfolioImage.tsx
      if (img.src.startsWith('figma:asset/')) {
        // List of known working figma assets (should match PortfolioImage.tsx FIGMA_ASSET_MAP)
        const knownWorkingAssets = [
          'figma:asset/7afa71c7ec4457a1c1983db257703a6c92a9cce7.png',
          'figma:asset/1cd08d3825ac7cc423a4672f8ed279139fc99d0a.png',
          'figma:asset/3eb83eb2d4eb493b80283c1b75770d8893b2fc6a.png',
          'figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png',
          'figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png',
          'figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png',
          // Note: figma:asset/2fed1a57607a8fc1db766165f6ef2f1aad000d8f.png is missing and excluded
        ];
        return knownWorkingAssets.includes(img.src);
      }
      return false;
    });
  
  // Debug logging for development
  if (import.meta?.env?.DEV && !hasValidImages) {
    console.log(`🚫 Filtering out entry "${entry.title}" - invalid or unmapped figma:asset URLs:`, 
      entry.images?.map((img: any) => img.src) || 'No images'
    );
  }
  
  return hasValidImages;
}

/**
 * Comprehensive portfolio data combining all existing data sources
 * Properly categorized to match the 6 portfolio categories
 * Filters out entries with invalid figma:asset/ URLs for browser compatibility
 */
export const UNIFIED_PORTFOLIO_DATA: UnifiedPortfolioEntry[] = [
  // Featured entries with unique content not in Constants.ts
  {
    id: "nation-of-gondwana-festival",
    title: "Nation of Gondwana Festival",
    subtitle: "19 July 2025",
    description: "The Irish crew, having some UV fun with beautiful people. Electric festival artistry featuring vibrant rainbow streaks, creative UV designs, and glowing accents that celebrate connection and joy at one of the most vibrant festival experiences.",
    images: [
      {
        src: "figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png",
        alt: "Nation of Gondwana Festival - beautiful woman with rainbow UV face paint streaks and bright smile",
        caption: "Rainbow Festival Magic",
        description: "Stunning rainbow UV face streaks creating a vibrant festival look with infectious joy",
      },
      {
        src: "figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png",
        alt: "Nation of Gondwana Festival - redhead with UV dots under eyes and rainbow body paint",
        caption: "Electric UV Artistry", 
        description: "Creative UV dot patterns and rainbow accents perfect for festival nighttime glow",
      },
      {
        src: "figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png",
        alt: "Nation of Gondwana Festival - man with rainbow UV face paint and jellyfish ear accessory",
        caption: "Cosmic Festival Warrior",
        description: "Bold rainbow UV design with creative accessories celebrating festival spirit and artistic expression",
      },
    ],
    category: "Festival Makeup",
    featured: true,
    displayOrder: 1,
    tags: ["festival", "uv", "rainbow", "gondwana", "irish-crew", "electric", "july-2025"],
  },
  
  // UV Makeup Category
  {
    id: "electric-nights-uv",
    title: "Electric Nights",
    subtitle: "UV Blacklight Session 2024",
    description: "Mesmerizing UV-reactive artistry that transforms under blacklight, creating an otherworldly glow perfect for nightlife events.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1602494518965-195c6ec1c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMGJsYWNrbGlnaHQlMjBuZW9uJTIwZ2xvd3xlbnwxfHx8fDE3NTc2NjQ0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Electric Nights - UV reactive makeup glowing under blacklight",
        caption: "UV Glow",
        description: "Electric UV makeup creating stunning blacklight effects",
      },
      {
        src: "https://images.unsplash.com/photo-1609021622596-1883cb66e2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG93JTIwcGFpbnQlMjBibGFja2xpZ2h0JTIwbWFrZXVwfGVufDF8fHx8MTc1OTIzNzgxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Electric Nights - neon paint creating electric atmosphere",
        caption: "Neon Dreams",
        description: "Vibrant neon artistry perfect for underground club scenes",
      },
    ],
    category: "UV Makeup",
    featured: true,
    displayOrder: 4,
    tags: ["uv", "blacklight", "neon", "nightlife", "electric"],
  },

  // Switzerland/Swiss Festivals Category
  {
    id: "new-year-magic",
    title: "New Year Magic",
    subtitle: "Little Forest NYE 2023/2024",
    description: "Contemplative face art with golden and blue tones, welcoming the new year with peaceful forest energy.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1572176079325-8d8674afe124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMGVkaXRvcmlhbCUyMGZhbnRhc3l8ZW58MXx8fHwxNzU3NTkwMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "New Year Magic - golden and blue face art at Little Forest NYE 2023/2024",
        caption: "Peaceful Energy",
        description: "Contemplative face art with golden and blue tones",
      },
      {
        src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
        alt: "New Year Magic - celebratory moment with friends",
        caption: "Celebration",
        description: "Capturing the joy and connection of New Year's celebration",
      },
    ],
    category: "Swiss Festivals",
    featured: true,
    displayOrder: 5,
    tags: ["new-year", "golden", "blue", "peaceful", "celebration"],
  },

  // Fusion Nails Category
  {
    id: "galaxy-nails-fusion",
    title: "Galaxy Fusion",
    subtitle: "Cosmic Nail Art Collection",
    description: "Iridescent cosmic nail designs featuring galaxy effects, holographic finishes, and stellar color combinations.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwZ2FsYXh5JTIwaG9sb2dyYXBoaWN8ZW58MXx8fHwxNzU5MjM3ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Galaxy Fusion - cosmic nail art with iridescent effects",
        caption: "Cosmic Design",
        description: "Stellar nail art featuring galaxy effects and holographic finishes",
      },
      {
        src: "https://images.unsplash.com/photo-1594736797933-d0c6c8c3e0b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0JTIwbWV0YWxsaWMlMjBnbGl0dGVyfGVufDF8fHx8MTc1OTIzNzgzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Galaxy Fusion - metallic glitter nail design",
        caption: "Metallic Stars",
        description: "Shimmering metallic designs that catch light like distant stars",
      },
    ],
    category: "Fusion Nails",
    featured: true,
    displayOrder: 6,
    tags: ["nails", "galaxy", "cosmic", "holographic", "metallic"],
  },

  // Thailand Adventures Category  
  {
    id: "thailand-jungle-festival-adventures",
    title: "Jungle Festival Magic",
    subtitle: "Koh Phangan, Friday 26 September",
    description: "Tropical UV artistry in the heart of Thailand's jungle paradise, blending neon glow with natural island energy.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1533408944756-4950754f3ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjBmZXN0aXZhbCUyMG1ha2V1cCUyMFVWJTIwbmVvbnxlbnwxfHx8fDE3NTkyMzc4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - neon UV makeup glowing in tropical jungle setting",
        caption: "Jungle Glow",
        description: "Vibrant UV reactive makeup creating magical glow effects in the jungle paradise",
      },
      {
        src: "https://images.unsplash.com/photo-1611253291108-bca55a6dfadc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsfGVufDF8fHx8MTc1OTIzNzgxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - tropical face paint with nature-inspired designs",
        caption: "Tropical Artistry",
        description: "Nature-inspired tropical face paint celebrating the connection between art and jungle environment",
      },
    ],
    category: "Thailand Adventures",
    featured: true,
    displayOrder: 7,
    tags: ["thailand", "jungle", "tropical", "uv", "nature"],
  },

  // Add existing data from Constants.ts (converted to new format)
  // Note: Constants.ts data uses figma:asset/ paths that need to be properly imported
  // Filter out entries with invalid figma:asset/ URLs and set featured status appropriately
  ...THAILAND_WORK_DATA
    .filter(hasValidImageURLs)
    .map((entry, index) => ({
      ...entry,
      featured: entry.id === 'jungle-festival-koh-phangan', // Mark this as featured
      displayOrder: entry.id === 'jungle-festival-koh-phangan' ? 2 : 100 + index, // Featured items get lower order
    })),
  
  ...FESTIVAL_WORK_DATA
    .filter(hasValidImageURLs)
    .map((entry, index) => ({
      ...entry,
      featured: entry.id === 'forest-warrior', // Mark this as featured
      displayOrder: entry.id === 'forest-warrior' ? 3 : 200 + index, // Featured items get lower order
    })),
  
  ...SHANKRA_WORK_DATA
    .filter(hasValidImageURLs)
    .map((entry, index) => ({
      ...entry,
      featured: false, // No featured items in this dataset currently
      displayOrder: 300 + index,
    })),
  
  ...FEATURED_NAILS_DATA
    .filter(hasValidImageURLs)
    .map((entry, index) => ({
      ...entry,
      featured: index < 2, // Mark first 2 nails entries as featured
      displayOrder: index < 2 ? 10 + index : 400 + index, // Featured items get lower order
    })),
];

// Development analytics to verify data structure
if (import.meta?.env?.DEV) {
  console.log('📊 UNIFIED_PORTFOLIO_DATA Analytics:');
  console.log('  - Total entries:', UNIFIED_PORTFOLIO_DATA.length);
  console.log('  - Featured entries:', UNIFIED_PORTFOLIO_DATA.filter(e => e.featured === true).length);
  console.log('  - Categories breakdown:');
  
  const categoryCounts = UNIFIED_PORTFOLIO_DATA.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`    - ${category}: ${count} entries`);
  });
  
  console.log('  - Featured entries details:');
  UNIFIED_PORTFOLIO_DATA
    .filter(e => e.featured === true)
    .forEach(entry => {
      console.log(`    - "${entry.title}" (${entry.category}) - ${entry.images?.length || 0} images`);
    });
}

/**
 * Get portfolio entries filtered by category
 * 
 * @param categoryId - Category ID to filter by ('all' returns all entries)
 * @param featuredOnly - Whether to return only featured entries
 * @param limit - Maximum number of entries to return
 * @returns Filtered and sorted portfolio entries
 */
export function getPortfolioByCategory(
  categoryId: string = 'all',
  featuredOnly: boolean = false,
  limit?: number
): UnifiedPortfolioEntry[] {
  let filteredEntries = UNIFIED_PORTFOLIO_DATA;

  // Debug logging for development
  if (import.meta?.env?.DEV) {
    console.log('🔍 getPortfolioByCategory called:');
    console.log('  - categoryId:', categoryId);
    console.log('  - featuredOnly:', featuredOnly);
    console.log('  - limit:', limit);
    console.log('  - total entries in UNIFIED_PORTFOLIO_DATA:', UNIFIED_PORTFOLIO_DATA.length);
    console.log('  - entries with featured=true:', UNIFIED_PORTFOLIO_DATA.filter(e => e.featured === true).length);
  }

  // Filter by category
  if (categoryId !== 'all') {
    filteredEntries = filteredEntries.filter(entry => entry.category === categoryId);
    if (import.meta?.env?.DEV) {
      console.log('  - after category filter:', filteredEntries.length);
    }
  }

  // Filter by featured status
  if (featuredOnly) {
    filteredEntries = filteredEntries.filter(entry => entry.featured === true);
    if (import.meta?.env?.DEV) {
      console.log('  - after featured filter:', filteredEntries.length);
    }
  }

  // Sort by display order
  filteredEntries = filteredEntries.sort((a, b) => {
    const orderA = a.displayOrder || 999;
    const orderB = b.displayOrder || 999;
    return orderA - orderB;
  });

  // Apply limit if specified
  if (limit && limit > 0) {
    filteredEntries = filteredEntries.slice(0, limit);
    if (import.meta?.env?.DEV) {
      console.log('  - after limit applied:', filteredEntries.length);
    }
  }

  if (import.meta?.env?.DEV) {
    console.log('  - final filtered entries:', filteredEntries.map(e => ({ id: e.id, title: e.title, featured: e.featured })));
  }

  return filteredEntries;
}

/**
 * Get featured portfolio entries for homepage display
 * Returns the top 6 featured entries across all categories
 */
export function getFeaturedPortfolioEntries(limit: number = 6): UnifiedPortfolioEntry[] {
  const featuredEntries = getPortfolioByCategory('all', true, limit);
  
  // Debug logging to help troubleshoot featured entries
  if (import.meta?.env?.DEV) {
    console.log('🎯 getFeaturedPortfolioEntries called with limit:', limit);
    console.log('🎯 Total featured entries found:', featuredEntries.length);
    console.log('🎯 Featured entries:', featuredEntries.map(entry => ({
      id: entry.id,
      title: entry.title,
      featured: entry.featured,
      images: entry.images.length,
      firstImageSrc: entry.images[0]?.src?.substring(0, 100) + '...'
    })));
  }
  
  return featuredEntries;
}

/**
 * Get portfolio entry by ID
 * 
 * @param id - Portfolio entry ID
 * @returns Portfolio entry or undefined if not found
 */
export function getPortfolioEntryById(id: string): UnifiedPortfolioEntry | undefined {
  return UNIFIED_PORTFOLIO_DATA.find(entry => entry.id === id);
}

/**
 * Get portfolio categories for filtering UI
 * 
 * @returns Array of portfolio categories with metadata
 */
export function getPortfolioCategories() {
  return PORTFOLIO_CATEGORIES;
}

/**
 * Get portfolio statistics for analytics
 * 
 * @returns Portfolio statistics object
 */
export function getPortfolioStats() {
  const totalEntries = UNIFIED_PORTFOLIO_DATA.length;
  const featuredEntries = UNIFIED_PORTFOLIO_DATA.filter(entry => entry.featured).length;
  const categoryCounts = PORTFOLIO_CATEGORIES.reduce((acc, category) => {
    if (category.id === 'all') return acc;
    acc[category.id] = getPortfolioByCategory(category.id).length;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalEntries,
    featuredEntries,
    categoryCounts,
    categories: PORTFOLIO_CATEGORIES.length - 1, // Exclude 'all' category
  };
}