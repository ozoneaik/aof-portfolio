import { experience, ui, type Lang } from "@/data/portfolio";
import { Logo } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="experience" className="scroll-mt-16 bg-blue-50/50 py-24 dark:bg-blue-950/20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading index="02" label="experience" title={t(ui.experienceTitle)} />
                <ol className="relative ml-2 border-l-2 border-blue-200 dark:border-blue-900/70">
                    {experience.map((x) => (
                        <li key={x.period.en} className="reveal relative mb-10 pl-8 last:mb-0">
                            <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-600 ring-2 ring-blue-200 dark:border-[#050b1a] dark:bg-blue-400 dark:ring-blue-900" />
                            <p className="font-mono text-sm text-blue-600 dark:text-blue-400">{t(x.period)}</p>
                            <div className="mt-2 flex items-center gap-4">
                                {x.logo && <Logo src={x.logo} alt={t(x.org)} zoom={x.logoZoom} className="h-14 w-14" />}
                                <div className="min-w-0">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{t(x.title)}</h3>
                                    <p className="text-slate-500 dark:text-slate-400">{t(x.org)}</p>
                                </div>
                            </div>
                            <p className="mt-3 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">{t(x.desc)}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
