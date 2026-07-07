export const DependencyButton = ({ label }) => {
  return <button data-from-jsx-only-dep>{label}</button>;
};

export default function DependencyCard({ tone = 'neutral' }) {
  return (
    <section data-tone={tone}>
      <h2>JSX dependency output</h2>
      <DependencyButton label="Rendered by dependency entry" />
    </section>
  );
}
