import { useEffect, useRef, useState } from "react";
import { langLabel, langs, profile, ui, type Lang } from "@/data/portfolio";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
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
    const [active, setActive] = useState<string | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const t = (v: Record<Lang, string>) => v[lang];

    // scroll progress bar + highlight the section currently in view
    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const { scrollY, innerHeight } = window;
            const max = document.documentElement.scrollHeight - innerHeight;
            progressRef.current?.style.setProperty("transform", `scaleX(${max > 0 ? scrollY / max : 0})`);

            let current: string | null = null;
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) current = id;
            }
            // the last section is short, so treat "scrolled to the bottom" as reaching it
            if (max > 0 && scrollY >= max - 2) current = sections[sections.length - 1];
            setActive(current);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    const linkClass = (id: string) =>
        active === id
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400";

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
                                aria-current={active === id ? "true" : undefined}
                                className={`relative text-sm transition-colors ${linkClass(id)}`}
                            >
                                <span className="font-mono text-xs text-blue-500">0{i + 1}.</span> {t(ui.nav[id])}
                                <span
                                    className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-400 ${
                                        active === id ? "w-full opacity-100" : "w-0 opacity-0"
                                    }`}
                                />
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <a
                        href={t(profile.cv)}
                        download
                        className="hidden items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 sm:inline-flex dark:hover:bg-blue-500"
                    >
                        <DownloadIcon className="h-3.5 w-3.5" /> CV
                    </a>
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
                                aria-current={active === id ? "true" : undefined}
                                className={`block py-2 ${linkClass(id)}`}
                            >
                                <span className="font-mono text-xs text-blue-500">0{i + 1}.</span> {t(ui.nav[id])}
                            </a>
                        </li>
                    ))}
                    <li className="sm:hidden">
                        <a
                            href={t(profile.cv)}
                            download
                            className="mt-1 flex items-center gap-2 py-2 font-medium text-blue-600 dark:text-blue-400"
                        >
                            <DownloadIcon className="h-4 w-4" /> {t(ui.downloadCv)}
                        </a>
                    </li>
                </ul>
            )}
            <div
                ref={progressRef}
                style={{ transform: "scaleX(0)" }}
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-blue-600 to-sky-400"
                aria-hidden
            />
        </header>
    );
}
