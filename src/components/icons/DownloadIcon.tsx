type P = { className?: string };

export const DownloadIcon = ({ className }: P) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
        <path d="M12 3v12m-4-4 4 4 4-4M5 21h14" />
    </svg>
);
