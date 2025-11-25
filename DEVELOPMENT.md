# Development Guide

This document provides project-specific development guidelines for the Ash Shaw Makeup Portfolio.

## Local Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/ashleyshaw/makeup-portfolio.git
   cd makeup-portfolio
   npm install
   ```

2. Copy and configure environment variables as needed (see `.env.example` if present).
3. Use the provided scripts in `package.json` for development, build, and testing.

## Coding Standards

- Follow the configuration in `.editorconfig`, `.prettier.config.cjs`, `.eslint.config.cjs`, and related files.
- Use the instructions in `.github/instructions/` for WordPress theme and plugin development.

## Testing

- Use Playwright and Jest for automated tests.
- Validate `theme.json` and `block.json` files as described in the instructions.

## Community Health

- This repository uses the default issue and pull request templates from the [lightspeedwp/.github](https://github.com/lightspeedwp/.github) community health repository. Do not add or edit local templates unless you want to override the defaults.
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for more.
