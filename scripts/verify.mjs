import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const mainFile = join(root, 'dist/index.js');
const dep1VendorFile = join(root, 'dist/vendor/preserve-jsx-dep1.jsx');
const dep2VendorFile = join(root, 'dist/vendor/preserve-jsx-dep2.jsx');

const main = await readFile(mainFile, 'utf8');
const dep1Vendor = await readFile(dep1VendorFile, 'utf8');
const dep2Vendor = await readFile(dep2VendorFile, 'utf8');

const checks = [
  [
    main.includes('from "./vendor/preserve-jsx-dep1.jsx"'),
    'main output imports preserve-jsx-dep1 from ./vendor/preserve-jsx-dep1.jsx',
  ],
  [
    main.includes('from "./vendor/preserve-jsx-dep2.jsx"'),
    'main output imports preserve-jsx-dep2 from ./vendor/preserve-jsx-dep2.jsx',
  ],
  [
    !main.includes('data-preserve-jsx-dep1') &&
      !main.includes('data-preserve-jsx-dep2'),
    'main output does not inline the JSX dependency implementations',
  ],
  [
    dep1Vendor.includes('<button data-preserve-jsx-dep1>'),
    'dep1 vendor output preserves JSX element syntax',
  ],
  [
    dep1Vendor.includes('<Dep1Button label="Rendered by dependency one"/>'),
    'dep1 vendor output preserves JSX component syntax',
  ],
  [
    dep2Vendor.includes('<strong data-preserve-jsx-dep2>'),
    'dep2 vendor output preserves JSX element syntax',
  ],
  [
    dep2Vendor.includes('<Dep2Badge label="Rendered by dependency two"/>'),
    'dep2 vendor output preserves JSX component syntax',
  ],
  [
    !dep1Vendor.includes('react/jsx-runtime') &&
      !dep2Vendor.includes('react/jsx-runtime'),
    'vendor outputs are not transformed to react/jsx-runtime calls',
  ],
];

for (const [ok, message] of checks) {
  if (!ok) {
    throw new Error(`Verification failed: ${message}`);
  }
  console.log(`ok - ${message}`);
}
