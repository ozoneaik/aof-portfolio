import { projects, ui, type Lang } from "@/data/portfolio";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectsSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="projects" className="scroll-mt-16 py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading index="03" label="projects" title={t(ui.projectsTitle)} />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p) => (
                        <article
                            key={p.title.en}
                            className={`reveal group flex flex-col rounded-xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 dark:bg-slate-900/60 dark:hover:shadow-blue-500/10 ${
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
                                {t(p.title)}
                            </h3>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(p.desc)}</p>
                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {p.tags.map((tag) => (
                                    <Chip key={tag}>{tag}</Chip>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
