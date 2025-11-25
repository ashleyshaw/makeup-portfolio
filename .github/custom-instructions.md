
# Copilot Instructions for Ash Shaw Makeup Portfolio

## 🎯 Project Objective

The primary objective of this project is to convert the existing React website into a fully functional WordPress block theme and block plugin, ensuring feature parity, design fidelity, and best practices for maintainability and extensibility.

## 📂 Project & WordPress Development Instructions

### WordPress Block Theme & Block Plugin

- **Block Theme Development:**
  - See [.github/instructions/block-theme-development.instructions.md](./instructions/block-theme-development.instructions.md)
- **Block Plugin Development:**
  - See [.github/instructions/block-plugin-development.instructions.md](./instructions/block-plugin-development.instructions.md)

### Community & Coding Standards

- [WPCS Instructions (WordPress Coding Standards)](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wpcs.instructions.md)
- [WordPress General Instructions](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wordpress.instructions.md)

### Dynamic Reference for All Instructions

> For the latest and any additional instructions, always check all files in `.github/instructions/`.
> This includes dynamically referencing all files matching `.github/instructions/*.instructions.md` and any subfolders.
> See also the [index of instructions](./instructions/index.md) for a full list.

#### All Instruction Files (auto-discovered)

- `.github/instructions/*.instructions.md` (all instruction files in the folder)
- `.github/instructions/block-plugin/*.md` (block plugin-specific instructions)
- `.github/instructions/block-theme/*.md` (block theme-specific instructions)

#### Additional Key Files

- [Agent Instructions](../.github/agents/agent.md)
- [Chat Modes](../.github/chatmodes/chatmodes.md)
- [Instructions Index](../.github/instructions/index.md)
- [Prompt Library](../.github/prompts/prompts.md)

---

## 🤖 AI Ops & Agent Files

- [AGENTS.md](../AGENTS.md)
- [CLAUDE.md](../CLAUDE.md)
- [GEMINI.md](../GEMINI.md)

---

This is a **React 18 + TypeScript + Vite** portfolio website for makeup artist Ash Shaw, featuring festival artistry, UV-reactive makeup, and comprehensive blog/portfolio management.

## 🏗️ Architecture Overview

### Core Tech Stack

- **Frontend**: React 18.3+ with TypeScript, Vite 6.3+ build system
- **Styling**: Tailwind CSS V4 with extensive custom CSS variables (fluid typography, brand gradients)
- **CMS**: Contentful headless CMS for blog posts and portfolio entries (with static fallbacks)
- **Email**: SendGrid via Supabase Edge Functions (dual email system: notification + auto-reply)
- **UI Components**: shadcn/ui + Radix UI primitives (50+ pre-built accessible components)
- **Deployment**: Netlify CDN with optimized caching and security headers

### Application Structure

**Single-page application with client-side routing** (no React Router - state-based navigation):

- `App.tsx` manages routing via `currentPage` state and conditional rendering
- Pages: Home, About, Portfolio (Main + Detail), Blog (Listing + Post)
- Navigation: `setCurrentPage('blog')` or `navigateToPage('portfolio-detail', 'entry-id')`

### Key Directories

```
src/
├── components/
│   ├── common/          # Header, Footer, ContactForm, Logo, SocialLinks, ModalContext
│   ├── pages/           # HomePage, AboutPage, PortfolioMainPage, BlogPage, BlogPostPage
│   ├── sections/        # HeroSection, FeaturedSection, BlogPreviewSection, etc.
│   └── ui/              # PortfolioCard, PortfolioLightbox, BlogPagination, shadcn components
├── utils/
│   ├── contentfulService.ts     # CMS integration with fallbacks
│   ├── emailService.ts          # SendGrid via Supabase Edge Functions
│   ├── portfolioService.ts      # Static portfolio data management
│   └── timeoutHandler.ts        # Error handling and timeout management
├── hooks/
│   └── useContentful.ts         # React hooks for CMS content
└── supabase/functions/server/   # Edge Functions for email delivery
```

## 🎨 Styling System (CRITICAL)

### Mandatory Styling Rules

**ALWAYS explicitly set ALL styling** - component defaults are unreliable:

```tsx
// ❌ WRONG - May inherit unwanted defaults
<Button>Submit</Button>
<h1>Title</h1>

// ✅ CORRECT - Explicitly styled per guidelines
<button className="w-full sm:w-auto bg-gradient-pink-purple-blue text-white px-button py-button font-body font-medium text-button-fluid rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
  Submit
</button>

<h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue leading-tight">
  Main Title
</h1>
```

### Essential Utility Classes

**Typography** (always specify family + weight + size):

- Font families: `font-heading` (Playfair Display), `font-body` (Inter), `font-title` (Righteous)
- Fluid sizes: `text-hero-h1`, `text-section-h2`, `text-body-guideline`, `text-button-fluid`
- Weights: `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`

**Brand Gradients** (135° diagonal, 3-color stops):

- `bg-gradient-pink-purple-blue` - Primary CTA gradient
- `bg-gradient-blue-teal-green` - Secondary CTA gradient
- `text-gradient-pink-purple-blue` - Gradient text for hero titles

**Spacing** (fluid with clamp()):

- `px-button`, `py-button` - Button padding (clamp-based)
- `py-section` - Section vertical spacing (2rem → 6rem)
- `p-card-responsive` - Card padding with mobile/desktop variants
- `mb-fluid-md`, `gap-fluid-lg` - Fluid margin/gap utilities

### Variable Fonts (Performance Optimized)

- **Inter Variable** (100-900 weights) - Body text, any weight value supported
- **Playfair Display Variable** (400-900 weights) - Headings
- Only **3 font files** vs. previous 11 (73% fewer requests)
- Custom weights: `font-book` (450), `font-demibold` (650), `font-extrabold` (800)

## 🔌 Service Integrations

### Contentful CMS

**Graceful fallback architecture** - app works without CMS configuration:

```typescript
// Always falls back to static data if CMS unavailable
const {
  data: entries,
  loading,
  error,
} = usePortfolioEntries({ category: "festival" });

// Check configuration status
const isContentfulConfigured = useContentfulConfigured();
```

**Content Types**:

- `portfolioEntry` - Image galleries, categories, tags, featured status
- `blogPost` - Title, slug, rich content, author, SEO metadata
- `homepage` / `aboutPage` - Dynamic page content

**Environment Variables** (optional for static fallback):

- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_ACCESS_TOKEN`

### SendGrid Email (via Supabase Edge Functions)

**Production endpoint**: `https://{projectId}.supabase.co/functions/v1/server/contact`

**Dual email system**:

1. Notification to <ashley@ashshaw.makeup> with inquiry details
2. Auto-reply to sender with portfolio links and branding

**Demo mode**: Full functionality without SendGrid setup (perfect for development)

```typescript
const isServiceAvailable = await validateEmailService();
const sendFn = isServiceAvailable ? sendContactForm : sendContactFormDemo;
```

**Security**:

- Honeypot field `website` (hidden, should be empty for real users)
- Input validation and sanitization
- Rate limiting on server side

## 🧩 Component Patterns

### Exports

**Named exports only** (except `App.tsx`):

```typescript
export function ComponentName(props: ComponentProps) {}
export type { ComponentProps };
```

### TypeScript Interfaces

Always define comprehensive props interfaces:

```typescript
interface BlogCardProps {
  /** Post title for display */
  title: string;
  /** URL slug for routing */
  slug: string;
  /** Category badge color */
  category: string;
  /** Callback for navigation */
  onNavigate: (slug: string) => void;
}
```

### Navigation Pattern

```typescript
// Basic page navigation
setCurrentPage("blog");

// With parameters (blog post, portfolio detail)
navigateToPage("blog-post", "festival-makeup-guide-2024");
navigateToPage("portfolio-detail", "berlin-nightclub-uv");

// From child components
<button onClick={() => setCurrentPage("portfolio")}>View Portfolio</button>;
```

### Modal Management

Uses centralized `ModalContext` for all modals:

```typescript
const { openModal, closeModal } = useModal();

// Open portfolio lightbox
openModal("portfolio-lightbox", { images, currentIndex: 0 });

// Close modal
closeModal();
```

## ♿ Accessibility (WCAG 2.1 AA Compliance)

### Mandatory Requirements

1. **Color Contrast**: AAA (7:1) for headings (`text-gray-800`), AA (4.5:1) for body (`text-gray-700`)
2. **Keyboard Navigation**: Tab, Enter, Space, Arrow keys, Escape support
3. **Focus Management**: Visible focus indicators (`focus:ring-4 focus:ring-pink-200`)
4. **ARIA Labels**: Required for non-obvious interactive elements
5. **Screen Reader**: Live regions for dynamic content updates

### Implementation Examples

```tsx
// Button with full accessibility
<button
  className="..."
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  aria-label="Open portfolio gallery with 5 images"
  tabIndex={0}
>
  View Gallery
</button>

// Live region for status updates
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {statusMessage}
</div>
```

## 📝 Documentation Standards

### JSDoc Requirements

Every component must have comprehensive JSDoc:

```typescript
/**
 * PortfolioCard - Display portfolio entry with image carousel
 *
 * Features:
 * - Multi-image carousel with touch gesture support
 * - Category badges and featured image optimization
 * - Keyboard navigation and screen reader support
 *
 * @param {PortfolioCardProps} props - Component properties
 * @returns {JSX.Element} Rendered portfolio card
 *
 * @example
 * <PortfolioCard
 *   entry={portfolioEntry}
 *   onNavigate={handleNavigate}
 * />
 *
 * @accessibility
 * - WCAG 2.1 AA compliant with keyboard navigation
 * - Focus management and ARIA labels for screen readers
 */
export function PortfolioCard({ entry, onNavigate }: PortfolioCardProps) {
  // Implementation
}
```

## 🚀 Development Workflow

### Build Commands

```bash
npm run dev        # Vite dev server on :3000
npm run build      # Production build to /build
npm run preview    # Preview production build
npm run type-check # TypeScript validation
```

### Environment Setup (Optional)

Create `.env` for CMS and email features:

```bash
# Contentful CMS (optional - static fallbacks work without)
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_token

# Supabase (for SendGrid email)
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Common Tasks

**Adding a new blog post** (via CMS):

1. Create entry in Contentful with `blogPost` content type
2. Required: title, slug, excerpt, content, category
3. Set `published: true` when ready
4. Appears automatically in blog listing

**Adding portfolio entry** (via CMS):

1. Create `portfolioEntry` in Contentful
2. Upload images, set category (festival/uv/editorial/nails)
3. Check `featured` for homepage display
4. Set `displayOrder` for sorting

**Creating new page component**:

1. Add to `src/components/pages/{section}/PageName.tsx`
2. Define TypeScript interface for props
3. Add JSDoc with examples and accessibility notes
4. Use explicit brand styling classes (never rely on defaults)
5. Add route to `App.tsx` conditional rendering
6. Update navigation in `Header.tsx`

## 🔧 Troubleshooting

### Common Issues

**"Component styling looks wrong"**

- Ensure ALL utility classes are explicitly set
- Check that brand fonts are specified: `font-heading`, `font-body`, `font-title`
- Verify gradient classes for brand consistency

**"Contentful not loading"**

- Expected behavior: static fallbacks work without CMS
- Check console for configuration status: "Using static content fallback"
- Dev indicator appears when CMS not configured (dev only)

**"Email not sending"**

- Demo mode works without SendGrid setup
- Check Supabase Edge Function deployment status
- Verify environment variables for production

**"Images not displaying"**

- Check Vite alias configuration in `vite.config.ts`
- Contentful images use `https:` protocol prefix
- Unsplash images used in static fallbacks

## 📚 Key Files Reference

**Read these for context**:

- `src/guidelines/Guidelines.md` - Complete design system and brand guidelines
- `src/CONTENTFUL_SETUP_GUIDE.md` - CMS integration guide
- `src/App.tsx` - Routing logic and page management
- `src/utils/contentfulService.ts` - CMS integration with fallbacks
- `src/utils/emailService.ts` - SendGrid implementation

**Component examples**:

- `src/components/common/ContactForm.tsx` - Form with validation and error handling
- `src/components/ui/PortfolioCard.tsx` - Image carousel and keyboard navigation
- `src/components/pages/blog/BlogPostPage.tsx` - Rich content rendering and SEO

---

**When in doubt**: Check `Guidelines.md` for styling patterns, prioritize accessibility compliance, and always use explicit utility classes over component defaults.
