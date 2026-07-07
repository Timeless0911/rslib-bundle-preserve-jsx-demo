import Dep1Card, { Dep1Button } from 'preserve-jsx-dep1';
import Dep2Panel, { Dep2Badge } from 'preserve-jsx-dep2';

export const DemoWidget = ({ title = 'Rslib demo' }) => {
  return (
    <main className="demo-widget">
      <h1>{title}</h1>
      <Dep1Card tone="calm" />
      <Dep1Button label="Rendered by library entry" />
      <Dep2Panel status="ready" />
      <Dep2Badge label="Second JSX dependency" />
    </main>
  );
};

export { Dep1Badge, Dep1Button } from 'preserve-jsx-dep1';
export { default as Dep1Card } from 'preserve-jsx-dep1';
export { Dep2Badge } from 'preserve-jsx-dep2';
export { default as Dep2Panel } from 'preserve-jsx-dep2';
