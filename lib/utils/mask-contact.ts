export function maskContact(value: string): string {
  const phoneMatch = value.match(/^(\d{2,3})-(\d{3,4})-(\d{4})$/);
  if (phoneMatch) {
    const [, first, middle, last] = phoneMatch;
    return `${first}-${middle.slice(0, 2)}**-${last.slice(0, 2)}**`;
  }
  if (value.length <= 4) return "*".repeat(value.length);
  return `${value.slice(0, 3)}${"*".repeat(value.length - 3)}`;
}
