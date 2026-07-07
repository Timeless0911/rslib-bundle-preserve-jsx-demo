export const Dep1Button = ({ label }) => {
  return <button data-preserve-jsx-dep1>{label}</button>;
};

export const Dep1Badge = ({ tone }) => {
  return <span data-dep1-tone={tone}>dep1 badge</span>;
};

export default function Dep1Card({ tone = 'neutral' }) {
  return (
    <section data-dep1-card={tone}>
      <h2>Preserve JSX dep 1</h2>
      <Dep1Button label="Rendered by dependency one" />
    </section>
  );
}
