const { join } = require('path');

module.exports = {
  root: true,
  env: {
    // 'es2020': true,
    node: true,
    mocha: true,
  },
  plugins: [
    'sonarjs',
    'unicorn',
  ],
  extends: [
    'airbnb-standard',
    'plugin:mocha/recommended',
    'plugin:node/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: false },
    babelOptions: {
      configFile: join(__dirname, './.babelrc.js'),
    },
  },
  settings: {
    'mocha/additionalCustomNames': [
      { name: 'step', type: 'testCase', interfaces: ['TDD'] },
    ],
  },
  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'func-names': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'node/no-extraneous-require': 'off',
    // 'import/no-extraneous-dependencies': ['error', { packageDir: ['.'] }],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'max-classes-per-file': 'off',
    'mocha/no-skipped-tests': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'mocha/no-exclusive-tests': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'mocha/no-mocha-arrows': 'off',
    'mocha/no-setup-in-describe': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'mocha/no-top-level-hooks': 'off',
    'newline-per-chained-call': ['off', { ignoreChainWithDepth: 2 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-control-regex': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': 'off',
    'no-restricted-syntax': [
      'warn',
      {
        // THAUI: a part dans des cas de transpilation, je voit pas pourquoi interdire
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      }, {
        // THAUI: a part dans des cas de transpilation, je voit pas pourquoi interdire
        selector: 'ForOfStatement',
        message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      }, {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      }, {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-underscore-dangle': ['error', { allow: ['._initPaths()'] }],
    'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'node/no-unpublished-require': 'off',
    'prefer-destructuring': 'off',
    'prefer-promise-reject-errors': 'off',
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    // 'sonarjs/prefer-immediate-return': 'error',
    'spaced-comment': ['error', 'always', { line: { exceptions: ['*'] }, block: { exceptions: ['/'] } }],
    'quote-props': ['error', 'consistent-as-needed'],
    // 'sonarjs/no-inverted-boolean-check': 'error',
    // 'unicorn/consistent-function-scoping': 'error',
    // 'unicorn/error-message': 'error',
    // 'unicorn/expiring-todo-comments': 'error',
    // 'unicorn/no-abusive-eslint-disable': 'error',
    // 'unicorn/no-object-as-default-parameter': 'error',
    // 'unicorn/no-process-exit': 'error',
    // 'unicorn/no-unreadable-array-destructuring': 'error',
    // 'unicorn/no-unsafe-regex': 'warn',
    // 'unicorn/no-unused-properties': 'error',
    // 'unicorn/better-regex': 'error',
    // 'unicorn/catch-error-name': ['error', {
    //   ignore: [
    //     '^e(rr(or))?\\d*$',
    //   ],
    // }],
    // 'unicorn/escape-case': 'error',
    // 'unicorn/explicit-length-check': 'error',
    // 'unicorn/import-index': 'error',
    // 'unicorn/new-for-builtins': 'error',
    // 'unicorn/no-array-instanceof': 'error',
    // 'unicorn/no-console-spaces': 'error',
    // 'unicorn/no-for-loop': 'error',
    // 'unicorn/no-hex-escape': 'error',
    // 'unicorn/no-nested-ternary': 'error',
    // 'unicorn/no-new-buffer': 'error',
    // 'unicorn/no-useless-undefined': 'error',
    // 'unicorn/no-zero-fractions': 'error',
    // 'unicorn/number-literal-case': 'error',
    // 'unicorn/numeric-separators-style': 'error',
    // 'unicorn/prefer-array-find': 'error',
    // 'unicorn/prefer-flat-map': 'error',
    // 'unicorn/prefer-includes': 'error',
    // 'unicorn/prefer-math-trunc': 'error',
    // 'unicorn/prefer-negative-index': 'error',
    // 'unicorn/prefer-number-properties': 'error',
    // 'unicorn/prefer-optional-catch-binding': 'error',
    // 'unicorn/prefer-reflect-apply': 'error',
    // 'unicorn/prefer-replace-all': 'error',
    // 'unicorn/prefer-set-has': 'error',
    // 'unicorn/prefer-spread': 'error',
    // 'unicorn/prefer-starts-ends-with': 'error',
    // 'unicorn/prefer-string-slice': 'error',
    // 'unicorn/prefer-ternary': 'error',
    // 'unicorn/prefer-text-content': 'error',
    // 'unicorn/prefer-trim-start-end': 'error',
    // 'unicorn/prefer-type-error': 'error',
    // 'unicorn/throw-new-error': 'error',
  },
};