# Contentful CMS Integration Guide
## Ash Shaw Makeup Portfolio

This guide provides comprehensive instructions for setting up and managing your Contentful CMS integration for the Ash Shaw Makeup Portfolio website.

## 🎯 Overview

The portfolio now includes a powerful content management system that allows you to:
- **Update portfolio content** without touching code
- **Manage hero sections** and featured content dynamically
- **Add new portfolio entries** with rich metadata
- **Control featured work** across the site
- **Update about page content** including journey sections
- **Optimize images** automatically via Contentful's delivery API

## 📋 Prerequisites

1. **Contentful Account**: Sign up at [contentful.com](https://www.contentful.com/)
2. **Space Created**: Create a new Contentful space for the portfolio
3. **Access Tokens**: Generate Content Delivery API keys

## 🔧 Initial Setup

### Step 1: Create Contentful Space

1. Log into your Contentful account
2. Click "Create Space" → "Free" → "I want to manage content"
3. Name your space (e.g., "Ash Shaw Portfolio")
4. Choose your organization

### Step 2: Get API Credentials

1. Go to **Settings** → **API keys**
2. Click **Add API key**
3. Name it "Portfolio Website"
4. Copy the **Space ID** and **Content Delivery API access token**

### Step 3: Configure Environment Variables

The system will prompt you to enter these credentials:
- **VITE_CONTENTFUL_SPACE_ID**: Your Contentful space ID
- **VITE_CONTENTFUL_ACCESS_TOKEN**: Your Content Delivery API access token

## 📝 Content Models Setup

You need to create these content models in Contentful:

### 1. Portfolio Entry

**Content model ID**: `portfolioEntry`

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Title | `title` | Short text | Yes | Portfolio entry title |
| Description | `description` | Short text | Yes | Brief description |
| Detailed Description | `detailedDescription` | Long text | No | Extended description |
| Category | `category` | Short text | Yes | Category (festival, uv, editorial, etc.) |
| Images | `images` | Media (multiple) | Yes | Gallery images |
| Featured Image | `featuredImage` | Media | Yes | Main preview image |
| Tags | `tags` | Short text (list) | No | Searchable tags |
| Created Date | `createdDate` | Date & time | No | Creation date |
| Featured | `featured` | Boolean | No | Show on homepage |
| Display Order | `displayOrder` | Integer | No | Sort order |

### 2. Homepage Content

**Content model ID**: `homepage`

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Hero Title | `heroTitle` | Short text | Yes | Main hero title |
| Hero Subtitle | `heroSubtitle` | Short text | No | Hero subtitle |
| Hero Description | `heroDescription` | Long text | Yes | Hero description |
| Hero CTA Text | `heroCta` | Short text | No | Call-to-action button text |
| Hero Images | `heroImages` | Media (multiple) | No | Background images |
| Featured Title | `featuredTitle` | Short text | No | Featured section title |
| Featured Description | `featuredDescription` | Long text | No | Featured section description |

### 3. About Page Content

**Content model ID**: `aboutPage`

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Hero Title | `heroTitle` | Short text | Yes | About hero title |
| Hero Subtitle | `heroSubtitle` | Short text | No | About hero subtitle |
| Hero Description | `heroDescription` | Long text | Yes | About hero description |
| Hero Image | `heroImage` | Media | No | About hero image |
| Journey Title | `journeyTitle` | Short text | No | Journey section title |
| Journey Sections | `journeySections` | Reference (multiple) | No | Journey timeline entries |

### 4. Journey Section (Referenced by About Page)

**Content model ID**: `journeySection`

| Field Name | Field ID | Type | Required | Description |
|------------|----------|------|----------|-------------|
| Year | `year` | Short text | Yes | Timeline year |
| Title | `title` | Short text | Yes | Section title |
| Description | `description` | Long text | Yes | Section content |
| Image | `image` | Media | No | Section image |

## 🎨 Content Management Workflow

### Adding Portfolio Entries

1. **Go to Content** → **Add entry** → **Portfolio Entry**
2. **Fill in details**:
   - **Title**: Clear, descriptive name
   - **Description**: Brief one-liner for cards
   - **Category**: Use consistent categories (festival, uv, editorial, nails)
   - **Images**: Upload high-quality images (recommended: 1200x800px minimum)
   - **Featured Image**: Choose the best representative image
   - **Tags**: Add relevant searchable tags
   - **Featured**: Check to show on homepage
   - **Display Order**: Lower numbers appear first

3. **Publish** when ready

### Managing Homepage Content

1. **Go to Content** → Find your **Homepage** entry
2. **Update**:
   - **Hero sections** with new text or images
   - **Call-to-action** button text
   - **Featured section** descriptions

3. **Publish** changes

### Updating About Page

1. **Go to Content** → Find your **About Page** entry
2. **Modify**:
   - **Hero content** with new messaging
   - **Journey sections** by editing referenced entries

3. **Publish** changes

## 🖼️ Image Management

### Image Guidelines

- **Format**: JPG or PNG (WebP conversion automatic)
- **Minimum Size**: 1200x800px for portfolio images
- **Maximum Size**: 5MB per image
- **Aspect Ratio**: 3:2 or 4:3 recommended for best display

### Image Optimization

Images are automatically optimized by Contentful's delivery API:
- **WebP conversion** for supported browsers
- **Responsive sizing** based on device
- **Quality optimization** for faster loading
- **CDN delivery** for global performance

### Alt Text Best Practices

Always include descriptive alt text:
- ✅ "Festival makeup with UV-reactive pink and blue geometric patterns"
- ❌ "Makeup photo 1"

## 🔄 Content Publishing

### Draft vs Published

- **Draft**: Content visible only in Contentful, not on website
- **Published**: Content live on website
- **Changed**: Published content with unpublished changes

### Publishing Workflow

1. **Create/Edit** content in draft state
2. **Preview** if needed (use preview API)
3. **Publish** when ready for website
4. **Update** appears on website within 5 minutes (cached)

## 🚀 Advanced Features

### Content Delivery

- **Global CDN**: Fast delivery worldwide
- **Automatic Caching**: 5-minute cache for performance
- **Background Refresh**: Content updates without user action
- **Offline Support**: Cached content available offline

### SEO Optimization

Portfolio entries support SEO metadata:
- **Meta Title**: Custom page title
- **Meta Description**: Search result snippet
- **Keywords**: Searchable terms

### Rich Text Support

Long text fields support:
- **Bold** and *italic* formatting
- **Links** to external sites
- **Line breaks** and paragraphs
- **Lists** (bullet and numbered)

## 🔧 Troubleshooting

### Common Issues

#### "Content not loading"
1. Check internet connection
2. Verify API credentials in environment variables
3. Ensure content is published (not draft)
4. Check browser console for errors

#### "Images not displaying"
1. Verify image upload completed in Contentful
2. Check image file size (max 5MB)
3. Ensure alt text is provided
4. Try republishing the entry

#### "Changes not appearing"
1. Wait 5 minutes for cache refresh
2. Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
3. Check that content is published, not draft
4. Verify correct space ID and access token

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Contentful not available" | API credentials missing | Check environment variables |
| "Content not found" | Entry deleted or unpublished | Republish or recreate content |
| "Rate limit exceeded" | Too many API calls | Wait and try again |

## 📱 Mobile Considerations

- **Images**: Automatically resized for mobile
- **Text**: Responsive typography scales down
- **Navigation**: Touch-friendly interface
- **Performance**: Optimized loading on slow connections

## 🔒 Security & Best Practices

### API Key Security

- **Never commit** API keys to code repositories
- **Use environment variables** for all credentials
- **Regenerate keys** if compromised
- **Use read-only** Content Delivery API (not Management API)

### Content Guidelines

- **Consistent naming**: Use clear, descriptive titles
- **Regular backups**: Export content periodically
- **Media organization**: Create folders for different content types
- **Quality control**: Review content before publishing

### Performance Optimization

- **Image compression**: Optimize before upload when possible
- **Selective updates**: Only change what's necessary
- **Cache awareness**: Consider 5-minute cache delay
- **Mobile-first**: Test on mobile devices

## 📞 Support

For technical issues with the Contentful integration:

1. **Check this guide** first
2. **Browser console** for error details
3. **Contentful documentation** at [contentful.com/developers](https://www.contentful.com/developers/)
4. **Contact developer** with specific error messages

## 🚀 Future Enhancements

Planned improvements to the CMS integration:

- **Preview mode** for draft content
- **Workflow management** for content approval
- **Multi-language support** for international audiences
- **Advanced SEO** features and analytics integration
- **Social media** integration for cross-platform publishing

---

*This integration transforms your static portfolio into a dynamic, manageable website that grows with your artistic journey. Update content anytime, anywhere, without touching a single line of code.*