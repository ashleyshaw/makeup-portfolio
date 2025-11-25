# 🧹 Project Cleanup Required

## Files to Delete Immediately

### Test/Development Files
- `/styles/globals-simple.css` - Test file for CSS troubleshooting
- `/styles/test.css` - Test file for CSS troubleshooting

### Duplicate Components (Naming Conflicts)
- `/components/ui/Lightbox.tsx` - Duplicate, keep `/components/ui/EnhancedLightbox.tsx`
- `/components/ui/lightbox.tsx` - Duplicate (lowercase), keep `/components/ui/PortfolioLightbox.tsx`
- `/components/ui/portfolioLightbox.tsx` - Duplicate (lowercase P), keep `/components/ui/PortfolioLightbox.tsx`

### Unused Import Files
- `/imports/1280PxPortfolioTemplate.tsx` - Not used in current implementation
- `/imports/svg-p751zd8tl6.ts` - Check if still needed

## File Naming Issues to Fix

### Inconsistent Casing in `/components/ui/`
All shadcn components use kebab-case (correct):
- `accordion.tsx`, `alert-dialog.tsx`, etc. ✅

Custom components should use PascalCase (need to verify consistency):
- `EnhancedLightbox.tsx` ✅
- `PortfolioCard.tsx` ✅
- `PortfolioLightbox.tsx` ✅
- `PortfolioMosaic.tsx` ✅
- `ScrollDownArrow.tsx` ✅
- `SectionCard.tsx` ✅
- `SliderCard.tsx` ✅

## Recommended Action
1. Delete all files listed above
2. Verify all imports are correctly referencing the remaining files
3. Run build test to ensure no broken imports