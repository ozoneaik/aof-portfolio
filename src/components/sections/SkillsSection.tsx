import { skills, ui, type Lang } from "@/data/portfolio";
import { skillIcon } from "@/components/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trackSpotlight } from "@/components/ui/spotlight";

export function SkillsSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="skills" className="scroll-mt-16 bg-blue-50/50 py-24 dark:bg-blue-950/20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading index="04" label="skills" title={t(ui.skillsTitle)} />
                <div className="grid gap-5 md:grid-cols-2">
                    {skills.map((s) => (
                        <div
                            key={s.group.en}
                            onMouseMove={trackSpotlight}
                            className="reveal spotlight relative rounded-xl border border-blue-100 bg-white p-6 dark:border-blue-900/40 dark:bg-slate-900/60"
                        >
                            <h3 className="font-mono text-sm font-semibold text-blue-700 dark:text-blue-300">
                                <span className="text-blue-300 dark:text-blue-700">const</span> {t(s.group)}
                            </h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {s.items.map((it) => {
                                    const Icon = skillIcon[it];
                                    return (
                                        <span
                                            key={it}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                                        >
                                            {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
                                            {it}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
