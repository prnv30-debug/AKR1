# Strict Project Rules for AKR Trust Website

## 1. Asset & Image Management
- **Never rely on external third-party CDNs or asset hosters** (e.g., Unsplash URLs for core assets, emergentagent domains, etc.) for production design elements. All primary site images, logos, banners, and icons MUST be self-hosted in `frontend/public/`.
- **Zero URL spaces or special characters**: Every filename placed in `public/` or referenced in source code MUST use lowercase letters, numbers, hyphens, or underscores only (e.g., `image_name.jpeg`). Never use spaces in filenames.
- **Robust Error Fallbacks**: Always provide clean fallback image logic (`dataset.hasFallback`) using reliable local placeholders in `onError` handlers so broken network loads degrade gracefully without loops.

## 2. Responsive Layout & Typography Rules
- **No Viewport Overflow**: Every major page section (`Hero`, `Navbar`, `Footer`, `Feature`, etc.) MUST include container width safeguards (`w-full max-w-full overflow-hidden` where applicable) so horizontal scrollbars and orientation collapse never occur on mobile devices.
- **Fluid & Safe Viewport Units**: When using `vw` units for large display typography (like lockup banners or massive titles), always calculate maximum character width against `100vw` and clamp font sizes across breakpoints (`text-[12vw]` max on mobile) to ensure text never pushes past the viewport boundary.
- **Mobile Orientation Testing**: Always verify that elements stacked with `flex` or `grid` adapt cleanly between portrait and landscape orientations without breaking screen margins.

## 3. Brand Authentic Design Tokens
- **Official Brand Logos Only**: Social media badges and links MUST render official brand SVG logos (solid black for X, royal blue `#1877F2` for Facebook, red `#FF0000` with white triangle for YouTube, radial gradient for Instagram). Never substitute generic monochrome icon fonts where official brand presentation is expected.
