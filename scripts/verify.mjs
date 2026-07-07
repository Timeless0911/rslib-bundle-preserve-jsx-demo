import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const mainFile = join(root, 'dist/index.js');

const main = await readFile(mainFile, 'utf8');
const vendorFiles = {
  dep1Index: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep1/index.jsx'),
    'utf8',
  ),
  dep1Badge: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep1/badge.jsx'),
    'utf8',
  ),
  dep1Button: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep1/button.jsx'),
    'utf8',
  ),
  dep1Card: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep1/card.jsx'),
    'utf8',
  ),
  dep1List: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep1/list.jsx'),
    'utf8',
  ),
  dep1Toolbar: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep1/toolbar.jsx'),
    'utf8',
  ),
  dep2Index: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep2/index.jsx'),
    'utf8',
  ),
  dep2Badge: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep2/badge.jsx'),
    'utf8',
  ),
  dep2Meta: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep2/meta.jsx'),
    'utf8',
  ),
  dep2Panel: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep2/panel.jsx'),
    'utf8',
  ),
  dep2Stack: await readFile(
    join(root, 'dist/vendor/preserve-jsx-dep2/stack.jsx'),
    'utf8',
  ),
};

const allVendorContent = Object.values(vendorFiles).join('\n');

const checks = [
  [
    main.includes('from "./vendor/preserve-jsx-dep1/index.jsx"'),
    'main output imports preserve-jsx-dep1 from ./vendor/preserve-jsx-dep1/index.jsx',
  ],
  [
    main.includes('from "./vendor/preserve-jsx-dep2/index.jsx"'),
    'main output imports preserve-jsx-dep2 from ./vendor/preserve-jsx-dep2/index.jsx',
  ],
  [
    !main.includes('data-preserve-jsx-dep1') &&
      !main.includes('data-preserve-jsx-dep2'),
    'main output does not inline the JSX dependency implementations',
  ],
  [
    vendorFiles.dep1Index.includes('export { Dep1Button } from "./button.jsx"') &&
      vendorFiles.dep1Index.includes('export { default } from "./card.jsx"'),
    'dep1 vendor index keeps barrel exports to isolated files',
  ],
  [
    vendorFiles.dep1Button.includes('<button data-preserve-jsx-dep1>'),
    'dep1 vendor output preserves JSX element syntax',
  ],
  [
    vendorFiles.dep1Card.includes(
      '<Dep1Button label="Rendered by dependency one"/>',
    ),
    'dep1 vendor output preserves JSX component syntax',
  ],
  [
    vendorFiles.dep1Card.includes('<Dep1List items={[') &&
      vendorFiles.dep1Card.includes('<Dep1Toolbar aria-label="dep1 toolbar"/>'),
    'dep1 vendor output preserves nested JSX component syntax',
  ],
  [
    vendorFiles.dep1Toolbar.includes('<nav {...props}>') &&
      vendorFiles.dep1Toolbar.includes('<>') &&
      vendorFiles.dep1Toolbar.includes('</>'),
    'dep1 vendor output preserves spread props and fragments',
  ],
  [
    vendorFiles.dep2Index.includes('export { Dep2Badge } from "./badge.jsx"') &&
      vendorFiles.dep2Index.includes('export { default } from "./panel.jsx"'),
    'dep2 vendor index keeps barrel exports to isolated files',
  ],
  [
    vendorFiles.dep2Badge.includes('<strong data-preserve-jsx-dep2>'),
    'dep2 vendor output preserves JSX element syntax',
  ],
  [
    vendorFiles.dep2Panel.includes(
      '<Dep2Badge label="Rendered by dependency two"/>',
    ),
    'dep2 vendor output preserves JSX component syntax',
  ],
  [
    vendorFiles.dep2Panel.includes("<Dep2Stack active={'ready' === status}/>") &&
      vendorFiles.dep2Panel.includes('<Dep2Meta details={{'),
    'dep2 vendor output preserves nested JSX component syntax',
  ],
  [
    vendorFiles.dep2Stack.includes('<span data-dep2-active>active</span>') &&
      vendorFiles.dep2Meta.includes('<dl data-dep2-meta>'),
    'dep2 vendor output preserves conditional JSX and object expression props',
  ],
  [
    !allVendorContent.includes('react/jsx-runtime'),
    'vendor outputs are not transformed to react/jsx-runtime calls',
  ],
  [
    vendorFiles.dep1Card.includes('from "./button.jsx"') &&
      vendorFiles.dep1Card.includes('from "./list.jsx"') &&
      vendorFiles.dep1Card.includes('from "./toolbar.jsx"') &&
      vendorFiles.dep2Panel.includes('from "./badge.jsx"') &&
      vendorFiles.dep2Panel.includes('from "./meta.jsx"') &&
      vendorFiles.dep2Panel.includes('from "./stack.jsx"'),
    'vendor outputs are split into per-package bundleless directories',
  ],
];

for (const [ok, message] of checks) {
  if (!ok) {
    throw new Error(`Verification failed: ${message}`);
  }
  console.log(`ok - ${message}`);
}
