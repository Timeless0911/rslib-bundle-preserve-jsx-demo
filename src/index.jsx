import DependencyCard, { DependencyButton } from 'jsx-only-dep';

export const DemoWidget = ({ title = 'Rslib demo' }) => {
  return (
    <main className="demo-widget">
      <h1>{title}</h1>
      <DependencyCard tone="calm" />
      <DependencyButton label="Rendered by library entry" />
    </main>
  );
};

export { DependencyCard, DependencyButton };
