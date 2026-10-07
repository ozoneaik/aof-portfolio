import { useEffect, useRef } from "react";

// renders the final value on the server, then counts up from 0 the first time it scrolls into view
export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const format = (n: number) => n.toFixed(decimals) + suffix;

    useEffect(() => {
        const el = ref.current;
        if (!el || !("IntersectionObserver" in window)) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const fmt = (n: number) => n.toFixed(decimals) + suffix;
        let raf = 0;
        el.textContent = fmt(0);
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                io.disconnect();
                const start = performance.now();
                const tick = (now: number) => {
                    const p = Math.min((now - start) / 1200, 1);
                    el.textContent = fmt(value * (1 - (1 - p) ** 3));
                    if (p < 1) raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
            },
            { threshold: 0.5 },
        );
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
            el.textContent = fmt(value);
        };
    }, [value, decimals, suffix]);

    return (
        <span ref={ref} className="tabular-nums">
            {format(value)}
        </span>
    );
}
