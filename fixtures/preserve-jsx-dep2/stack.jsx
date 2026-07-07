import { Dep2Badge } from './badge.jsx';

export const Dep2Stack = ({ active = true }) => {
  const rows = [
    <Dep2Badge key="first" label="First dep2 row" />,
    <Dep2Badge key="second" label="Second dep2 row" />,
  ];

  return (
    <div data-dep2-stack={active ? 'active' : 'idle'}>
      {active ? <span data-dep2-active>active</span> : null}
      {rows}
    </div>
  );
};
