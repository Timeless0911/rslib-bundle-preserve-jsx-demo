import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      id: 'main',
      source: {
        entry: {
          index: './src/index.jsx',
        },
      },
      output: {
        distPath: './dist',
        externals: {
          // The main build does not inline these JSX dependencies. Each one
          // points to its separately emitted vendor file instead.
          'preserve-jsx-dep1': './vendor/preserve-jsx-dep1/index.jsx',
          'preserve-jsx-dep2': './vendor/preserve-jsx-dep2/index.jsx',
        },
      },
      plugins: [pluginReact()],
    },
    {
      id: 'vendor-jsx-dep1',
      bundle: false,
      source: {
        entry: {
          index: './node_modules/preserve-jsx-dep1/**/*.jsx',
        },
      },
      output: {
        distPath: './dist/vendor/preserve-jsx-dep1',
        filename: {
          js: '[name].jsx',
        },
      },
      plugins: [
        pluginReact({
          swcReactOptions: {
            runtime: 'preserve',
          },
        }),
      ],
    },
    {
      id: 'vendor-jsx-dep2',
      bundle: false,
      source: {
        entry: {
          index: './node_modules/preserve-jsx-dep2/**/*.jsx',
        },
      },
      output: {
        distPath: './dist/vendor/preserve-jsx-dep2',
        filename: {
          js: '[name].jsx',
        },
      },
      plugins: [
        pluginReact({
          swcReactOptions: {
            runtime: 'preserve',
          },
        }),
      ],
    },
  ],
  output: {
    target: 'web',
  },
});
