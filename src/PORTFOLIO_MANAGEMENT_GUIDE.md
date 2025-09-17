# 🎨 Portfolio Content Management Guide

This guide explains how to manage your portfolio content, add new images, and update existing entries in the Ash Shaw Makeup Portfolio website.

## 📁 File Structure Overview

Your portfolio content is managed in one main file:

- `/components/common/Constants.ts` - Contains all portfolio data, social links, and content

## 🖼️ Adding New Portfolio Entries

### 1. Portfolio Entry Structure

Each portfolio entry follows this structure:

```typescript
{
  id: "unique-identifier",           // Unique ID for the entry
  title: "Entry Title",              // Main title (e.g., "Festival Euphoria")
  subtitle: "Location/Event",        // Subtitle (e.g., "Origin Festival 2024")
  description: "Detailed description", // Full description of the work
  images: [                          // Array of images (supports multiple for slider)
    {
      src: "path/to/image.jpg",       // Image file path
      alt: "Descriptive alt text",    // Alt text for accessibility
      caption: "Short caption",       // Caption shown in lightbox
      description: "Image description" // Detailed description for lightbox
    }
    // Add more images here for slider functionality
  ],
  category: "Category Name"          // Optional category tag
}
```

### 2. Supported Image Sources

You have three options for image sources:

#### Option A: Figma Assets (Current)

```typescript
src: "figma:asset/d8318691814641489012d566eabb177100553bae.png";
```

#### Option B: External URLs (Placeholder/Unsplash)

```typescript
src: "https://images.unsplash.com/photo-1234567890...";
```

#### Option C: Local Files (Recommended for production)

```typescript
src: "/images/portfolio/festival-euphoria-main.jpg";
```

## 📂 Portfolio Sections

Your portfolio is organized into these main sections:

### 1. Featured Work (`FEATURED_WORK_DATA`)

- Showcased on homepage and portfolio page
- Your best 3-6 pieces
- High-impact, diverse work

### 2. Festival Adventures (`FESTIVAL_WORK_DATA`)

- Festival makeup and face art
- Origin Festival, Little Forest, etc.
- Orange-yellow-green color scheme

### 3. Thailand Adventures (`THAILAND_WORK_DATA`)

- Travel makeup experiences
- Tropical and cultural themes
- Yellow-orange-red color scheme

### 4. UV & Blacklight (`UV_MAKEUP_DATA`)

- UV reactive makeup
- Club and rave work
- Cyan-pink-purple color scheme

### 5. Fusion Nails (`NAIL_ART_DATA`)

- Nail art portfolio
- Creative nail designs
- Rose-pink-orange color scheme

### 6. Shankra Festival 2023 (`SHANKRA_WORK_DATA`)

- Swiss mountain festival
- Green-emerald-teal color scheme

### 7. Reiserfieber Switzerland (`REISERFIEBER_WORK_DATA`)

- Swiss outdoor festivals
- Blue-indigo-purple color scheme

## 🔄 Adding Multi-Image Sliders

To add multiple images to a single portfolio entry for slider functionality:

```typescript
{
  id: "festival-euphoria",
  title: "Festival Euphoria",
  subtitle: "Origin Festival 2024",
  description: "Explosive joy and vibrant rainbow face art...",
  images: [
    {
      src: "path/to/main-image.jpg",
      alt: "Main festival look with rainbow face art",
      caption: "Main Look",
      description: "The complete festival look with rainbow face art"
    },
    {
      src: "path/to/detail-shot.jpg",
      alt: "Close-up detail of face paint technique",
      caption: "Detail Shot",
      description: "Close-up showing the intricate rainbow face paint technique"
    },
    {
      src: "path/to/process-shot.jpg",
      alt: "Behind-the-scenes application process",
      caption: "Process",
      description: "Behind-the-scenes application process"
    }
  ],
  category: "Festival Makeup"
}
```

## 📝 Step-by-Step: Adding a New Entry

### 1. Choose Your Section

Decide which section your new work belongs to (Festival, Thailand, UV, etc.)

### 2. Prepare Your Images

- Resize images to reasonable web sizes (max 1920px wide)
- Optimize for web (under 300KB per image if possible)
- Create descriptive filenames

### 3. Add to Constants.ts

Open `/components/common/Constants.ts` and find the appropriate data array:

```typescript
export const FESTIVAL_WORK_DATA = [
  // ... existing entries ...

  // Add your new entry here:
  {
    id: "my-new-festival-look",
    title: "Cosmic Warrior",
    subtitle: "Rainbow Gathering 2024",
    description:
      "Intergalactic-inspired face art with holographic elements creating an otherworldly festival presence.",
    images: [
      {
        src: "/images/portfolio/cosmic-warrior-main.jpg",
        alt: "Cosmic Warrior makeup with holographic face art at Rainbow Gathering 2024",
        caption: "Main Look",
        description:
          "Complete cosmic warrior look with holographic face art",
      },
      {
        src: "/images/portfolio/cosmic-warrior-detail.jpg",
        alt: "Close-up of holographic face paint details",
        caption: "Holographic Detail",
        description:
          "Close-up showing the intricate holographic elements",
      },
    ],
    category: "Festival Makeup",
  },
];
```

### 4. Update Image Files

If using local images, place them in the `/public/images/portfolio/` directory.

### 5. Test Your Changes

The new entry will automatically appear in the portfolio section and be available in the slider/lightbox.

## 🎨 Customizing Section Colors

Each section has its own color scheme defined in `PORTFOLIO_SECTIONS`. To modify colors:

```typescript
{
  id: "festivals",
  title: "Festival Adventures",
  // ... other properties ...
  backgroundGradient: "from-orange-100 via-yellow-100 to-green-100",
  titleGradient: "from-orange-600 via-yellow-600 to-green-500",
  subtitleGradient: "from-orange-700 to-green-600",
  decorativeColors: ["#fb923c", "#fbbf24", "#22c55e", "#10b981"],
}
```

## 📱 Best Practices

### Image Guidelines

- **Aspect Ratio**: Square (1:1) works best for consistency
- **Resolution**: 1080x1080px ideal for web
- **File Size**: Under 300KB per image for fast loading
- **Format**: JPG for photos, PNG for graphics with transparency

### Content Guidelines

- **Titles**: Keep concise but descriptive (2-4 words)
- **Subtitles**: Location/event context
- **Descriptions**: Engaging, personal stories (1-2 sentences)
- **Alt Text**: Descriptive for accessibility, include context

### Slider Strategy

- **Main Image**: Best overall shot first
- **Detail Shots**: Close-ups showing technique
- **Process Shots**: Behind-the-scenes if available
- **Context Shots**: Environment/setting

## 🚀 Quick Updates

### To Update Existing Entry

1. Find the entry in Constants.ts by its `id`
2. Modify the title, description, or images array
3. Save the file - changes are automatic

### To Reorder Entries

Simply drag and drop entries within their data array in Constants.ts

### To Change Section Colors

Modify the `backgroundGradient`, `titleGradient`, `subtitleGradient`, and `decorativeColors` in the `PORTFOLIO_SECTIONS` array

## 🔧 Technical Notes

- The slider automatically appears when an entry has more than one image
- Navigation arrows and dots are shown on hover
- The lightbox supports keyboard navigation (arrow keys, escape)
- All images lazy-load for performance
- The system is fully responsive and accessible

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console for error messages
2. Ensure image paths are correct
3. Verify JSON syntax in Constants.ts
4. Make sure all required fields are present

Remember: Every change to Constants.ts automatically updates your live portfolio!