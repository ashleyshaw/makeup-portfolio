/**
 * @fileoverview Constants and data for Ash Shaw Makeup Portfolio
 * Centralized storage for social media links, portfolio data, and content metadata
 * following DRY principles and maintainable code organization.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

// Import homepage hero images
import heroImage1 from "figma:asset/f4a28f747d49fc9d37311b17f513b62e2b95a73e.png";
import heroImage2 from "figma:asset/378acbf4a7518ca6c40b44540bd7a121a91375fe.png";
import heroImage3 from "figma:asset/e82a7d901c5a28bf9313c7535228e647eaf06b75.png";

/**
 * Social media platform configuration with URLs and metadata
 * Used by SocialLinks component for consistent platform representation
 *
 * @constant {Array<SocialLinkData>} SOCIAL_LINKS
 * @property {string} platform - Platform name for identification and styling
 * @property {string} url - Complete URL for social media profile or contact
 * @property {string} icon - Icon identifier for visual representation
 */
export const SOCIAL_LINKS = [
  {
    platform: "Instagram",
    url: "https://instagram.com/feedmymedia",
    icon: "instagram",
  },
  {
    platform: "Facebook",
    url: "https://facebook.com/ash.shaw/",
    icon: "facebook",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ashshaw/",
    icon: "linkedin",
  },
  {
    platform: "Email",
    url: "mailto:ashley@ashshaw.makeup",
    icon: "email",
  },
];

/**
 * Homepage hero mosaic images for the main hero section
 * Curated selection of 3 key images that represent Ash Shaw's artistry
 * These images are displayed exclusively on the homepage hero mosaic
 *
 * @constant {Array<HeroImage>} HOMEPAGE_HERO_IMAGES
 * @property {string} src - Figma asset path for optimized image loading
 * @property {string} alt - Descriptive alt text for accessibility
 * @property {string} caption - Short caption for lightbox display
 * @property {string} description - Detailed description for lightbox and screen readers
 * @property {string} className - Positioning and styling classes for mosaic layout
 */
export const HOMEPAGE_HERO_IMAGES = [
  {
    src: heroImage1,
    alt: "Close-up artistic eye makeup with vibrant purple stripe, red metallic lashes and colorful crystal gems",
    caption: "Festival Eye Art",
    description:
      "Intricate eye makeup featuring a bold purple stripe design, metallic red lashes, and decorative crystal gems showcasing precision and creativity in festival artistry",
    className:
      "absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-pink-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: heroImage2,
    alt: "Joyful festival participant with rainbow heart body paint on chest, smiling radiantly in colorful festival environment",
    caption: "Rainbow Heart Love",
    description:
      "Beautiful expression of festival joy and connection with rainbow heart body art, capturing the loving and inclusive spirit of festival culture and community celebration",
    className:
      "absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-purple-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: heroImage3,
    alt: "Portrait of person with blonde hair and colorful face paint featuring blue and pink stripes in outdoor festival setting",
    caption: "Vibrant Face Art",
    description:
      "Striking portrait showcasing colorful face paint with blue and pink geometric stripes, demonstrating bold artistic expression and the transformative power of festival makeup",
    className:
      "absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-blue-200/50 cursor-pointer transition-transform hover:scale-105",
  },
];

/**
 * About page hero mosaic images
 * Curated selection of 3 images that represent Ash Shaw's journey and artistic evolution
 * These images are displayed exclusively on the About page hero section
 *
 * @constant {Array<HeroImage>} ABOUT_HERO_IMAGES
 * @property {string} src - Image URL from Unsplash
 * @property {string} alt - Descriptive alt text for accessibility
 * @property {string} caption - Short caption for lightbox display
 * @property {string} description - Detailed description for lightbox and screen readers
 * @property {string} className - Positioning and styling classes for mosaic layout
 */
export const ABOUT_HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1729599102515-710a4dd83637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMHBvcnRyYWl0JTIwY3JlYXRpdmUlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTc2NjQ0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Artistic makeup portrait with creative festival styling showcasing Ash Shaw's artistic evolution",
    caption: "Creative Evolution",
    description:
      "A portrait that captures the artistic journey and creative evolution that defines Ash Shaw's makeup artistry approach",
    className:
      "absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-orange-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1576135711730-51049b41de78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBtYWtldXAlMjBhcnQlMjBjb2xvcmZ1bCUyMGZhY2UlMjBwYWludHxlbnwxfHx8fDE3NTc2NjQ0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Beautiful artistic makeup with colorful face paint representing creative self-expression",
    caption: "Self Expression",
    description:
      "Colorful artistic makeup that embodies the spirit of creative self-expression and the joy of transformation through makeup artistry",
    className:
      "absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-emerald-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1601742162870-46790bce3120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGV5ZSUyMG1ha2V1cCUyMGFydCUyMG5lb24lMjBjb2xvcnN8ZW58MXx8fHwxNzU3NjY0NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Creative eye makeup art with vibrant neon colors showcasing technical mastery",
    caption: "Technical Mastery",
    description:
      "Intricate eye makeup art with neon colors demonstrating the technical mastery and precision that defines professional makeup artistry",
    className:
      "absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-teal-200/50 cursor-pointer transition-transform hover:scale-105",
  },
];

/**
 * Portfolio page hero mosaic images
 * Curated selection of 3 images that showcase the breadth of portfolio work
 * These images are displayed exclusively on the Portfolio page hero section
 *
 * @constant {Array<HeroImage>} PORTFOLIO_HERO_IMAGES
 * @property {string} src - Image URL from Unsplash
 * @property {string} alt - Descriptive alt text for accessibility
 * @property {string} caption - Short caption for lightbox display
 * @property {string} description - Detailed description for lightbox and screen readers
 * @property {string} className - Positioning and styling classes for mosaic layout
 */
export const PORTFOLIO_HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1747121445324-8ed1aec4b451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBwb3J0Zm9saW8lMjBjcmVhdGl2ZSUyMHdvcmt8ZW58MXx8fHwxNzU3NjY0NDgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Professional makeup artist portfolio work showcasing creative and artistic styling",
    caption: "Portfolio Excellence",
    description:
      "Professional portfolio work that demonstrates the range and excellence of Ash Shaw's makeup artistry across different styles and occasions",
    className:
      "absolute top-6 left-4 sm:top-12 sm:left-8 w-48 h-56 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl bg-cover bg-center shadow-2xl transform rotate-3 z-20 border-4 border-white ring-4 ring-violet-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1713857973896-1d04d1e3e1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMHJhaW5ib3clMjBhcnRpc3RpY3xlbnwxfHx8fDE3NTc2NjQ0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Festival face paint with rainbow artistic design representing diverse portfolio offerings",
    caption: "Festival Artistry",
    description:
      "Vibrant festival face painting with rainbow artistic elements that showcase the diverse and colorful portfolio of makeup styles and techniques",
    className:
      "absolute top-0 right-0 w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl bg-cover bg-center shadow-xl transform -rotate-6 z-10 border-4 border-white ring-4 ring-rose-200/50 cursor-pointer transition-transform hover:scale-105",
  },
  {
    src: "https://images.unsplash.com/photo-1602494518965-195c6ec1c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMGJsYWNrbGlnaHQlMjBuZW9uJTIwZ2xvd3xlbnwxfHx8fDE3NTc2NjQ0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "UV reactive makeup glowing under blacklight showcasing specialized portfolio techniques",
    caption: "UV Specialization",
    description:
      "Specialized UV reactive makeup that glows under blacklight, demonstrating advanced techniques and specialized skills in the makeup portfolio",
    className:
      "absolute bottom-0 left-0 w-36 h-40 sm:w-60 sm:h-64 md:w-68 md:h-72 rounded-2xl bg-cover bg-center shadow-xl transform rotate-12 z-10 border-4 border-white ring-4 ring-cyan-200/50 cursor-pointer transition-transform hover:scale-105",
  },
];

/**
 * NOTE: Featured work data has been moved to the unified portfolio service
 * @see /utils/portfolioService.ts for the complete unified portfolio system
 * 
 * This ensures consistency between homepage FeaturedSection and PortfolioMainPage.
 * Both components now use the same data source and category system.
 */

/**
 * Featured nail art data for homepage Fusion Nails section
 * Showcases the breadth of nail artistry beyond traditional makeup
 *
 * @constant {Array<NailArtItem>} FEATURED_NAILS_DATA
 * @property {string} image - Figma asset path for nail art photography
 * @property {string} title - Creative name capturing the design aesthetic
 * @property {string} description - Style and technique description
 */
export const FEATURED_NAILS_DATA = [
  {
    id: "nails-neon-pop",
    title: "Neon Pop",
    description:
      "Vibrant red and green festival vibes with metallic accents",
    images: [
      {
        src: "https://images.unsplash.com/photo-1701626772688-909f2a0712bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbmFpbCUyMGFydCUyMHZpYnJhbnQlMjBjb2xvcnN8ZW58MXx8fHwxNzU5Mjk3MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Neon Pop nails - vibrant red and green with metallic accents",
        caption: "Neon Pop",
        description: "Bold festival-inspired nail art",
      },
      {
        src: "https://images.unsplash.com/photo-1678329190070-2c98fb9c0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMG5haWwlMjBkZXNpZ24lMjBtZXRhbGxpY3xlbnwxfHx8fDE3NTkyOTcxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Neon Pop nails - alternative view showing texture",
        caption: "Metallic Details",
        description:
          "Close-up of the metallic texture and finish",
      },
    ],
    category: "Fusion Nails",
  },
  {
    id: "nails-gradient-dreams",
    title: "Gradient Dreams",
    description: "Purple to green ombre with metallic finish",
    images: [
      {
        src: "https://images.unsplash.com/photo-1678329190070-2c98fb9c0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMG5haWwlMjBkZXNpZ24lMjBtZXRhbGxpY3xlbnwxfHx8fDE3NTkyOTcxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Gradient Dreams nails - purple to green ombre with metallic finish",
        caption: "Gradient Dreams",
        description:
          "Smooth color transition with metallic topcoat",
      },
      {
        src: "https://images.unsplash.com/photo-1590926918555-c058b85940d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBuYWlsJTIwYXJ0JTIwaXJpZGVzY2VudCUyMHNoaW1tZXJ8ZW58MXx8fHwxNzU5Mjk3MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Gradient Dreams nails - showing different lighting",
        caption: "Color Shift",
        description:
          "How the gradient changes in different lighting",
      },
    ],
    category: "Fusion Nails",
  },
  {
    id: "nails-galaxy",
    title: "Galaxy Nails",
    description:
      "Iridescent blues and greens with cosmic shimmer",
    images: [
      {
        src: "https://images.unsplash.com/photo-1590926918555-c058b85940d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBuYWlsJTIwYXJ0JTIwaXJpZGVzY2VudCUyMHNoaW1tZXJ8ZW58MXx8fHwxNzU5Mjk3MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Galaxy Nails - iridescent blues and greens with cosmic shimmer",
        caption: "Galaxy Nails",
        description:
          "Cosmic-inspired design with iridescent finish",
      },
      {
        src: "https://images.unsplash.com/photo-1701626772688-909f2a0712bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbmFpbCUyMGFydCUyMHZpYnJhbnQlMjBjb2xvcnN8ZW58MXx8fHwxNzU5Mjk3MTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Galaxy Nails - detail of shimmer effect",
        caption: "Cosmic Shimmer",
        description:
          "Detail view of the iridescent shimmer effect",
      },
    ],
    category: "Fusion Nails",
  },
];

/**
 * Thailand portfolio collection capturing tropical festival experiences
 * Documents makeup artistry during Southeast Asian travel and cultural immersion
 *
 * @constant {Array<PortfolioItem>} THAILAND_WORK_DATA
 * @property {string} image - Figma asset path for Thailand work photography
 * @property {string} title - Descriptive title reflecting the experience
 * @property {string} location - Specific Thailand location or event context
 * @property {string} description - Personal stories and artistic details
 */
export const THAILAND_WORK_DATA = [
  {
    id: "lost-paradise",
    title: "Lost Paradise",
    subtitle: "Thailand",
    description:
      "My dear friend Gabi & sista from another mista!",
    images: [
      {
        src: "figma:asset/e7ee10c85c112ab4acfc9e54087974a5faae5966.png",
        alt: "Lost Paradise - makeup artistry in Thailand with friend Gabi",
        caption: "Lost Paradise",
        description:
          "Beautiful makeup moment with dear friend Gabi in Thailand",
      },
    ],
    category: "Thailand Adventures",
  },
  {
    id: "eden-paradise-1",
    title: "Eden Paradise",
    subtitle: "Thailand",
    description:
      "Beautiful party person who kindly let me do her makeup.",
    images: [
      {
        src: "figma:asset/3c496f3b8a5671dd00830f80a9a061ddf687e849.png",
        alt: "Eden Paradise - beautiful party makeup in Thailand",
        caption: "Party Look",
        description:
          "Beautiful party person who kindly let me do her makeup",
      },
    ],
    category: "Thailand Adventures",
  },
  {
    id: "eden-paradise-2",
    title: "Eden Paradise",
    subtitle: "Thailand",
    description:
      "Beautiful Shishi smiling radiance and shining bright.",
    images: [
      {
        src: "figma:asset/2d37a7cd55fe518f7eb8124fa25a2382be67f948.png",
        alt: "Eden Paradise - Shishi with radiant makeup in Thailand",
        caption: "Radiant Smile",
        description:
          "Beautiful Shishi smiling radiance and shining bright",
      },
    ],
    category: "Thailand Adventures",
  },
];

/**
 * General festival portfolio showcasing diverse event makeup artistry
 * Represents the core of festival makeup services and creative expression
 *
 * @constant {Array<PortfolioItem>} FESTIVAL_WORK_DATA
 * @property {string} image - Figma asset path for festival makeup photography
 * @property {string} title - Creative title capturing the festival spirit
 * @property {string} location - Festival name and year for context
 * @property {string} description - Artistic approach and emotional impact
 */
export const FESTIVAL_WORK_DATA = [
  {
    id: "jungle-festival-koh-phangan",
    title: "Jungle Festival Magic",
    subtitle: "Koh Phangan, Friday 26 September",
    description:
      "Tropical UV artistry in the heart of Thailand's jungle paradise, blending neon glow with natural island energy.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1533408944756-4950754f3ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdW5nbGUlMjBmZXN0aXZhbCUyMG1ha2V1cCUyMFVWJTIwbmVvbnxlbnwxfHx8fDE3NTkyMzc4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - neon UV makeup glowing in tropical jungle setting",
        caption: "Jungle Glow",
        description:
          "Vibrant UV reactive makeup creating magical glow effects in the jungle paradise",
      },
      {
        src: "https://images.unsplash.com/photo-1611253291108-bca55a6dfadc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZhY2UlMjBwYWludCUyMGZlc3RpdmFsfGVufDF8fHx8MTc1OTIzNzgxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - tropical face paint with nature-inspired designs",
        caption: "Tropical Artistry",
        description:
          "Nature-inspired tropical face paint celebrating the connection between art and jungle environment",
      },
      {
        src: "https://images.unsplash.com/photo-1609021622596-1883cb66e2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG93JTIwcGFpbnQlMjBibGFja2xpZ2h0JTIwbWFrZXVwfGVufDF8fHx8MTc1OTIzNzgxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Jungle Festival Magic - blacklight reactive paint creating electric atmosphere",
        caption: "Electric Nights",
        description:
          "Blacklight reactive artistry transforming the jungle night into an electric wonderland",
      },
    ],
    category: "Festival Makeup",
  },
  {
    id: "festival-euphoria",
    title: "Festival Euphoria",
    subtitle: "Origin Festival 2024",
    description:
      "Explosive joy and vibrant rainbow face art with purple mohawk capturing the pure ecstasy of festival life.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1530626334789-069de2d8f9b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMG1ha2V1cCUyMGNvbG9yZnVsJTIwZmFjZSUyMGFydCUyMG1vdW50YWlufGVufDF8fHx8MTc1NzU5MTYzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Person with decorative face makeup in mountain festival setting",
        caption: "Mountain Magic",
        description:
          "Decorative festival face art in beautiful mountain setting",
      },
      {
        src: "https://images.unsplash.com/photo-1618644819365-d7fe62d8bdcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGZhY2UlMjBwYWludCUyMHRlYWwlMjBzdHJpcGVzJTIwYXJ0aXN0aWN8ZW58MXx8fHwxNzU3NTkxNjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Person with curly hair and artistic teal face stripes",
        caption: "Teal Artistry",
        description:
          "Beautiful teal face stripes creating artistic festival expression",
      },
      {
        src: "https://images.unsplash.com/photo-1667322219556-fe9966377c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMG1ha2V1cCUyMGJsdWUlMjBmYWNlJTIwc3RyaXBlcyUyMGhhcHB5fGVufDF8fHx8MTc1NzU5MTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Joyful person with blue face stripes laughing at festival",
        caption: "Pure Joy",
        description:
          "Blue face stripes capturing the pure joy and energy of festival life",
      },
    ],
    category: "Festival Makeup",
  },
  {
    id: "forest-warrior",
    title: "Forest Warrior",
    subtitle: "Origin Festival 2024",
    description:
      "Bold red and purple face design with glittery accents creating a fierce yet beautiful festival look.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1667322219556-fe9966377c48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMG1ha2V1cCUyMGJsdWUlMjBmYWNlJTIwc3RyaXBlcyUyMGhhcHB5fGVufDF8fHx8MTc1NzU5MTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Forest Warrior - bold red and purple face design with glittery accents at Origin Festival 2024",
        caption: "Main Look",
        description:
          "The complete forest warrior makeup with red and purple face design",
      },
      {
        src: "https://images.unsplash.com/photo-1603300382284-72ddf4985216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYWluYm93JTIwZmFjZSUyMHBhaW50JTIwYXJ0aXN0aWMlMjBtYWtldXB8ZW58MXx8fHwxNzU3NTkwMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Process shot showing the application technique",
        caption: "Process",
        description: "Behind-the-scenes application process",
      },
    ],
    category: "Festival Makeup",
  },
  {
    id: "new-year-magic",
    title: "New Year Magic",
    subtitle: "Little Forest NYE 2023/2024",
    description:
      "Contemplative face art with golden and blue tones, welcoming the new year with peaceful forest energy.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1755223736694-3863b2f81de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMGZhY2UlMjBtYWtldXAlMjBnb2xkZW4lMjBibHVlJTIwdG9uZXN8ZW58MXx8fHwxNzU5MzI2MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "New Year Magic - contemplative face art with golden and blue tones at Little Forest NYE 2023/2024",
        caption: "Main Look",
        description:
          "The complete New Year look with golden and blue tones",
      },
      {
        src: "https://images.unsplash.com/photo-1572176079325-8d8674afe124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMGVkaXRvcmlhbCUyMGZhbnRhc3l8ZW58MXx8fHwxNzU3NTkwMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Artistic detail showing the golden and blue color combination",
        caption: "Color Detail",
        description:
          "Close-up of the golden and blue artistic elements",
      },
    ],
    category: "Festival Makeup",
  },
];

/**
 * Shankra Festival 2023 portfolio from Switzerland
 * Specialized collection documenting Swiss mountain festival experiences
 *
 * @constant {Array<PortfolioItem>} SHANKRA_WORK_DATA
 * @property {string} image - Figma asset path for Shankra festival photography
 * @property {string} title - Specific title reflecting Swiss mountain festival vibes
 * @property {string} location - Shankra Festival 2023, Switzerland location details
 * @property {string} description - Alpine context and cultural festival experience
 */
export const SHANKRA_WORK_DATA = [
  {
    id: "festival-connection",
    title: "Festival Connection",
    subtitle: "Shankra Festival 2023, Switzerland",
    description:
      "Joyful festival moment with turquoise eye design and infectious energy in the Swiss mountains.",
    images: [
      {
        src: "figma:asset/d35493e2be08017199b3d1523d516a996ec97a5d.png",
        alt: "Festival Connection - turquoise eye design at Shankra Festival 2023, Switzerland",
        caption: "Turquoise Eyes",
        description:
          "Joyful festival moment with turquoise eye design",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "alpine-bliss",
    title: "Alpine Bliss",
    subtitle: "Shankra Festival 2023, Switzerland",
    description:
      "Serene golden face paint with turquoise accents, capturing the peaceful mountain festival atmosphere.",
    images: [
      {
        src: "figma:asset/e43f2a86f8b38d1777428264c8c9126d07a9ef75.png",
        alt: "Alpine Bliss - golden face paint with turquoise accents at Shankra Festival 2023, Switzerland",
        caption: "Golden Serenity",
        description:
          "Serene golden face paint with turquoise accents",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "mountain-rainbow",
    title: "Mountain Rainbow",
    subtitle: "Shankra Festival 2023, Switzerland",
    description:
      "Vibrant rainbow face art with intricate patterns celebrating the colorful spirit of Swiss festival culture.",
    images: [
      {
        src: "figma:asset/80d0d3af448e4969dc796d00e91c30d3648cd9c4.png",
        alt: "Mountain Rainbow - vibrant rainbow face art at Shankra Festival 2023, Switzerland",
        caption: "Rainbow Patterns",
        description:
          "Vibrant rainbow face art with intricate patterns",
      },
    ],
    category: "Swiss Festivals",
  },
];

/**
 * Reiserfieber Switzerland portfolio collection
 * Documents Swiss festival culture and mountain celebration makeup artistry
 *
 * @constant {Array<PortfolioItem>} REISERFIEBER_WORK_DATA
 * @property {string} image - Figma asset path for Reiserfieber event photography
 * @property {string} title - Title capturing Alpine celebration aesthetics
 * @property {string} location - Reiserfieber, Switzerland event details
 * @property {string} description - Swiss mountain festival atmosphere and artistry
 */
export const REISERFIEBER_WORK_DATA = [
  {
    id: "alpine-glow",
    title: "Alpine Glow",
    subtitle: "Reiserfieber, Switzerland",
    description:
      "Delicate turquoise and purple face art with glitter accents creating magical festival vibes in the Swiss mountains.",
    images: [
      {
        src: "figma:asset/33024fb05609d4a4545be47508d2ad3595f143c4.png",
        alt: "Alpine Glow - turquoise and purple face art at Reiserfieber, Switzerland",
        caption: "Delicate Glow",
        description:
          "Delicate turquoise and purple face art with glitter accents",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "mountain-spirit",
    title: "Mountain Spirit",
    subtitle: "Reiserfieber, Switzerland",
    description:
      "Bold rainbow face stripe with festival hat, capturing the joyful energy of Swiss outdoor celebrations.",
    images: [
      {
        src: "figma:asset/280168cf45339af581c4065d1f6728ea2de6ff02.png",
        alt: "Mountain Spirit - rainbow face stripe at Reiserfieber, Switzerland",
        caption: "Rainbow Stripe",
        description:
          "Bold rainbow face stripe with festival hat",
      },
    ],
    category: "Swiss Festivals",
  },
  {
    id: "festival-joy",
    title: "Festival Joy",
    subtitle: "Reiserfieber, Switzerland",
    description:
      "Vibrant purple and turquoise eye design with infectious smile radiating pure festival happiness in the Alps.",
    images: [
      {
        src: "figma:asset/71597fc19386bc69fb2144851d752977dfd3693e.png",
        alt: "Festival Joy - purple and turquoise eye design at Reiserfieber, Switzerland",
        caption: "Joyful Eyes",
        description:
          "Vibrant purple and turquoise eye design with infectious smile",
      },
    ],
    category: "Swiss Festivals",
  },
];

/**
 * UV and blacklight reactive makeup portfolio
 * Specialized collection showcasing nightlife and rave makeup artistry
 *
 * @constant {Array<PortfolioItem>} UV_MAKEUP_DATA
 * @property {string} image - Figma asset path for UV makeup photography
 * @property {string} title - Dynamic title reflecting electric/neon aesthetics
 * @property {string} location - Club, rave, or event location context
 * @property {string} description - UV reactive techniques and artistic impact
 */
export const UV_MAKEUP_DATA = [
  {
    id: "neon-warrior",
    title: "Neon Warrior",
    subtitle: "Berlin Club",
    description:
      "Dramatic green mohawk with UV reactive face paint creating electric energy under blacklight.",
    images: [
      {
        src: "figma:asset/3f84a682c620ba9434e114f1bed5c08d6f9573d6.png",
        alt: "Neon Warrior - dramatic green mohawk with UV reactive face paint at Berlin Club",
        caption: "Under UV Light",
        description:
          "The complete neon warrior look under UV blacklight",
      },
      {
        src: "https://images.unsplash.com/photo-1602494518965-195c6ec1c980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVViUyMG1ha2V1cCUyMGJsYWNrbGlnaHQlMjBuZW9uJTIwZ2xvd2luZ3xlbnwxfHx8fDE3NTc1OTAzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "UV reactive makeup glowing in blacklight",
        caption: "Glow Effect",
        description:
          "The UV reactive paint creating a glowing effect",
      },
      {
        src: "https://images.unsplash.com/photo-1572176079325-8d8674afe124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMG1ha2V1cCUyMGVkaXRvcmlhbCUyMGZhbnRhc3l8ZW58MXx8fHwxNzU3NTkwMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Close-up artistic detail of neon makeup elements",
        caption: "Artistic Detail",
        description:
          "Close-up showing the artistic neon makeup elements and technique",
      },
    ],
    category: "UV Makeup",
  },
  {
    id: "rainbow-lightning",
    title: "Rainbow Lightning",
    subtitle: "UV Party",
    description:
      "Vibrant rainbow face stripe with glowing accessories creating magical festival vibes.",
    images: [
      {
        src: "figma:asset/4b2d7308e93886e4e6b5b4aecedbcb86af31a46b.png",
        alt: "Rainbow Lightning - vibrant rainbow face stripe with glowing accessories at UV Party",
        caption: "Rainbow Stripe",
        description: "The vibrant rainbow face stripe design",
      },
      {
        src: "https://images.unsplash.com/photo-1603300382284-72ddf4985216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYWluYm93JTIwZmFjZSUyMHBhaW50JTIwYXJ0aXN0aWMlMjBtYWtldXB8ZW58MXx8fHwxNzU3NTkwMzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Creative rainbow makeup technique close-up",
        caption: "Technique Detail",
        description:
          "Close-up showing the rainbow lightning application technique",
      },
    ],
    category: "UV Makeup",
  },
  {
    id: "electric-blue",
    title: "Electric Blue",
    subtitle: "Underground Rave",
    description:
      "Bold blue UV face paint with geometric patterns and infectious smile radiating joy.",
    images: [
      {
        src: "figma:asset/f37bfd287073fd5c8012c4b921e6919bf6b4bbcc.png",
        alt: "Electric Blue - bold blue UV face paint with geometric patterns at Underground Rave",
        caption: "Geometric Blue",
        description:
          "Bold blue UV face paint with geometric patterns",
      },
    ],
    category: "UV Makeup",
  },
];

/**
 * Comprehensive nail art portfolio for portfolio page display
 * Fusion Nails collection showcasing diverse nail artistry techniques
 *
 * @constant {Array<NailArtItem>} NAIL_ART_DATA
 * @property {string} image - Figma asset path for nail art detail photography
 * @property {string} title - Creative title describing the nail art style
 * @property {string} description - Technique, materials, and visual impact description
 */
export const NAIL_ART_DATA = [
  {
    id: "rainbow-fusion",
    title: "Rainbow Fusion",
    subtitle: "Sticker Art Collection",
    description:
      "Colorful sticker art with holographic details creating a playful rainbow effect",
    images: [
      {
        src: "figma:asset/7c570c5291977a816c8152a098cd6693cff22dbd.png",
        alt: "Rainbow Fusion nail art with colorful sticker art and holographic details",
        caption: "Full Set",
        description: "Complete rainbow fusion nail art set",
      },
      {
        src: "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG5haWwlMjBhcnQlMjBjb2xvcmZ1bCUyMGRlc2lnbnxlbnwxfHx8fDE3NTc1OTAzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Close-up detail of holographic nail art elements",
        caption: "Detail View",
        description:
          "Close-up showing the holographic sticker details",
      },
    ],
    category: "Nail Art",
  },
  {
    id: "galaxy-nails",
    title: "Galaxy Nails",
    subtitle: "Cosmic Collection",
    description:
      "Iridescent blues and greens with cosmic shimmer creating an otherworldly effect",
    images: [
      {
        src: "figma:asset/1ec0ba217cad06e2cff662a25a050b0401d1092a.png",
        alt: "Galaxy Nails with iridescent blues and greens with cosmic shimmer",
        caption: "Galaxy Effect",
        description:
          "Galaxy-inspired nail art with cosmic shimmer",
      },
    ],
    category: "Nail Art",
  },
  {
    id: "gradient-dreams",
    title: "Gradient Dreams",
    subtitle: "Ombre Collection",
    description:
      "Purple to green ombre with metallic finish creating a dreamy transition effect",
    images: [
      {
        src: "figma:asset/deb2b4ab4cb25c5e47b960708fce6ea552ee6039.png",
        alt: "Gradient Dreams nail art with purple to green ombre and metallic finish",
        caption: "Ombre Effect",
        description:
          "Purple to green gradient with metallic finish",
      },
    ],
    category: "Nail Art",
  },
];

/**
 * Portfolio sections configuration with Contentful tag mapping
 * Each section corresponds to specific tags in Contentful for dynamic content management
 * This allows content creators to tag entries in Contentful and have them automatically 
 * appear in the correct portfolio sections on the website.
 *
 * @constant {Array<PortfolioSection>} PORTFOLIO_SECTIONS
 * @property {string} id - Unique section identifier for navigation and styling
 * @property {string} title - Display title for the portfolio section
 * @property {string} description - Descriptive text explaining the section content
 * @property {string[]} contentfulTags - Array of Contentful tags to filter content for this section
 * @property {string} fallbackCategory - Fallback category if no tagged content is found
 * @property {string} gradientFrom - Starting color for section gradient theming
 * @property {string} gradientTo - Ending color for section gradient theming
 * @property {string} backgroundGradient - Tailwind gradient classes for background
 * @property {string} titleGradient - Tailwind gradient classes for section titles
 * @property {string} subtitleGradient - Tailwind gradient classes for subtitles
 * @property {Array<string>} decorativeColors - Hex colors for floating decorative elements
 * @property {Array<PortfolioItem>} entries - Static portfolio items (fallback when Contentful unavailable)
 */
export const PORTFOLIO_SECTIONS = [
  {
    id: "featured-work",
    title: "Featured Work",
    description:
      "Standout pieces that capture the essence of festival artistry and creative expression.",
    contentfulTags: ["featured", "portfolio-highlight", "showcase"],
    fallbackCategory: "featured",
    gradientFrom: "#FF66CC",
    gradientTo: "#9933FF",
    backgroundGradient:
      "from-pink-100 via-purple-100 to-blue-100",
    titleGradient: "from-pink-600 via-purple-600 to-blue-500",
    subtitleGradient: "from-pink-700 to-purple-600",
    decorativeColors: [
      "#ec4899",
      "#a855f7",
      "#3b82f6",
      "#6366f1",
    ],
    entries: [], // Now handled by unified portfolio service
  },
  {
    id: "festivals",
    title: "Festival Adventures",
    description:
      "From Origin Festival's explosive energy to Little Forest's peaceful New Year celebrations — capturing the diverse spirit of festival culture through bold face art and vibrant self-expression.",
    contentfulTags: ["festival", "music-festival", "face-paint", "celebration"],
    fallbackCategory: "festival",
    gradientFrom: "#ff9500", // Orange
    gradientTo: "#32cd32", // Green
    backgroundGradient:
      "from-orange-100 via-yellow-100 to-green-100",
    titleGradient:
      "from-orange-600 via-yellow-600 to-green-500",
    subtitleGradient: "from-orange-700 to-green-600",
    decorativeColors: [
      "#fb923c",
      "#fbbf24",
      "#22c55e",
      "#10b981",
    ],
    entries: FESTIVAL_WORK_DATA,
  },
  {
    id: "thailand",
    title: "Thailand Adventures",
    description:
      "Tropical makeup exploration during travels through Thailand, blending local culture with artistic expression.",
    contentfulTags: ["thailand", "travel", "tropical", "culture"],
    fallbackCategory: "travel",
    gradientFrom: "#FFD700",
    gradientTo: "#FF9966",
    backgroundGradient:
      "from-yellow-100 via-orange-100 to-red-100",
    titleGradient: "from-yellow-600 via-orange-600 to-red-500",
    subtitleGradient: "from-yellow-700 to-red-600",
    decorativeColors: [
      "#fbbf24",
      "#f97316",
      "#ef4444",
      "#dc2626",
    ],
    entries: THAILAND_WORK_DATA,
  },
  {
    id: "shankra-2023",
    title: "Shankra Festival 2023",
    description:
      "Swiss mountain festival experiences with alpine-inspired makeup artistry in breathtaking natural settings.",
    contentfulTags: ["shankra", "switzerland", "mountain-festival", "alpine"],
    fallbackCategory: "swiss-festivals",
    gradientFrom: "#32CD32",
    gradientTo: "#20C997",
    backgroundGradient:
      "from-green-100 via-emerald-100 to-teal-100",
    titleGradient: "from-green-600 via-emerald-600 to-teal-500",
    subtitleGradient: "from-green-700 to-teal-600",
    decorativeColors: [
      "#22c55e",
      "#10b981",
      "#14b8a6",
      "#0d9488",
    ],
    entries: SHANKRA_WORK_DATA,
  },
  {
    id: "reiserfieber",
    title: "Reiserfieber Switzerland",
    description:
      "Mountain celebration makeup showcasing the vibrant energy of Swiss outdoor festival culture.",
    contentfulTags: ["reiserfieber", "switzerland", "outdoor-festival", "mountain"],
    fallbackCategory: "swiss-festivals",
    gradientFrom: "#9933FF",
    gradientTo: "#3399FF",
    backgroundGradient:
      "from-blue-100 via-indigo-100 to-purple-100",
    titleGradient: "from-blue-600 via-indigo-600 to-purple-500",
    subtitleGradient: "from-blue-700 to-purple-600",
    decorativeColors: [
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
    ],
    entries: REISERFIEBER_WORK_DATA,
  },
  {
    id: "uv-makeup",
    title: "UV & Blacklight",
    description:
      "Electric nightlife artistry using UV-reactive paints that come alive under blacklight, perfect for clubs and raves.",
    contentfulTags: ["uv", "blacklight", "nightlife", "rave", "club"],
    fallbackCategory: "uv-makeup",
    gradientFrom: "#FF5E62",
    gradientTo: "#FF66CC",
    backgroundGradient:
      "from-cyan-100 via-pink-100 to-purple-100",
    titleGradient: "from-cyan-600 via-pink-600 to-purple-500",
    subtitleGradient: "from-cyan-700 to-purple-600",
    decorativeColors: [
      "#06b6d4",
      "#ec4899",
      "#a855f7",
      "#8b5cf6",
    ],
    entries: UV_MAKEUP_DATA,
  },
  {
    id: "fusion-nails",
    title: "Fusion Nails",
    description:
      "Creative nail artistry combining colors, textures, and innovative techniques for unique finger-focused designs.",
    contentfulTags: ["nails", "nail-art", "fusion-nails", "manicure"],
    fallbackCategory: "nail-art",
    gradientFrom: "#FF9966",
    gradientTo: "#FF5E62",
    backgroundGradient:
      "from-rose-100 via-pink-100 to-orange-100",
    titleGradient: "from-rose-600 via-pink-600 to-orange-500",
    subtitleGradient: "from-rose-700 to-orange-600",
    decorativeColors: [
      "#f43f5e",
      "#ec4899",
      "#f97316",
      "#ea580c",
    ],
    entries: NAIL_ART_DATA,
  },
];

/**
 * About page section themes configuration
 * Defines consistent color schemes and styling for each section based on content
 *
 * @constant {Object} ABOUT_SECTION_THEMES
 * @property {string} key - Section identifier matching AboutPage section names
 * @property {Object} backgroundGradient - Gradient colors for section background
 * @property {Object} titleGradient - Gradient colors for section titles
 * @property {Object} cardBorder - Border gradient colors for section cards
 * @property {Object} decorativeColor - Main decorative color for floating elements
 * @property {Object} quoteGradient - Gradient colors for pull quotes
 */
export const ABOUT_SECTION_THEMES = {
  journey: {
    backgroundGradient: {
      from: "orange-100",
      via: "yellow-100",
      to: "amber-100",
    },
    titleColor: "text-orange-800", // WCAG AAA compliant
    cardBorder: { from: "orange-200", to: "amber-200" },
    decorativeColor: "from-orange-300 to-amber-400",
    quoteColor: "text-amber-700", // WCAG AA compliant
    accentGradient: { from: "orange-500", to: "amber-500" }, // For decorative use only
    name: "Journey - Warm Growth",
  },
  festival: {
    backgroundGradient: {
      from: "green-100",
      via: "emerald-100",
      to: "teal-100",
    },
    titleColor: "text-emerald-800", // WCAG AAA compliant
    cardBorder: { from: "green-200", to: "teal-200" },
    decorativeColor: "from-green-300 to-teal-400",
    quoteColor: "text-teal-700", // WCAG AA compliant
    accentGradient: { from: "green-500", to: "teal-500" }, // For decorative use only
    name: "Festival - Nature Energy",
  },
  berlin: {
    backgroundGradient: {
      from: "purple-100",
      via: "violet-100",
      to: "pink-100",
    },
    titleColor: "text-purple-900", // WCAG AAA compliant
    cardBorder: { from: "purple-200", to: "pink-200" },
    decorativeColor: "from-purple-400 to-pink-500",
    quoteColor: "text-violet-700", // WCAG AA compliant
    accentGradient: { from: "purple-500", to: "pink-500" }, // For decorative use only
    name: "Berlin - Nightclub Artistry",
  },
  uv: {
    backgroundGradient: {
      from: "cyan-100",
      via: "blue-100",
      to: "indigo-100",
    },
    titleColor: "text-indigo-900", // WCAG AAA compliant
    cardBorder: { from: "cyan-200", to: "indigo-200" },
    decorativeColor: "from-cyan-300 to-indigo-400",
    quoteColor: "text-blue-700", // WCAG AA compliant
    accentGradient: { from: "cyan-500", to: "indigo-500" }, // For decorative use only
    name: "UV - Electric Neon",
  },
  mousse: {
    backgroundGradient: {
      from: "rose-100",
      via: "pink-100",
      to: "red-100",
    },
    titleColor: "text-rose-900", // WCAG AAA compliant
    cardBorder: { from: "rose-200", to: "red-200" },
    decorativeColor: "from-rose-300 to-red-400",
    quoteColor: "text-red-700", // WCAG AA compliant
    accentGradient: { from: "rose-500", to: "red-500" }, // For decorative use only
    name: "Mousse - Professional Beauty",
  },
  nails: {
    backgroundGradient: {
      from: "teal-100",
      via: "emerald-100",
      to: "green-100",
    },
    titleColor: "text-teal-900", // WCAG AAA compliant
    cardBorder: { from: "teal-200", to: "green-200" },
    decorativeColor: "from-teal-300 to-green-400",
    quoteColor: "text-green-700", // WCAG AA compliant
    accentGradient: { from: "teal-500", to: "green-500" }, // For decorative use only
    name: "Nails - Craft Precision",
  },
  creative: {
    backgroundGradient: {
      from: "indigo-100",
      via: "purple-100",
      to: "violet-100",
    },
    titleColor: "text-indigo-900", // WCAG AAA compliant
    cardBorder: { from: "indigo-200", to: "violet-200" },
    decorativeColor: "from-indigo-300 to-violet-400",
    quoteColor: "text-violet-700", // WCAG AA compliant
    accentGradient: { from: "indigo-500", to: "violet-500" }, // For decorative use only
    name: "Creative - Thought Process",
  },
  future: {
    backgroundGradient: {
      from: "violet-100",
      via: "purple-100",
      to: "pink-100",
    },
    titleColor: "text-violet-900", // WCAG AAA compliant
    cardBorder: { from: "violet-200", to: "pink-200" },
    decorativeColor: "from-violet-300 to-pink-400",
    quoteColor: "text-pink-700", // WCAG AA compliant
    accentGradient: { from: "violet-500", to: "pink-500" }, // For decorative use only
    name: "Future - Hope & Growth",
  },
};