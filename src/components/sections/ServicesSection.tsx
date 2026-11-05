import { services, ui, type Lang } from "@/data/portfolio";
import { Blob, SectionHead, toneClass } from "@/components/ui/Decor";

// ไอคอนเส้นของแต่ละการ์ด (key ตรงกับ services[].icon)
const icons: Record<(typeof services)[number]["icon"], React.ReactNode> = {
    server: (
        <>
            <rect x="3" y="4" width="18" height="6" rx="2" />
            <rect x="3" y="14" width="18" height="6" rx="2" />
            <path d="M7 7h.01M7 17h.01" />
        </>
    ),
    screen: (
        <>
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 8h18M8 21h8" />
        </>
    ),
    database: (
        <>
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </>
    ),
    chat: (
        <>
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
            <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
        </>
    ),
    deploy: (
        <>
            <path d="M12 3 3 8l9 5 9-5-9-5Z" />
            <path d="m3 13 9 5 9-5" />
        </>
    ),
    ai: (
        <>
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
            <rect x="7" y="7" width="10" height="10" rx="3" />
            <path d="M10.5 12h3" />
        </>
    ),
};

export function ServicesSection({ lang }: { lang: Lang }) {
    return (
        <section id="services" className="relative scroll-mt-20 py-24">
            <Blob tone="amber" className="left-[8%] top-28 hidden md:block" />
            <Blob tone="sky" className="right-[10%] top-24 hidden md:block" delay={-2} />
            <Blob tone="dot" className="bottom-28 right-[4%] hidden md:block" />

            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={ui.nav.services[lang]} title={ui.servicesTitle[lang]} />

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {services.map((s) => (
                        <article
                            key={s.icon}
                            className="reveal rounded-[18px] border border-[#edf2f9] bg-white px-4 pb-6 pt-7 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-card dark:border-blue-900/40 dark:bg-ink-2"
                        >
                            <div className={`mx-auto mb-4 grid h-[54px] w-[54px] place-items-center rounded-2xl ${toneClass[s.tone]}`}>
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    {icons[s.icon]}
                                </svg>
                            </div>
                            <h3 className="mb-2 text-[15.5px] font-semibold leading-snug text-slate-900 dark:text-white">{s.title[lang]}</h3>
                            <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{s.desc[lang]}</p>
                            <p className="mt-3 font-mono text-[10.5px] text-blue-600 dark:text-blue-400">{s.tags}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
