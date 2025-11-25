/**
 * @fileoverview About page component for Ash Shaw Makeup Portfolio
 * Provides immersive storytelling through full-width sections, gradient frames,
 * Contentful CMS integration, and accessibility-compliant structure with creative visual elements.
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - Contentful CMS Integration
 */

import React from "react";
import { HeroLayout } from "../../sections/HeroLayout";
import { Footer } from "../../common/Footer";
import { ScrollToTop } from "../../ui/ScrollToTop";

import { SectionCard } from "../../ui/SectionCard";
import {
  ABOUT_SECTION_THEMES,
  ABOUT_HERO_IMAGES,
} from "../../common/Constants";
import { useAboutPageContent } from "../../../hooks/useContentful";

/**
 * Props interface for AboutPage component
 * @interface AboutPageProps
 * @property {Function} [setCurrentPage] - Function to navigate to different pages
 * @property {Function} [scrollToPortfolioSection] - Function to scroll to specific portfolio sections
 */
interface AboutPageProps {
  setCurrentPage?: (page: string) => void;
  scrollToPortfolioSection?: (sectionId?: string) => void;
}

/**
 * About page component providing Ash Shaw's complete makeup artist story with Contentful CMS integration
 *
 * New Features (v2.0):
 * - Dynamic content loading from Contentful CMS
 * - Rich text content support for flexible storytelling
 * - Real-time content updates without code deployment
 * - Fallback to static content when Contentful unavailable
 * - Enhanced loading states and error handling
 *
 * Features a narrative journey through multiple themed sections:
 * - Dynamic hero content with Contentful-managed text and images
 * - Personal introduction and creative foundation
 * - Festival journey and artistic evolution
 * - Berlin nightclub scene exploration
 * - UV makeup experimentation and mastery
 * - Professional mousse eyeshadow work
 * - Fusion Nails artistry expansion
 * - Creative process insights
 * - Future aspirations and goals
 *
 * Design Elements:
 * - Full-width layout maximizing visual impact
 * - Translucent cards with gradient frames for depth
 * - Staggered background decorations creating movement
 * - Pull quotes with gradient text effects
 * - Responsive typography scaling from mobile to desktop
 * - Smooth scrolling between sections
 * - Content management via Contentful CMS
 *
 * @param {AboutPageProps} props - Component properties
 * @param {Function} [props.setCurrentPage] - Function to navigate to different pages
 * @param {Function} [props.scrollToPortfolioSection] - Function to scroll to specific portfolio sections
 *
 * @returns {JSX.Element} Complete about page with storytelling sections and footer
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy (h1 > h2 > h3)
 * - High contrast text with WCAG AA compliant color ratios
 * - Keyboard accessible navigation and interactive elements
 * - Screen reader friendly content structure and alt text
 * - Loading states with appropriate aria-labels
 *
 * @performance
 * - Optimized gradient backgrounds using CSS custom properties
 * - Efficient animation timing to avoid layout thrashing
 * - Conditional rendering of navigation functions
 * - Intelligent content caching and background refresh
 *
 * @example
 * <AboutPage
 *   setCurrentPage={setCurrentPage}
 *   scrollToPortfolioSection={scrollToPortfolioSection}
 * />
 */
export function AboutPage({
  setCurrentPage,
  scrollToPortfolioSection,
}: AboutPageProps) {
  // Fetch dynamic about page content from Contentful
  const {
    data: aboutContent,
    loading: contentLoading,
    error: contentError,
    refresh: refreshContent,
  } = useAboutPageContent();

  const handlePortfolioClick = () => {
    if (setCurrentPage && scrollToPortfolioSection) {
      setCurrentPage("portfolio");
      setTimeout(() => scrollToPortfolioSection(), 100);
    }
  };

  const handleFusionNailsClick = () => {
    if (setCurrentPage && scrollToPortfolioSection) {
      setCurrentPage("portfolio");
      setTimeout(
        () => scrollToPortfolioSection("fusion-nails"),
        100,
      );
    }
  };

  // Loading state component
  const LoadingState = () => (
    <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg w-80 mx-auto mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="space-y-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-8 shadow-sm"
                >
                  <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error state component with retry functionality
  const ErrorState = () => (
    <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            About Content Unavailable
          </h1>
          <p className="text-gray-600 mb-6">
            {contentError ||
              "There was an issue loading the about page content. Please try again."}
          </p>
        </div>
        <div className="space-x-4">
          <button
            onClick={refreshContent}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );

  // Show loading state while fetching initial content
  if (contentLoading && !aboutContent) {
    return <LoadingState />;
  }

  // Show error state if content failed to load and no cached data
  if (contentError && !aboutContent) {
    return <ErrorState />;
  }

  // Extract content with fallbacks to static content
  const heroTitle =
    aboutContent?.hero.title || "My journey through";
  const heroSubtitle =
    aboutContent?.hero.subtitle ||
    "colour, creativity, and connection since 2019.";
  const heroDescription =
    aboutContent?.hero.description ||
    "What began as simple experimentation quickly turned into a passion that's taken me from intimate gatherings to massive festival stages, from underground Berlin clubs to innovative UV explorations. This is my story of colour, connection, and creative growth.";
  const heroImage = aboutContent?.hero.image
    ? {
        src: aboutContent.hero.image.url,
        alt: aboutContent.hero.image.alt,
        title: aboutContent.hero.image.title,
      }
    : null;

  return (
    <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 min-h-screen">
      {/* Content loading indicator */}
      {contentLoading && aboutContent && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Updating content...</span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Hero Section with Contentful content */}
      <HeroLayout
        title={heroTitle}
        subtitle={
          <>
            <em className="italic bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              colour
            </em>
            ,{" "}
            <em className="italic bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
              creativity
            </em>
            , and{" "}
            <em className="italic bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              connection
            </em>{" "}
            since 2019.
          </>
        }
        description={heroDescription}
        size="xl"
        layout="split"
        fullscreen={true}
        backgroundGradient={{
          from: "pink-50",
          via: "purple-50",
          to: "blue-50",
        }}
        titleGradient={{ from: "pink-500", to: "purple-600" }}
        showScrollArrow={true}
        scrollArrowTarget="journey-section"
        heroImages={heroImage ? [heroImage] : ABOUT_HERO_IMAGES}
        lightboxTitle="Ash Shaw's Creative Journey"
        enableLightbox={true}
        decorativeElements={
          <>
            <div
              className="absolute top-10 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"
              aria-hidden="true"
            ></div>
            <div
              className="absolute top-20 right-8 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-300 to-teal-400 rounded-full opacity-25 animate-pulse delay-1000"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-32 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full opacity-15 animate-pulse delay-2000"
              aria-hidden="true"
            ></div>
          </>
        }
      />

      {/* Journey Section */}
      <SectionCard
        id="journey-section"
        title="The Journey Begins"
        theme={ABOUT_SECTION_THEMES.journey}
        quote="Every brush stroke tells a story."
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          In 2019, I discovered something magical about makeup
          that went beyond just applying products. It was about
          transformation, expression, and the incredible moment
          when someone sees themselves in a completely new
          light. What started as curiosity became obsession,
          then passion, then purpose. Each face became a canvas,
          each event a new adventure, each technique a step
          forward in my artistic evolution.
        </p>
      </SectionCard>

      {/* Festival Section */}
      <SectionCard
        title="Festival Magic"
        theme={ABOUT_SECTION_THEMES.festival}
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          Festivals became my laboratory. There's something
          about the outdoor energy, the music, the freedom that
          brings out the most creative sides of people. Festival
          makeup isn't just about looking good – it's about
          embodying the spirit of celebration. From intimate
          gatherings to massive multi-day events, I learned to
          read the crowd, adapt to the environment, and create
          looks that would photograph beautifully under any
          lighting condition while staying vibrant through hours
          of dancing.
        </p>
        <div className="grid sm:grid-cols-2 gap-fluid-lg mt-fluid-xl">
          <div className="text-center">
            <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-sm">
              Outdoor Durability
            </h3>
            <p className="text-fluid-base font-body font-normal text-gray-600">
              Weather-resistant techniques that last all day
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-sm">
              Bold Expression
            </h3>
            <p className="text-fluid-base font-body font-normal text-gray-600">
              Vibrant looks that match the festival energy
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Berlin Nights Section */}
      <SectionCard
        title="Berlin Nightclub Scene"
        theme={ABOUT_SECTION_THEMES.berlin}
        quote="In Berlin, makeup becomes pure art."
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          Berlin's underground scene opened my eyes to a
          completely different side of makeup artistry. Here,
          creativity knows no bounds, and self-expression is not
          just encouraged – it's expected. Working in Berlin's
          clubs taught me about dramatic lighting, bold
          contrasts, and the art of creating looks that
          transform completely under different lighting
          conditions. The city's creative energy pushed my
          boundaries and expanded my artistic vocabulary.
        </p>
      </SectionCard>

      {/* UV Makeup Section */}
      <SectionCard
        title="UV Explorations"
        theme={ABOUT_SECTION_THEMES.uv}
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          UV reactive makeup opened up an entirely new dimension
          to my work. The science behind fluorescent pigments,
          the way colors behave under blacklight, the magical
          transformation that happens when the lights change –
          it's like discovering a secret world. This work
          requires precision in both application and color
          theory. Understanding how different pigments react,
          layering techniques, and creating designs that look
          stunning in both natural and UV light became a
          specialty that sets my work apart in the festival
          circuit.
        </p>
        <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-xl p-fluid-md mt-fluid-xl">
          <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-sm">
            Technical Mastery
          </h3>
          <div className="w-16 h-1 bg-gradient-blue-teal-green rounded-full mb-fluid-sm"></div>
          <p className="text-fluid-base font-body font-normal text-gray-600">
            Specialized knowledge of UV-reactive pigments,
            application techniques, and dual-lighting design
            principles.
          </p>
        </div>
      </SectionCard>

      {/* Mousse Makeup Section */}
      <SectionCard
        title="Professional Mousse Eyeshadows"
        theme={ABOUT_SECTION_THEMES.mousse}
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          Working with professional mousse eyeshadows taught me
          the importance of texture in makeup artistry. The
          creamy, blendable consistency allows for seamless
          color transitions and the ability to build intensity
          gradually. This medium became perfect for creating
          those Instagram-worthy gradient looks that photograph
          beautifully and provide the color payoff that festival
          environments demand. The techniques I developed here
          became fundamental to my signature style.
        </p>
        <div className="grid sm:grid-cols-3 gap-fluid-md mt-fluid-xl">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-red-500 rounded-full mx-auto mb-fluid-sm"></div>
            <h4 className="text-fluid-base font-heading font-medium text-gray-800">
              Color Theory
            </h4>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mx-auto mb-fluid-sm"></div>
            <h4 className="text-fluid-base font-heading font-medium text-gray-800">
              Blending Mastery
            </h4>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-full mx-auto mb-fluid-sm"></div>
            <h4 className="text-fluid-base font-heading font-medium text-gray-800">
              Texture Work
            </h4>
          </div>
        </div>
      </SectionCard>

      {/* Fusion Nails Section */}
      <SectionCard
        title="Fusion Nails Artistry"
        theme={ABOUT_SECTION_THEMES.nails}
        actions={
          setCurrentPage && (
            <div className="text-center">
              <button
                onClick={handleFusionNailsClick}
                className="w-full sm:w-auto inline-flex items-center justify-center text-center px-button py-button bg-gradient-blue-teal-green hover:from-teal-600 hover:to-green-700 text-white font-body font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50"
                aria-label="Navigate to Portfolio page Fusion Nails section"
              >
                View Fusion Nails Gallery
              </button>
            </div>
          )
        }
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          Expanding into nail art was a natural progression that
          allowed me to explore color and design on an entirely
          different canvas. Fusion Nails became an opportunity
          to push creative boundaries while mastering precision
          techniques. The detailed work required for nail
          artistry improved my precision in all areas of my
          makeup work. Working on such a small scale taught me
          patience, steady-hand techniques, and the importance
          of planning complex designs before execution.
        </p>
      </SectionCard>

      {/* Creative Process Section */}
      <SectionCard
        title="Creative Process"
        theme={ABOUT_SECTION_THEMES.creative}
        quote="True artistry lies in making others shine."
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          My creative process always begins with connection.
          Whether it's understanding a client's vision, feeling
          the energy of an event, or exploring a new technique,
          everything starts with that moment of inspiration and
          understanding. I believe in collaborative creativity –
          working with each person to enhance their natural
          beauty while expressing their unique personality. It's
          not about imposing a style, but about finding the
          perfect intersection of artistry and individual
          expression.
        </p>
      </SectionCard>

      {/* Looking Forward Section */}
      <SectionCard
        title="Looking Forward"
        theme={ABOUT_SECTION_THEMES.future}
        actions={
          setCurrentPage && (
            <div className="text-center">
              <button
                onClick={handlePortfolioClick}
                className="w-full sm:w-auto inline-flex items-center justify-center text-center px-button py-button bg-gradient-pink-purple-blue hover:from-violet-600 hover:to-pink-700 text-white font-body font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
                aria-label="Navigate to Portfolio page to explore full makeup artistry collection"
              >
                Explore Full Portfolio
              </button>
            </div>
          )
        }
      >
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          The makeup industry continues to evolve, and I'm
          excited to grow with it. New techniques, sustainable
          products, innovative applications – there's always
          something new to explore and master. My goal is to
          continue pushing creative boundaries while staying
          true to what drew me to this art form in the first
          place: the joy of helping people express their most
          confident, creative selves.
        </p>
      </SectionCard>

      {/* Scroll to Top Button */}
      <ScrollToTop
        showAfter={300}
        ariaLabel="Scroll to top of about page"
      />

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}