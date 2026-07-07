import { Dep2Badge } from './badge.jsx';
import { Dep2Meta } from './meta.jsx';
import { Dep2Stack } from './stack.jsx';

export default function Dep2Panel({ status = 'idle' }) {
  return (
    <aside data-dep2-status={status}>
      <h2>Preserve JSX dep 2</h2>
      <Dep2Badge label="Rendered by dependency two" />
      <Dep2Stack active={status === 'ready'} />
      <Dep2Meta details={{ status }} />
    </aside>
  );
}
