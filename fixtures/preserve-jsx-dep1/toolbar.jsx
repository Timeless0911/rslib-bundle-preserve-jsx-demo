import { Dep1Button } from './button.jsx';

export const Dep1Toolbar = (props) => {
  return (
    <>
      <Dep1Button label="Primary action" />
      <nav {...props}>
        <a href="#dep1-a">A</a>
        <a href="#dep1-b">B</a>
      </nav>
    </>
  );
};
