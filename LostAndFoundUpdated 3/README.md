# Dhruv AI Platform

A modern web application built with React, TypeScript, and Vite. This platform is designed to help users access services via mobile or web, with features like location tracking and role-based access for individuals, event organizers, and authorities.

## Features

- **Multi-Platform Access**: Use the platform from any device via mobile app or web interface.
- **Location Tracking**: Provides precise location information to facilitate quick reunions or responses.
- **Role-Based Access**: Different access levels for individuals, event organizers, and authorities.
- **Modern UI**: Built with Radix UI, Framer Motion, and Lucide for a responsive and accessible experience.
- **Authentication**: Integrated with Clerk for secure user management.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (recommended for dependency management)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
src/
  app/           # Pages (Home, About, Contact, etc.)
  components/    # Reusable UI components
  hooks/         # Custom React hooks
  lib/           # Utilities and helper functions
  styles/        # Global and component styles
public/          # Static assets
```

## ESLint & Vite

This project uses Vite for fast development and ESLint for code quality. See below for advanced ESLint configuration:

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
