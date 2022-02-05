#!/usr/bin/env node
/* eslint-disable no-process-exit */

/*
  Import in your project and use as you would use mocha:
  run-test [<mocha_args>]

  Use package.json runTestConfig property to
  specify setup and teardown scripts :
  {
    [...]
    "runTestConfig": {
      "setup": "<path_to_setup_script.js>",
      "teardown": "<path_to_teardown_script.js>",
    }
  }

  full example package.json:
  {
    "name": "example",
    "version": "1.0.0",
    "description": "example",
    "main": "index.js",
    "scripts": {
      "test": "run-test tests/**.test.js"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "@alfred/tests-run-test": "^1.0.0",
      "mocha": "^6.0.0"
    }
    "runTestConfig": {
      "setup": "./test-utils/setup.js",
      "teardown": "./test-utils/teardown.js",
      modules: [
        @localModule/pouet
      ]
    }
  }
*/

const { spawn } = require('child_process');
const { resolve: resolveFile, dirname, join } = require('path');

const yargs = require('yargs');

const { argv } = yargs(process.argv.slice(2))
  .option('run', {
    alias: 'r',
    type: 'string',
    array: true,
    description: 'Where to find tests',
  })
  .strict();

// Get project root
const cwd = process.cwd();
// Optionnal configuration in root package.json
const { runTestConfig } = require(resolveFile(cwd, './package.json'));

// Ensure we have a function and it will always return a promise
const checkFn = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('setup and teardown exports should be a function');
  }
  return () => Promise.resolve(fn());
};

// Stub setup and teardown if not provided in config
let setupFunction = () => Promise.resolve();
let teardownFunction = () => Promise.resolve();
// const includeArgs = [];
const testPath = [];
// Use setup and teardown if config was provided
if (runTestConfig) {
  const { setup, teardown, includes, modules } = runTestConfig;
  if (setup) setupFunction = checkFn(require(resolveFile(cwd, setup)));
  if (teardown) teardownFunction = checkFn(require(resolveFile(cwd, teardown)));
  // if (includes && includes.length > 0) {
  //   includeArgs.push(...includes.flatMap(file => ['--file', file]));
  // }
  if (modules) {
    testPath.push(...modules.map(module => dirname(require.resolve(module))));
  }
}

// Get command line args to be forwarded to mocha
const mochaArgs = [
  // ...includeArgs,
  ...(argv.run.flatMap(pattern => testPath.map(path => join(path, pattern)))),
  ...argv._,
];

// Wrap mocha child process in a promise
const runMocha = args => () => new Promise((resolve) => {
  const mocha = spawn('mocha', args, { shell: true, stdio: 'inherit' });
  mocha.on('close', resolve);
});

// Run setup
setupFunction()
  // Run mocha with forwaded arguments
  .then(runMocha(mochaArgs))
  // Run teardown
  .then(code => teardownFunction()
    .then(() => process.exit(code)))
  .catch(console.error);
