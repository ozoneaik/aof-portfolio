import type { MouseEvent } from "react";

// feeds the pointer position to the .spotlight glow in globals.css
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
}
