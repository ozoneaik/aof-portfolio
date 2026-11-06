import { education, experience, profile, ui, type Lang } from "@/data/portfolio";
import { SectionHead } from "@/components/ui/Decor";
import { Logo } from "@/components/ui/Logo";

export function ExperienceSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="experience" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={t(ui.nav.experience)} title={t(ui.experienceTitle)} />

                {/* Timeline ประสบการณ์ทำงาน
                    - มือถือ: เส้นแนวตั้งชิดซ้าย การ์ดเรียงลงมาด้านขวาของเส้น
                    - จอใหญ่ (md+): เส้นอยู่กลาง การ์ดสลับซ้าย/ขวา ฝั่งตรงข้ามแสดงช่วงปีตัวใหญ่ */}
                <ol className="relative">
                    {/* เส้น timeline */}
                    <span
                        aria-hidden
                        className="absolute bottom-6 left-[26px] top-6 w-0.5 rounded-full bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600 md:left-1/2 md:-translate-x-1/2 dark:from-sky-700 dark:via-blue-700 dark:to-blue-500"
                    />

                    {experience.map((e, i) => {
                        const cardOnLeft = i % 2 === 0; // จอใหญ่: ลำดับคู่การ์ดอยู่ซ้าย ลำดับคี่อยู่ขวา
                        const isLatest = i === experience.length - 1;
                        return (
                            <li key={e.org.en} className="reveal relative pb-10 pl-[76px] last:pb-0 md:grid md:grid-cols-2 md:gap-x-20 md:pl-0">
                                {/* จุดบนเส้น: โลโก้บริษัท (หรือไอคอนโล่ถ้าไม่มีโลโก้) */}
                                <div className="absolute left-0 top-1 z-10 md:left-1/2 md:-translate-x-1/2">
                                    <div className="rounded-2xl bg-white p-1 ring-4 ring-blue-50 dark:bg-ink dark:ring-blue-950">
                                        {e.logo ? (
                                            <Logo src={e.logo} alt={t(e.org)} zoom={e.logoZoom} className="h-11 w-11" />
                                        ) : (
                                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                                    <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" />
                                                    <path d="m9 12 2 2 4-4" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* ช่วงปีตัวใหญ่ ฝั่งตรงข้ามการ์ด (จอใหญ่เท่านั้น) */}
                                <div
                                    className={`hidden pt-3 md:row-start-1 md:block ${
                                        cardOnLeft ? "md:col-start-2 md:text-left" : "md:col-start-1 md:text-right"
                                    }`}
                                >
                                    <p className="font-mono text-2xl font-semibold text-blue-600 dark:text-blue-400">{t(e.period)}</p>
                                    {isLatest && (
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t(profile.statusNote)}</p>
                                    )}
                                </div>

                                {/* การ์ดรายละเอียด */}
                                <article
                                    className={`relative rounded-[20px] border border-[#edf2f9] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card md:row-start-1 dark:border-blue-900/40 dark:bg-ink-2 ${
                                        cardOnLeft ? "md:col-start-1" : "md:col-start-2"
                                    }`}
                                >
                                    {/* ลูกศรเล็กชี้ไปที่เส้น (จอใหญ่) */}
                                    <span
                                        aria-hidden
                                        className={`absolute top-6 hidden h-3 w-3 rotate-45 border-[#edf2f9] bg-white md:block dark:border-blue-900/40 dark:bg-ink-2 ${
                                            cardOnLeft ? "-right-[7px] border-r border-t" : "-left-[7px] border-b border-l"
                                        }`}
                                    />
                                    {/* ช่วงปีแบบป้ายเล็ก (มือถือเท่านั้น) */}
                                    <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 font-mono text-xs text-blue-700 md:hidden dark:bg-blue-950 dark:text-blue-300">
                                        {t(e.period)}
                                    </span>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t(e.title)}</h3>
                                    <p className="mb-2.5 text-sm font-medium text-sky-500 dark:text-sky-400">{t(e.org)}</p>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(e.desc)}</p>
                                </article>
                            </li>
                        );
                    })}
                </ol>

                {/* การศึกษา */}
                <h3 className="sr-only">{t(ui.education)}</h3>
                <div className="mt-14 grid gap-5 md:grid-cols-2">
                    {education.map((e) => (
                        <div key={e.school.en} className="reveal flex items-center gap-4 rounded-[20px] bg-blue-50 px-5 py-4 dark:bg-blue-950/40">
                            <Logo src={e.logo} alt={t(e.school)} className="h-[52px] w-[52px]" />
                            <div className="min-w-0">
                                <b className="block text-slate-900 dark:text-white">{t(e.school)}</b>
                                <small className="text-[13px] text-slate-500 dark:text-slate-400">{t(e.level)}</small>
                            </div>
                            <span className="ml-auto shrink-0 font-mono text-[15px] font-semibold text-blue-700 dark:text-blue-300">GPA {e.gpa}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
