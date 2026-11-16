import { education, experience, profile, ui, type Lang } from "@/data/portfolio";
import { SectionHead, SkewTag } from "@/components/ui/Decor";
import { Logo } from "@/components/ui/Logo";

// แยกข้อมูลเป็น 2 กลุ่ม: งานด้าน dev (การ์ด) กับรับราชการทหาร (แถบสั้น ๆ)
// งานหลัก (kind: "main") ขึ้นก่อนเสมอ ที่เหลือเรียงตามลำดับใน portfolio.ts
const jobs = experience
    .filter((e) => e.kind !== "military")
    .sort((a, b) => Number(b.kind === "main") - Number(a.kind === "main"));
const military = experience.filter((e) => e.kind === "military");

// โซนสีน้ำเงินเต็มความกว้าง + วงกลมโปร่งตกแต่ง (แบบโซนสีของเว็บเกม)
export function ExperienceSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section
            id="experience"
            className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-sky-500 to-blue-600 py-24 dark:from-blue-950 dark:to-navy"
        >
            {/* วงกลมตกแต่ง */}
            <span aria-hidden className="absolute -right-40 -top-32 h-[620px] w-[620px] rounded-full border-[70px] border-white/15" />
            <span aria-hidden className="absolute -bottom-40 -left-36 h-[360px] w-[360px] rounded-full border-[40px] border-white/10" />

            <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={t(ui.nav.experience)} title={t(ui.experienceTitle)} tone="light" />

                {/* ---------- งานด้าน dev: งานหลักกว้าง 2 ช่อง ---------- */}
                <ol className="grid gap-5 md:grid-cols-3">
                    {jobs.map((e) => {
                        const isMain = e.kind === "main";
                        return (
                            <li
                                key={e.org.en}
                                className={`reveal relative flex flex-col bg-white p-6 shadow-[0_10px_0_rgb(15_35_71/0.12)] transition duration-300 hover:-translate-y-1 dark:bg-ink-2 ${
                                    isMain ? "border-t-4 border-amber-400 md:col-span-2 md:p-8" : "border-t-4 border-transparent"
                                }`}
                            >
                                {isMain && <SkewTag className="absolute -top-3.5 right-5 !bg-amber-400">{t(ui.latestJob)}</SkewTag>}

                                <div className="flex items-center gap-3">
                                    {e.logo && <Logo src={e.logo} alt={t(e.org)} zoom={e.logoZoom} className={isMain ? "h-14 w-14" : "h-11 w-11"} />}
                                    <p className="font-mono text-sm font-semibold text-slate-500 dark:text-slate-400">{t(e.period)}</p>
                                </div>

                                <h3
                                    className={`mt-4 font-display font-black italic leading-tight text-slate-900 dark:text-white ${
                                        isMain ? "text-3xl" : "text-2xl"
                                    }`}
                                >
                                    {t(e.title)}
                                </h3>
                                <p className="mb-3 mt-1 text-sm font-bold text-blue-600 dark:text-sky-400">{t(e.org)}</p>
                                <p className={`leading-relaxed text-slate-600 dark:text-slate-400 ${isMain ? "text-[15px]" : "text-sm"}`}>{t(e.desc)}</p>
                                {e.points && (
                                    <ul className="mt-4 grid gap-2.5">
                                        {e.points.map((pt) => (
                                            <li key={pt.en} className="flex gap-2.5 text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                                                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-blue-600 dark:bg-sky-400" />
                                                {t(pt)}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ol>

                {/* ---------- รับราชการทหาร: แถบสั้น ๆ บอกว่าปลดประจำการแล้ว ---------- */}
                {military.map((e) => (
                    <div
                        key={e.org.en}
                        className="reveal mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-l-4 border-amber-400 bg-white/15 px-5 py-3 text-white backdrop-blur-sm"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                        <b>{t(e.title)}</b>
                        <span className="font-mono text-sm text-white/80">{t(e.period)}</span>
                        <span className="text-sm font-semibold text-amber-200">{t(profile.statusNote)}</span>
                    </div>
                ))}

                {/* ---------- การศึกษา ---------- */}
                <h3 className="sr-only">{t(ui.education)}</h3>
                <div className="mt-5 grid gap-4">
                    {education.map((e) => (
                        <div key={e.school.en} className="reveal flex items-center gap-4 bg-white/15 px-5 py-4 text-white backdrop-blur-sm">
                            <span className="rounded-md bg-white p-1">
                                <Logo src={e.logo} alt={t(e.school)} className="h-11 w-11" />
                            </span>
                            <div className="min-w-0">
                                <b className="block">{t(e.level)}</b>
                                <small className="text-[13px] text-white/80">{t(e.school)}</small>
                            </div>
                            <span className="ml-auto shrink-0 font-display text-xl font-black italic text-amber-300">GPA {e.gpa}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
