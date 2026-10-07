import { ui, type Lang } from "@/data/portfolio";

export function Footer({ lang }: { lang: Lang }) {
    return (
        <footer className="border-t border-blue-100 py-8 dark:border-blue-900/40">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 font-mono text-xs text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
                <p>© 2026 Phuwadech Panichayasopa</p>
                <p>{ui.footer[lang]}</p>
            </div>
        </footer>
    );
}
