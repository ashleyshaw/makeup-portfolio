/**
 * @fileoverview Contentful content type validation for Ash Shaw Portfolio
 * 
 * Provides runtime validation for Contentful content types to ensure data integrity
 * and provide helpful error messages when content doesn't match expected structure.
 * 
 * Core Features:
 * - Schema validation for all content types (blogPost, portfolioEntry, aboutPage, homepage)
 * - Detailed error reporting with field-level validation messages
 * - Type guards for TypeScript type safety
 * - Automatic field sanitization and default values
 * - Development-friendly validation warnings
 * 
 * Validation Strategy:
 * - Required field validation with clear error messages
 * - Optional field validation with sensible defaults
 * - Nested object and array validation
 * - Image/asset validation for media fields
 * - Rich text content validation
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 * @since 1.0.0 - Initial content type validation implementation
 * @lastModified 2025-01-25
 */

import type { Entry, Asset } from 'contentful';

/**
 * Validation result interface
 * 
 * @interface ValidationResult
 */
export interface ValidationResult {
  /** Whether validation passed */
  isValid: boolean;
  /** Array of validation error messages */
  errors: string[];
  /** Array of validation warning messages */
  warnings: string[];
  /** Sanitized and validated data (if validation passed) */
  data?: any;
}

/**
 * Validation options interface
 * 
 * @interface ValidationOptions
 */
export interface ValidationOptions {
  /** Whether to throw errors on validation failure (default: false) */
  throwOnError?: boolean;
  /** Whether to log validation warnings to console (default: true in dev) */
  logWarnings?: boolean;
  /** Whether to allow partial validation with defaults (default: true) */
  allowDefaults?: boolean;
  /** Content type name for error messages */
  contentType?: string;
}

/**
 * Validate required string field
 * 
 * @function validateRequiredString
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error messages
 * @returns {ValidationResult} Validation result
 */
function validateRequiredString(value: any, fieldName: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null) {
    errors.push(`Required field "${fieldName}" is missing`);
    return { isValid: false, errors, warnings };
  }

  if (typeof value !== 'string') {
    errors.push(`Field "${fieldName}" must be a string, got ${typeof value}`);
    return { isValid: false, errors, warnings };
  }

  if (value.trim() === '') {
    warnings.push(`Field "${fieldName}" is empty`);
  }

  return { isValid: true, errors, warnings, data: value };
}

/**
 * Validate optional string field with default
 * 
 * @function validateOptionalString
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error messages
 * @param {string} defaultValue - Default value if missing
 * @returns {ValidationResult} Validation result
 */
function validateOptionalString(
  value: any, 
  fieldName: string, 
  defaultValue: string = ''
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null) {
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  if (typeof value !== 'string') {
    warnings.push(`Field "${fieldName}" should be a string, got ${typeof value}. Using default.`);
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  return { isValid: true, errors, warnings, data: value };
}

/**
 * Validate boolean field
 * 
 * @function validateBoolean
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error messages
 * @param {boolean} defaultValue - Default value if missing
 * @returns {ValidationResult} Validation result
 */
function validateBoolean(
  value: any, 
  fieldName: string, 
  defaultValue: boolean = false
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null) {
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  if (typeof value !== 'boolean') {
    warnings.push(`Field "${fieldName}" should be a boolean, got ${typeof value}. Using default.`);
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  return { isValid: true, errors, warnings, data: value };
}

/**
 * Validate number field
 * 
 * @function validateNumber
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error messages
 * @param {number} defaultValue - Default value if missing
 * @returns {ValidationResult} Validation result
 */
function validateNumber(
  value: any, 
  fieldName: string, 
  defaultValue: number = 0
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null) {
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  if (typeof value !== 'number' || isNaN(value)) {
    warnings.push(`Field "${fieldName}" should be a number, got ${typeof value}. Using default.`);
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  return { isValid: true, errors, warnings, data: value };
}

/**
 * Validate array field
 * 
 * @function validateArray
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error messages
 * @param {any[]} defaultValue - Default value if missing
 * @returns {ValidationResult} Validation result
 */
function validateArray(
  value: any, 
  fieldName: string, 
  defaultValue: any[] = []
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null) {
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  if (!Array.isArray(value)) {
    warnings.push(`Field "${fieldName}" should be an array, got ${typeof value}. Using default.`);
    return { isValid: true, errors, warnings, data: defaultValue };
  }

  return { isValid: true, errors, warnings, data: value };
}

/**
 * Validate Contentful asset (image/media)
 * 
 * @function validateAsset
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error messages
 * @param {boolean} required - Whether asset is required
 * @returns {ValidationResult} Validation result
 */
function validateAsset(
  value: any, 
  fieldName: string, 
  required: boolean = false
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null) {
    if (required) {
      errors.push(`Required asset "${fieldName}" is missing`);
      return { isValid: false, errors, warnings };
    }
    return { isValid: true, errors, warnings, data: undefined };
  }

  // Check if it's a Contentful asset object
  if (!value.fields || !value.fields.file) {
    warnings.push(`Asset "${fieldName}" is missing required fields structure`);
    return { isValid: !required, errors, warnings, data: required ? undefined : value };
  }

  // Validate file URL exists
  if (!value.fields.file.url) {
    warnings.push(`Asset "${fieldName}" is missing file URL`);
  }

  return { isValid: true, errors, warnings, data: value };
}

/**
 * Validate rich text content
 * 
 * @function validateRichText
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error messages
 * @param {boolean} required - Whether rich text is required
 * @returns {ValidationResult} Validation result
 */
function validateRichText(
  value: any, 
  fieldName: string, 
  required: boolean = false
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === undefined || value === null) {
    if (required) {
      errors.push(`Required rich text field "${fieldName}" is missing`);
      return { isValid: false, errors, warnings };
    }
    return { isValid: true, errors, warnings, data: '' };
  }

  // Accept both string and rich text document format
  if (typeof value === 'string') {
    return { isValid: true, errors, warnings, data: value };
  }

  // Validate rich text document structure
  if (typeof value === 'object') {
    if (!value.nodeType || value.nodeType !== 'document') {
      warnings.push(`Rich text field "${fieldName}" has invalid structure`);
    }
    if (!value.content || !Array.isArray(value.content)) {
      warnings.push(`Rich text field "${fieldName}" is missing content array`);
    }
    return { isValid: true, errors, warnings, data: value };
  }

  warnings.push(`Rich text field "${fieldName}" has unexpected type: ${typeof value}`);
  return { isValid: !required, errors, warnings, data: required ? '' : value };
}

/**
 * Validate blog post content type
 * 
 * @function validateBlogPost
 * @param {Entry<any>} entry - Contentful blog post entry
 * @param {ValidationOptions} options - Validation options
 * @returns {ValidationResult} Validation result with sanitized data
 * 
 * @example
 * ```typescript
 * const result = validateBlogPost(contentfulEntry);
 * if (result.isValid) {
 *   // Use result.data safely
 * } else {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */
export function validateBlogPost(
  entry: Entry<any>, 
  options: ValidationOptions = {}
): ValidationResult {
  const { 
    throwOnError = false, 
    logWarnings = import.meta?.env?.DEV, 
    allowDefaults = true,
    contentType = 'blogPost'
  } = options;

  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const fields = entry.fields;

  // Log entry ID for debugging
  if (logWarnings) {
    console.log(`🔍 Validating ${contentType} entry: ${entry.sys.id}`);
  }

  // Validate required fields
  const titleResult = validateRequiredString(fields.title, 'title');
  allErrors.push(...titleResult.errors);
  allWarnings.push(...titleResult.warnings);

  const slugResult = validateRequiredString(fields.slug, 'slug');
  allErrors.push(...slugResult.errors);
  allWarnings.push(...slugResult.warnings);

  const excerptResult = validateRequiredString(fields.excerpt, 'excerpt');
  allErrors.push(...excerptResult.errors);
  allWarnings.push(...excerptResult.warnings);

  const contentResult = validateRichText(fields.content, 'content', true);
  allErrors.push(...contentResult.errors);
  allWarnings.push(...contentResult.warnings);

  // Validate optional fields
  const categoryResult = validateOptionalString(fields.category, 'category', 'general');
  allWarnings.push(...categoryResult.warnings);

  const tagsResult = validateArray(fields.tags, 'tags', []);
  allWarnings.push(...tagsResult.warnings);

  const publishedResult = validateBoolean(fields.published, 'published', false);
  allWarnings.push(...publishedResult.warnings);

  const readingTimeResult = validateNumber(fields.readingTime, 'readingTime', 5);
  allWarnings.push(...readingTimeResult.warnings);

  // Validate asset fields
  const featuredImageResult = validateAsset(fields.featuredImage, 'featuredImage', false);
  allWarnings.push(...featuredImageResult.warnings);

  // Validate author (can be linked entry or object)
  if (fields.author) {
    if (typeof fields.author === 'object' && fields.author.fields) {
      const authorNameResult = validateRequiredString(fields.author.fields.name, 'author.name');
      allWarnings.push(...authorNameResult.warnings);
    }
  }

  // Check for critical errors
  const isValid = allErrors.length === 0;

  // Log warnings in development
  if (logWarnings && allWarnings.length > 0) {
    console.warn(`⚠️ Blog post validation warnings for "${fields.title || entry.sys.id}":`, allWarnings);
  }

  // Throw error if requested
  if (throwOnError && !isValid) {
    throw new Error(`Blog post validation failed: ${allErrors.join(', ')}`);
  }

  return {
    isValid,
    errors: allErrors,
    warnings: allWarnings,
    data: isValid ? entry : undefined
  };
}

/**
 * Validate portfolio entry content type
 * 
 * @function validatePortfolioEntry
 * @param {Entry<any>} entry - Contentful portfolio entry
 * @param {ValidationOptions} options - Validation options
 * @returns {ValidationResult} Validation result with sanitized data
 * 
 * @example
 * ```typescript
 * const result = validatePortfolioEntry(contentfulEntry);
 * if (result.isValid) {
 *   const portfolioData = transformPortfolioEntry(result.data);
 * }
 * ```
 */
export function validatePortfolioEntry(
  entry: Entry<any>, 
  options: ValidationOptions = {}
): ValidationResult {
  const { 
    throwOnError = false, 
    logWarnings = import.meta?.env?.DEV,
    contentType = 'portfolioEntry'
  } = options;

  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const fields = entry.fields;

  if (logWarnings) {
    console.log(`🔍 Validating ${contentType} entry: ${entry.sys.id}`);
  }

  // Validate required fields
  const titleResult = validateRequiredString(fields.title, 'title');
  allErrors.push(...titleResult.errors);
  allWarnings.push(...titleResult.warnings);

  const descriptionResult = validateRequiredString(fields.description, 'description');
  allErrors.push(...descriptionResult.errors);
  allWarnings.push(...descriptionResult.warnings);

  const categoryResult = validateRequiredString(fields.category, 'category');
  allErrors.push(...categoryResult.errors);
  allWarnings.push(...categoryResult.warnings);

  // Validate image arrays
  const imagesResult = validateArray(fields.images, 'images', []);
  allWarnings.push(...imagesResult.warnings);
  
  if (imagesResult.data && imagesResult.data.length === 0) {
    allWarnings.push('Portfolio entry has no images - this may affect display');
  }

  // Validate featured image
  const featuredImageResult = validateAsset(fields.featuredImage, 'featuredImage', false);
  allWarnings.push(...featuredImageResult.warnings);

  // Validate optional fields
  const detailedDescriptionResult = validateRichText(fields.detailedDescription, 'detailedDescription', false);
  allWarnings.push(...detailedDescriptionResult.warnings);

  const tagsResult = validateArray(fields.tags, 'tags', []);
  allWarnings.push(...tagsResult.warnings);

  const featuredResult = validateBoolean(fields.featured, 'featured', false);
  allWarnings.push(...featuredResult.warnings);

  const displayOrderResult = validateNumber(fields.displayOrder, 'displayOrder', 0);
  allWarnings.push(...displayOrderResult.warnings);

  // Check for critical errors
  const isValid = allErrors.length === 0;

  if (logWarnings && allWarnings.length > 0) {
    console.warn(`⚠️ Portfolio entry validation warnings for "${fields.title || entry.sys.id}":`, allWarnings);
  }

  if (throwOnError && !isValid) {
    throw new Error(`Portfolio entry validation failed: ${allErrors.join(', ')}`);
  }

  return {
    isValid,
    errors: allErrors,
    warnings: allWarnings,
    data: isValid ? entry : undefined
  };
}

/**
 * Validate about page content type
 * 
 * @function validateAboutPage
 * @param {Entry<any>} entry - Contentful about page entry
 * @param {ValidationOptions} options - Validation options
 * @returns {ValidationResult} Validation result with sanitized data
 * 
 * @example
 * ```typescript
 * const result = validateAboutPage(contentfulEntry);
 * if (!result.isValid) {
 *   console.error('About page validation failed:', result.errors);
 * }
 * ```
 */
export function validateAboutPage(
  entry: Entry<any>, 
  options: ValidationOptions = {}
): ValidationResult {
  const { 
    throwOnError = false, 
    logWarnings = import.meta?.env?.DEV,
    contentType = 'aboutPage'
  } = options;

  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const fields = entry.fields;

  if (logWarnings) {
    console.log(`🔍 Validating ${contentType} entry: ${entry.sys.id}`);
  }

  // Validate hero section
  const heroTitleResult = validateOptionalString(fields.heroTitle, 'heroTitle', 'About Ash Shaw');
  allWarnings.push(...heroTitleResult.warnings);

  const heroSubtitleResult = validateOptionalString(fields.heroSubtitle, 'heroSubtitle', 'makeup artist');
  allWarnings.push(...heroSubtitleResult.warnings);

  const heroDescriptionResult = validateOptionalString(fields.heroDescription, 'heroDescription', '');
  allWarnings.push(...heroDescriptionResult.warnings);

  const heroImageResult = validateAsset(fields.heroImage, 'heroImage', false);
  allWarnings.push(...heroImageResult.warnings);

  // Validate journey section
  const journeyTitleResult = validateOptionalString(fields.journeyTitle, 'journeyTitle', 'My Journey');
  allWarnings.push(...journeyTitleResult.warnings);

  const journeySectionsResult = validateArray(fields.journeySections, 'journeySections', []);
  allWarnings.push(...journeySectionsResult.warnings);

  // Validate services section
  const servicesTitleResult = validateOptionalString(fields.servicesTitle, 'servicesTitle', 'What I Do');
  allWarnings.push(...servicesTitleResult.warnings);

  const servicesDescriptionResult = validateOptionalString(fields.servicesDescription, 'servicesDescription', '');
  allWarnings.push(...servicesDescriptionResult.warnings);

  const serviceListResult = validateArray(fields.serviceList, 'serviceList', []);
  allWarnings.push(...serviceListResult.warnings);

  // Validate philosophy section
  const philosophyTitleResult = validateOptionalString(fields.philosophyTitle, 'philosophyTitle', 'My Approach');
  allWarnings.push(...philosophyTitleResult.warnings);

  const philosophyContentResult = validateOptionalString(fields.philosophyContent, 'philosophyContent', '');
  allWarnings.push(...philosophyContentResult.warnings);

  const philosophyQuoteResult = validateOptionalString(fields.philosophyQuote, 'philosophyQuote', '');
  allWarnings.push(...philosophyQuoteResult.warnings);

  const philosophyImageResult = validateAsset(fields.philosophyImage, 'philosophyImage', false);
  allWarnings.push(...philosophyImageResult.warnings);

  // About page typically doesn't have critical required fields
  const isValid = allErrors.length === 0;

  if (logWarnings && allWarnings.length > 0) {
    console.warn(`⚠️ About page validation warnings:`, allWarnings);
  }

  if (throwOnError && !isValid) {
    throw new Error(`About page validation failed: ${allErrors.join(', ')}`);
  }

  return {
    isValid,
    errors: allErrors,
    warnings: allWarnings,
    data: isValid ? entry : undefined
  };
}

/**
 * Validate homepage content type
 * 
 * @function validateHomepage
 * @param {Entry<any>} entry - Contentful homepage entry
 * @param {ValidationOptions} options - Validation options
 * @returns {ValidationResult} Validation result with sanitized data
 * 
 * @example
 * ```typescript
 * const result = validateHomepage(contentfulEntry, { throwOnError: true });
 * // Will throw if validation fails
 * const homepageData = transformHomepageEntry(result.data);
 * ```
 */
export function validateHomepage(
  entry: Entry<any>, 
  options: ValidationOptions = {}
): ValidationResult {
  const { 
    throwOnError = false, 
    logWarnings = import.meta?.env?.DEV,
    contentType = 'homepage'
  } = options;

  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const fields = entry.fields;

  if (logWarnings) {
    console.log(`🔍 Validating ${contentType} entry: ${entry.sys.id}`);
  }

  // Validate hero section
  const heroTitleResult = validateOptionalString(fields.heroTitle, 'heroTitle', "Hi, I'm Ash Shaw");
  allWarnings.push(...heroTitleResult.warnings);

  const heroSubtitleResult = validateOptionalString(fields.heroSubtitle, 'heroSubtitle', 'makeup artist');
  allWarnings.push(...heroSubtitleResult.warnings);

  const heroDescriptionResult = validateOptionalString(fields.heroDescription, 'heroDescription', '');
  allWarnings.push(...heroDescriptionResult.warnings);

  const heroCtaResult = validateOptionalString(fields.heroCta, 'heroCta', 'Explore My Portfolio');
  allWarnings.push(...heroCtaResult.warnings);

  const heroImagesResult = validateArray(fields.heroImages, 'heroImages', []);
  allWarnings.push(...heroImagesResult.warnings);

  // Validate featured section
  const featuredTitleResult = validateOptionalString(fields.featuredTitle, 'featuredTitle', 'Featured Work');
  allWarnings.push(...featuredTitleResult.warnings);

  const featuredDescriptionResult = validateOptionalString(fields.featuredDescription, 'featuredDescription', '');
  allWarnings.push(...featuredDescriptionResult.warnings);

  // Validate philosophy section
  const philosophyTitleResult = validateOptionalString(fields.philosophyTitle, 'philosophyTitle', 'Why I Do Makeup');
  allWarnings.push(...philosophyTitleResult.warnings);

  const philosophyCardsResult = validateArray(fields.philosophyCards, 'philosophyCards', []);
  allWarnings.push(...philosophyCardsResult.warnings);

  // Homepage typically doesn't have critical required fields
  const isValid = allErrors.length === 0;

  if (logWarnings && allWarnings.length > 0) {
    console.warn(`⚠️ Homepage validation warnings:`, allWarnings);
  }

  if (throwOnError && !isValid) {
    throw new Error(`Homepage validation failed: ${allErrors.join(', ')}`);
  }

  return {
    isValid,
    errors: allErrors,
    warnings: allWarnings,
    data: isValid ? entry : undefined
  };
}

/**
 * Batch validate multiple entries
 * 
 * @function batchValidate
 * @param {Entry<any>[]} entries - Array of Contentful entries
 * @param {Function} validator - Validation function to use
 * @param {ValidationOptions} options - Validation options
 * @returns {Object} Batch validation results
 * 
 * @example
 * ```typescript
 * const results = batchValidate(blogPosts, validateBlogPost);
 * console.log(`Valid: ${results.valid.length}, Invalid: ${results.invalid.length}`);
 * ```
 */
export function batchValidate(
  entries: Entry<any>[],
  validator: (entry: Entry<any>, options?: ValidationOptions) => ValidationResult,
  options: ValidationOptions = {}
): {
  valid: Entry<any>[];
  invalid: Entry<any>[];
  totalErrors: number;
  totalWarnings: number;
  results: ValidationResult[];
} {
  const results = entries.map(entry => validator(entry, options));
  
  const valid = entries.filter((_, index) => results[index].isValid);
  const invalid = entries.filter((_, index) => !results[index].isValid);
  
  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

  return {
    valid,
    invalid,
    totalErrors,
    totalWarnings,
    results
  };
}

/**
 * Type guard to check if entry is a valid blog post
 * 
 * @function isBlogPost
 * @param {any} entry - Entry to check
 * @returns {boolean} Whether entry is a valid blog post
 */
export function isBlogPost(entry: any): entry is Entry<any> {
  if (!entry || !entry.sys || !entry.fields) return false;
  const result = validateBlogPost(entry, { throwOnError: false, logWarnings: false });
  return result.isValid;
}

/**
 * Type guard to check if entry is a valid portfolio entry
 * 
 * @function isPortfolioEntry
 * @param {any} entry - Entry to check
 * @returns {boolean} Whether entry is a valid portfolio entry
 */
export function isPortfolioEntry(entry: any): entry is Entry<any> {
  if (!entry || !entry.sys || !entry.fields) return false;
  const result = validatePortfolioEntry(entry, { throwOnError: false, logWarnings: false });
  return result.isValid;
}

/**
 * Get validation summary for reporting
 * 
 * @function getValidationSummary
 * @param {ValidationResult} result - Validation result
 * @returns {string} Human-readable validation summary
 */
export function getValidationSummary(result: ValidationResult): string {
  const parts: string[] = [];
  
  if (result.isValid) {
    parts.push('✅ Validation passed');
  } else {
    parts.push('❌ Validation failed');
  }
  
  if (result.errors.length > 0) {
    parts.push(`${result.errors.length} error(s)`);
  }
  
  if (result.warnings.length > 0) {
    parts.push(`${result.warnings.length} warning(s)`);
  }
  
  return parts.join(' - ');
}
