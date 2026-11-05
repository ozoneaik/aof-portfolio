import { profile, ui, type Lang } from "@/data/portfolio";

export function Footer({ lang }: { lang: Lang }) {
    return (
        <footer className="py-8 text-[13.5px] text-slate-500 dark:text-slate-400">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 sm:flex-row sm:px-6">
                <p>
                    © 2026 {profile.name[lang]} ({profile.nickname})
                </p>
                <p className="font-mono">{ui.footer[lang]}</p>
            </div>
        </footer>
    );
}
