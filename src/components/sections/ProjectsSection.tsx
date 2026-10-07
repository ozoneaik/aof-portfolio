import { useState } from "react";
import { projects, ui, type Lang, type Project } from "@/data/portfolio";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { TrendIcon } from "@/components/icons/TrendIcon";
import { Chip } from "@/components/ui/Chip";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trackSpotlight } from "@/components/ui/spotlight";

export function ProjectsSection({ lang }: { lang: Lang }) {
    const [open, setOpen] = useState<Project | null>(null);
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="projects" className="scroll-mt-16 py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading index="03" label="projects" title={t(ui.projectsTitle)} />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p) => (
                        <article
                            key={p.title.en}
                            onMouseMove={trackSpotlight}
                            className={`reveal spotlight group relative flex flex-col rounded-xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 dark:bg-slate-900/60 dark:hover:shadow-blue-500/10 ${
                                p.featured
                                    ? "border-blue-300 ring-1 ring-blue-100 dark:border-blue-700/70 dark:ring-blue-900/40"
                                    : "border-slate-200 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-700"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                                    ~/{p.title.en.toLowerCase().split(" ").slice(0, 2).join("-").replace(/[^a-z-]/g, "")}
                                </span>
                                {p.featured && (
                                    <span className="rounded-full bg-blue-600 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white">
                                        featured
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                                {/* the ::after overlay stretches this button over the whole card */}
                                <button
                                    type="button"
                                    onClick={() => setOpen(p)}
                                    className="text-left after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-blue-500"
                                >
                                    {t(p.title)}
                                </button>
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(p.desc)}</p>
                            {p.impact?.[0] && (
                                <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                    <TrendIcon className="h-4 w-4 shrink-0" /> {t(p.impact[0])}
                                </p>
                            )}
                            <div className="mt-5 flex flex-1 flex-wrap content-end gap-1.5">
                                {p.tags.map((tag) => (
                                    <Chip key={tag}>{tag}</Chip>
                                ))}
                            </div>
                            <p className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-70 transition group-hover:opacity-100 dark:text-blue-400">
                                {t(ui.viewDetails)} <ArrowIcon className="h-3.5 w-3.5" />
                            </p>
                        </article>
                    ))}
                </div>
            </div>
            <ProjectDialog project={open} lang={lang} onClose={() => setOpen(null)} />
        </section>
    );
}
