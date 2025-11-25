# block.json Instructions

## Overview

This document provides guidance for creating and validating `block.json` files for custom WordPress blocks.

---

## 1. Structure

- Follow the [WordPress block.json schema](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/).
- Required fields: `apiVersion`, `name`, `title`, `category`, `icon`, `attributes`, `editorScript`, `style`.
- Use camelCase for attribute keys.

---

## 2. Validation

- Validate `block.json` using JSON schema tools or the [theme-json-validation.instructions.md](../block-theme/theme-json-validation.instructions.md).
- See [json.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/json.instructions.md) for JSON best practices.

---

## 3. References

- [block-json.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/block-json.instructions.md)
- [blocks.instructions.md](https://github.com/lightspeedwp/ai-block-theme-template/blob/develop/.github/instructions/blocks.instructions.md)
