import { services, ui, type Lang } from "@/data/portfolio";
import { SectionHead, SkewTag } from "@/components/ui/Decor";

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

// พื้นการ์ดแต่ละโทน (ไล่สีลงไปเป็น navy เหมือนการ์ดโหมดเกม)
const cardTone = {
    blue: "from-blue-600 to-navy",
    sky: "from-sky-500 to-navy",
    amber: "from-amber-500 to-navy",
};

export function ServicesSection({ lang }: { lang: Lang }) {
    return (
        <section id="services" className="dot-grid scroll-mt-20 bg-slate-50 py-24 dark:bg-ink-2/60">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={ui.nav.services[lang]} title={ui.servicesTitle[lang]} />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s, i) => (
                        <article
                            key={s.icon}
                            className={`reveal group relative flex min-h-[290px] flex-col overflow-hidden bg-gradient-to-b p-6 text-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-20px_rgb(15_35_71/0.7)] ${cardTone[s.tone]}`}
                        >
                            {/* เลขลำดับตัวใหญ่จาง ๆ มุมขวาบน */}
                            <span aria-hidden className="absolute -top-3 right-3 font-display text-[96px] font-black italic leading-none text-white/10">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="mb-auto grid h-12 w-12 place-items-center rounded-md bg-white/15">
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    {icons[s.icon]}
                                </svg>
                            </div>

                            <h3 className="mt-10 font-display text-[26px] font-black italic leading-tight">{s.title[lang]}</h3>
                            <p className="mb-5 mt-2 text-sm leading-relaxed text-white/80">{s.desc[lang]}</p>
                            <SkewTag className="self-start font-mono !font-semibold">{s.tags}</SkewTag>

                            {/* แถบสีวิ่งใต้การ์ดตอน hover */}
                            <span aria-hidden className="absolute bottom-0 left-0 h-1 w-0 bg-amber-300 transition-all duration-300 group-hover:w-full" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
