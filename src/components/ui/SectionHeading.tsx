export function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
    return (
        <div className="reveal mb-10">
            <p className="font-mono text-sm text-blue-600 dark:text-blue-400">
                <span className="text-blue-300 dark:text-blue-700">{index}.</span> {label}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
        </div>
    );
}
