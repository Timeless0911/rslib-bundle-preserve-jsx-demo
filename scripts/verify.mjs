import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const mainFile = join(root, 'dist/index.js');
const vendorFile = join(root, 'dist/vendor/index.jsx');

const main = await readFile(mainFile, 'utf8');
const vendor = await readFile(vendorFile, 'utf8');

const checks = [
  [
    main.includes('from "./vendor/index.jsx"'),
    'main output imports the externalized dependency from ./vendor/index.jsx',
  ],
  [
    !main.includes('data-from-jsx-only-dep'),
    'main output does not inline the JSX dependency implementation',
  ],
  [
    vendor.includes('<button data-from-jsx-only-dep>'),
    'vendor output preserves JSX element syntax',
  ],
  [
    vendor.includes('<DependencyButton label="Rendered by dependency entry"/>'),
    'vendor output preserves JSX component syntax',
  ],
  [
    !vendor.includes('react/jsx-runtime'),
    'vendor output is not transformed to react/jsx-runtime calls',
  ],
];

for (const [ok, message] of checks) {
  if (!ok) {
    throw new Error(`Verification failed: ${message}`);
  }
  console.log(`ok - ${message}`);
}
