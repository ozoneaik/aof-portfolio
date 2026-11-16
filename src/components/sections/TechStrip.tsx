import { techStrip, ui, type Lang } from "@/data/portfolio";
import { skillIcon } from "@/components/Icons";

// แถบโลโก้เทคโนโลยีใต้แผงผลงาน
export function TechStrip({ lang }: { lang: Lang }) {
    return (
        <section aria-label={ui.techStripTitle[lang]} className="pb-10 pt-16 text-center">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {"// "}
                    {ui.techStripTitle[lang]}
                </p>
                <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                    {techStrip.map((name) => {
                        const Icon = skillIcon[name];
                        return (
                            <li
                                key={name}
                                className="flex items-center gap-2.5 font-display text-xl font-extrabold italic text-slate-400 transition-colors hover:text-blue-600 dark:text-slate-500 dark:hover:text-sky-300"
                            >
                                <Icon className="h-6 w-6" />
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
