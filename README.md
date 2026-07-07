# rslib-bundle-preserve-jsx-demo

This demo validates a workaround for dependencies that publish JSX source.

The setup has two Rslib outputs:

- `main`: the normal library entry. It can bundle normally, but marks `preserve-jsx-dep1` and `preserve-jsx-dep2` as external and maps them to their companion vendor files.
- `vendor-jsx`: separate entries for `preserve-jsx-dep1` and `preserve-jsx-dep2`. It uses `bundle: false` plus React `runtime: 'preserve'`, so JSX syntax is preserved in the generated vendor files.

This does not inline the dependency into the main bundle. It emits a companion vendor file and points the main bundle to that file. That distinction matters because Rslib bundle mode does not support preserving JSX syntax.

## Run

```bash
pnpm install
pnpm demo
```

After building, check:

- `dist/index.js`: imports from `./vendor/preserve-jsx-dep1.jsx` and `./vendor/preserve-jsx-dep2.jsx`
- `dist/vendor/preserve-jsx-dep1.jsx`: still contains JSX syntax from dependency 1
- `dist/vendor/preserve-jsx-dep2.jsx`: still contains JSX syntax from dependency 2
