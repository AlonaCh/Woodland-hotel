// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
//   settings: { react: { version: '18.2' } },
//   plugins: ['react-refresh'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//     'no-console': 'warn', // Change console logs to warning instead of error
//     'react/prop-types': 'off', // Disable prop-types rule if not using
//     'react/jsx-uses-react': 'off', // Turn off if using React 17+
//     'react/react-in-jsx-scope': 'off', // No need for React in scope with React 17+
//   },
// }


module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Adjust these rules as needed
    'no-console': 'warn', // Change console logs to warning instead of error
    'react/prop-types': 'off', // Disable prop-types rule if not using
    'react/jsx-uses-react': 'off', // Turn off if using React 17+
    'react/react-in-jsx-scope': 'off', // No need for React in scope with React 17+
     'no-unused-vars': 'warn',
  },
};
