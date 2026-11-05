"use client";

import { useEffect } from "react";

/** หาทุก element ที่มี class "reveal" แล้วใส่ "is-visible" เมื่อเลื่อนมาถึง (ดู globals.css) */
export function RevealObserver() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-visible"));
            return;
        }
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        io.unobserve(e.target);
                    }
                }),
            { rootMargin: "0px 0px -8% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return null;
}
