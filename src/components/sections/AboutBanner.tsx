import { facts, ui, type Lang } from "@/data/portfolio";
import { CountUp } from "@/components/ui/CountUp";

// ไอคอนหน้าแต่ละข้อ (key ตรงกับ facts[].icon)
const factIcons: Record<(typeof facts)[number]["icon"], React.ReactNode> = {
    work: (
        <>
            <rect x="2" y="5" width="14" height="10" rx="2" />
            <path d="M6 5V3h6v2" />
        </>
    ),
    education: (
        <>
            <path d="m2 7 7-4 7 4-7 4-7-4Z" />
            <path d="M5 9v4c0 1 2 2 4 2s4-1 4-2V9" />
        </>
    ),
    projects: (
        <>
            <path d="M3 13 7 9l3 3 5-6" />
            <path d="M11 6h4v4" />
        </>
    ),
    location: (
        <>
            <path d="M9 16s-5-4.4-5-8.5a5 5 0 0 1 10 0C14 11.6 9 16 9 16Z" />
            <circle cx="9" cy="7.5" r="1.8" />
        </>
    ),
};

// แบนเนอร์สีฟ้า "สวัสดีครับ ผมอ๊อฟ" (ตำแหน่งเดียวกับ "Meet Your Instructor" ในรูปอ้างอิง)
export function AboutBanner({ lang, projectCount }: { lang: Lang; projectCount: number }) {
    const t = (v: Record<Lang, string>) => v[lang];
    return (
        <section id="about" className="scroll-mt-24 px-5 py-24 sm:px-6">
            <div className="reveal relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden bg-gradient-to-r from-sky-400 to-blue-500 p-6 text-white sm:p-9 md:grid-cols-[1.2fr_1fr] lg:gap-12 dark:from-sky-700 dark:to-blue-800">
                {/* วงกลมจาง ๆ มุมขวาบน */}
                <div aria-hidden className="absolute -right-32 -top-40 h-96 w-96 rounded-full border-[50px] border-white/15" />

                <div className="relative">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/85">{"// "}{t(ui.aboutTitle)}</p>
                    <h2 className="mb-3 mt-2 font-display text-[32px] font-black italic leading-tight sm:text-[44px]">{t(ui.aboutHello)}</h2>
                    <p className="max-w-[460px] text-[14.5px] leading-relaxed text-white/90">{t(ui.aboutBody)}</p>
                    <a
                        href="#experience"
                        className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-ink dark:text-sky-300"
                    >
                        {t(ui.aboutCta)}
                    </a>
                </div>

                <ul className="relative grid gap-4 sm:grid-cols-2">
                    {facts.map((f) => (
                        <li key={f.icon} className="flex items-center gap-3.5 text-sm">
                            <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-md border-[1.5px] border-white/55">
                                <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    {factIcons[f.icon]}
                                </svg>
                            </span>
                            <div>
                                <b className="block text-[15px]">
                                    {f.value !== undefined ? (
                                        <CountUp
                                            value={f.value === "projectCount" ? projectCount : f.value}
                                            decimals={f.decimals}
                                            prefix={f.prefix}
                                            suffix={f.suffix}
                                        />
                                    ) : (
                                        f.text && t(f.text)
                                    )}
                                    {f.unit && ` ${t(f.unit)}`}
                                </b>
                                <small className="text-[12.5px] text-white/80">{t(f.label)}</small>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
