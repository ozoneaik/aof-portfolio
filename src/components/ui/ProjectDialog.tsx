"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { TrendIcon } from "@/components/icons/TrendIcon";
import type { ProjectLabels, ProjectView } from "@/components/ui/ProjectsGrid";

const heading = "mt-6 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400";

/** หน้าต่างรายละเอียดโปรเจกต์ ใช้ <dialog> ของ browser (กด Esc ปิดได้, โฟกัสอยู่ในหน้าต่างให้เอง) */
export function ProjectDialog({
    project,
    labels,
    onClose,
}: {
    project: ProjectView | null;
    labels: ProjectLabels;
    onClose: () => void;
}) {
    const ref = useRef<HTMLDialogElement>(null);

    // เปิด dialog เมื่อมีโปรเจกต์ถูกเลือก และล็อกการเลื่อนหน้าหลังไว้
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
            // คลิกที่พื้นหลังมืด = คลิกโดน <dialog> เอง → ปิด
            onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
            className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-3xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm dark:bg-ink-2 dark:text-slate-100"
        >
            {project && (
                <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="font-mono text-xs text-slate-400">~/{project.slug}</p>
                            <h3 className="mt-1 text-2xl font-bold">{project.title}</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => ref.current?.close()}
                            aria-label={labels.close}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-50 text-slate-500 hover:text-blue-700 dark:bg-blue-950 dark:text-slate-300 dark:hover:text-blue-300"
                        >
                            <CloseIcon className="h-4 w-4" />
                        </button>
                    </div>

                    {project.image && (
                        <div className="relative mt-5 aspect-video overflow-hidden rounded-2xl bg-blue-50 dark:bg-blue-950">
                            <Image src={project.image} alt={project.title} fill sizes="(min-width: 672px) 640px, 100vw" className="object-cover" />
                        </div>
                    )}

                    <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">{project.desc}</p>
                    {project.details && <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{project.details}</p>}

                    {project.role && (
                        <>
                            <h4 className={heading}>{labels.role}</h4>
                            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{project.role}</p>
                        </>
                    )}

                    {project.impact.length > 0 && (
                        <>
                            <h4 className={heading}>{labels.impact}</h4>
                            <ul className="mt-2 space-y-2">
                                {project.impact.map((i) => (
                                    <li key={i} className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
                                        <TrendIcon className="h-4 w-4 shrink-0" /> {i}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <h4 className={heading}>{labels.stack}</h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span key={tag} className="rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </dialog>
    );
}
