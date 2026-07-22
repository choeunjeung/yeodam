export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-cream)] p-10 text-center">
      <p className="font-semibold text-[var(--color-brown-deep)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--color-brown-mid)]">
        {description}
      </p>
    </div>
  );
}
