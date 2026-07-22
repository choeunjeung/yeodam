const VARIANT_CLASS = {
  active: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  paused: "bg-[var(--color-beige-light)] text-[var(--color-brown-mid)]",
  urgent: "bg-[var(--color-urgent)]/10 text-[var(--color-urgent)]",
  open: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  closed: "bg-[var(--color-beige-light)] text-[var(--color-brown-mid)]",
  neutral: "bg-[var(--color-beige-light)] text-[var(--color-brown-deep)]",
} as const;

export default function Badge({
  variant = "neutral",
  children,
}: {
  variant?: keyof typeof VARIANT_CLASS;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANT_CLASS[variant]}`}
    >
      {children}
    </span>
  );
}
