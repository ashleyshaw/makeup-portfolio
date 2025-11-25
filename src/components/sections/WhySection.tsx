/**
 * @fileoverview Why I Do Makeup section using ThreeColumnLayout pattern
 * Displays the philosophical reasons for pursuing makeup artistry with interactive cards
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 */

import React from "react";
import { ThreeColumnLayout } from "./ThreeColumnLayout";
import {
  ShineIcon,
  JoyIcon,
  GrowthIcon,
} from "../common/ColorfulIcons";

/**
 * Why I Do Makeup section featuring three core messaging pillars with custom icons
 *
 * Content Strategy:
 * - Three philosophical reasons for pursuing makeup artistry
 * - Each card represents a core value: service to others, personal joy, continuous growth
 * - Custom animated icons reinforce messaging through visual metaphors
 *
 * Visual Design:
 * - Purple to pink to orange gradient background creating warmth
 * - Large background blur elements for subtle depth
 * - Responsive card grid (single column mobile, three columns desktop)
 * - Consistent card styling with hover effects and shadows
 *
 * Icon Integration:
 * - ShineIcon: Radiant star representing making others feel special
 * - JoyIcon: Paint palette and heart showing personal fulfillment
 * - GrowthIcon: Flowering plant symbolizing continuous learning
 *
 * @param {Object} props - Component properties
 * @param {Function} props.setCurrentPage - Navigation function to switch to About page
 *
 * @returns {JSX.Element} Why makeup section with icon cards and call-to-action
 *
 * @design
 * - Cards use `gap-fluid-lg` spacing per Guidelines.md specifications
 * - Background decorative elements positioned at 1/4 and 3/4 viewport positions
 * - Typography hierarchy maintains accessibility with proper contrast ratios
 */
export function WhySection({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const reasons = [
    {
      icon: ShineIcon,
      title: "Spread Joy",
      description:
        "When I do makeup for others, it lights them up. They feel special, happy, and confident — and seeing that sparkle in their eyes inspires me to keep creating.",
    },
    {
      icon: JoyIcon,
      title: "Brings Me Joy",
      description:
        "Makeup is my creative playground. Whether it's festival glitter, glowing UV paints, or bold eyeshadow blends, I love the process of experimenting and expressing.",
    },
    {
      icon: GrowthIcon,
      title: "To Keep Growing",
      description:
        "Every face, every colour, every night out is a chance to evolve. Makeup is a journey — and I treat each session as an opportunity to learn and expand my artistry.",
    },
  ];

  const decorativeElements = (
    <>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-5" />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full blur-3xl opacity-5" />
    </>
  );

  const headerContent = (
    <div className="text-center">
      <h2
        id="why-section"
        className="text-section-h2 font-heading font-bold text-gradient-pink-purple-blue mb-fluid-lg"
      >
        Why I Do Makeup
      </h2>
    </div>
  );

  const footerContent = (
    <div className="text-center">
      <button
        onClick={() => setCurrentPage("about")}
        className="w-full sm:w-auto justify-center text-center bg-gradient-pink-purple-blue text-white px-button py-button rounded-lg font-body font-medium text-button-fluid shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200 focus:ring-opacity-50"
        aria-label="Navigate to About page to read full story"
      >
        Read My Full Story
      </button>
    </div>
  );

  return (
    <ThreeColumnLayout
      id="why-section"
      backgroundGradient={{
        from: "purple-50",
        via: "pink-50",
        to: "orange-50",
      }}
      gap="lg"
      mobileColumns={1}
      tabletColumns={2}
      decorativeElements={decorativeElements}
      header={headerContent}
      footer={footerContent}
    >
      {reasons.map((reason, index) => {
        const IconComponent = reason.icon;
        return (
          <div
            key={index}
            className="text-center cursor-pointer group bg-white/60 backdrop-blur-sm rounded-xl p-fluid-md shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 h-full"
            onClick={() => setCurrentPage("about")}
          >
            <div className="mb-fluid-lg flex justify-center">
              {reason.title === "Spread Joy" ? (
                <div className="w-32 h-32 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full"
                  >
                    <defs>
                      <radialGradient
                        id="shineGradient"
                        cx="50%"
                        cy="50%"
                      >
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop
                          offset="25%"
                          stopColor="#FF69B4"
                        />
                        <stop
                          offset="50%"
                          stopColor="#FF1493"
                        />
                        <stop
                          offset="75%"
                          stopColor="#9932CC"
                        />
                        <stop
                          offset="100%"
                          stopColor="#4B0082"
                        />
                      </radialGradient>
                      <linearGradient
                        id="sparkleGradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop
                          offset="50%"
                          stopColor="#FF69B4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF1493"
                        />
                      </linearGradient>
                      <linearGradient
                        id="sparkleGradient2"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#00CED1" />
                        <stop
                          offset="50%"
                          stopColor="#FF69B4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFD700"
                        />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="20"
                      fill="url(#shineGradient)"
                      opacity="0.9"
                    />
                    <g transform="translate(60, 60)">
                      <polygon
                        points="0,-35 3,-15 0,-10 -3,-15"
                        fill="url(#sparkleGradient1)"
                        opacity="0.8"
                      />
                      <polygon
                        points="35,0 15,3 10,0 15,-3"
                        fill="url(#sparkleGradient1)"
                        opacity="0.8"
                      />
                      <polygon
                        points="0,35 -3,15 0,10 3,15"
                        fill="url(#sparkleGradient1)"
                        opacity="0.8"
                      />
                      <polygon
                        points="-35,0 -15,-3 -10,0 -15,3"
                        fill="url(#sparkleGradient1)"
                        opacity="0.8"
                      />
                      <polygon
                        points="25,-25 12,-12 8,-16 21,-29"
                        fill="url(#sparkleGradient2)"
                        opacity="0.7"
                      />
                      <polygon
                        points="25,25 12,12 16,8 29,21"
                        fill="url(#sparkleGradient2)"
                        opacity="0.7"
                      />
                      <polygon
                        points="-25,25 -12,12 -8,16 -21,29"
                        fill="url(#sparkleGradient2)"
                        opacity="0.7"
                      />
                      <polygon
                        points="-25,-25 -12,-12 -16,-8 -29,-21"
                        fill="url(#sparkleGradient2)"
                        opacity="0.7"
                      />
                    </g>
                    <circle
                      cx="25"
                      cy="25"
                      r="3"
                      fill="#FFD700"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;0.3;0.8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="95"
                      cy="30"
                      r="2.5"
                      fill="#FF69B4"
                      opacity="0.9"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.9;0.4;0.9"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="90"
                      cy="85"
                      r="3.5"
                      fill="#00CED1"
                      opacity="0.7"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.7;0.2;0.7"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="20"
                      cy="90"
                      r="2"
                      fill="#9932CC"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;0.3;0.8"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>
              ) : reason.title === "Brings Me Joy" ? (
                <div className="w-32 h-32 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient
                        id="heartGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#FF69B4" />
                        <stop
                          offset="25%"
                          stopColor="#FF1493"
                        />
                        <stop
                          offset="50%"
                          stopColor="#DC143C"
                        />
                        <stop
                          offset="75%"
                          stopColor="#FF4500"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFD700"
                        />
                      </linearGradient>
                      <radialGradient
                        id="brushGradient"
                        cx="50%"
                        cy="50%"
                      >
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop
                          offset="30%"
                          stopColor="#FF69B4"
                        />
                        <stop
                          offset="60%"
                          stopColor="#9932CC"
                        />
                        <stop
                          offset="100%"
                          stopColor="#4B0082"
                        />
                      </radialGradient>
                      <linearGradient
                        id="paletteGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#FF69B4" />
                        <stop
                          offset="20%"
                          stopColor="#FFD700"
                        />
                        <stop
                          offset="40%"
                          stopColor="#00CED1"
                        />
                        <stop
                          offset="60%"
                          stopColor="#9932CC"
                        />
                        <stop
                          offset="80%"
                          stopColor="#32CD32"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FF4500"
                        />
                      </linearGradient>
                    </defs>
                    <ellipse
                      cx="60"
                      cy="70"
                      rx="45"
                      ry="30"
                      fill="url(#paletteGradient)"
                      opacity="0.8"
                    />
                    <path
                      d="M60,45 C55,35 45,35 45,45 C45,55 60,70 60,70 C60,70 75,55 75,45 C75,35 65,35 60,45 Z"
                      fill="url(#heartGradient)"
                      opacity="0.9"
                    />
                    <g transform="translate(25, 25) rotate(45)">
                      <rect
                        x="0"
                        y="10"
                        width="3"
                        height="25"
                        fill="#8B4513"
                        rx="1.5"
                      />
                      <rect
                        x="-1"
                        y="8"
                        width="5"
                        height="5"
                        fill="#C0C0C0"
                        rx="1"
                      />
                      <g>
                        <rect
                          x="-2"
                          y="2"
                          width="1"
                          height="8"
                          fill="#FF69B4"
                          rx="0.5"
                        />
                        <rect
                          x="-1"
                          y="1"
                          width="1"
                          height="9"
                          fill="#9932CC"
                          rx="0.5"
                        />
                        <rect
                          x="0"
                          y="0"
                          width="1"
                          height="10"
                          fill="#00CED1"
                          rx="0.5"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="1"
                          height="9"
                          fill="#FFD700"
                          rx="0.5"
                        />
                        <rect
                          x="2"
                          y="2"
                          width="1"
                          height="8"
                          fill="#32CD32"
                          rx="0.5"
                        />
                        <rect
                          x="3"
                          y="3"
                          width="1"
                          height="7"
                          fill="#FF4500"
                          rx="0.5"
                        />
                      </g>
                    </g>
                    <circle
                      cx="30"
                      cy="50"
                      r="4"
                      fill="#FF69B4"
                      opacity="0.7"
                    />
                    <circle
                      cx="85"
                      cy="40"
                      r="3"
                      fill="#00CED1"
                      opacity="0.8"
                    />
                    <circle
                      cx="90"
                      cy="75"
                      r="2.5"
                      fill="#32CD32"
                      opacity="0.6"
                    />
                    <ellipse
                      cx="40"
                      cy="85"
                      rx="3"
                      ry="5"
                      fill="#9932CC"
                      opacity="0.7"
                    />
                    <circle
                      cx="75"
                      cy="25"
                      r="2"
                      fill="#FFD700"
                    >
                      <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="95"
                      cy="60"
                      r="1.5"
                      fill="#FF69B4"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;0.2;0.8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>
              ) : reason.title === "To Keep Growing" ? (
                <div className="w-32 h-32 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient
                        id="stemGradient"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#228B22" />
                        <stop
                          offset="50%"
                          stopColor="#32CD32"
                        />
                        <stop
                          offset="100%"
                          stopColor="#7CFC00"
                        />
                      </linearGradient>
                      <radialGradient
                        id="flowerGradient"
                        cx="50%"
                        cy="50%"
                      >
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop
                          offset="30%"
                          stopColor="#FF69B4"
                        />
                        <stop
                          offset="60%"
                          stopColor="#FF1493"
                        />
                        <stop
                          offset="100%"
                          stopColor="#9932CC"
                        />
                      </radialGradient>
                      <linearGradient
                        id="arrowGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#00CED1" />
                        <stop
                          offset="25%"
                          stopColor="#1E90FF"
                        />
                        <stop
                          offset="50%"
                          stopColor="#9932CC"
                        />
                        <stop
                          offset="75%"
                          stopColor="#FF69B4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFD700"
                        />
                      </linearGradient>
                      <linearGradient
                        id="leafGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#32CD32" />
                        <stop
                          offset="50%"
                          stopColor="#00FF7F"
                        />
                        <stop
                          offset="100%"
                          stopColor="#ADFF2F"
                        />
                      </linearGradient>
                    </defs>
                    <rect
                      x="55"
                      y="60"
                      width="6"
                      height="45"
                      fill="url(#stemGradient)"
                      rx="3"
                    />
                    <g transform="translate(60, 30)">
                      <polygon
                        points="0,-15 8,0 3,0 3,20 -3,20 -3,0 -8,0"
                        fill="url(#arrowGradient)"
                        opacity="0.9"
                      />
                    </g>
                    <g transform="translate(60, 55)">
                      <circle
                        cx="0"
                        cy="0"
                        r="12"
                        fill="url(#flowerGradient)"
                        opacity="0.8"
                      />
                      <circle
                        cx="-8"
                        cy="-6"
                        r="6"
                        fill="#FF69B4"
                        opacity="0.7"
                      />
                      <circle
                        cx="8"
                        cy="-6"
                        r="6"
                        fill="#00CED1"
                        opacity="0.7"
                      />
                      <circle
                        cx="-8"
                        cy="6"
                        r="6"
                        fill="#FFD700"
                        opacity="0.7"
                      />
                      <circle
                        cx="8"
                        cy="6"
                        r="6"
                        fill="#9932CC"
                        opacity="0.7"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r="4"
                        fill="#FFD700"
                        opacity="0.9"
                      />
                    </g>
                    <ellipse
                      cx="45"
                      cy="75"
                      rx="8"
                      ry="15"
                      fill="url(#leafGradient)"
                      opacity="0.8"
                      transform="rotate(-30 45 75)"
                    />
                    <ellipse
                      cx="75"
                      cy="85"
                      rx="6"
                      ry="12"
                      fill="url(#leafGradient)"
                      opacity="0.7"
                      transform="rotate(45 75 85)"
                    />
                    <g opacity="0.6">
                      <circle
                        cx="25"
                        cy="95"
                        r="3"
                        fill="#32CD32"
                      />
                      <rect
                        x="23.5"
                        y="95"
                        width="3"
                        height="8"
                        fill="#228B22"
                      />
                    </g>
                    <g opacity="0.7">
                      <circle
                        cx="35"
                        cy="85"
                        r="4"
                        fill="#7CFC00"
                      />
                      <rect
                        x="33"
                        y="85"
                        width="4"
                        height="15"
                        fill="#32CD32"
                      />
                      <ellipse
                        cx="30"
                        cy="82"
                        rx="3"
                        ry="6"
                        fill="#ADFF2F"
                        opacity="0.8"
                        transform="rotate(-45 30 82)"
                      />
                    </g>
                    <circle
                      cx="80"
                      cy="35"
                      r="2"
                      fill="#FFD700"
                    >
                      <animate
                        attributeName="opacity"
                        values="1;0.2;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="40"
                      cy="45"
                      r="1.5"
                      fill="#FF69B4"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;0.1;0.8"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="85"
                      cy="50"
                      r="1"
                      fill="#00CED1"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.9;0.3;0.9"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>
              ) : (
                <IconComponent
                  size="lg"
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 group-hover:scale-110 transition-transform duration-300"
                />
              )}
            </div>
            <h3 className="text-fluid-2xl sm:text-fluid-3xl lg:text-fluid-4xl font-heading font-semibold text-gray-800 mb-fluid-lg leading-tight group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {reason.title}
            </h3>
            <p className="text-fluid-lg font-body font-normal text-gray-600 leading-relaxed">
              {reason.description}
            </p>
          </div>
        );
      })}
    </ThreeColumnLayout>
  );
}