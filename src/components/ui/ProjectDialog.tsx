import Image from "next/image";
import { useEffect, useRef } from "react";
import { ui, type Lang, type Project } from "@/data/portfolio";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { TrendIcon } from "@/components/icons/TrendIcon";
import { Chip } from "@/components/ui/Chip";

export function ProjectDialog({
    project,
    lang,
    onClose,
}: {
    project: Project | null;
    lang: Lang;
    onClose: () => void;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    const t = (v: Record<Lang, string>) => v[lang];

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog || !project) return;
        dialog.showModal();
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = "";
            if (dialog.open) dialog.close();
        };
    }, [project]);

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            // a click on the backdrop lands on the <dialog> element itself
            onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
            className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-blue-100 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm dark:border-blue-900/50 dark:bg-[#0a1428] dark:text-slate-100"
        >
            {project && (
                <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-bold tracking-tight">{t(project.title)}</h3>
                        <button
                            type="button"
                            onClick={() => ref.current?.close()}
                            aria-label={t(ui.close)}
                            className="-m-1.5 shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-400 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                        >
                            <CloseIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {project.image && (
                        <div className="relative mt-5 aspect-video overflow-hidden rounded-xl border border-blue-100 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950">
                            <Image
                                src={project.image}
                                alt={t(project.title)}
                                fill
                                sizes="(min-width: 672px) 640px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    )}

                    <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">{t(project.desc)}</p>
                    {project.details && (
                        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{t(project.details)}</p>
                    )}

                    {project.role && (
                        <>
                            <h4 className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                {t(ui.projectRole)}
                            </h4>
                            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{t(project.role)}</p>
                        </>
                    )}

                    {project.impact && project.impact.length > 0 && (
                        <>
                            <h4 className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                {t(ui.projectImpact)}
                            </h4>
                            <ul className="mt-2 space-y-2">
                                {project.impact.map((i) => (
                                    <li key={i.en} className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                                        <TrendIcon className="h-4 w-4 shrink-0" /> {t(i)}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <h4 className="mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {t(ui.projectStack)}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <Chip key={tag}>{tag}</Chip>
                        ))}
                    </div>
                </div>
            )}
        </dialog>
    );
}
