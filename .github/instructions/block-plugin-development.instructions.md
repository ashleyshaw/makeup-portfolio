# Block Plugin Development Instructions

## Overview

This document provides comprehensive best practices and step-by-step guidance for developing WordPress block plugins with a modern build process. It is designed for maintainability, performance, accessibility, and seamless integration with the WordPress block editor (Gutenberg).

---

## 1. Plugin Structure

- **Root Files:**
  - `plugin-main-file.php` — Main plugin file with header and block registration.
  - `readme.txt` or `README.md` — Plugin documentation, usage, and build instructions.
  - `package.json` — Build scripts and dependencies.
- **Directories:**
  - `src/` — Source JS/JSX, CSS/SCSS, block.json, and other assets.
  - `build/` — Compiled JS/CSS output (never edit directly).
  - `assets/` — Images, icons, SVGs, and other static assets.

---

## 2. Build Process

- **Recommended Tools:** Use `@wordpress/scripts`, Vite, or Webpack for:
  - JS/JSX (React) transpilation and bundling
  - SCSS/SASS to CSS compilation
  - Asset optimization (images, SVGs, fonts)
- **Workflow:**
  - Store all source files in `src/`, output to `build/`.
  - Add scripts for `build`, `dev`, `lint`, and `format` in `package.json`.
  - Use `.gitignore` to exclude `node_modules/`, `build/`, and other generated files.
  - Use Prettier, ESLint, and Stylelint for code quality.
  - Document build steps in `README.md`.

---

## 3. Block Registration

- Use `block.json` for block metadata and registration.
- Register blocks in PHP using `register_block_type` and point to `build/` assets.
- Enqueue only built assets for both editor and frontend.
- Use `wp_set_script_translations` for i18n if needed.
- Only enqueue assets when the block is present on the page (conditional enqueuing).

---

## 4. Asset Handling

- Version assets using file modification time or build hash for cache busting.
- Optimize images and SVGs for icons and performance.
- Minimize JS/CSS bundle size; avoid unnecessary dependencies.

---

## 5. Coding Standards

- Follow WordPress coding standards for PHP, JS, and CSS.
- Use Prettier and ESLint for JS/JSX; Stylelint for CSS/SCSS.
- Add `.editorconfig` for consistent formatting and indentation.
- Reference:
  - [WPCS Instructions](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wpcs.instructions.md)
  - [WordPress Coding Standards](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wordpress.instructions.md)

---

## 6. Accessibility & Performance

- Use semantic HTML and ARIA attributes in block markup.
- Ensure keyboard navigation and screen reader support.
- Test with accessibility tools (axe, Lighthouse, WAVE).
- Minimize JS/CSS bundle size; avoid unnecessary dependencies.

---

## 7. Documentation

- Document block usage, attributes, and build steps in `README.md` or `readme.txt`.
- Include instructions for installing dependencies and running the build process.
- Reference the main custom instructions file: `.github/custom-instructions.md` for project-wide standards and architecture.
- Dynamically reference all files in `.github/instructions/` for additional or future instructions.

---

## 8. Example Build Scripts (package.json)

```json
"scripts": {
  "dev": "wp-scripts start",
  "build": "wp-scripts build",
  "lint": "wp-scripts lint-js",
  "format": "prettier --write ."
}
```

---

## 9. References

- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [Block Plugin Example](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/)
- [WPCS Instructions](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wpcs.instructions.md)
- [WordPress Coding Standards](https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/wordpress.instructions.md)
- [Main Custom Instructions](../custom-instructions.md)

---

**Never edit built files directly. Always keep source and build output separate.**

---

## Dynamic Reference for Additional Instructions

> For the latest and any additional instructions, always check all files in `.github/instructions/`.
> This ensures you are following the most up-to-date and project-specific guidelines.
