import { Dep1Badge } from './badge.jsx';

export const Dep1List = ({ items = ['alpha', 'beta'] }) => {
  return (
    <ul data-dep1-list>
      {items.map((item) => (
        <li key={item}>
          <Dep1Badge tone={item} />
          <span>{item.toUpperCase()}</span>
        </li>
      ))}
    </ul>
  );
};
