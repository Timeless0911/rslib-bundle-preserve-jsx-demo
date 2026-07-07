import { Dep1Button } from './button.jsx';
import { Dep1List } from './list.jsx';
import { Dep1Toolbar } from './toolbar.jsx';

export default function Dep1Card({ tone = 'neutral' }) {
  return (
    <section data-dep1-card={tone}>
      <h2>Preserve JSX dep 1</h2>
      <Dep1Button label="Rendered by dependency one" />
      <Dep1List items={['calm', tone]} />
      <Dep1Toolbar aria-label="dep1 toolbar" />
    </section>
  );
}
