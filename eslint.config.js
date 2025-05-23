import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort' // Ajout du plugin
import unusedImports from 'eslint-plugin-unused-imports' // Ajout du plugin

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort, // Ajout du plugin
      'unused-imports': unusedImports, // Ajout du plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'simple-import-sort/imports': 'error', // Ajout de la règle pour trier les imports
      'simple-import-sort/exports': 'error', // Ajout de la règle pour trier les exports
      'semi': ['error', 'never'], // Désactivation des points-virgules
      'quotes': ['error', 'single'], // Utilisation des guillemets simples
      'camelcase': ['error', { properties: 'always' }], // Enforce camelCase
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Avertissement pour console sauf warn et error
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Erreur pour les variables inutilisées
      'unused-imports/no-unused-imports': 'error', // Suppression des imports inutilisés
      'no-duplicate-imports': 'error', // Interdiction des imports dupliqués
    },
  },
)
