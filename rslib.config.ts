import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      id: 'main',
      format: 'esm',
      dts: false,
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
          'preserve-jsx-dep1': './vendor/preserve-jsx-dep1.jsx',
          'preserve-jsx-dep2': './vendor/preserve-jsx-dep2.jsx',
        },
      },
      plugins: [pluginReact()],
    },
    {
      id: 'vendor-jsx',
      format: 'esm',
      bundle: false,
      dts: false,
      source: {
        entry: {
          'preserve-jsx-dep1': './src/vendor/preserve-jsx-dep1.jsx',
          'preserve-jsx-dep2': './src/vendor/preserve-jsx-dep2.jsx',
        },
      },
      output: {
        distPath: './dist/vendor',
        filename: {
          js: '[name].jsx',
        },
        externals: {
          'preserve-jsx-dep1': false,
          'preserve-jsx-dep2': false,
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
