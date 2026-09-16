export function Logo({ size = 28 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden className="brand-symbol">
    <rect x="1" y="1" width="30" height="30" rx="9" fill="var(--accent)" />
    <path d="m16 7.5 8 16.5H8L16 7.5Z" stroke="white" strokeWidth="2.1" strokeLinejoin="round" />
    <circle cx="16" cy="18.4" r="3.1" fill="white" />
  </svg>;
}