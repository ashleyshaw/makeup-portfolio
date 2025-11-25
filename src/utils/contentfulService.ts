/**
 * @fileoverview Contentful CMS integration service for Ash Shaw Portfolio
 * 
 * Provides comprehensive content management capabilities including:
 * - Portfolio entries with image galleries and metadata
 * - About page content sections with rich text
 * - Homepage hero content and featured work
 * - Dynamic content updates without code deployment
 * 
 * Core Features:
 * - TypeScript interfaces for type safety and IDE support
 * - Comprehensive error handling with user-friendly fallbacks
 * - Image optimization with Contentful's delivery API
 * - Rich text processing for formatted content
 * - Content preview support for draft/published states
 * - Performance optimized with caching and selective queries
 * 
 * Dependencies:
 * - contentful: Official Contentful JavaScript SDK
 * - Environment variables: CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN
 * 
 * Architecture:
 * - Service layer pattern with dedicated functions per content type
 * - Centralized error handling and logging
 * - Transform functions to normalize Contentful data
 * - TypeScript interfaces matching Contentful content models
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial Contentful integration
 * @lastModified 2025-01-17
 */

import { createClient, ContentfulApi, Entry, Asset } from 'contentful';
import { withEnhancedTimeout, contentfulBreaker, safeAsyncOperation } from './timeoutHandler';
import { 
  validateBlogPost, 
  validatePortfolioEntry, 
  validateAboutPage, 
  validateHomepage,
  batchValidate,
  type ValidationResult
} from './contentfulValidation';
import { 
  isPreviewEnabled, 
  getPreviewClient 
} from './contentfulPreview';

/**
 * Enhanced timeout wrapper for API calls with abort controller support
 * 
 * @param {Promise<T>} promise - The promise to wrap with timeout
 * @param {number} timeoutMs - Timeout in milliseconds (default: 8000)
 * @returns {Promise<T>} Promise that resolves or rejects within timeout
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 8000): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`API request timed out after ${timeoutMs}ms. This may be due to network issues or service unavailability.`));
    }, timeoutMs);
  });

  return Promise.race([
    promise.finally(() => {
      if (timeoutId) clearTimeout(timeoutId);
    }),
    timeoutPromise
  ]);
}

/**
 * Contentful client instance with error handling and configuration
 * Uses environment variables for secure credential management
 */
let contentfulClient: ContentfulApi | null = null;

/**
 * Initialize Contentful client with proper error handling and timeout protection
 * 
 * @returns {ContentfulApi | null} Configured Contentful client or null if initialization fails
 * 
 * @example
 * ```typescript
 * const client = initializeContentfulClient();
 * if (client) {
 *   const entries = await client.getEntries();
 * }
 * ```
 */
function initializeContentfulClient(): ContentfulApi | null {
  try {
    if (!contentfulClient) {
      // Safely access environment variables with fallbacks
      const envVars = import.meta?.env || {};
      const spaceId = envVars.VITE_CONTENTFUL_SPACE_ID;
      const accessToken = envVars.VITE_CONTENTFUL_ACCESS_TOKEN;

      if (!spaceId || !accessToken) {
        console.info('Contentful CMS: Environment variables not configured. Using static content fallback.');
        console.info('To enable dynamic content management, configure VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.');
        return null;
      }

      contentfulClient = createClient({
        space: spaceId,
        accessToken: accessToken,
        timeout: 8000, // 8 second timeout to prevent hanging requests
        retryLimit: 1, // Single retry to prevent endless loops
        retryOnFailure: true,
      });
    }
    return contentfulClient;
  } catch (error) {
    console.warn('Contentful CMS: Client initialization failed. Using static content fallback.');
    console.debug('Contentful initialization error details:', error);
    return null;
  }
}

/**
 * Portfolio entry interface matching Contentful content model
 * 
 * @interface PortfolioEntry
 * @description Defines structure for portfolio work entries with comprehensive metadata
 */
export interface PortfolioEntry {
  /** Unique identifier for the portfolio entry */
  id: string;
  /** Display title for the portfolio piece */
  title: string;
  /** Brief description or tagline for the work */
  description: string;
  /** Detailed description with rich text formatting */
  detailedDescription?: string;
  /** Category classification (festival, uv, editorial, etc.) */
  category: string;
  /** Array of high-resolution images for the gallery */
  images: ContentfulImage[];
  /** Featured/hero image for cards and previews */
  featuredImage: ContentfulImage;
  /** Tags for filtering and search functionality */
  tags: string[];
  /** Date when the work was created or published */
  createdDate: string;
  /** Whether this entry should be featured on homepage */
  featured: boolean;
  /** Display order for sorting entries */
  displayOrder: number;
  /** SEO metadata for better search visibility */
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

/**
 * Contentful image interface with optimization parameters
 * 
 * @interface ContentfulImage
 * @description Standardized image object with responsive and optimization support
 */
export interface ContentfulImage {
  /** Image URL with Contentful delivery optimization */
  url: string;
  /** Alt text for accessibility compliance */
  alt: string;
  /** Image title for enhanced user experience */
  title?: string;
  /** Original image width for responsive calculations */
  width: number;
  /** Original image height for responsive calculations */
  height: number;
  /** File size in bytes for performance monitoring */
  size?: number;
  /** File format (jpg, png, webp, etc.) */
  format?: string;
}

/**
 * About page content interface for CMS management
 * 
 * @interface AboutPageContent
 * @description Structured content for the about page with rich text support
 */
export interface AboutPageContent {
  /** Unique identifier for the about content */
  id: string;
  /** Hero section title and subtitle */
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image?: ContentfulImage;
  };
  /** Journey timeline sections */
  journey: {
    title: string;
    sections: Array<{
      year: string;
      title: string;
      description: string;
      image?: ContentfulImage;
    }>;
  };
  /** Services and specialties section */
  services: {
    title: string;
    description: string;
    serviceList: Array<{
      name: string;
      description: string;
      icon?: string;
    }>;
  };
  /** Personal philosophy and approach */
  philosophy: {
    title: string;
    content: string;
    quote?: string;
    image?: ContentfulImage;
  };
}

/**
 * Homepage content interface for dynamic hero management
 * 
 * @interface HomepageContent
 * @description Content structure for homepage hero and featured sections
 */
export interface HomepageContent {
  /** Unique identifier for homepage content */
  id: string;
  /** Hero section content */
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    backgroundImages: ContentfulImage[];
  };
  /** Featured work section */
  featured: {
    title: string;
    description: string;
    entries: PortfolioEntry[];
  };
  /** Why I do makeup section */
  philosophy: {
    title: string;
    cards: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

/**
 * Blog post content interface for CMS management
 * 
 * @interface BlogPost
 * @description Comprehensive blog post structure with rich content support
 */
export interface BlogPost {
  /** Unique identifier for the blog post */
  id: string;
  /** SEO-optimized post title */
  title: string;
  /** URL-friendly slug for routing */
  slug: string;
  /** Brief excerpt or summary for previews */
  excerpt: string;
  /** Full blog post content with rich text formatting */
  content: string;
  /** Featured image for social sharing and previews */
  featuredImage?: ContentfulImage;
  /** Post category for organization */
  category: string;
  /** Tags for filtering and related content */
  tags: string[];
  /** Author information */
  author: {
    name: string;
    bio?: string;
    avatar?: ContentfulImage;
  };
  /** Publication and update timestamps */
  publishedDate: string;
  updatedDate?: string;
  /** Whether post is published or draft */
  published: boolean;
  /** Reading time estimate in minutes */
  readingTime?: number;
  /** SEO metadata for better search visibility */
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    socialImage?: ContentfulImage;
  };
  /** Related posts for content discovery */
  relatedPosts?: BlogPost[];
}

/**
 * Blog listing interface for pagination and filtering
 * 
 * @interface BlogListingResponse
 * @description Response structure for blog post listings with pagination
 */
export interface BlogListingResponse {
  /** Array of blog posts for current page */
  posts: BlogPost[];
  /** Pagination metadata */
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  /** Available categories for filtering */
  categories: string[];
  /** Available tags for filtering */
  tags: string[];
}

/**
 * Transform Contentful asset to standardized image interface
 * 
 * @function transformContentfulImage
 * @param {Asset} asset - Contentful asset object
 * @returns {ContentfulImage} Normalized image object with optimization parameters
 * 
 * @example
 * ```typescript
 * const image = transformContentfulImage(contentfulAsset);
 * console.log(image.url); // Optimized image URL
 * ```
 */
function transformContentfulImage(asset: Asset): ContentfulImage {
  const file = asset.fields.file;
  const details = file?.details;
  
  return {
    url: `https:${file?.url}` || '',
    alt: asset.fields.description || asset.fields.title || 'Portfolio image',
    title: asset.fields.title || undefined,
    width: details?.image?.width || 800,
    height: details?.image?.height || 600,
    size: details?.size,
    format: file?.contentType?.split('/')[1],
  };
}

/**
 * Fetch all portfolio entries with optional filtering and sorting
 * 
 * @function getPortfolioEntries
 * @param {Object} options - Query options for filtering and sorting
 * @param {string} options.category - Filter by category (optional)
 * @param {string|string[]} options.tags - Filter by specific tags (optional)
 * @param {boolean} options.featuredOnly - Return only featured entries
 * @param {number} options.limit - Maximum number of entries to return
 * @returns {Promise<PortfolioEntry[]>} Array of portfolio entries
 * 
 * @throws {Error} When Contentful API request fails
 * 
 * @example
 * ```typescript
 * // Get all portfolio entries
 * const allEntries = await getPortfolioEntries();
 * 
 * // Get featured entries only
 * const featured = await getPortfolioEntries({ featuredOnly: true });
 * 
 * // Get festival category entries
 * const festival = await getPortfolioEntries({ category: 'festival' });
 * 
 * // Get entries by specific tags
 * const uvMakeup = await getPortfolioEntries({ tags: ['uv-makeup', 'blacklight'] });
 * 
 * // Get entries by multiple filters
 * const festivalUV = await getPortfolioEntries({ 
 *   category: 'festival', 
 *   tags: 'uv-reactive' 
 * });
 * ```
 */
export async function getPortfolioEntries(options: {
  category?: string;
  tags?: string | string[];
  featuredOnly?: boolean;
  limit?: number;
} = {}): Promise<PortfolioEntry[]> {
  try {
    const client = initializeContentfulClient();
    if (!client) {
      console.info('Contentful CMS: Using static portfolio data. Configure environment variables for dynamic content management.');
      return getStaticPortfolioData();
    }

    const query: any = {
      content_type: 'portfolioEntry',
      order: 'fields.displayOrder',
    };

    if (options.category) {
      query['fields.category'] = options.category;
    }

    if (options.tags) {
      // Handle both single tag string and array of tags
      const tags = Array.isArray(options.tags) ? options.tags : [options.tags];
      if (tags.length === 1) {
        query['fields.tags[in]'] = tags[0];
      } else {
        query['fields.tags[in]'] = tags.join(',');
      }
    }

    if (options.featuredOnly) {
      query['fields.featured'] = true;
    }

    if (options.limit) {
      query.limit = options.limit;
    }

    const response = await contentfulBreaker.execute(
      () => withEnhancedTimeout(client.getEntries(query), { 
        timeoutMs: 5000,
        maxRetries: 1,
        errorMessage: 'Portfolio entries request timed out'
      }),
      () => ({ items: [] as any[] }) // Fallback to empty array
    );
    
    // Validate entries before transformation
    if (import.meta?.env?.DEV && response.items.length > 0) {
      const validationResults = batchValidate(
        response.items, 
        validatePortfolioEntry,
        { logWarnings: true, contentType: 'portfolioEntry' }
      );
      
      if (validationResults.totalErrors > 0) {
        console.warn(`⚠️ Found ${validationResults.totalErrors} validation errors in ${validationResults.invalid.length} portfolio entries`);
      }
    }
    
    const entries = response.items.map((entry: Entry<any>) => ({
      id: entry.sys.id,
      title: entry.fields.title || '',
      description: entry.fields.description || '',
      detailedDescription: entry.fields.detailedDescription || '',
      category: entry.fields.category || 'general',
      images: (entry.fields.images || []).map(transformContentfulImage),
      featuredImage: entry.fields.featuredImage 
        ? transformContentfulImage(entry.fields.featuredImage)
        : { url: '', alt: '', width: 800, height: 600 },
      tags: entry.fields.tags || [],
      createdDate: entry.fields.createdDate || entry.sys.createdAt,
      featured: entry.fields.featured || false,
      displayOrder: entry.fields.displayOrder || 0,
      seo: entry.fields.seo || undefined,
    }));

    return entries;

  } catch (error) {
    console.error('Error fetching portfolio entries from Contentful:', error);
    return getStaticPortfolioData();
  }
}

/**
 * Fetch about page content from Contentful
 * 
 * @function getAboutPageContent
 * @returns {Promise<AboutPageContent>} About page content with rich text sections
 * 
 * @throws {Error} When Contentful API request fails
 * 
 * @example
 * ```typescript
 * const aboutContent = await getAboutPageContent();
 * console.log(aboutContent.hero.title); // "About Ash Shaw"
 * ```
 */
export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const client = initializeContentfulClient();
    if (!client) {
      console.info('Contentful CMS: Using static about data. Configure environment variables for dynamic content management.');
      return getStaticAboutData();
    }

    const response = await contentfulBreaker.execute(
      () => withEnhancedTimeout(client.getEntries({
        content_type: 'aboutPage',
        limit: 1,
      }), { 
        timeoutMs: 5000,
        maxRetries: 1,
        errorMessage: 'About page content request timed out'
      }),
      () => ({ items: [] as any[] }) // Fallback to empty array
    );

    if (response.items.length === 0) {
      throw new Error('About page content not found in Contentful');
    }

    const entry = response.items[0];
    const aboutContent: AboutPageContent = {
      id: entry.sys.id,
      hero: {
        title: entry.fields.heroTitle || 'About Ash Shaw',
        subtitle: entry.fields.heroSubtitle || 'Makeup Artist',
        description: entry.fields.heroDescription || '',
        image: entry.fields.heroImage ? transformContentfulImage(entry.fields.heroImage) : undefined,
      },
      journey: {
        title: entry.fields.journeyTitle || 'My Journey',
        sections: (entry.fields.journeySections || []).map((section: any) => ({
          year: section.fields.year || '',
          title: section.fields.title || '',
          description: section.fields.description || '',
          image: section.fields.image ? transformContentfulImage(section.fields.image) : undefined,
        })),
      },
      services: {
        title: entry.fields.servicesTitle || 'What I Do',
        description: entry.fields.servicesDescription || '',
        serviceList: (entry.fields.serviceList || []).map((service: any) => ({
          name: service.fields.name || '',
          description: service.fields.description || '',
          icon: service.fields.icon || '',
        })),
      },
      philosophy: {
        title: entry.fields.philosophyTitle || 'My Approach',
        content: entry.fields.philosophyContent || '',
        quote: entry.fields.philosophyQuote || '',
        image: entry.fields.philosophyImage ? transformContentfulImage(entry.fields.philosophyImage) : undefined,
      },
    };

    // Validate about content
    const validationResult = validateAboutPage(aboutContent);
    if (!validationResult.isValid) {
      console.warn('Invalid about page content:', validationResult.errors);
    }

    return aboutContent;

  } catch (error) {
    console.error('Error fetching about page content from Contentful:', error);
    return getStaticAboutData();
  }
}

/**
 * Fetch homepage content from Contentful
 * 
 * @function getHomepageContent
 * @returns {Promise<HomepageContent>} Homepage content with hero and featured sections
 * 
 * @throws {Error} When Contentful API request fails
 * 
 * @example
 * ```typescript
 * const homepageContent = await getHomepageContent();
 * console.log(homepageContent.hero.title); // Dynamic hero title
 * ```
 */
export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const client = initializeContentfulClient();
    if (!client) {
      console.info('Contentful CMS: Using static homepage data. Configure environment variables for dynamic content management.');
      return getStaticHomepageData();
    }

    const response = await contentfulBreaker.execute(
      () => withEnhancedTimeout(client.getEntries({
        content_type: 'homepage',
        limit: 1,
      }), { 
        timeoutMs: 5000,
        maxRetries: 1,
        errorMessage: 'Homepage content request timed out'
      }),
      () => ({ items: [] as any[] }) // Fallback to empty array
    );

    if (response.items.length === 0) {
      throw new Error('Homepage content not found in Contentful');
    }

    const entry = response.items[0];
    const featuredEntries = await getPortfolioEntries({ featuredOnly: true, limit: 6 });

    const homepageContent: HomepageContent = {
      id: entry.sys.id,
      hero: {
        title: entry.fields.heroTitle || "Hi, I'm Ash Shaw",
        subtitle: entry.fields.heroSubtitle || 'makeup artist',
        description: entry.fields.heroDescription || '',
        ctaText: entry.fields.heroCta || 'Explore My Portfolio',
        backgroundImages: (entry.fields.heroImages || []).map(transformContentfulImage),
      },
      featured: {
        title: entry.fields.featuredTitle || 'Featured Work',
        description: entry.fields.featuredDescription || '',
        entries: featuredEntries,
      },
      philosophy: {
        title: entry.fields.philosophyTitle || 'Why I Do Makeup',
        cards: (entry.fields.philosophyCards || []).map((card: any) => ({
          title: card.fields.title || '',
          description: card.fields.description || '',
          icon: card.fields.icon || '',
        })),
      },
    };

    // Validate homepage content
    const validationResult = validateHomepage(homepageContent);
    if (!validationResult.isValid) {
      console.warn('Invalid homepage content:', validationResult.errors);
    }

    return homepageContent;

  } catch (error) {
    console.error('Error fetching homepage content from Contentful:', error);
    return getStaticHomepageData();
  }
}

/**
 * Static fallback data for portfolio entries when Contentful is unavailable
 * 
 * @function getStaticPortfolioData
 * @returns {PortfolioEntry[]} Static portfolio entries for development/fallback
 * 
 * @private
 */
function getStaticPortfolioData(): PortfolioEntry[] {
  return [
    {
      id: 'static-1',
      title: 'Festival Artistry',
      description: 'Vibrant festival makeup with UV accents',
      category: 'festival',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
          alt: 'Festival makeup artistry',
          width: 800,
          height: 600,
        },
      ],
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
        alt: 'Festival makeup artistry',
        width: 800,
        height: 600,
      },
      tags: ['festival', 'uv', 'creative'],
      createdDate: '2024-01-15',
      featured: true,
      displayOrder: 1,
    },
    {
      id: 'static-2',
      title: 'UV Exploration',
      description: 'Experimental UV makeup for nightclub scenes',
      category: 'uv',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1594736797933-d0cc6eb3ccbb?w=800',
          alt: 'UV makeup exploration',
          width: 800,
          height: 600,
        },
      ],
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1594736797933-d0cc6eb3ccbb?w=800',
        alt: 'UV makeup exploration',
        width: 800,
        height: 600,
      },
      tags: ['uv', 'nightclub', 'experimental'],
      createdDate: '2024-01-10',
      featured: true,
      displayOrder: 2,
    },
  ];
}

/**
 * Static fallback data for about page when Contentful is unavailable
 * 
 * @function getStaticAboutData
 * @returns {AboutPageContent} Static about page content for development/fallback
 * 
 * @private
 */
function getStaticAboutData(): AboutPageContent {
  return {
    id: 'static-about',
    hero: {
      title: 'About Ash Shaw',
      subtitle: 'makeup artist',
      description: 'Passionate about creating bold, expressive makeup that celebrates individuality and artistic expression.',
    },
    journey: {
      title: 'My Journey',
      sections: [
        {
          year: '2019',
          title: 'Beginning the Journey',
          description: 'Started exploring makeup artistry with a focus on creative expression and festival culture.',
        },
        {
          year: '2021',
          title: 'UV Specialization',
          description: 'Developed expertise in UV-reactive makeup for Berlin nightclub scenes.',
        },
        {
          year: '2023',
          title: 'Professional Growth',
          description: 'Expanded into editorial work and launched Fusion Nails artistry.',
        },
      ],
    },
    services: {
      title: 'What I Do',
      description: 'Specialized makeup artistry services for unique experiences.',
      serviceList: [
        {
          name: 'Festival Makeup',
          description: 'Bold, creative looks for music festivals and events',
        },
        {
          name: 'UV Artistry',
          description: 'Specialized UV-reactive makeup for nightlife',
        },
        {
          name: 'Editorial Work',
          description: 'Professional makeup for photo shoots and publications',
        },
      ],
    },
    philosophy: {
      title: 'My Approach',
      content: 'Makeup is more than beauty—it\'s a form of artistic expression that connects people and celebrates individuality.',
      quote: 'Makeup that shines with colour, energy, and connection.',
    },
  };
}

/**
 * Static fallback data for homepage when Contentful is unavailable
 * 
 * @function getStaticHomepageData
 * @returns {HomepageContent} Static homepage content for development/fallback
 * 
 * @private
 */
function getStaticHomepageData(): HomepageContent {
  return {
    id: 'static-homepage',
    hero: {
      title: "Hi, I'm Ash Shaw",
      subtitle: 'makeup artist',
      description: 'Creating bold, expressive makeup that celebrates individuality.',
      ctaText: 'Explore My Portfolio',
      backgroundImages: [],
    },
    featured: {
      title: 'Featured Work',
      description: 'Explore my latest makeup artistry',
      entries: getStaticPortfolioData(),
    },
    philosophy: {
      title: 'Why I Do Makeup',
      cards: [
        {
          title: 'Creative Expression',
          description: 'Makeup as an art form for personal and artistic expression',
          icon: 'palette',
        },
        {
          title: 'Connection',
          description: 'Building confidence and connections through transformative artistry',
          icon: 'heart',
        },
        {
          title: 'Innovation',
          description: 'Pushing boundaries with new techniques and creative approaches',
          icon: 'lightbulb',
        },
      ],
    },
  };
}

/**
 * Get optimized image URL with Contentful delivery parameters
 * 
 * @function getOptimizedImageUrl
 * @param {string} baseUrl - Base Contentful image URL
 * @param {Object} options - Optimization parameters
 * @param {number} options.width - Target width
 * @param {number} options.height - Target height (optional)
 * @param {string} options.format - Image format (webp, jpg, png)
 * @param {number} options.quality - Image quality (1-100)
 * @returns {string} Optimized image URL with parameters
 * 
 * @example
 * ```typescript
 * const optimizedUrl = getOptimizedImageUrl(image.url, {
 *   width: 800,
 *   format: 'webp',
 *   quality: 85
 * });
 * ```
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  options: {
    width?: number;
    height?: number;
    format?: 'webp' | 'jpg' | 'png';
    quality?: number;
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
  } = {}
): string {
  if (!baseUrl || !baseUrl.includes('ctfassets.net')) {
    return baseUrl;
  }

  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.format) params.set('fm', options.format);
  if (options.quality) params.set('q', options.quality.toString());
  if (options.fit) params.set('fit', options.fit);

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${params.toString()}`;
}

/**
 * Fetch blog posts with optional filtering, sorting, and pagination
 * 
 * @function getBlogPosts
 * @param {Object} options - Query options for filtering, sorting, and pagination
 * @param {string} options.category - Filter by category (optional)
 * @param {string|string[]} options.tags - Filter by specific tags (optional)
 * @param {number} options.page - Page number for pagination (1-based)
 * @param {number} options.limit - Maximum number of posts per page
 * @param {string} options.sortBy - Sort field (publishedDate, title, updatedDate)
 * @param {string} options.sortOrder - Sort direction (asc, desc)
 * @param {boolean} options.publishedOnly - Return only published posts
 * @returns {Promise<BlogListingResponse>} Blog posts with pagination and metadata
 * 
 * @throws {Error} When Contentful API request fails
 * 
 * @example
 * ```typescript
 * // Get all published blog posts
 * const allPosts = await getBlogPosts();
 * 
 * // Get posts by category with pagination
 * const makeupTips = await getBlogPosts({ 
 *   category: 'makeup-tips',
 *   page: 1,
 *   limit: 6
 * });
 * 
 * // Get posts by tags
 * const festivalPosts = await getBlogPosts({ 
 *   tags: ['festival', 'tutorial'] 
 * });
 * 
 * // Get latest posts sorted by date
 * const latest = await getBlogPosts({
 *   sortBy: 'publishedDate',
 *   sortOrder: 'desc',
 *   limit: 3
 * });
 * ```
 */
export async function getBlogPosts(options: {
  category?: string;
  tags?: string | string[];
  page?: number;
  limit?: number;
  sortBy?: 'publishedDate' | 'title' | 'updatedDate';
  sortOrder?: 'asc' | 'desc';
  publishedOnly?: boolean;
} = {}): Promise<BlogListingResponse> {
  try {
    const client = initializeContentfulClient();
    if (!client) {
      console.info('Contentful CMS: Using static blog data. Configure environment variables for dynamic content management.');
      return getStaticBlogData(options);
    }

    // Set defaults
    const {
      page = 1,
      limit = 10,
      sortBy = 'publishedDate',
      sortOrder = 'desc',
      publishedOnly = true
    } = options;

    const query: any = {
      content_type: 'blogPost', // Using blogPost content type as defined in contentful-content-types.json
      order: sortOrder === 'desc' ? `-fields.${sortBy}` : `fields.${sortBy}`,
      skip: (page - 1) * limit,
      limit: limit,
      include: 2, // Include linked entries (author, related posts)
    };

    if (options.category) {
      query['fields.category'] = options.category;
    }

    if (options.tags) {
      const tags = Array.isArray(options.tags) ? options.tags : [options.tags];
      query['fields.tags[in]'] = tags.join(',');
    }

    if (publishedOnly) {
      query['fields.published'] = true;
    }

    // Get total count for pagination
    const totalResponse = await client.getEntries({
      ...query,
      limit: 0,
      select: 'sys.id'
    });

    // Get actual posts
    const response = await client.getEntries(query);

    // Transform posts
    const posts = response.items.map((entry: Entry<any>) => transformBlogPost(entry));

    // Get unique categories and tags for filtering UI
    const allPostsResponse = await client.getEntries({
      content_type: 'blogPost',
      'fields.published': true,
      select: 'fields.category,fields.tags'
    });

    const categories = [...new Set(
      allPostsResponse.items
        .map((item: any) => item.fields.category)
        .filter(Boolean)
    )];

    const tags = [...new Set(
      allPostsResponse.items
        .flatMap((item: any) => item.fields.tags || [])
        .filter(Boolean)
    )];

    // Validate posts
    const validationResults: ValidationResult[] = posts.map(validateBlogPost);
    const invalidPosts = validationResults.filter(result => !result.isValid);
    if (invalidPosts.length > 0) {
      console.warn('Invalid blog posts found:', invalidPosts);
    }

    return {
      posts,
      pagination: {
        total: totalResponse.total,
        page,
        limit,
        hasNext: (page * limit) < totalResponse.total,
        hasPrevious: page > 1,
      },
      categories,
      tags,
    };

  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    return getStaticBlogData(options);
  }
}

/**
 * Fetch a single blog post by slug
 * 
 * @function getBlogPostBySlug
 * @param {string} slug - URL-friendly post identifier
 * @returns {Promise<BlogPost | null>} Blog post or null if not found
 * 
 * @throws {Error} When Contentful API request fails
 * 
 * @example
 * ```typescript
 * const post = await getBlogPostBySlug('festival-makeup-guide-2024');
 * if (post) {
 *   console.log(post.title); // "Complete Festival Makeup Guide 2024"
 * }
 * ```
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const client = initializeContentfulClient();
    if (!client) {
      console.info('Contentful CMS: Using static blog data for slug lookup.');
      return getStaticBlogPostBySlug(slug);
    }

    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      'fields.published': true,
      include: 2,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    const post = transformBlogPost(response.items[0]);

    // Fetch related posts based on category and tags
    if (post.category || post.tags.length > 0) {
      const relatedResponse = await client.getEntries({
        content_type: 'blogPost',
        'fields.published': true,
        'sys.id[ne]': post.id, // Exclude current post
        ...(post.category && { 'fields.category': post.category }),
        limit: 3,
      });

      post.relatedPosts = relatedResponse.items.map((entry: Entry<any>) => transformBlogPost(entry));
    }

    // Validate post
    const validationResult = validateBlogPost(post);
    if (!validationResult.isValid) {
      console.warn('Invalid blog post:', validationResult.errors);
    }

    return post;

  } catch (error) {
    console.error('Error fetching blog post by slug from Contentful:', error);
    return getStaticBlogPostBySlug(slug);
  }
}

/**
 * Transform Contentful blog post entry to standardized interface
 * 
 * @function transformBlogPost
 * @param {Entry<any>} entry - Contentful blog post entry
 * @returns {BlogPost} Normalized blog post object
 * 
 * @private
 */
function transformBlogPost(entry: Entry<any>): BlogPost {
  // Handle linked author entry
  const authorEntry = entry.fields.author;
  const author = authorEntry ? {
    name: authorEntry.fields.name || 'Ash Shaw',
    bio: authorEntry.fields.bio || '',
    avatar: authorEntry.fields.avatar 
      ? transformContentfulImage(authorEntry.fields.avatar)
      : undefined,
  } : {
    name: 'Ash Shaw',
    bio: 'Professional makeup artist specializing in festival artistry and creative expression.',
    avatar: undefined,
  };

  // Process rich text content to HTML string
  let contentHtml = '';
  if (entry.fields.content) {
    // For rich text fields, we need to render them properly
    // This is a simplified approach - in production you might want to use @contentful/rich-text-html-renderer
    if (typeof entry.fields.content === 'object' && entry.fields.content.content) {
      // Rich text format - convert to basic HTML
      contentHtml = processRichTextContent(entry.fields.content);
    } else if (typeof entry.fields.content === 'string') {
      contentHtml = entry.fields.content;
    }
  }

  return {
    id: entry.sys.id,
    title: entry.fields.title || '',
    slug: entry.fields.slug || '',
    excerpt: entry.fields.excerpt || '',
    content: contentHtml,
    featuredImage: entry.fields.featuredImage 
      ? transformContentfulImage(entry.fields.featuredImage)
      : undefined,
    category: entry.fields.category || 'general',
    tags: entry.fields.tags || [],
    author,
    publishedDate: entry.fields.publishedDate || entry.sys.createdAt,
    updatedDate: entry.fields.updatedDate || entry.sys.updatedAt,
    published: entry.fields.published !== undefined ? entry.fields.published : false,
    readingTime: entry.fields.readingTime || calculateReadingTime(contentHtml),
    seo: entry.fields.seo ? {
      metaTitle: entry.fields.seo.metaTitle,
      metaDescription: entry.fields.seo.metaDescription,
      keywords: entry.fields.seo.keywords,
      socialImage: entry.fields.seo.socialImage 
        ? transformContentfulImage(entry.fields.seo.socialImage)
        : undefined,
    } : undefined,
  };
}

/**
 * Process Contentful rich text content to HTML string
 * 
 * @function processRichTextContent
 * @param {any} richTextDoc - Contentful rich text document
 * @returns {string} HTML string representation
 * 
 * @private
 */
function processRichTextContent(richTextDoc: any): string {
  if (!richTextDoc || !richTextDoc.content) {
    return '';
  }

  let html = '';
  
  function processNode(node: any): string {
    if (!node) return '';
    
    switch (node.nodeType) {
      case 'document':
        return node.content ? node.content.map(processNode).join('') : '';
      
      case 'paragraph':
        return `<p>${node.content ? node.content.map(processNode).join('') : ''}</p>`;
      
      case 'heading-1':
        return `<h1>${node.content ? node.content.map(processNode).join('') : ''}</h1>`;
      
      case 'heading-2':
        return `<h2>${node.content ? node.content.map(processNode).join('') : ''}</h2>`;
      
      case 'heading-3':
        return `<h3>${node.content ? node.content.map(processNode).join('') : ''}</h3>`;
      
      case 'unordered-list':
        return `<ul>${node.content ? node.content.map(processNode).join('') : ''}</ul>`;
      
      case 'ordered-list':
        return `<ol>${node.content ? node.content.map(processNode).join('') : ''}</ol>`;
      
      case 'list-item':
        return `<li>${node.content ? node.content.map(processNode).join('') : ''}</li>`;
      
      case 'blockquote':
        return `<blockquote>${node.content ? node.content.map(processNode).join('') : ''}</blockquote>`;
      
      case 'hr':
        return '<hr>';
      
      case 'text':
        let text = node.value || '';
        if (node.marks) {
          node.marks.forEach((mark: any) => {
            switch (mark.type) {
              case 'bold':
                text = `<strong>${text}</strong>`;
                break;
              case 'italic':
                text = `<em>${text}</em>`;
                break;
              case 'underline':
                text = `<u>${text}</u>`;
                break;
              case 'code':
                text = `<code>${text}</code>`;
                break;
            }
          });
        }
        return text;
      
      case 'hyperlink':
        const url = node.data?.uri || '#';
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${node.content ? node.content.map(processNode).join('') : ''}</a>`;
      
      default:
        return node.content ? node.content.map(processNode).join('') : '';
    }
  }
  
  return processNode(richTextDoc);
}

/**
 * Calculate estimated reading time based on content length
 * 
 * @function calculateReadingTime
 * @param {string} content - Blog post content
 * @returns {number} Estimated reading time in minutes
 * 
 * @private
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  // Strip HTML tags for accurate word count
  const textContent = content.replace(/<[^>]*>/g, ' ');
  const wordCount = textContent.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Static fallback data for blog posts when Contentful is unavailable
 * 
 * @function getStaticBlogData
 * @param {Object} options - Query options for filtering
 * @returns {BlogListingResponse} Static blog posts for development/fallback
 * 
 * @private
 */
function getStaticBlogData(options: any = {}): BlogListingResponse {
  const staticPosts: BlogPost[] = [
    {
      id: 'static-blog-1',
      title: 'Festival Makeup: A Complete Guide for 2024',
      slug: 'festival-makeup-guide-2024',
      excerpt: 'Everything you need to know about creating stunning festival makeup looks that last all day and glow under UV lights.',
      content: `<h1>Festival Makeup: A Complete Guide for 2024</h1>

<p>Festival season is here, and it's time to let your creativity shine! This comprehensive guide will walk you through everything you need to create stunning, long-lasting makeup looks that will make you stand out in the crowd.</p>

<h2>Essential Products for Festival Makeup</h2>

<p>When it comes to festival makeup, longevity and vibrancy are key. Here are my must-have products:</p>

<ul>
<li><strong>UV-reactive pigments</strong> for that magical glow under blacklights</li>
<li><strong>Setting spray</strong> to lock in your look for hours of dancing</li>
<li><strong>Waterproof everything</strong> because sweat and tears of joy are inevitable</li>
<li><strong>Bold glitter</strong> for that extra sparkle factor</li>
</ul>

<h2>Step-by-Step Tutorial</h2>

<ol>
<li><strong>Prime your canvas</strong> - Start with a good primer to ensure your makeup stays put</li>
<li><strong>Build your base</strong> - Use a long-wearing foundation that can handle heat and humidity</li>
<li><strong>Add the magic</strong> - This is where UV pigments and bold colors come into play</li>
<li><strong>Seal the deal</strong> - Finish with setting spray and you're ready to dance!</li>
</ol>

<p>Remember, festival makeup is all about self-expression and having fun. Don't be afraid to experiment with bold colors and unconventional techniques!</p>

<blockquote>
<p>"The best festival makeup look is the one that makes you feel confident and expresses your unique personality." - Ash Shaw</p>
</blockquote>`,
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
        alt: 'Festival makeup tutorial featuring vibrant colors and UV elements',
        width: 800,
        height: 600,
      },
      category: 'tutorials',
      tags: ['festival', 'uv-makeup', 'tutorial', 'beginner-friendly'],
      author: {
        name: 'Ash Shaw',
        bio: 'Professional makeup artist specializing in festival artistry and UV-reactive makeup.',
      },
      publishedDate: '2024-03-15T10:00:00Z',
      published: true,
      readingTime: 5,
    },
    {
      id: 'static-blog-2',
      title: 'Behind the Scenes: Berlin Nightclub Makeup',
      slug: 'berlin-nightclub-makeup-behind-scenes',
      excerpt: 'Take a peek behind the curtain of Berlin\'s vibrant nightclub scene and discover the artistry that goes into creating unforgettable looks.',
      content: `<h1>Behind the Scenes: Berlin Nightclub Makeup</h1>

<p>Berlin's nightclub scene is legendary, and the makeup artistry that goes along with it is equally spectacular. As someone who's spent countless nights creating looks for Berlin's most iconic venues, I want to share some insights into this fascinating world.</p>

<h2>The Art of UV Makeup</h2>

<p>Working in Berlin's clubs has taught me that makeup under UV light is a completely different art form. What looks subtle in regular light can become absolutely stunning under blacklight.</p>

<h2>Key Techniques I've Learned</h2>

<ul>
<li><strong>Layering UV pigments</strong> for maximum impact</li>
<li><strong>Using contrast</strong> to create dramatic effects</li>
<li><strong>Understanding skin undertones</strong> in UV light</li>
<li><strong>Creating looks that photograph well</strong> in club lighting</li>
</ul>

<p>The energy of Berlin's nightlife is infectious, and it pushes you to be more creative and bold with your artistry. Every night brings new challenges and opportunities to experiment.</p>

<blockquote>
<p>"In Berlin's clubs, you learn that makeup is not just about beauty - it's about transformation and self-expression in its purest form."</p>
</blockquote>`,
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1594736797933-d0cc6eb3ccbb?w=800',
        alt: 'UV makeup glowing under blacklight in Berlin nightclub setting',
        width: 800,
        height: 600,
      },
      category: 'behind-the-scenes',
      tags: ['berlin', 'nightclub', 'uv-makeup', 'professional'],
      author: {
        name: 'Ash Shaw',
        bio: 'Professional makeup artist specializing in festival artistry and UV-reactive makeup.',
      },
      publishedDate: '2024-02-28T14:30:00Z',
      published: true,
      readingTime: 3,
    },
    {
      id: 'static-blog-3',
      title: 'The Evolution of My Artistic Journey',
      slug: 'evolution-artistic-journey',
      excerpt: 'From my first makeup brush to becoming a recognized artist in the festival scene - here\'s how my passion for makeup artistry has evolved.',
      content: `<h1>The Evolution of My Artistic Journey</h1>

<p>Starting out in makeup artistry can feel overwhelming, but every expert was once a beginner. Here's my story of how I went from experimenting with basic makeup to specializing in festival and UV artistry.</p>

<h2>The Beginning (2019)</h2>

<p>My journey started with a simple fascination with color and transformation. I remember my first attempt at festival makeup - it was far from perfect, but it sparked something in me that I couldn't ignore.</p>

<h2>Finding My Niche (2020-2021)</h2>

<p>It wasn't until I discovered UV-reactive makeup that I truly found my calling. The way colors transform under blacklight felt like magic, and I knew I had to master this technique.</p>

<h2>Professional Growth (2022-2024)</h2>

<p>Working in Berlin's nightclub scene taught me so much about working under pressure, adapting to different lighting conditions, and most importantly, reading my clients and understanding what they wanted to express through their makeup.</p>

<h2>What's Next</h2>

<p>The journey never really ends. I'm constantly learning, experimenting, and pushing the boundaries of what's possible with makeup artistry.</p>

<blockquote>
<p>"Every makeup look is a story waiting to be told. My role is to help people tell their story through color, texture, and creativity."</p>
</blockquote>`,
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
        alt: 'Makeup brushes and colorful pigments arranged artistically',
        width: 800,
        height: 600,
      },
      category: 'personal',
      tags: ['journey', 'inspiration', 'growth', 'personal-story'],
      author: {
        name: 'Ash Shaw',
        bio: 'Professional makeup artist specializing in festival artistry and UV-reactive makeup.',
      },
      publishedDate: '2024-01-20T09:00:00Z',
      published: true,
      readingTime: 4,
    },
    {
      id: 'static-blog-4',
      title: 'Fusion Nails: Where Art Meets Beauty',
      slug: 'fusion-nails-art-meets-beauty',
      excerpt: 'Discover the exciting world of Fusion Nails - where traditional nail art meets modern techniques to create stunning, wearable masterpieces.',
      content: `<h1>Fusion Nails: Where Art Meets Beauty</h1>

<p>Fusion Nails represents the perfect marriage between traditional nail artistry and contemporary techniques. It's about creating pieces that are not just beautiful, but tell a story and express personality.</p>

<h2>What Makes Fusion Nails Special</h2>

<p>Unlike traditional nail art, Fusion Nails combines multiple techniques and materials to create truly unique pieces:</p>

<ul>
<li><strong>Mixed media applications</strong> incorporating various textures</li>
<li><strong>Color theory</strong> to create harmonious gradients</li>
<li><strong>3D elements</strong> for added dimension and interest</li>
<li><strong>UV-reactive components</strong> for dynamic lighting effects</li>
</ul>

<h2>My Creative Process</h2>

<p>Every Fusion Nails creation starts with understanding the client's personality and lifestyle. From there, I develop a concept that reflects their unique style while pushing creative boundaries.</p>

<blockquote>
<p>"Nails are a canvas, and every canvas deserves a masterpiece that reflects the person wearing it."</p>
</blockquote>`,
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800',
        alt: 'Artistic nail design with colorful gradients and intricate details',
        width: 800,
        height: 600,
      },
      category: 'nail-art',
      tags: ['fusion-nails', 'nail-art', 'creative', 'technique'],
      author: {
        name: 'Ash Shaw',
        bio: 'Professional makeup artist specializing in festival artistry and UV-reactive makeup.',
      },
      publishedDate: '2024-01-10T11:00:00Z',
      published: true,
      readingTime: 3,
    },
    {
      id: 'static-blog-5',
      title: 'UV Makeup Tips for Photography',
      slug: 'uv-makeup-photography-tips',
      excerpt: 'Learn how to create UV makeup looks that not only glow under blacklight but also photograph beautifully for social media and professional shoots.',
      content: `<h1>UV Makeup Tips for Photography</h1>

<p>Creating UV makeup looks that photograph well requires understanding both the properties of UV-reactive pigments and how cameras capture these unique colors.</p>

<h2>Understanding UV Photography</h2>

<p>Photographing UV makeup presents unique challenges and opportunities. The key is balancing the dramatic glow effect with colors that translate well in photos.</p>

<h2>Essential Photography Tips</h2>

<ol>
<li><strong>Use proper lighting</strong> - UV lights for the glow, white lights for color accuracy</li>
<li><strong>Adjust camera settings</strong> - Higher ISO and proper white balance are crucial</li>
<li><strong>Layer your pigments</strong> - This creates depth that shows up beautifully in photos</li>
<li><strong>Consider the background</strong> - Dark backgrounds make UV makeup pop</li>
</ol>

<h2>Post-Processing Tips</h2>

<p>Editing UV makeup photos requires a gentle touch. The goal is to enhance the natural glow without over-saturating the colors.</p>

<blockquote>
<p>"Great UV makeup photography captures not just the glow, but the emotion and artistry behind the look."</p>
</blockquote>`,
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800',
        alt: 'Professional photography setup for UV makeup with blacklights',
        width: 800,
        height: 600,
      },
      category: 'tips-and-tricks',
      tags: ['uv-makeup', 'photography', 'social-media', 'professional'],
      author: {
        name: 'Ash Shaw',
        bio: 'Professional makeup artist specializing in festival artistry and UV-reactive makeup.',
      },
      publishedDate: '2023-12-20T16:00:00Z',
      published: true,
      readingTime: 6,
    },
    {
      id: 'static-blog-6',
      title: 'Building Your Makeup Kit: Festival Essentials',
      slug: 'building-makeup-kit-festival-essentials',
      excerpt: 'A comprehensive guide to building the perfect makeup kit for festivals, including must-have products, tools, and storage solutions.',
      content: `<h1>Building Your Makeup Kit: Festival Essentials</h1>

<p>Whether you're a makeup artist or someone who loves creating festival looks, having the right kit is essential. Here's everything you need to know about building a comprehensive festival makeup arsenal.</p>

<h2>Must-Have Products</h2>

<h3>Base Products</h3>
<ul>
<li><strong>Long-wearing primer</strong> - The foundation of any good festival look</li>
<li><strong>Waterproof foundation</strong> - Because sweat happens</li>
<li><strong>Setting powder</strong> - To lock everything in place</li>
</ul>

<h3>Color Products</h3>
<ul>
<li><strong>UV-reactive pigments</strong> - The star of festival makeup</li>
<li><strong>Highly pigmented eyeshadows</strong> - For vibrant, long-lasting color</li>
<li><strong>Body paints</strong> - For larger artistic applications</li>
</ul>

<h2>Essential Tools</h2>

<p>Having the right tools is just as important as having quality products:</p>

<ul>
<li><strong>Dense packing brushes</strong> - For applying pigments</li>
<li><strong>Blending brushes</strong> - For seamless color transitions</li>
<li><strong>Detail brushes</strong> - For intricate work and precision</li>
<li><strong>Beauty sponges</strong> - For blending and base application</li>
</ul>

<blockquote>
<p>"A well-organized kit is a makeup artist's best friend - it saves time and ensures you never miss a creative opportunity."</p>
</blockquote>`,
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        alt: 'Professional makeup kit with colorful pigments and brushes',
        width: 800,
        height: 600,
      },
      category: 'product-reviews',
      tags: ['makeup-kit', 'festival', 'tools', 'beginner-guide'],
      author: {
        name: 'Ash Shaw',
        bio: 'Professional makeup artist specializing in festival artistry and UV-reactive makeup.',
      },
      publishedDate: '2023-11-15T12:00:00Z',
      published: true,
      readingTime: 8,
    },
  ];

  // Apply basic filtering
  let filteredPosts = staticPosts;
  
  if (options.category) {
    filteredPosts = filteredPosts.filter(post => post.category === options.category);
  }
  
  if (options.tags) {
    const tags = Array.isArray(options.tags) ? options.tags : [options.tags];
    filteredPosts = filteredPosts.filter(post => 
      tags.some(tag => post.tags.includes(tag))
    );
  }

  // Apply pagination
  const page = options.page || 1;
  const limit = options.limit || 10;
  const start = (page - 1) * limit;
  const paginatedPosts = filteredPosts.slice(start, start + limit);

  // Extract categories and tags
  const categories = [...new Set(staticPosts.map(post => post.category))];
  const tags = [...new Set(staticPosts.flatMap(post => post.tags))];

  return {
    posts: paginatedPosts,
    pagination: {
      total: filteredPosts.length,
      page,
      limit,
      hasNext: start + limit < filteredPosts.length,
      hasPrevious: page > 1,
    },
    categories,
    tags,
  };
}

/**
 * Get static blog post by slug for fallback
 * 
 * @function getStaticBlogPostBySlug
 * @param {string} slug - Post slug to find
 * @returns {BlogPost | null} Found post or null
 * 
 * @private
 */
function getStaticBlogPostBySlug(slug: string): BlogPost | null {
  const staticData = getStaticBlogData();
  return staticData.posts.find(post => post.slug === slug) || null;
}

/**
 * Preload critical content for performance optimization
 * 
 * @function preloadCriticalContent
 * @returns {Promise<void>} Resolves when critical content is preloaded
 * 
 * @example
 * ```typescript
 * // Preload critical content on app initialization
 * await preloadCriticalContent();
 * ```
 */
export async function preloadCriticalContent(): Promise<void> {
  try {
    // Preload homepage content and featured portfolio entries
    const [homepageContent, featuredEntries] = await Promise.all([
      getHomepageContent(),
      getPortfolioEntries({ featuredOnly: true, limit: 6 }),
    ]);

    console.log('Critical content preloaded successfully');
  } catch (error) {
    console.warn('Failed to preload critical content:', error);
  }
}