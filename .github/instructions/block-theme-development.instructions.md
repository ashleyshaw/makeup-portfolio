# Block Theme Development Instructions

## Overview

This document provides comprehensive best practices and step-by-step guidance for developing a modern WordPress block theme with a build process. It is designed for maintainability, performance, accessibility, and seamless integration with the WordPress ecosystem.

---

## 1. Theme Structure

- **Root Files:**
  - `style.css` — Theme header, global styles, and required metadata.
  - `functions.php` — Enqueue assets, add theme support, register menus, and widgets.
  - `theme.json` — Block theme configuration for global styles, settings, and block support.
  - `screenshot.png` — Theme preview image (1200x900px recommended).
- **Directories:**
  - `templates/` — Block-based templates (e.g., `index.html`, `single.html`, `archive.html`, `404.html`).
  - `parts/` — Template parts (e.g., `header.html`, `footer.html`, `sidebar.html`).
  - `patterns/` — Block patterns as PHP files with block markup and metadata.
  - `assets/` — Source files for SCSS, JS, images, fonts, SVGs, etc.
  - `build/` — Compiled CSS/JS output (never edit directly).

---

## 2. Build Process

- **Recommended Tools:** Use Vite, Webpack, or `@wordpress/scripts` for:
  - SCSS/SASS to CSS compilation
  - JS/JSX (React) transpilation and bundling
  - Asset optimization (images, fonts, SVGs)
- **Workflow:**
  - Store all source files in `assets/`, output to `build/`.
  - Add a `package.json` with scripts for `build`, `dev`, `lint`, and `format`.
  - Use `.gitignore` to exclude `node_modules/`, `build/`, and other generated files.
  - Use Prettier, ESLint, and Stylelint for code quality.
  - Document build steps in `README.md`.

---

## 3. theme.json Usage

- Define color palette, typography, spacing, and block settings in `theme.json`.
- Use `theme.json` for global styles and to control editor appearance.
- Avoid hardcoding styles in PHP or CSS; prefer `theme.json` for consistency and maintainability.
- Reference: [theme.json Reference](https://developer.wordpress.org/block-themes/theme-json/)

---

## 4. Asset Enqueuing

- Enqueue only built assets (from `build/`) in `functions.php`.
- Use `wp_enqueue_block_style` and `wp_enqueue_block_script` for block-specific assets.
- Version assets using file modification time or build hash for cache busting.
- Only load assets when needed (conditional enqueuing).

---

## 5. Block Patterns & Template Parts

- Store block patterns in `patterns/` as PHP files with block markup and metadata.
- Use `parts/` for reusable template parts (e.g., header, footer, sidebar).
- Register patterns in `functions.php` using `register_block_pattern` and `register_block_pattern_category`.
- Use semantic HTML and ARIA attributes for accessibility.

---

## 6. Accessibility & Performance

- Use semantic HTML in templates and patterns.
- Ensure keyboard navigation and screen reader support.
- Optimize images and use modern formats (WebP, SVG).
- Minimize CSS/JS bundle size; load only what is needed per page.
- Test with accessibility tools (axe, Lighthouse, WAVE).

---

## 7. Coding Standards

- Follow WordPress coding standards for PHP, JS, and CSS.
- Use Prettier and ESLint for JS/JSX; Stylelint for CSS/SCSS.
- Add `.editorconfig` for consistent indentation and formatting.
- Reference:
  - [WPCS Instructions](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wpcs.instructions.md)
  - [WordPress Coding Standards](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wordpress.instructions.md)

---

## 8. Documentation

- Document all custom functions, build steps, and theme features in a `README.md`.
- Include instructions for installing dependencies and running the build process.
- Reference the main custom instructions file: `.github/custom-instructions.md` for project-wide standards and architecture.
- Dynamically reference all files in `.github/instructions/` for additional or future instructions.

---

## 9. Example Build Scripts (package.json)

```json
"scripts": {
  "dev": "wp-scripts start",
  "build": "wp-scripts build",
  "lint": "wp-scripts lint-js",
  "format": "prettier --write ."
}
```

---

## 10. References

- [Block Themes Overview](https://developer.wordpress.org/block-themes/)
- [theme.json Reference](https://developer.wordpress.org/block-themes/theme-json/)
- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [WPCS Instructions](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wpcs.instructions.md)
- [WordPress Coding Standards](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wordpress.instructions.md)
- [Main Custom Instructions](../custom-instructions.md)

---

**Always keep the build output and source files separate. Never edit built files directly.**

---

## Dynamic Reference for Additional Instructions

> For the latest and any additional instructions, always check all files in `.github/instructions/`.
> This ensures you are following the most up-to-date and project-specific guidelines.
