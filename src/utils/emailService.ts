/**
 * @fileoverview Email service integration using EmailJS for Ash Shaw Makeup Portfolio
 * Handles contact form submissions with professional email templates and auto-replies.
 * 
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import emailjs from '@emailjs/browser';

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Email service response interface
 */
export interface EmailServiceResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * EmailJS configuration
 * These values should be set up in your EmailJS dashboard:
 * 1. Create an EmailJS account at https://www.emailjs.com/
 * 2. Add your email service (Gmail, Outlook, etc.)
 * 3. Create email templates for both contact form and auto-reply
 * 4. Replace these placeholder values with your actual EmailJS IDs
 */
const EMAILJS_CONFIG = {
  serviceId: 'service_ash_shaw_makeup', // Replace with your EmailJS service ID
  templateId: 'template_contact_form',   // Replace with your EmailJS template ID
  autoReplyTemplateId: 'template_auto_reply', // Replace with your auto-reply template ID
  publicKey: 'your_emailjs_public_key'   // Replace with your EmailJS public key
};

/**
 * Initialize EmailJS with public key
 * This should be called once when the app starts
 */
export const initializeEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

/**
 * Send contact form email using EmailJS
 * 
 * This function sends two emails:
 * 1. Notification email to Ash Shaw with contact form details
 * 2. Auto-reply confirmation email to the sender
 * 
 * @param formData - The contact form data containing name, email, and message
 * @returns Promise<EmailServiceResponse> - Success/failure status with message
 * 
 * @example
 * ```typescript
 * const result = await sendContactForm({
 *   name: "John Doe",
 *   email: "john@example.com", 
 *   message: "Hello Ash, I'd love to book a consultation!"
 * });
 * 
 * if (result.success) {
 *   console.log(result.message);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export const sendContactForm = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  try {
    // Validate form data
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
        error: 'Missing required form fields'
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
        error: 'Invalid email format'
      };
    }

    // Send main notification email to Ash Shaw
    const mainEmailResponse = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'hello@ashshaw.makeup', // Ash Shaw's email
        reply_to: formData.email,
        subject: `New Contact Form Submission from ${formData.name}`,
        // Additional context for the email
        website_source: 'makeup-by-ashshaw.netlify.app',
        submission_time: new Date().toLocaleString(),
      },
      EMAILJS_CONFIG.publicKey
    );

    console.log('Main email sent successfully:', mainEmailResponse);

    // Send auto-reply confirmation email to the sender
    try {
      const autoReplyResponse = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.autoReplyTemplateId,
        {
          to_name: formData.name,
          to_email: formData.email,
          from_name: 'Ash Shaw',
          website_url: 'https://makeup-by-ashshaw.netlify.app',
          portfolio_url: 'https://makeup-by-ashshaw.netlify.app/portfolio',
          about_url: 'https://makeup-by-ashshaw.netlify.app/about',
        },
        EMAILJS_CONFIG.publicKey
      );

      console.log('Auto-reply email sent successfully:', autoReplyResponse);
    } catch (autoReplyError) {
      // Don't fail the main submission if auto-reply fails
      console.warn('Auto-reply email failed, but main email was sent:', autoReplyError);
    }

    return {
      success: true,
      message: 'Message sent successfully! You should receive a confirmation email shortly.'
    };

  } catch (error) {
    console.error('EmailJS error:', error);
    
    // Handle specific EmailJS errors
    let errorMessage = 'Failed to send message. Please try again.';
    
    if (error instanceof Error) {
      if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('template')) {
        errorMessage = 'Email configuration error. Please contact support.';
      } else if (error.message.includes('limit')) {
        errorMessage = 'Email limit reached. Please try again later.';
      }
    }

    return {
      success: false,
      message: errorMessage,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Validate EmailJS configuration
 * Call this function to check if EmailJS is properly configured
 * 
 * @returns boolean - True if configuration appears valid
 */
export const validateEmailJSConfig = (): boolean => {
  const { serviceId, templateId, autoReplyTemplateId, publicKey } = EMAILJS_CONFIG;
  
  const isValid = 
    serviceId !== 'service_ash_shaw_makeup' &&
    templateId !== 'template_contact_form' &&
    autoReplyTemplateId !== 'template_auto_reply' &&
    publicKey !== 'your_emailjs_public_key' &&
    serviceId.length > 0 &&
    templateId.length > 0 &&
    publicKey.length > 0;

  // Only show warning in development mode, not as an error
  if (!isValid && process.env.NODE_ENV === 'development') {
    console.info('💡 EmailJS Demo Mode: Using simulated email sending. To enable real emails, configure EmailJS credentials in emailService.ts');
  }

  return isValid;
};

/**
 * Demo mode for development/testing
 * When EmailJS is not configured, this simulates email sending
 */
export const sendContactFormDemo = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  console.log('📧 Contact form submitted (demo mode):', {
    name: formData.name,
    email: formData.email,
    message: formData.message.substring(0, 100) + (formData.message.length > 100 ? '...' : '')
  });
  
  // Simulate realistic network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    message: 'Message sent successfully! You should receive a confirmation email shortly.'
  };
};