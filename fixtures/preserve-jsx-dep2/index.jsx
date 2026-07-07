export const Dep2Badge = ({ label }) => {
  return <strong data-preserve-jsx-dep2>{label}</strong>;
};

export default function Dep2Panel({ status = 'idle' }) {
  return (
    <aside data-dep2-status={status}>
      <h2>Preserve JSX dep 2</h2>
      <Dep2Badge label="Rendered by dependency two" />
    </aside>
  );
}
