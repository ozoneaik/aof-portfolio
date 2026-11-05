"use client";

import { useEffect, useRef } from "react";

/**
 * Parallax ตามเมาส์: ลูกที่มี attribute data-depth จะขยับสวนทางกับเมาส์
 * ค่า depth ยิ่งมากยิ่งขยับมาก (เป็น px) → ชิ้นที่ "อยู่ใกล้" ควรมี depth มากกว่า
 * ทำงานเฉพาะจอที่ใช้เมาส์ และปิดเองถ้าผู้ใช้ตั้งค่า "ลดการเคลื่อนไหว"
 */
export function ParallaxScene({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const scene = ref.current;
        if (!scene) return;
        const canHover = matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
        const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!canHover || reduceMotion) return;

        const layers = [...scene.querySelectorAll<HTMLElement>("[data-depth]")];
        let raf = 0;

        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const rect = scene.getBoundingClientRect();
                // ตำแหน่งเมาส์เทียบกับกึ่งกลาง: ค่าระหว่าง -0.5 ถึง 0.5
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                for (const el of layers) {
                    const depth = Number(el.dataset.depth);
                    el.style.transform = `translate3d(${(-x * depth).toFixed(1)}px, ${(-y * depth).toFixed(1)}px, 0)`;
                }
            });
        };
        const onLeave = () => layers.forEach((el) => (el.style.transform = ""));

        scene.addEventListener("mousemove", onMove);
        scene.addEventListener("mouseleave", onLeave);
        return () => {
            cancelAnimationFrame(raf);
            scene.removeEventListener("mousemove", onMove);
            scene.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <section ref={ref} className={className}>
            {children}
        </section>
    );
}
