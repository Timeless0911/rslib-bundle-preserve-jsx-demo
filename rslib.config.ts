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
          // The main build does not inline the JSX dependency. It points to the
          // separately emitted vendor file instead.
          'jsx-only-dep': './vendor/index.jsx',
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
          index: './src/vendor/index.jsx',
        },
      },
      output: {
        distPath: './dist/vendor',
        filename: {
          js: '[name].jsx',
        },
        externals: {
          'jsx-only-dep': false,
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
