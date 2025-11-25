# Blocks Development Instructions

## Overview

This document provides best practices and technical guidance for developing custom WordPress blocks, including PHP and block.json registration, JavaScript/React implementation, and integration with the block editor.

---

## 1. Block Registration

- Use `block.json` for block metadata and registration.
- Register blocks in PHP using `register_block_type` and point to built assets.
- Use `@wordpress/scripts` for build and asset management.
- Reference: [block.json instructions](./block-json.instructions.md)

---

## 2. PHP Block Integration

- Use clean, modular PHP for server-side rendering blocks.
- Follow [php-block.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/php-block.instructions.md) for PHP block best practices.
- Use [php-wordpress.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/php-wordpress.instructions.md) for general PHP/WordPress integration.

---

## 3. JavaScript/React Implementation

- Use ESNext and JSX for block development.
- Use functional components and hooks where possible.
- Follow [playwright-typescript.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/playwright-typescript.instructions.md) for TypeScript and Playwright testing.

---

## 4. Testing

- Use Playwright for end-to-end and integration tests.
- See [playwright-tests.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/playwright-tests.instructions.md)
- Add tests for block registration, rendering, and editor integration.

---

## 5. JSON & Validation

- Use [json.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/json.instructions.md) for JSON structure and validation.
- Validate `block.json` files for schema compliance.

---

## 6. Additional Resources

- [block-json.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/block-json.instructions.md)
- [blocks.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/blocks.instructions.md)
