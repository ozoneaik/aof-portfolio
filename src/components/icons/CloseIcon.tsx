type P = { className?: string };

export const CloseIcon = ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M6 6l12 12M18 6 6 18" />
    </svg>
);
