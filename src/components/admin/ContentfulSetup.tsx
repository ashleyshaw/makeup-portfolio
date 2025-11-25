/**
 * @fileoverview Contentful setup and management component for portfolio administration
 * 
 * Provides tools for:
 * - Content model verification and guidance
 * - API connection testing
 * - Content structure validation
 * - Setup progress tracking
 * - Quick content creation templates
 * 
 * This component helps ensure proper Contentful configuration and provides
 * debugging tools for content management issues.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial Contentful setup component
 * @lastModified 2025-01-17
 */

import React, { useState, useEffect } from 'react';
import { 
  usePortfolioEntries, 
  useHomepageContent, 
  useAboutPageContent 
} from '../../hooks/useContentful';

/**
 * Props interface for ContentfulSetup component
 * 
 * @interface ContentfulSetupProps
 */
interface ContentfulSetupProps {
  /** Whether to show the setup interface */
  isVisible?: boolean;
  /** Callback when setup is completed */
  onSetupComplete?: () => void;
}

/**
 * Setup status tracking interface
 * 
 * @interface SetupStatus
 */
interface SetupStatus {
  /** API connection successful */
  apiConnected: boolean;
  /** Portfolio entries exist */
  portfolioExists: boolean;
  /** Homepage content exists */
  homepageExists: boolean;
  /** About page content exists */
  aboutExists: boolean;
  /** Any errors encountered */
  errors: string[];
}

/**
 * Content model definition interface
 * 
 * @interface ContentModel
 */
interface ContentModel {
  /** Model name for display */
  name: string;
  /** Contentful content type ID */
  id: string;
  /** Model description */
  description: string;
  /** Required fields for this model */
  fields: Array<{
    name: string;
    id: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

/**
 * Contentful setup and management component
 * 
 * Provides a comprehensive interface for:
 * - Testing Contentful API connection
 * - Verifying content model setup
 * - Checking content availability
 * - Providing setup guidance
 * - Debugging content issues
 * 
 * @param {ContentfulSetupProps} props - Component properties
 * @returns {JSX.Element | null} Setup interface or null if hidden
 * 
 * @example
 * ```typescript
 * // Show setup during development
 * const [showSetup, setShowSetup] = useState(process.env.NODE_ENV === 'development');
 * 
 * return (
 *   <div>
 *     <ContentfulSetup 
 *       isVisible={showSetup}
 *       onSetupComplete={() => setShowSetup(false)}
 *     />
 *     <MainApp />
 *   </div>
 * );
 * ```
 */
export function ContentfulSetup({ 
  isVisible = false, 
  onSetupComplete 
}: ContentfulSetupProps): JSX.Element | null {
  const [setupStatus, setSetupStatus] = useState<SetupStatus>({
    apiConnected: false,
    portfolioExists: false,
    homepageExists: false,
    aboutExists: false,
    errors: []
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'models' | 'samples'>('status');

  // Fetch content to test connectivity
  const portfolioData = usePortfolioEntries({ limit: 1 });
  const homepageData = useHomepageContent();
  const aboutData = useAboutPageContent();

  /**
   * Content model definitions for setup guidance
   */
  const contentModels: ContentModel[] = [
    {
      name: 'Portfolio Entry',
      id: 'portfolioEntry',
      description: 'Individual portfolio pieces with images and metadata',
      fields: [
        { name: 'Title', id: 'title', type: 'Short text', required: true, description: 'Portfolio entry title' },
        { name: 'Description', id: 'description', type: 'Short text', required: true, description: 'Brief description for cards' },
        { name: 'Category', id: 'category', type: 'Short text', required: true, description: 'festival, uv, editorial, nails, etc.' },
        { name: 'Images', id: 'images', type: 'Media (multiple)', required: true, description: 'Gallery images' },
        { name: 'Featured Image', id: 'featuredImage', type: 'Media', required: true, description: 'Main preview image' },
        { name: 'Tags', id: 'tags', type: 'Short text (list)', required: false, description: 'Searchable tags' },
        { name: 'Featured', id: 'featured', type: 'Boolean', required: false, description: 'Show on homepage' },
        { name: 'Display Order', id: 'displayOrder', type: 'Integer', required: false, description: 'Sort order' }
      ]
    },
    {
      name: 'Homepage Content',
      id: 'homepage',
      description: 'Homepage hero and featured sections',
      fields: [
        { name: 'Hero Title', id: 'heroTitle', type: 'Short text', required: true, description: 'Main hero title' },
        { name: 'Hero Description', id: 'heroDescription', type: 'Long text', required: true, description: 'Hero description' },
        { name: 'Hero CTA Text', id: 'heroCta', type: 'Short text', required: false, description: 'Button text' },
        { name: 'Hero Images', id: 'heroImages', type: 'Media (multiple)', required: false, description: 'Background images' }
      ]
    },
    {
      name: 'About Page Content',
      id: 'aboutPage',
      description: 'About page hero and journey content',
      fields: [
        { name: 'Hero Title', id: 'heroTitle', type: 'Short text', required: true, description: 'About hero title' },
        { name: 'Hero Description', id: 'heroDescription', type: 'Long text', required: true, description: 'About description' },
        { name: 'Hero Image', id: 'heroImage', type: 'Media', required: false, description: 'About hero image' }
      ]
    }
  ];

  /**
   * Update setup status based on data availability
   */
  useEffect(() => {
    const errors: string[] = [];
    
    // Check for API errors
    if (portfolioData.error) errors.push(`Portfolio: ${portfolioData.error}`);
    if (homepageData.error) errors.push(`Homepage: ${homepageData.error}`);
    if (aboutData.error) errors.push(`About: ${aboutData.error}`);

    setSetupStatus({
      apiConnected: !portfolioData.error || !homepageData.error || !aboutData.error,
      portfolioExists: !!portfolioData.data && portfolioData.data.length > 0,
      homepageExists: !!homepageData.data,
      aboutExists: !!aboutData.data,
      errors
    });
  }, [
    portfolioData.data, portfolioData.error,
    homepageData.data, homepageData.error,
    aboutData.data, aboutData.error
  ]);

  /**
   * Calculate overall setup completion
   */
  const completionPercentage = React.useMemo(() => {
    const checks = [
      setupStatus.apiConnected,
      setupStatus.portfolioExists,
      setupStatus.homepageExists,
      setupStatus.aboutExists
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [setupStatus]);

  /**
   * Generate sample content for testing
   */
  const sampleContent = {
    portfolioEntry: {
      title: "Festival Artistry Sample",
      description: "Vibrant festival makeup with UV accents",
      category: "festival",
      tags: ["festival", "uv", "creative"],
      featured: true,
      displayOrder: 1
    },
    homepage: {
      heroTitle: "Hi, I'm Ash Shaw",
      heroDescription: "Creating bold, expressive makeup that celebrates individuality and artistic expression.",
      heroCta: "Explore My Portfolio"
    },
    aboutPage: {
      heroTitle: "About Ash Shaw",
      heroDescription: "Passionate about creating bold, expressive makeup that celebrates individuality and artistic expression."
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Contentful CMS Setup</h2>
              <p className="text-purple-100 mt-1">Portfolio Content Management Configuration</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{completionPercentage}%</div>
              <div className="text-sm text-purple-100">Complete</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-purple-700 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'status', label: 'Setup Status', icon: '📊' },
              { id: 'models', label: 'Content Models', icon: '🏗️' },
              { id: 'samples', label: 'Sample Data', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'status' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Connection Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'API Connected', status: setupStatus.apiConnected, description: 'Contentful API accessible' },
                    { label: 'Portfolio Content', status: setupStatus.portfolioExists, description: 'Portfolio entries available' },
                    { label: 'Homepage Content', status: setupStatus.homepageExists, description: 'Homepage content configured' },
                    { label: 'About Content', status: setupStatus.aboutExists, description: 'About page content available' }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mr-3 ${item.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <div className="font-medium text-gray-800">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <div className="ml-auto">
                        {item.status ? (
                          <span className="text-green-600 text-xl">✓</span>
                        ) : (
                          <span className="text-red-600 text-xl">✗</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {setupStatus.errors.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-red-800 mb-2">Errors Found</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-1">
                      {setupStatus.errors.map((error, index) => (
                        <li key={index} className="text-red-700 text-sm">• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-blue-800 mb-2">Next Steps</h4>
                <div className="text-blue-700 text-sm space-y-1">
                  {!setupStatus.apiConnected && <div>• Configure Contentful API credentials</div>}
                  {setupStatus.apiConnected && !setupStatus.portfolioExists && <div>• Create portfolio entries in Contentful</div>}
                  {setupStatus.apiConnected && !setupStatus.homepageExists && <div>• Create homepage content entry</div>}
                  {setupStatus.apiConnected && !setupStatus.aboutExists && <div>• Create about page content entry</div>}
                  {completionPercentage === 100 && <div>• ✅ Setup complete! Your CMS is ready to use.</div>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Content Models</h3>
                <p className="text-gray-600 mb-6">Create these content models in your Contentful space:</p>
              </div>

              {contentModels.map((model) => (
                <div key={model.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800">{model.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">Content Type ID: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{model.id}</code></p>
                    <p className="text-sm text-gray-600 mt-1">{model.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-800">Field Name</th>
                            <th className="text-left py-2 font-medium text-gray-800">Field ID</th>
                            <th className="text-left py-2 font-medium text-gray-800">Type</th>
                            <th className="text-left py-2 font-medium text-gray-800">Required</th>
                            <th className="text-left py-2 font-medium text-gray-800">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {model.fields.map((field) => (
                            <tr key={field.id} className="border-b border-gray-100">
                              <td className="py-2 text-gray-800">{field.name}</td>
                              <td className="py-2">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs">{field.id}</code>
                              </td>
                              <td className="py-2 text-gray-600">{field.type}</td>
                              <td className="py-2">
                                {field.required ? (
                                  <span className="text-red-600 font-medium">Yes</span>
                                ) : (
                                  <span className="text-gray-500">No</span>
                                )}
                              </td>
                              <td className="py-2 text-gray-600">{field.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'samples' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sample Content</h3>
                <p className="text-gray-600 mb-6">Use these templates to create your first entries:</p>
              </div>

              {Object.entries(sampleContent).map(([key, content]) => (
                <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800">
                      {key === 'portfolioEntry' ? 'Portfolio Entry Sample' :
                       key === 'homepage' ? 'Homepage Content Sample' :
                       'About Page Content Sample'}
                    </h4>
                  </div>
                  <div className="p-6">
                    <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{JSON.stringify(content, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              ))}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-yellow-800 mb-2">Important Notes</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Remember to upload images to the Media fields</li>
                  <li>• Publish entries after creation to make them visible on the website</li>
                  <li>• Use consistent category names for proper organization</li>
                  <li>• Test with one entry first, then add more content</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Need help? Check the <code>CONTENTFUL_SETUP_GUIDE.md</code> file for detailed instructions.
          </div>
          <div className="space-x-3">
            {completionPercentage === 100 && onSetupComplete && (
              <button
                onClick={onSetupComplete}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Setup Complete
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              {isExpanded ? 'Minimize' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook for managing Contentful setup state
 * 
 * @function useContentfulSetup
 * @returns {Object} Setup state and controls
 * 
 * @example
 * ```typescript
 * const { showSetup, hideSetup, isSetupComplete } = useContentfulSetup();
 * 
 * return (
 *   <div>
 *     {showSetup && <ContentfulSetup onSetupComplete={hideSetup} />}
 *     <MainApp />
 *   </div>
 * );
 * ```
 */
export function useContentfulSetup() {
  const [showSetup, setShowSetup] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const hideSetup = () => {
    setShowSetup(false);
    setIsSetupComplete(true);
  };

  const showSetupInterface = () => {
    setShowSetup(true);
  };

  return {
    showSetup,
    hideSetup,
    showSetupInterface,
    isSetupComplete
  };
}