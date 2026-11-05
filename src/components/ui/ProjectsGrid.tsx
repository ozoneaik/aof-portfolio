"use client";

import { useState } from "react";
import { TrendIcon } from "@/components/icons/TrendIcon";
import { ProjectDialog } from "@/components/ui/ProjectDialog";

/** ข้อมูลโปรเจกต์ที่แปลภาษาแล้ว (มาจาก ProjectsSection) */
export type ProjectView = {
    slug: string;
    category: "work" | "personal";
    featured: boolean;
    title: string;
    desc: string;
    details?: string;
    role?: string;
    impact: string[];
    tags: string[];
    image?: string;
};

export type ProjectLabels = {
    all: string;
    work: string;
    personal: string;
    featured: string;
    viewDetails: string;
    close: string;
    role: string;
    impact: string;
    stack: string;
};

type Filter = "all" | ProjectView["category"];

export function ProjectsGrid({ items, labels }: { items: ProjectView[]; labels: ProjectLabels }) {
    const [filter, setFilter] = useState<Filter>("all");
    const [open, setOpen] = useState<ProjectView | null>(null);

    const shown = filter === "all" ? items : items.filter((p) => p.category === filter);

    return (
        <>
            {/* ปุ่มกรอง */}
            <div role="group" className="-mt-4 mb-9 flex flex-wrap justify-center gap-2">
                {(["all", "work", "personal"] as const).map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => setFilter(f)}
                        aria-pressed={filter === f}
                        className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                            filter === f
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-blue-100 bg-white text-slate-600 hover:border-blue-300 hover:text-slate-900 dark:border-blue-900/60 dark:bg-ink-2 dark:text-slate-300 dark:hover:text-white"
                        }`}
                    >
                        {labels[f]}
                    </button>
                ))}
            </div>

            {/* การ์ดผลงาน */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p) => (
                    <article
                        key={p.slug}
                        className={`group relative flex flex-col rounded-[20px] border p-6 shadow-card transition duration-300 hover:-translate-y-1 ${
                            p.featured
                                ? "border-transparent bg-navy text-slate-200 dark:border-blue-800/60 dark:bg-navy-2"
                                : "border-transparent bg-white hover:border-blue-200 dark:border-blue-900/40 dark:bg-ink-2 dark:hover:border-blue-700"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`font-mono text-xs ${p.featured ? "text-[#6b7fa3]" : "text-slate-400 dark:text-slate-500"}`}>
                                ~/{p.slug}
                            </span>
                            {p.featured && (
                                <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900">
                                    {labels.featured}
                                </span>
                            )}
                        </div>

                        <h3 className={`mb-2 mt-3.5 text-[19px] font-semibold leading-snug ${p.featured ? "text-white" : "text-slate-900 dark:text-white"}`}>
                            {/* ::after ขยายพื้นที่กดของปุ่มให้เต็มการ์ด */}
                            <button
                                type="button"
                                onClick={() => setOpen(p)}
                                className="text-left after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-blue-500"
                            >
                                {p.title}
                            </button>
                        </h3>
                        <p className={`line-clamp-4 text-sm leading-relaxed ${p.featured ? "text-[#a5b4cb]" : "text-slate-600 dark:text-slate-400"}`}>
                            {p.desc}
                        </p>

                        {p.impact[0] && (
                            <p className={`mt-3.5 flex items-center gap-2 text-[13.5px] font-semibold ${p.featured ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                                <TrendIcon className="h-4 w-4 shrink-0" /> {p.impact[0]}
                            </p>
                        )}

                        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                            {p.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`rounded-lg px-2.5 py-1 font-mono text-[11.5px] ${
                                        p.featured ? "bg-white/10 text-sky-300" : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                    }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className={`mt-4 text-sm font-semibold ${p.featured ? "text-sky-300" : "text-blue-600 dark:text-blue-400"}`}>
                            {labels.viewDetails} <span className="inline-block transition group-hover:translate-x-1">→</span>
                        </p>
                    </article>
                ))}
            </div>

            <ProjectDialog project={open} labels={labels} onClose={() => setOpen(null)} />
        </>
    );
}
