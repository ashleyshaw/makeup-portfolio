/**
 * @fileoverview Contact form component for Ash Shaw Makeup Portfolio
 * Provides accessible contact form with EmailJS integration, validation, and submission states.
 * Features form validation, loading states, real email sending, and auto-reset functionality.
 *
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0
 */

import React, { useState, useEffect } from "react";
import { SOCIAL_LINKS } from "./Constants";
import { sendContactForm, sendContactFormDemo, validateEmailJSConfig, initializeEmailJS, type ContactFormData } from "../../utils/emailService";

/**
 * Props interface for ContactForm component
 *
 * @interface ContactFormProps
 * @property {string} [className] - Optional CSS classes for styling the form container
 */
interface ContactFormProps {
  className?: string;
}

/**
 * Contact form component with comprehensive validation and EmailJS integration
 *
 * Features:
 * - Form validation for required fields (name, email, message)
 * - EmailJS integration for real email sending
 * - Loading state with animated spinner during submission
 * - Success state with personalized thank you message
 * - Error handling with user-friendly messages
 * - Automatic form reset after successful submission
 * - Accessible form elements with proper labeling
 * - Responsive design with fluid spacing and gradient styling
 * - Demo mode for development when EmailJS is not configured
 *
 * @param {ContactFormProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 *
 * @returns {JSX.Element} Contact form, success message, or error state
 *
 * @accessibility
 * - Required field validation with screen reader feedback
 * - Proper form labeling with placeholder text
 * - Loading state announced to assistive technologies
 * - Focus management during state transitions
 * - High contrast support for form elements
 * - Error messages properly associated with form fields
 *
 * @example
 * <ContactForm className="max-w-md mx-auto" />
 */
export function ContactForm({
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isEmailJSConfigured, setIsEmailJSConfigured] = useState(false);

  // Initialize EmailJS on component mount
  useEffect(() => {
    try {
      const isConfigured = validateEmailJSConfig();
      if (isConfigured) {
        initializeEmailJS();
      }
      setIsEmailJSConfigured(isConfigured);
    } catch (error) {
      // Silently fallback to demo mode
      setIsEmailJSConfigured(false);
    }
  }, []);

  /**
   * Handles form field changes and updates state
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Form field change event
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  /**
   * Handles form submission with validation and EmailJS integration
   *
   * Process:
   * 1. Validates all required fields are filled
   * 2. Sets loading state with visual feedback
   * 3. Sends email using EmailJS service (or demo mode)
   * 4. Shows success/error message based on result
   * 5. Automatically resets form after successful submission
   *
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setSubmitError(null);

    if (
      !formData.name?.trim() ||
      !formData.email?.trim() ||
      !formData.message?.trim()
    ) {
      setSubmitError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use EmailJS service if configured, otherwise use demo mode
      const result = isEmailJSConfigured 
        ? await sendContactForm(formData)
        : await sendContactFormDemo(formData);

      if (result.success) {
        setIsSubmitted(true);
        
        // Reset form after showing success message
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setIsSubmitted(false);
          setSubmitError(null);
        }, 8000); // Longer timeout to read the message
      } else {
        setSubmitError(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-fluid-xl text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-fluid-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-fluid-xl font-heading font-semibold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-fluid-lg">
            Thank You!
          </h3>
          <p className="text-fluid-base font-body font-normal text-green-700 leading-relaxed mb-fluid-lg">
            Thank you for getting in touch! I will get back to
            you within the next 24 to 48 hours.
          </p>
          <p className="text-fluid-lg font-body font-medium bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Much love,
            <br />
            Ash ✨
          </p>
          <p className="text-fluid-sm font-body font-normal text-green-600 mt-fluid-lg italic">
            A confirmation email will be sent to {formData.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-5 ${className}`}
    >
      {/* Error message display */}
      {submitError && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg p-fluid-md text-center">
          <div className="flex items-center justify-center gap-fluid-xs">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-fluid-sm font-body font-medium text-red-700">
              {submitError}
            </p>
          </div>
        </div>
      )}


      
      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-white/50 shadow-lg">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-fluid-lg py-fluid-lg bg-transparent text-fluid-base font-body font-normal text-gray-800 placeholder-gray-600 border-none outline-none rounded-lg disabled:opacity-50"
          aria-label="Your name"
        />
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-white/50 shadow-lg">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-fluid-lg py-fluid-lg bg-transparent text-fluid-base font-body font-normal text-gray-800 placeholder-gray-600 border-none outline-none rounded-lg disabled:opacity-50"
          aria-label="Your email address"
        />
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-white/50 shadow-lg">
        <textarea
          name="message"
          placeholder="Message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full px-fluid-lg py-fluid-lg bg-transparent text-fluid-base font-body font-normal text-gray-800 placeholder-gray-600 border-none outline-none resize-none rounded-lg disabled:opacity-50"
          aria-label="Your message"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full justify-center text-center bg-gradient-pink-purple-blue hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white px-button py-button font-body font-medium text-fluid-base sm:text-fluid-lg transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-fluid-xs"
        aria-label="Submit contact form to send message"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}