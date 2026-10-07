import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { profile, showcase, skills, ui, type Lang } from "@/data/portfolio";
import { slideRange } from "@/components/three/laptop/timeline";

const reducedMotion = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
    const mq = window.matchMedia(reducedMotion);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
};

// WebGL scene is client-only and lives in its own chunk
const LaptopScene = dynamic(() => import("@/components/three/laptop/LaptopScene"), { ssr: false });

/**
 * Apple-style product reveal: a tall section whose inner stage sticks to the viewport while
 * scrolling drives the laptop (lid opens, projects play on the screen, exploded view, closes).
 * Captions carry data-show="start,end" in scroll progress and are faded by the scene each frame.
 */
export function LaptopShowcase({ lang, onActiveChange }: { lang: Lang; onActiveChange?: (active: boolean) => void }) {
    const t = (v: Record<Lang, string>) => v[lang];
    const section = useRef<HTMLElement>(null);
    const overlay = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const animate = useSyncExternalStore(subscribeMotion, () => !window.matchMedia(reducedMotion).matches, () => true);

    // only render the scene while the section is on screen
    useEffect(() => {
        const el = section.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => onActiveChange?.(active), [active, onActiveChange]);

    const caption = "absolute invisible opacity-0 will-change-[opacity,transform]";

    return (
        <section ref={section} aria-label={t(ui.showcase.introTitle)} className="relative h-[600vh] bg-black text-white">
            <div className="sticky top-0 h-svh overflow-hidden">
                <div aria-hidden className="absolute inset-0">
                    <LaptopScene
                        sectionRef={section}
                        overlayRef={overlay}
                        slides={showcase.map((s) => ({ screen: s.screen, image: s.project.image }))}
                        boot={{ name: profile.nickname, role: "Full-Stack Web Developer" }}
                        animate={animate}
                        active={active}
                    />
                </div>

                <div ref={overlay} className="pointer-events-none absolute inset-0">
                    {/* intro */}
                    <div data-show="-1,0.11" className={`${caption} inset-x-4 top-[16%] text-center`}>
                        <p className="font-mono text-sm tracking-widest text-blue-400 uppercase">{t(ui.showcase.eyebrow)}</p>
                        <h2 className="mt-4 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl lg:text-8xl">
                            {t(ui.showcase.introTitle)}
                        </h2>
                    </div>
                    <div data-show="-1,0.05" className={`${caption} inset-x-0 bottom-10 text-center`}>
                        <p className="text-sm text-slate-400">{t(ui.showcase.scrollHint)}</p>
                        <div className="mx-auto mt-3 h-10 w-px animate-pulse bg-gradient-to-b from-blue-400 to-transparent" />
                    </div>

                    {/* lid opens */}
                    <div data-show="0.2,0.33" className={`${caption} inset-x-4 top-[12%] text-center`}>
                        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">{t(ui.showcase.bootTitle)}</h2>
                    </div>

                    {/* one caption per project on screen */}
                    {showcase.map(({ project }, i) => {
                        const [a, b] = slideRange(i);
                        return (
                            <div
                                key={project.title.en}
                                data-show={`${a},${b}`}
                                className={`${caption} inset-x-4 bottom-[7%] sm:inset-x-8 lg:inset-x-auto lg:right-[6%] lg:bottom-auto lg:top-1/2 lg:w-[34%] lg:-translate-y-1/2`}
                            >
                                <p className="font-mono text-sm text-blue-400">
                                    {String(i + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}
                                </p>
                                <h3 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t(project.title)}</h3>
                                <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{t(project.desc)}</p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* exploded view */}
                    <div data-show="0.76,0.9" className={`${caption} inset-x-4 top-[10%] text-center`}>
                        <h2 className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                            {t(ui.showcase.skillsTitle)}
                        </h2>
                    </div>
                    <div data-show="0.77,0.9" className={`${caption} inset-x-4 bottom-[6%] sm:inset-x-8`}>
                        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
                            {skills.map((s, i) => (
                                <div key={s.group.en} className={i > 3 ? "hidden sm:block" : ""}>
                                    <dt className="text-sm font-semibold text-blue-400">{t(s.group)}</dt>
                                    <dd className="mt-1 text-sm leading-relaxed text-slate-300">{s.items.slice(0, 5).join(" · ")}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* outro */}
                    <div data-show="0.93,2" className={`${caption} inset-x-4 top-[14%] text-center`}>
                        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">{t(ui.showcase.outroTitle)}</h2>
                        <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
                            <a href="#projects" className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500">
                                {t(ui.ctaProjects)}
                            </a>
                            <a href="#contact" className="rounded-full border border-white/25 px-6 py-3 font-medium text-white transition hover:bg-white/10">
                                {t(ui.ctaContact)}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
