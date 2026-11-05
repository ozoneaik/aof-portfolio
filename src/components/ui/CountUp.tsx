"use client";

import { useEffect, useRef } from "react";

/**
 * ตัวเลขที่นับขึ้นจาก 0 ครั้งแรกที่เลื่อนมาเห็น
 * ฝั่ง server แสดงค่าสุดท้ายไว้ก่อน (Google และคนที่ปิด JS เห็นตัวเลขถูกต้องเสมอ)
 */
export function CountUp({
    value,
    decimals = 0,
    prefix = "",
    suffix = "",
}: {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const format = (n: number, done: boolean) => prefix + n.toFixed(decimals) + (done ? suffix : "");

    useEffect(() => {
        const el = ref.current;
        if (!el || !("IntersectionObserver" in window)) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const fmt = (n: number, done: boolean) => prefix + n.toFixed(decimals) + (done ? suffix : "");
        let raf = 0;
        el.textContent = fmt(0, false);

        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                io.disconnect();
                const start = performance.now();
                const tick = (now: number) => {
                    const p = Math.min((now - start) / 1400, 1);
                    const eased = 1 - (1 - p) ** 3; // ease-out: เร็วตอนแรกแล้วค่อย ๆ ช้าลง
                    el.textContent = fmt(value * eased, p === 1);
                    if (p < 1) raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
            },
            { threshold: 0.6 },
        );
        io.observe(el);

        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
            el.textContent = fmt(value, true);
        };
    }, [value, decimals, prefix, suffix]);

    return (
        <span ref={ref} className="tabular-nums">
            {format(value, true)}
        </span>
    );
}
