import { education, experience, ui, type Lang } from "@/data/portfolio";
import { SectionHead } from "@/components/ui/Decor";
import { Logo } from "@/components/ui/Logo";

export function ExperienceSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="experience" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={t(ui.nav.experience)} title={t(ui.experienceTitle)} />

                {/* การ์ดประสบการณ์ทำงาน */}
                <div className="grid gap-5 md:grid-cols-3">
                    {experience.map((e) => (
                        <article
                            key={e.org.en}
                            className="reveal rounded-[20px] border border-[#edf2f9] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card dark:border-blue-900/40 dark:bg-ink-2"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                {e.logo ? (
                                    <Logo src={e.logo} alt={t(e.org)} zoom={e.logoZoom} className="h-[52px] w-[52px]" />
                                ) : (
                                    // ไม่มีโลโก้ (รับราชการทหาร) → ใช้ไอคอนโล่แทน
                                    <span className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                            <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    </span>
                                )}
                                <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                    {t(e.period)}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t(e.title)}</h3>
                            <p className="mb-2.5 text-sm font-medium text-sky-500 dark:text-sky-400">{t(e.org)}</p>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(e.desc)}</p>
                        </article>
                    ))}
                </div>

                {/* การศึกษา */}
                <h3 className="sr-only">{t(ui.education)}</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
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
