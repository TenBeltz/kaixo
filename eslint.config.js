import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'windows'],
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  }
];
