/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import globals from 'globals';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // 1. Global ignore patterns
  {
    ignores: ['node_modules/', 'dist/', '*.css', '*.html', '*.styl']
  },

  // 2. Core ESLint Recommended Rules
  pluginJs.configs.recommended,

  // 3. Prettier Plugin Configuration
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.node
      }
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },

  // 4. Library Module Configuration
  {
    files: ['src/lib/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  },

  // 5. React Plugin Configuration (new syntax)
  {
    files: ['src/view/**/*.{js,jsx}'],
    plugins: {
      react: pluginReact
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true // Enable JSX parsing
        }
      },
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    settings: {
      react: {
        version: 'detect' // Automatically detect React version
      }
    },
    rules: {
      ...pluginReact.configs.recommended.rules // Use React recommended rules
    }
  },

  // 6. React Hooks Plugin Configuration
  {
    files: ['src/view/**/*.{js,mjs,cjs,jsx}'], // Apply to JS/JSX files
    plugins: {
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules // Use React Hooks recommended rules
    }
  },

  // 7. JSX Accessibility Plugin Configuration
  {
    files: ['src/view/**/*.{js,jsx}'], // Apply to JS/JSX files
    plugins: {
      'jsx-a11y': pluginJsxA11y
    },
    rules: {
      ...pluginJsxA11y.configs.recommended.rules // Use Accessibility recommended rules
    }
  },

  // 8. Custom Rules / Overrides (optional)
  {
    rules: {
      // Example: enforce semicolons
      // "semi": ["error", "always"],
      // Example: prefer const over let
      // "prefer-const": "error"
      'react/prop-types': 'off'
    }
  },

  eslintPluginPrettierRecommended
];
