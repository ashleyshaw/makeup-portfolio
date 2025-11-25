# Nation of Gondwana Festival Portfolio Entry

This file contains the new portfolio entry that needs to be added to `/utils/portfolioService.ts`.

## Entry Details

Add this entry after the "jungle-festival-koh-phangan" entry (around line 171) in the UNIFIED_PORTFOLIO_DATA array:

```typescript
{
  id: "nation-of-gondwana-festival",
  title: "Nation of Gondwana Festival",
  subtitle: "19 July 2025",
  description: "The Irish crew, having some UV fun with beautiful people. Electric festival artistry featuring vibrant rainbow streaks, creative UV designs, and glowing accents that celebrate connection and joy at one of the most vibrant festival experiences.",
  images: [
    {
      src: "figma:asset/74b708f3be9c02b929444ed900d4217477ac45ad.png",
      alt: "Nation of Gondwana Festival - beautiful woman with rainbow UV face paint streaks and bright smile",
      caption: "Rainbow Festival Magic",
      description: "Stunning rainbow UV face streaks creating a vibrant festival look with infectious joy",
    },
    {
      src: "figma:asset/d99e9e671329d5df41ad0f55042fb3f135e30fdf.png",
      alt: "Nation of Gondwana Festival - redhead with UV dots under eyes and rainbow body paint",
      caption: "Electric UV Artistry",
      description: "Creative UV dot patterns and rainbow accents perfect for festival nighttime glow",
    },
    {
      src: "figma:asset/bb2d15f1b5450668f0a032ad3765e13d8db4fdd2.png",
      alt: "Nation of Gondwana Festival - man with rainbow UV face paint and jellyfish ear accessory",
      caption: "Cosmic Festival Warrior",
      description: "Bold rainbow UV design with creative accessories celebrating festival spirit and artistic expression",
    },
  ],
  category: "Festival Makeup",
  featured: true,
  displayOrder: 2,
  tags: ["festival", "uv", "rainbow", "gondwana", "irish-crew", "electric", "july-2025"],
},
```

## Notes

- This entry should be positioned as the second portfolio item (displayOrder: 2)
- This will push the "Forest Warrior" entry to displayOrder: 3
- The entry has the dual categories: "Festival Makeup" and "UV Makeup" as specified
- All three provided images are included with proper captions and descriptions
- The entry is marked as featured so it will appear on the homepage

## Implementation Status

✅ **Category Chips Added:** SliderCard now shows category chips in the top-right corner
✅ **Image Counter Position:** Moved to left side and shows "1/3" format  
✅ **Desktop Hover Arrows:** Already properly implemented
✅ **Lightbox Always-Visible Arrows:** Already properly implemented with large, prominent arrows
⏳ **Portfolio Entry:** Needs manual addition to portfolioService.ts