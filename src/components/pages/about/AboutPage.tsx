/**
 * @fileoverview About page component for Ash Shaw Makeup Portfolio
 * Provides immersive storytelling through full-width sections, gradient frames,
 * and accessibility-compliant structure with creative visual elements.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from "react";
import { HeroLayout } from "../../sections/HeroLayout";
import { Footer } from "../../common/Footer";

import { SectionCard } from "../../ui/SectionCard";
import {
  ABOUT_SECTION_THEMES,
  ABOUT_HERO_IMAGES,
} from "../../common/Constants";

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
 * About page component providing Ash Shaw's complete makeup artist story
 *
 * Features a narrative journey through multiple themed sections:
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
 *
 * @performance
 * - Optimized gradient backgrounds using CSS custom properties
 * - Efficient animation timing to avoid layout thrashing
 * - Conditional rendering of navigation functions
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

  return (
    <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 min-h-screen">
      {/* Hero Section - About Me */}
      <HeroLayout
        title="My journey through"
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
              connect
            </em>{" "}
            since 2019.
          </>
        }
        description="What began as simple experimentation quickly turned into a passion that's taken me from intimate gatherings to massive festival stages, from underground Berlin clubs to innovative UV explorations. This is my story of colour, connection, and creative growth."
        size="xl"
        layout="split"
        fullscreen={true}
        backgroundGradient={{
          from: "pink-50",
          via: "purple-50",
          to: "blue-50",
        }}
        titleGradient={{ from: "pink-500", to: "purple-600" }}
        scrollArrowTarget="journey-section"
        heroImages={ABOUT_HERO_IMAGES}
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
              className="absolute bottom-16 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full opacity-15 animate-pulse delay-2000"
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
          light.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          What started as curiosity became obsession, then
          passion, then purpose. Each face became a canvas, each
          event a new adventure, each technique a step forward
          in my artistic evolution.
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
          embodying the spirit of celebration.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          From intimate gatherings to massive multi-day events,
          I learned to read the crowd, adapt to the environment,
          and create looks that would photograph beautifully
          under any lighting condition while staying vibrant
          through hours of dancing.
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
          just encouraged – it's expected.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          Working in Berlin's clubs taught me about dramatic
          lighting, bold contrasts, and the art of creating
          looks that transform completely under different
          lighting conditions. The city's creative energy pushed
          my boundaries and expanded my artistic vocabulary.
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
          it's like discovering a secret world.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          This work requires precision in both application and
          color theory. Understanding how different pigments
          react, layering techniques, and creating designs that
          look stunning in both natural and UV light became a
          specialty that sets my work apart in the festival
          circuit.
        </p>
        <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-2xl p-fluid-md mt-fluid-xl">
          <h3 className="text-fluid-xl font-heading font-semibold text-gray-800 mb-fluid-sm">
            Technical Mastery
          </h3>
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
          gradually.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          This medium became perfect for creating those
          Instagram-worthy gradient looks that photograph
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
          techniques.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          The detailed work required for nail artistry improved
          my precision in all areas of my makeup work. Working
          on such a small scale taught me patience, steady-hand
          techniques, and the importance of planning complex
          designs before execution.
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
          understanding.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          I believe in collaborative creativity – working with
          each person to enhance their natural beauty while
          expressing their unique personality. It's not about
          imposing a style, but about finding the perfect
          intersection of artistry and individual expression.
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
          something new to explore and master.
        </p>
        <p className="text-fluid-lg font-body font-normal text-gray-700 leading-relaxed">
          My goal is to continue pushing creative boundaries
          while staying true to what drew me to this art form in
          the first place: the joy of helping people express
          their most confident, creative selves.
        </p>
      </SectionCard>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}