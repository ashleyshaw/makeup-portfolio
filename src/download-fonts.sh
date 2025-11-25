#!/bin/bash

# 🎯 Self-Hosted Font Download Script for Ash Shaw Portfolio
# This script downloads all required woff2 font files from Google Fonts

echo "🎨 Downloading Self-Hosted Fonts for Ash Shaw Portfolio..."

# Create font directories
mkdir -p public/fonts/playfair-display
mkdir -p public/fonts/inter  
mkdir -p public/fonts/righteous

echo "📁 Created font directories"

# Download Playfair Display fonts
echo "📥 Downloading Playfair Display fonts..."
curl -o public/fonts/playfair-display/playfair-display-regular.woff2 "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qC0s.woff2"
curl -o public/fonts/playfair-display/playfair-display-medium.woff2 "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeFvXDXbtXK-F2qC0s.woff2"
curl -o public/fonts/playfair-display/playfair-display-semibold.woff2 "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKcFvnDXbtXK-F2qC0s.woff2"
curl -o public/fonts/playfair-display/playfair-display-bold.woff2 "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdiunDXbtXK-F2qC0s.woff2"
curl -o public/fonts/playfair-display/playfair-display-bold-italic.woff2 "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFRD-vYSZviVYUb_rj3ij__anPXDTzYgA-oG0wq_FqXdXzHaKg.woff2"

# Download Inter fonts
echo "📥 Downloading Inter fonts..."
curl -o public/fonts/inter/inter-light.woff2 "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZs.woff2"
curl -o public/fonts/inter/inter-regular.woff2 "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKlMZs.woff2"
curl -o public/fonts/inter/inter-medium.woff2 "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZs.woff2"
curl -o public/fonts/inter/inter-semibold.woff2 "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZs.woff2"
curl -o public/fonts/inter/inter-bold.woff2 "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZs.woff2"

# Download Righteous font
echo "📥 Downloading Righteous font..."
curl -o public/fonts/righteous/righteous-regular.woff2 "https://fonts.gstatic.com/s/righteous/v13/1cXxaUPXBpj2rGoU7C9WiHGFVdI.woff2"

echo "✅ All fonts downloaded successfully!"
echo ""
echo "📋 Font files downloaded:"
echo "   • Playfair Display: Regular, Medium, SemiBold, Bold, Bold Italic"
echo "   • Inter: Light, Regular, Medium, SemiBold, Bold"  
echo "   • Righteous: Regular"
echo ""
echo "🚀 Your fonts are now self-hosted and ready for deployment!"
echo "   No more Google Fonts CDN dependency!"
echo "   Fonts will load consistently across all browsers and devices."