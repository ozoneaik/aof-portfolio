"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProjectView } from "@/lib/projects";
import { ProjectDialog } from "@/components/ui/ProjectDialog";
import type { ProjectLabels } from "@/components/ui/ProjectsGrid";

type Labels = ProjectLabels & { heading: string; subheading: string };
type Filter = "all" | ProjectView["category"];

/**
 * แผงผลงาน 2 ฝั่ง (สไตล์แผงข่าวของเว็บเกม)
 * - ซ้าย: สไลด์ผลงานเด่น แสดงรูป cover เลื่อนเองทุก 5 วินาที
 * - ขวา: tab กรองหมวด + รายการผลงานทั้งหมด
 * กดตรงไหนก็เปิด ProjectDialog ตัวเดิม
 */
export function ProjectsPanel({ items, labels }: { items: ProjectView[]; labels: Labels }) {
    const [filter, setFilter] = useState<Filter>("all");
    const [open, setOpen] = useState<ProjectView | null>(null);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    // ผลงานในสไลด์: เอาที่ติด featured ก่อน ถ้าไม่มีเลยใช้ 3 อันแรก
    const featured = items.filter((p) => p.featured);
    const slides = featured.length > 0 ? featured : items.slice(0, 3);
    // โปรเจกต์ที่มีภาพหน้าจอขึ้นก่อน (sort แบบ stable → ภายในกลุ่มยังเรียงตามเดิม)
    const shown = [...(filter === "all" ? items : items.filter((p) => p.category === filter))].sort(
        (a, b) => Number(b.images.length > 0) - Number(a.images.length > 0),
    );

    // เลื่อนสไลด์เอง (หยุดตอนเอาเมาส์ชี้ / ผู้ใช้ตั้งค่าลดการเคลื่อนไหว)
    useEffect(() => {
        if (paused || slides.length < 2) return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
        return () => clearInterval(id);
    }, [paused, slides.length]);

    // เลื่อนไปข้างหน้า/ถอยหลัง วนรอบเมื่อถึงปลาย
    const go = (step: number) => setIndex((i) => (i + step + slides.length) % slides.length);

    if (items.length === 0) return null;

    return (
        <>
            <div className="grid gap-7 bg-gradient-to-r from-sky-500 to-blue-600 p-5 text-white shadow-[0_30px_60px_-30px_rgb(15_35_71/0.6)] sm:p-7 lg:grid-cols-[1.15fr_1fr] dark:from-sky-800 dark:to-blue-900">
                {/* ---------- ซ้าย: สไลด์ผลงานเด่น ---------- */}
                <div>
                    <div className="mb-3 flex items-end justify-between gap-3">
                        <div>
                            <h2 className="font-display text-2xl font-black italic leading-none">{labels.heading}</h2>
                            <p className="mt-1 text-[13px] text-white/80">{labels.subheading}</p>
                        </div>
                        {/* จุดบอกตำแหน่งสไลด์ */}
                        <div className="flex gap-1.5">
                            {slides.map((p, i) => (
                                <button
                                    key={p.slug}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    aria-label={p.title}
                                    aria-current={i === index}
                                    className={`h-1.5 -skew-x-[30deg] transition-all ${i === index ? "w-8 bg-amber-300" : "w-4 bg-white/50 hover:bg-white"}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div
                        className="relative aspect-[4/3] overflow-hidden bg-navy sm:aspect-[16/9]"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* วางทุกสไลด์ซ้อนกัน แล้วสลับความโปร่งใส (crossfade) */}
                        {slides.map((p, i) => {
                            const cover = p.images[0];
                            return (
                                <button
                                    key={p.slug}
                                    type="button"
                                    onClick={() => setOpen(p)}
                                    tabIndex={i === index ? 0 : -1}
                                    aria-hidden={i !== index}
                                    className={`group absolute inset-0 text-left transition-opacity duration-700 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
                                >
                                    {cover ? (
                                        <Image
                                            src={cover.url}
                                            alt={cover.caption || p.title}
                                            fill
                                            sizes="(min-width: 1024px) 600px, 100vw"
                                            className="object-cover object-top transition duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <span className="absolute inset-0 bg-gradient-to-br from-blue-900 to-navy" />
                                    )}
                                    {/* ไล่สีดำด้านล่างให้อ่านตัวหนังสือออก */}
                                    <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                                    <span className="absolute inset-x-0 bottom-0 p-5">
                                        <span className="mb-1 block font-mono text-[11.5px] text-sky-200">{p.tags.slice(0, 4).join(" · ")}</span>
                                        <span className="block font-display text-2xl font-black italic leading-tight sm:text-[28px]">{p.title}</span>
                                        <span className="mt-1 block text-sm font-semibold text-amber-300">
                                            {labels.viewDetails} <span className="inline-block transition group-hover:translate-x-1">→</span>
                                        </span>
                                    </span>
                                </button>
                            );
                        })}

                        {slides.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => go(-1)}
                                    aria-label={labels.prevImage}
                                    className="absolute left-3 top-1/2 z-10 hidden h-9 w-9 sm:grid -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-black/40 text-lg hover:bg-amber-300 hover:text-slate-900"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={() => go(1)}
                                    aria-label={labels.nextImage}
                                    className="absolute right-3 top-1/2 z-10 hidden h-9 w-9 sm:grid -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-black/40 text-lg hover:bg-amber-300 hover:text-slate-900"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* ---------- ขวา: tab + รายการผลงาน ---------- */}
                <div className="flex flex-col">
                    <div role="group" className="mb-2 grid grid-cols-3 gap-1 bg-black/15 p-1">
                        {(["all", "work", "personal"] as const).map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFilter(f)}
                                aria-pressed={filter === f}
                                className={`py-2 text-sm font-bold transition ${
                                    filter === f ? "bg-white text-blue-700 dark:bg-navy dark:text-sky-300" : "text-white/85 hover:bg-white/10"
                                }`}
                            >
                                {labels[f]}
                            </button>
                        ))}
                    </div>

                    <ul className="max-h-[330px] overflow-y-auto pr-1">
                        {shown.map((p) => (
                            <li key={p.slug} className="border-b border-white/20 last:border-0">
                                <button
                                    type="button"
                                    onClick={() => setOpen(p)}
                                    className="group flex w-full items-center justify-between gap-4 py-3 text-left transition-all hover:pl-2"
                                >
                                    <span className="flex min-w-0 items-center gap-2">
                                        {p.featured && <span className="h-2 w-2 shrink-0 rotate-45 bg-amber-300" title={labels.featured} />}
                                        <span className="truncate text-[15px] font-semibold">{p.title}</span>
                                        {p.confidential && <span aria-hidden className="shrink-0 text-xs opacity-70" title={labels.confidential}>🔒</span>}
                                    </span>
                                    <span className="shrink-0 font-mono text-[11.5px] text-white/75 group-hover:text-amber-200">
                                        {p.tags.slice(0, 2).join(" · ")}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <ProjectDialog project={open} labels={labels} onClose={() => setOpen(null)} />
        </>
    );
}
