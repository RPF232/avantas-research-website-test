# Favicon Setup Guide for AVANTAS Research

## Overview
This guide will help you set up complete favicon support and Google search optimization for your website.

## Required Favicon Files

You need to create the following favicon files and place them in the `assets/img/` directory:

### 1. Basic Favicons
- `favicon.ico` (16x16, 32x32, 48x48 - multi-size ICO file)
- `favicon-16x16.png` (16x16 pixels)
- `favicon-32x32.png` (32x32 pixels)
- `favicon-48x48.png` (48x48 pixels)

### 2. Apple Touch Icons
- `apple-touch-icon.png` (180x180 pixels)

### 3. Android Chrome Icons
- `android-chrome-192x192.png` (192x192 pixels)
- `android-chrome-512x512.png` (512x512 pixels)

### 4. Social Media Image
- `og-image.jpg` (1200x630 pixels for social media sharing)

## How to Create Favicons

### Option 1: Online Favicon Generators (Recommended)
1. **Favicon.io** (https://favicon.io/)
   - Upload your logo or create text-based favicon
   - Download all required sizes
   - Place files in `assets/img/` directory

2. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - Upload your logo
   - Customize colors and settings
   - Download complete package

### Option 2: Design Software
- Use Adobe Illustrator, Photoshop, or Figma
- Create a 512x512 master icon
- Export to required sizes
- Use online converter for ICO format

## Favicon Design Guidelines

### For AVANTAS Research:
- Use your brand colors: Blue gradient (#1e3a8a to #3b82f6)
- Include "AV" letters prominently
- Keep design simple and recognizable at small sizes
- Ensure good contrast for visibility

### Technical Requirements:
- PNG files: Use transparency where appropriate
- ICO file: Include multiple sizes (16x16, 32x32, 48x48)
- Apple Touch Icon: No transparency, solid background
- Android Chrome: Square format, no rounded corners

## Google Search Optimization

### 1. Update Domain Information
Replace `yourdomain.com` in these files with your actual domain:
- `index.html` (canonical URL, Open Graph URLs)
- `robots.txt` (sitemap URL)
- `sitemap.xml` (all URLs)

### 2. Google Search Console Setup
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership (HTML file or DNS record)
4. Submit your sitemap.xml

### 3. Meta Tags Already Added
- Robots meta tags for indexing
- Canonical URLs
- Open Graph tags for social media
- Twitter Card tags
- Structured data for better search results

## Testing Your Setup

### 1. Favicon Testing
- Clear browser cache
- Visit your website
- Check browser tab for favicon
- Test on mobile devices
- Verify Apple Touch Icon on iOS

### 2. Search Engine Testing
- Use Google's "site:yourdomain.com" search
- Check Google Search Console for indexing
- Test social media sharing previews
- Validate sitemap at Google Search Console

## File Structure After Setup
```
assets/img/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── og-image.jpg

Root Directory:
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Next Steps
1. Create your favicon files using one of the online generators
2. Replace placeholder files in `assets/img/` directory
3. Update domain URLs in HTML and XML files
4. Submit sitemap to Google Search Console
5. Test favicon display across different devices and browsers

## Troubleshooting
- If favicons don't appear, clear browser cache
- Check file paths are correct
- Ensure all favicon files are in the right directory
- Verify HTML favicon links are properly formatted
- Test on different browsers and devices 