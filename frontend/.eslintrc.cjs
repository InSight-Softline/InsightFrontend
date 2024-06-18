module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    'cypress/globals': true // Falls man Cypress benutzt
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended' // Falls man Cypress benutzt
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: '18.2'
    }
  },
  plugins: [
    'react-refresh',
    'react',
    'cypress' // Falls man Cypress benutzt
  ],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/react-in-jsx-scope': 'off', // Wird in neueren React-Versionen nicht mehr benötigt
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    // Weitere Regeln hinzufügen, falls benötigt
    'no-unused-vars': 'warn', // Setzt die Regel für keine nicht verwendeten Variablen
    'react/no-deprecated': 'warn', // Warnung bei Verwendung veralteter React APIs
  },
  overrides: [
    {
      files: ['**/*.cy.js'], // Für Cypress-Dateien
      rules: {
        'no-unused-vars': 'off', // Deaktiviert die Regel für Cypress-Dateien, wenn nötig
      }
    }
  ]
};
