import { profile, ui, type Lang } from "@/data/portfolio";

export function Footer({ lang }: { lang: Lang }) {
    return (
        <footer className="bg-navy py-8 text-[13.5px] text-slate-400 dark:bg-black/40">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 sm:flex-row sm:px-6">
                <p>
                    © 2026 {profile.name[lang]} ({profile.nickname})
                </p>
                <div className="flex items-center gap-5">
                    <p className="font-mono">{ui.footer[lang]}</p>
                    <a href="#top" className="font-display font-black italic text-white hover:text-sky-300">
                        TOP ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}
