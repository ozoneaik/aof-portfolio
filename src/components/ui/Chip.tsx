export function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 font-mono text-xs text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
            {children}
        </span>
    );
}
