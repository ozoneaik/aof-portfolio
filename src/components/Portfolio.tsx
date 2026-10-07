"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { langs, type Lang } from "@/data/portfolio";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { Footer } from "./sections/Footer";
import { HeroSection } from "./sections/HeroSection";
import { LaptopShowcase } from "./sections/LaptopShowcase";
import { Navbar } from "./sections/Navbar";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { StatsSection } from "./sections/StatsSection";

// three.js needs WebGL and window, so the 3D background is client-only and split into its own chunk
const NetworkBackground = dynamic(() => import("./three/NetworkBackground"), { ssr: false });

// language preference: persisted in localStorage, with an in-memory fallback
let memoryLang: Lang = "th";
const readLang = (): Lang => {
    try {
        const saved = localStorage.getItem("lang");
        if (langs.includes(saved as Lang)) return saved as Lang;
    } catch {}
    return memoryLang;
};
const writeLang = (l: Lang) => {
    memoryLang = l;
    try {
        localStorage.setItem("lang", l);
    } catch {}
    window.dispatchEvent(new Event("langchange"));
};
const subscribeLang = (cb: () => void) => {
    window.addEventListener("langchange", cb);
    return () => window.removeEventListener("langchange", cb);
};

// theme: the .dark class on <html> is the source of truth (set before paint in layout.tsx)
type Theme = "light" | "dark";
const readTheme = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const writeTheme = (t: Theme) => {
    document.documentElement.classList.toggle("dark", t === "dark");
    try {
        localStorage.setItem("theme", t);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
};
const subscribeTheme = (cb: () => void) => {
    window.addEventListener("themechange", cb);
    return () => window.removeEventListener("themechange", cb);
};

export default function Portfolio() {
    const lang = useSyncExternalStore(subscribeLang, readLang, () => "th" as Lang);
    const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light" as Theme);
    const isDark = theme === "dark";
    // the showcase covers the viewport with its own scene, so the particle background can rest
    const [showcaseActive, setShowcaseActive] = useState(false);

    useEffect(() => {
        document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    }, [lang]);

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
            { threshold: 0, rootMargin: "0px 0px -8% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div className="flex-1">
            <NetworkBackground isDark={isDark} paused={showcaseActive} />
            <Navbar
                lang={lang}
                onLangChange={writeLang}
                isDark={isDark}
                onToggleTheme={() => writeTheme(isDark ? "light" : "dark")}
            />

            <main id="top">
                <HeroSection lang={lang} />
                <StatsSection lang={lang} />
                <LaptopShowcase lang={lang} onActiveChange={setShowcaseActive} />
                <AboutSection lang={lang} />
                <ExperienceSection lang={lang} />
                <ProjectsSection lang={lang} />
                <SkillsSection lang={lang} />
                <ContactSection lang={lang} />
            </main>

            <Footer lang={lang} />
        </div>
    );
}
