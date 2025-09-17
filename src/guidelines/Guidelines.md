# 🎨 Ash Shaw Makeup Portfolio – Design & Development Guidelines

This document defines the design, content, and technical guidelines for building and maintaining the portfolio site in **Figma Make**.  
It ensures consistency across **homepage, about, portfolio, and contact** pages while reflecting the creative identity of **Ash Shaw**.

---

## 1. Brand Identity

### Logo

- **Text:** “Ash Shaw” in _Playfair Display_ (serif) + _Inter_ (sans-serif) pairing.
- **Icon:** Colourful brushstroke / paintbrush motif.
- **Behaviour:**
  - Links back to **homepage** in header and footer.
  - Scales down gracefully on mobile.
- **Placement:**
  - Header: left-aligned.
  - Footer: left side of bottom row (icons on the right).

### Tagline

_“Makeup that shines with colour, energy, and connection.”_

- Always shown under the logo, in the **hero** section, and repeated in the **footer**.
- Used consistently across web, social media assets, and printed materials.

---

## 2. Typography

### Fonts

- **Headings:** _Playfair Display_
  - Elegant, serif, artistic — conveys creativity.
- **Body:** _Inter_
  - Clean, modern sans-serif — ensures readability on all devices.

### Fluid Typography Scale

Use `clamp()` for all font sizes so text scales smoothly between mobile and desktop:

- **Hero H1:** `clamp(2.25rem, 6vw, 7.5rem)` (≈36px → 120px).
- **H2 Section Titles:** `clamp(1.5rem, 4vw, 3rem)`.
- **Body Text:** `clamp(1rem, 1.5vw, 1.25rem)`.
- **Quotes / Pull Texts:** `clamp(2rem, 5vw, 5rem)`.

### Usage

- Headings: **bold (600–700)**.
- Body: **regular (400)**.
- Quotes: italic or gradient-highlighted.
- Line-height: 1.4–1.6 for body text, 1.2–1.3 for headings.
- Avoid fixed px units — use `rem` or `clamp()`.

---

## 3. Colour Palette

### Base Colours

- White: `#FFFFFF`
- Black: `#000000`
- Neutral Greys: `#F5F5F5`, `#333333`

### Accent Gradients

Inspired by makeup and UV festival looks:

1. **Pink → Purple → Blue**
   - `#FF66CC → #9933FF → #3399FF`
2. **Blue → Teal → Green**
   - `#00BFFF → #20C997 → #32CD32`
3. **Gold → Peach → Coral**
   - `#FFD700 → #FF9966 → #FF5E62`

### Application

- Backgrounds: gradient bands separating sections.
- Buttons: gradient fills with hover animation.
- Cards: gradient borders or subtle accents.
- Icons: gradient strokes/fills.

---

## 4. Layout & Fluid Spacing

### Global Layout

- **Max-width container:** 1200px (desktop).
- **Responsive grids:** CSS Grid + Flexbox.
- **Mobile-first design:** single-column flow on small screens.

### Fluid Spacing

Use `clamp()` for paddings and margins:

- **Card Padding (mobile):** `clamp(0.5rem, 2vw, 1rem)`.
- **Card Padding (desktop):** `clamp(2rem, 5vw, 6rem)`.
- **Section Spacing (vertical rhythm):** `clamp(2rem, 6vw, 6rem)`.
- **Button Padding:** `clamp(0.5rem, 1.5vw, 1rem)` × `clamp(1rem, 2vw, 2rem)`.

### Components

- **Cards:** Rounded corners (`border-radius: 2xl`), soft shadows, gradient borders optional.
- **Containers:** Fluid gutters — min 16px (mobile), up to 48px (desktop).

---

## 5. Homepage

### Hero Section

- Greeting: “Hi, I’m **Ash Shaw**” + tagline.
- Hero image mosaic: overlapping 6 images with soft shadows, spilling over section boundary.
- CTA Button: **“Explore My Portfolio”** (gradient background, hover animation).

### Why I Do Makeup

- Three cards with icons and gradient headers:
  1. **Make People Shine**
  2. **Brings Me Joy**
  3. **To Keep Growing**
- CTA: **“Read My Full Story”** → About page.

### Featured Work

- 3 cards (desktop grid, mobile slider).
- CTA below: **“View Full Portfolio”**.

### Fusion Nails Preview

- 3 cards (slider on mobile, grid on desktop).
- CTA: **“See More Nails”** → Portfolio Nails.

### Footer

- Short About blurb.
- Contact form (inline).
- Social icons (Instagram, Facebook, LinkedIn, Email).
- Bottom row:
  - Left: Logo → homepage.
  - Right: Icons.
  - Separator line above.

---

## 6. About Page

- Full-width stacked sections in translucent cards with gradient frames.
- Sections: Journey, Festivals, Berlin Nights, UV Makeup, Mousse Makeup, Fusion Nails, Creative Process, Looking Forward.
- Pull quotes styled with gradient highlight and enlarged Playfair.

---

## 7. Portfolio Page

- Sections divided with unique gradient headers.
- Desktop: 3-column grid.
- Mobile: single-column flow.
- Images open in lightbox (with caption + description).
- Categories: Featured Work, Festivals, Shankra 2023, Reiserfieber, UV Makeup, Fusion Nails.

---

## 8. Contact Form

### Fields

- Name, Email, Message.
- Gradient button: **“Send Message”**.

### Behaviour

1. Inline success message:  
   _“Thanks for getting in touch! I’ll reply within 24–48 hours. Much love, Ash.”_
2. Confirmation email to user.
3. Notification email to Ash: `ashley@lightspeedwp.agency`.
4. Validation: Required fields, inline error messages (screen-reader accessible).

---

## 9. Button Standards

### Design Specifications

- **Border Radius:** `rounded-lg` (0.625rem) - consistent with `--radius` CSS variable
- **Padding:** Use `px-button py-button` classes for consistent fluid scaling (16px → 54px horizontal, 16px → 32px vertical)
- **Text Alignment:** Always centered with `justify-center text-center`
- **Typography:** `text-button-fluid font-body font-medium` for readable, professional appearance (fluid 20px → 32px)

### Responsive Behavior

- **Primary CTA Buttons:** `w-full sm:w-auto` (100% width on mobile, auto on desktop)
- **Secondary Buttons:** `w-auto` (maintains intrinsic width)
- **Form Buttons:** `w-full sm:w-auto` for better mobile usability

### Interactive States

- **Hover:** Subtle scale transform `hover:scale-105` + gradient shift
- **Focus:** `focus:outline-none focus:ring-4 focus:ring-{color}-200 focus:ring-opacity-50`
- **Active:** Slight scale reduction for tactile feedback

### Gradient Backgrounds

Use guidelines-compliant gradient classes:

- **Pink-Purple-Blue:** `bg-gradient-pink-purple-blue`
- **Blue-Teal-Green:** `bg-gradient-blue-teal-green`
- **Gold-Peach-Coral:** `bg-gradient-gold-peach-coral`

### Button Hierarchy

1. **Primary CTA:** Full gradient background, white text, full mobile width
2. **Secondary Action:** Outline style with gradient border, colored text
3. **Tertiary/Text:** No background, gradient text color

### Accessibility Requirements

- Always include `aria-label` for screen readers when button text is unclear
- Ensure minimum 44px touch target on mobile devices
- Maintain WCAG AA color contrast ratios (4.5:1 minimum)
- Support keyboard navigation with visible focus indicators

---

## 10. Accessibility Guidelines

- Semantic HTML structure (`header`, `main`, `footer`, etc.).
- **Alt text** on all images (describe makeup style/event).
- Colour contrast meets WCAG 2.1 AA.
- **Keyboard support:** menus, modals, lightbox, forms.
- **Mobile menu:** fullscreen overlay, focus trap, escape closes.
- **Lightbox:** focus contained, escape closes, captions accessible.
- **Motion preferences:** respect `prefers-reduced-motion`.
- Forms: ARIA alerts for errors, confirmation message announced to screen readers.

---

## 10. Interaction & Animations

- **Buttons:** hover = subtle grow + gradient shift.
- **Cards:** hover = soft shadow lift.
- **Images:** fade/zoom-in on load.
- **Mobile menu:** slide/fade transition.
- **Lightbox:** fade/zoom with backdrop blur.

---

## 11. Performance & Optimisation

- Use **WebP/AVIF** images under 300kb.
- Lazy-load gallery/portfolio images.
- Responsive `srcset` for hero mosaic.
- Minify CSS/JS.
- Avoid unused CSS (purge via build).

---

## 12. Workflow & Maintenance

- Store constants in `/constants.ts` (social links, image data, metadata).
- Shared components: `Footer`, `Hero`, `Card`, `Lightbox`.
- All portfolio items require:
  - Title
  - Subtitle/Location
  - Alt text
  - Category tag
- Run **Lighthouse** accessibility + performance checks before deployment.

---