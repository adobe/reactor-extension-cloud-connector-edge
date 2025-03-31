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

import { defineConfig, globalIgnores } from 'eslint/config';
import pluginJs from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  globalIgnores(['*.css', '*.html', '*.styl']),
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
  {
    files: ['src/lib/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  },

  {
    files: ['src/view/**/*.{js,jsx}'],
    ...reactPlugin.configs.flat.recommended
  },

  {
    files: ['src/view/**/*.{js,jsx}'],
    ...reactHooks.configs['recommended-latest']
  },

  {
    files: ['src/view/**/*.{js,jsx}'],
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: 'React'
        }
      ],
      'react/prop-types': 0
    }
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  reactPlugin.configs.flat['jsx-runtime']
]);
