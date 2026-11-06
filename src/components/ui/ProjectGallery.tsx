"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImageView } from "@/lib/projects";

type Props = {
    images: ProjectImageView[];
    title: string;
    labels: { prevImage: string; nextImage: string };
};

/**
 * Gallery ภาพหน้าจอใน dialog รายละเอียดผลงาน
 * - รูปใหญ่ + คำอธิบายใต้รูป (ช่วยให้ HR เข้าใจว่าแต่ละหน้าทำอะไร)
 * - ปุ่ม ‹ › และกดลูกศรซ้าย/ขวาบนคีย์บอร์ดเพื่อเลื่อนรูป
 * - แถบรูปเล็กด้านล่าง กดเพื่อกระโดดไปรูปนั้น
 * - กดที่รูปใหญ่ = เปิดรูปขนาดเต็มในแท็บใหม่
 */
export function ProjectGallery({ images, title, labels }: Props) {
    const [index, setIndex] = useState(0);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const total = images.length;
    const current = images[index];

    // เลื่อนวนรอบ: รูปสุดท้าย → รูปแรก
    const go = (step: number) => setIndex((i) => (i + step + total) % total);

    // เลื่อนแถบรูปเล็กให้เห็นรูปที่เลือกอยู่เสมอ
    useEffect(() => {
        const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined;
        thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }, [index]);

    if (total === 0) return null;

    return (
        <div
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "ArrowLeft") go(-1);
                if (e.key === "ArrowRight") go(1);
            }}
            className="mt-5 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
            {/* รูปใหญ่ */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
                <a href={current.url} target="_blank" rel="noopener noreferrer" className="relative block h-full w-full cursor-zoom-in">
                    <Image
                        key={current.url}
                        src={current.url}
                        alt={current.caption || title}
                        fill
                        sizes="(min-width: 768px) 704px, 100vw"
                        className="object-contain"
                    />
                </a>

                {/* ตำแหน่งรูป เช่น 3 / 17 */}
                <span className="absolute right-3 top-3 rounded-full bg-slate-900/70 px-2.5 py-1 font-mono text-xs text-white">
                    {index + 1} / {total}
                </span>

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label={labels.prevImage}
                            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-700 shadow-soft transition hover:bg-white dark:bg-ink/90 dark:text-slate-200"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label={labels.nextImage}
                            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-700 shadow-soft transition hover:bg-white dark:bg-ink/90 dark:text-slate-200"
                        >
                            ›
                        </button>
                    </>
                )}
            </div>

            {/* คำอธิบายรูป (aria-live: โปรแกรมอ่านหน้าจออ่านให้ฟังเมื่อเปลี่ยนรูป) */}
            <p aria-live="polite" className="mt-3 min-h-[1.5rem] text-sm font-medium text-slate-700 dark:text-slate-200">
                {current.caption}
            </p>

            {/* แถบรูปเล็ก */}
            {total > 1 && (
                <div ref={thumbsRef} className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                    {images.map((img, i) => (
                        <button
                            key={img.url}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={img.caption || `${i + 1}`}
                            aria-current={i === index}
                            className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 transition dark:bg-slate-900 ${
                                i === index ? "ring-2 ring-blue-600 dark:ring-blue-400" : "opacity-60 hover:opacity-100"
                            }`}
                        >
                            <Image src={img.url} alt="" fill sizes="80px" className="object-cover object-top" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
