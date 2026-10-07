type P = { className?: string };

export const TrendIcon = ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="m3 17 6-6 4 4 8-8M14 7h7v7" />
    </svg>
);
