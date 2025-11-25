/**
 * @fileoverview Hono web server for Ash Shaw Makeup Portfolio backend services
 * Handles SendGrid email integration and other API endpoints.
 */

import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js';

const app = new Hono();

// CORS and logging middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Initialize Supabase client for auth validation
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

/**
 * SendGrid email endpoint for contact form submissions
 * Handles both notification emails to Ash Shaw and auto-reply confirmations
 */
app.post('/contact', async (c) => {
  try {
    // Parse body as JSON or form-encoded
    const contentType = c.req.header('content-type') || '';
    let payload: any = {};
    if (contentType.includes('application/json')) {
      payload = await c.req.json();
    } else {
      // supports application/x-www-form-urlencoded or multipart/form-data
      payload = Object.fromEntries(await c.req.parseBody());
    }
    const body = payload;
    
    // Basic honeypot check (simple bot detection)
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      // Bot detected - return success but don't send email
      return c.json({ success: true, message: 'Message received.' });
    }

    const { name, email, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields',
        message: 'Please fill in all required fields.'
      }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({
        success: false,
        error: 'Invalid email format',
        message: 'Please enter a valid email address.'
      }, 400);
    }

    const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY');
    if (!sendGridApiKey) {
      console.error('SendGrid API key not configured');
      return c.json({
        success: false,
        error: 'Email service not configured',
        message: 'Email service is temporarily unavailable. Please try again later.'
      }, 500);
    }

    // SendGrid API endpoint
    const sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';
    
    // Current timestamp for email context
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Zurich',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Use env vars so we don't hard-code addresses
    const TO_EMAIL   = Deno.env.get('TO_EMAIL')   || 'ashley@ashshaw.makeup';
    const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@ashshaw.makeup';

    try {
      // 1. Send notification email to Ash Shaw
      const notificationEmail = {
        personalizations: [{
          to: [{ email: TO_EMAIL, name: 'Ash Shaw' }],
          subject: `New Portfolio Enquiry from ${name}`
        }],
        from: { email: FROM_EMAIL, name: 'Ash Shaw Portfolio' },
        reply_to: { email: email, name: name },
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background-color: #faf7f5;">
              <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <h1 style="font-family: 'Playfair Display', serif; color: #1a1a1a; margin: 0 0 24px; font-size: 28px; font-weight: 700;">New Portfolio Enquiry</h1>
                
                <div style="margin-bottom: 24px; padding: 20px; background: #f8f4f1; border-radius: 12px; border-left: 4px solid #d946ef;">
                  <h2 style="margin: 0 0 12px; color: #1a1a1a; font-size: 18px; font-weight: 600;">Contact Details</h2>
                  <p style="margin: 8px 0; color: #374151;"><strong>Name:</strong> ${name}</p>
                  <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #d946ef; text-decoration: none;">${email}</a></p>
                  <p style="margin: 8px 0; color: #6b7280; font-size: 14px;"><strong>Submitted:</strong> ${timestamp}</p>
                </div>

                <div style="margin-bottom: 24px;">
                  <h2 style="margin: 0 0 12px; color: #1a1a1a; font-size: 18px; font-weight: 600;">Message</h2>
                  <div style="background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.6;">${message}</div>
                </div>

                <div style="padding: 20px; background: linear-gradient(135deg, #d946ef 0%, #f59e0b 100%); border-radius: 12px; text-align: center;">
                  <p style="margin: 0; color: white; font-weight: 500;">Reply directly to this email to respond to ${name}</p>
                </div>
              </div>
              
              <div style="text-align: center; padding: 20px 0; color: #6b7280; font-size: 12px;">
                <p style="margin: 0;">Sent from Makeup by Ash Shaw Portfolio</p>
                <p style="margin: 4px 0 0;"><a href="https://makeup-by-ashshaw.figma.site" style="color: #d946ef; text-decoration: none;">makeup-by-ashshaw.figma.site</a></p>
              </div>
            </div>
          `
        }],
        categories: ['portfolio-enquiry'],
        custom_args: {
          source: 'portfolio-contact-form',
          enquiry_type: 'general'
        }
      };

      const notificationResponse = await fetch(sendGridUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendGridApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationEmail)
      });

      if (!notificationResponse.ok) {
        const errorData = await notificationResponse.text();
        console.error('SendGrid notification email error:', errorData);
        throw new Error(`SendGrid API error: ${notificationResponse.status}`);
      }

      console.log('Notification email sent successfully to Ash Shaw');

      // 2. Send auto-reply confirmation to the sender
      const autoReplyEmail = {
        personalizations: [{
          to: [{ email: email, name: name }],
          subject: `Thanks for your message, ${name} 💌`
        }],
        from: { email: FROM_EMAIL, name: 'Ash Shaw' },
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background-color: #faf7f5;">
              <div style="background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <h1 style="font-family: 'Playfair Display', serif; color: #1a1a1a; margin: 0 0 24px; font-size: 28px; font-weight: 700;">Thanks for reaching out! 💌</h1>
                
                <p style="color: #374151; line-height: 1.6; margin: 0 0 20px; font-size: 16px;">Hi ${name},</p>
                
                <p style="color: #374151; line-height: 1.6; margin: 0 0 20px; font-size: 16px;">
                  Thank you for your interest in my makeup artistry work! I've received your message and I'm excited to learn more about your vision.
                </p>
                
                <div style="background: linear-gradient(135deg, #d946ef 0%, #f59e0b 100%); padding: 24px; border-radius: 12px; margin: 24px 0;">
                  <p style="color: white; margin: 0; text-align: center; font-weight: 500; font-size: 16px;">
                    I'll get back to you within 24 hours ✨
                  </p>
                </div>
                
                <p style="color: #374151; line-height: 1.6; margin: 0 0 20px; font-size: 16px;">
                  In the meantime, feel free to explore my portfolio to see more of my festival makeup, UV artistry, and creative work:
                </p>
                
                <div style="text-align: center; margin: 24px 0;">
                  <a href="https://makeup-by-ashshaw.figma.site/portfolio" style="display: inline-block; background: linear-gradient(135deg, #d946ef 0%, #f59e0b 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin: 0 8px 8px 0;">View Portfolio</a>
                  <a href="https://makeup-by-ashshaw.figma.site/about" style="display: inline-block; background: transparent; color: #d946ef; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; border: 2px solid #d946ef;">About Me</a>
                </div>
                
                <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
                  <p style="color: #374151; line-height: 1.6; margin: 0 0 8px; font-size: 16px;">Looking forward to creating magic together!</p>
                  <p style="color: #6b7280; margin: 0; font-style: italic;">— Ash Shaw</p>
                  <p style="color: #6b7280; margin: 4px 0 0; font-size: 14px;">Festival Makeup Artist & Creative Visionary</p>
                </div>
              </div>
              
              <div style="text-align: center; padding: 20px 0; color: #6b7280; font-size: 12px;">
                <p style="margin: 0;">Makeup by Ash Shaw</p>
                <p style="margin: 4px 0 0;"><a href="https://makeup-by-ashshaw.figma.site" style="color: #d946ef; text-decoration: none;">makeup-by-ashshaw.figma.site</a></p>
              </div>
            </div>
          `
        }],
        categories: ['portfolio-auto-reply'],
        custom_args: {
          source: 'portfolio-contact-form',
          type: 'auto-reply'
        }
      };

      const autoReplyResponse = await fetch(sendGridUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendGridApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(autoReplyEmail)
      });

      if (!autoReplyResponse.ok) {
        const errorData = await autoReplyResponse.text();
        console.warn('SendGrid auto-reply email error (non-critical):', errorData);
        // Don't fail the main request if auto-reply fails
      } else {
        console.log('Auto-reply email sent successfully to sender');
      }

      return c.json({
        success: true,
        message: 'Message sent successfully! You should receive a confirmation email shortly.'
      });

    } catch (sendGridError) {
      console.error('SendGrid API error:', sendGridError);
      return c.json({
        success: false,
        error: 'Email delivery failed',
        message: 'Failed to send email. Please try again or contact me directly at ashley@ashshaw.makeup'
      }, 500);
    }

  } catch (error) {
    console.error('Contact form submission error:', error);
    return c.json({
      success: false,
      error: 'Server error',
      message: 'An unexpected error occurred. Please try again.'
    }, 500);
  }
});

/**
 * Health check endpoint with comprehensive service status monitoring
 * Provides detailed information about service availability and configuration
 */
app.get('/health', (c) => {
  try {
    const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY');
    const hasEmailService = !!sendGridApiKey;
    
    console.log('🔍 Health check requested:', {
      timestamp: new Date().toISOString(),
      emailServiceConfigured: hasEmailService,
      userAgent: c.req.header('User-Agent') || 'Unknown'
    });

    return c.json({ 
      status: 'healthy', 
      service: 'ash-shaw-portfolio-api',
      version: '2.2.0',
      features: {
        emailService: hasEmailService,
        contactForm: true,
        honeypotProtection: true
      },
      timestamp: new Date().toISOString(),
      environment: Deno.env.get('NODE_ENV') || 'development'
    });
  } catch (error) {
    console.error('Health check error:', error);
    return c.json({
      status: 'error',
      service: 'ash-shaw-portfolio-api',
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    }, 500);
  }
});

// Start the server
Deno.serve(app.fetch);