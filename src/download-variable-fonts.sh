#!/bin/bash

# 🎨 Variable Font Download Script for Ash Shaw Portfolio
# Downloads optimized variable fonts for better performance

echo "🚀 Downloading Variable Fonts for Ash Shaw Portfolio..."
echo "=============================================="

# Create fonts directory if it doesn't exist
mkdir -p public/fonts

# Function to download with progress
download_font() {
    local url="$1"
    local filename="$2"
    local description="$3"
    
    echo "📥 Downloading $description..."
    if curl -L --progress-bar -o "public/fonts/$filename" "$url"; then
        echo "✅ Successfully downloaded: $filename"
    else
        echo "❌ Failed to download: $filename"
        return 1
    fi
}

# Download Inter Variable Font (replaces 5 individual files)
download_font \
    "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.woff2" \
    "inter-variable.woff2" \
    "Inter Variable Font (300-700 weights)"

# Download Playfair Display Variable Font (replaces 5 individual files)
download_font \
    "https://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDbtXK-F2qO0g.woff2" \
    "playfair-display-variable.woff2" \
    "Playfair Display Variable Font (400-900 weights)"

# Download Righteous Regular (single weight - no variable version needed)
download_font \
    "https://fonts.gstatic.com/s/righteous/v13/1cXxaUPXBpj2rGoU7C9WiHGFVdI.woff2" \
    "righteous-regular.woff2" \
    "Righteous Regular Font"

echo ""
echo "🎯 Download Summary:"
echo "==================="

# Check which files were downloaded successfully
declare -a fonts=("inter-variable.woff2" "playfair-display-variable.woff2" "righteous-regular.woff2")
success_count=0

for font in "${fonts[@]}"; do
    if [ -f "public/fonts/$font" ]; then
        size=$(du -h "public/fonts/$font" | cut -f1)
        echo "✅ $font ($size)"
        ((success_count++))
    else
        echo "❌ $font (missing)"
    fi
done

echo ""
echo "📊 Results: $success_count/3 fonts downloaded successfully"

if [ $success_count -eq 3 ]; then
    echo ""
    echo "🎉 SUCCESS! All variable fonts downloaded!"
    echo ""
    echo "📝 Next Steps:"
    echo "1. Replace your current globals.css with globals-variable-fonts.css"
    echo "2. Update import in main.tsx to use new CSS file"
    echo "3. Deploy to see improved font performance"
    echo ""
    echo "🚀 Benefits:"
    echo "• 3 files instead of 11 (73% fewer requests)"
    echo "• Smaller total size (~200KB vs ~400KB+)"
    echo "• Infinite weight control (300-900 for Inter, 400-900 for Playfair)"
    echo "• Better caching and performance"
else
    echo ""
    echo "⚠️  Some downloads failed. You can:"
    echo "1. Run this script again"
    echo "2. Download manually from the URLs above"
    echo "3. Use individual font files as fallback"
fi

echo ""
echo "📁 Font Directory Structure:"
ls -la public/fonts/ 2>/dev/null || echo "No fonts directory found"

echo ""
echo "✨ Variable font setup complete!"