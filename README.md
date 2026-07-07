# rslib-bundle-preserve-jsx-demo

This demo validates a workaround for a dependency that publishes JSX source.

The setup has two Rslib outputs:

- `main`: the normal library entry. It can bundle normally, but marks `jsx-only-dep` as external and maps it to `./vendor/index.jsx`.
- `vendor-jsx`: a separate entry for `jsx-only-dep`. It uses `bundle: false` plus React `runtime: 'preserve'`, so JSX syntax is preserved in the generated vendor file.

This does not inline the dependency into the main bundle. It emits a companion vendor file and points the main bundle to that file. That distinction matters because Rslib bundle mode does not support preserving JSX syntax.

## Run

```bash
pnpm install
pnpm demo
```

After building, check:

- `dist/index.js`: imports from `./vendor/index.jsx`
- `dist/vendor/index.jsx`: still contains JSX syntax
