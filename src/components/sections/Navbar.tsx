import { useState } from "react";
import { langLabel, langs, ui, type Lang } from "@/data/portfolio";
import { MoonIcon } from "@/components/icons/MoonIcon";
import { SunIcon } from "@/components/icons/SunIcon";

const sections = ["about", "experience", "projects", "skills", "contact"] as const;

export function Navbar({
    lang,
    onLangChange,
    isDark,
    onToggleTheme,
}: {
    lang: Lang;
    onLangChange: (l: Lang) => void;
    isDark: boolean;
    onToggleTheme: () => void;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <header className="sticky top-0 z-50 border-b border-blue-100/70 bg-white/80 backdrop-blur-md dark:border-blue-900/40 dark:bg-[#050b1a]/80">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
                <a href="#top" className="font-mono text-lg font-semibold text-slate-900 dark:text-white">
                    <span className="text-blue-600 dark:text-blue-400">&lt;</span>aof
                    <span className="text-blue-600 dark:text-blue-400"> /&gt;</span>
                </a>

                <ul className="hidden items-center gap-6 lg:flex">
                    {sections.map((id, i) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                            >
                                <span className="font-mono text-xs text-blue-500">0{i + 1}.</span> {t(ui.nav[id])}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex rounded-lg border border-blue-200 p-0.5 font-mono text-xs dark:border-blue-900/70">
                        {langs.map((l) => (
                            <button
                                key={l}
                                onClick={() => onLangChange(l)}
                                className={`rounded-md px-2 py-1 transition-colors sm:px-2.5 ${
                                    lang === l
                                        ? "bg-blue-600 text-white"
                                        : "text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950"
                                }`}
                                aria-pressed={lang === l}
                            >
                                {langLabel[l]}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={onToggleTheme}
                        aria-label={t(isDark ? ui.themeLight : ui.themeDark)}
                        title={t(isDark ? ui.themeLight : ui.themeDark)}
                        className="relative h-[30px] w-[30px] overflow-hidden rounded-lg border border-blue-200 text-amber-500 transition-colors hover:bg-blue-50 dark:border-blue-900/70 dark:text-blue-300 dark:hover:bg-blue-950"
                    >
                        {/* icons follow the .dark class so the right one shows from first paint */}
                        <SunIcon className="absolute inset-0 m-auto h-[18px] w-[18px] transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0" />
                        <MoonIcon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100" />
                    </button>

                    <button
                        className="rounded-lg p-1.5 text-slate-700 hover:bg-blue-50 lg:hidden dark:text-slate-200 dark:hover:bg-blue-950"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label="Menu"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                            {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>
            </nav>
            {menuOpen && (
                <ul className="border-t border-blue-100 bg-white px-4 py-3 lg:hidden dark:border-blue-900/40 dark:bg-[#050b1a]">
                    {sections.map((id, i) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                            >
                                <span className="font-mono text-xs text-blue-500">0{i + 1}.</span> {t(ui.nav[id])}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}
