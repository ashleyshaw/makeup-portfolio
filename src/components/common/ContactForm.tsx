/**
 * @fileoverview Contact form component for Ash Shaw Makeup Portfolio
 * Provides accessible contact form with validation, submission states, and success messages.
 * Features form validation, loading states, simulated email sending, and auto-reset functionality.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { SOCIAL_LINKS } from "./Constants";

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
 * Contact form component with comprehensive validation and submission handling
 *
 * Features:
 * - Form validation for required fields (name, email, message)
 * - Loading state with animated spinner during submission
 * - Success state with personalized thank you message
 * - Simulated email sending to both recipient and user
 * - Automatic form reset after successful submission
 * - Accessible form elements with proper labeling
 * - Responsive design with fluid spacing and gradient styling
 *
 * @param {ContactFormProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 *
 * @returns {JSX.Element} Contact form or success message based on state
 *
 * @accessibility
 * - Required field validation with screen reader feedback
 * - Proper form labeling with placeholder text
 * - Loading state announced to assistive technologies
 * - Focus management during state transitions
 * - High contrast support for form elements
 *
 * @example
 * <ContactForm className="max-w-md mx-auto" />
 */
export function ContactForm({
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  };

  /**
   * Handles form submission with validation and simulated email sending
   *
   * Process:
   * 1. Validates all required fields are filled
   * 2. Sets loading state with visual feedback
   * 3. Simulates email sending to both recipient and sender
   * 4. Shows success message for 5 seconds
   * 5. Automatically resets form to initial state
   *
   * @param {React.FormEvent} e - Form submission event
   *
   * @note In production, replace setTimeout with actual email service integration
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission with realistic delay
    setTimeout(() => {
      // In a real app, you would send the email here
      console.log("Form submitted:", formData);
      console.log(`Email sent to ashley@lightspeedwp.agency:`, {
        subject: `New contact form submission from ${formData.name}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      });
      console.log(`Confirmation sent to ${formData.email}`);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
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
            A confirmation email has been sent to{" "}
            {formData.email}
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