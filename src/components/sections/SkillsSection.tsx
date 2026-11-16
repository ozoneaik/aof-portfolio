import { languages, otherSkills, skillCount, skills, ui, type Lang } from "@/data/portfolio";
import { skillIcon } from "@/components/Icons";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHead } from "@/components/ui/Decor";
import Image from "next/image";

// การ์ดแบบกรอบเส้นหนา: hover แล้วทั้งการ์ดกลายเป็นสีน้ำเงิน (ใช้ group-hover เปลี่ยนสีลูกข้างใน)
const card =
    "reveal group border-2 border-slate-900 bg-white p-6 transition-colors duration-300 hover:bg-blue-600 dark:border-slate-600 dark:bg-ink-2 dark:hover:bg-blue-800";

export function SkillsSection({ lang }: { lang: Lang }) {
    // หัวข้อ "{n} อย่างที่ผมใช้ทำงาน" → ใส่ตัวเลขนับขึ้นตรง {n} (นับเฉพาะทักษะที่ใช้ในงานจริง)
    const [before, after] = ui.skillsCount[lang].split("{n}");

    return (
        <section id="skills" className="dot-grid scroll-mt-20 bg-slate-50 py-24 dark:bg-ink-2/60">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead
                    eyebrow={ui.skillsTitle[lang]}
                    title={
                        <>
                            {before}
                            <CountUp value={skillCount} />
                            {after}
                        </>
                    }
                />

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {/* ---------- ทักษะที่ใช้ในงานจริง ---------- */}
                    {skills.map((group) => (
                        <div key={group.group.en} className={card}>
                            <h3 className="mb-4 flex items-baseline gap-3 font-display text-[22px] font-black italic text-slate-900 group-hover:text-white dark:text-white">
                                {group.group[lang]}
                                <span className="ml-auto font-mono text-xs font-semibold not-italic text-slate-400 group-hover:text-white/70">
                                    {String(group.items.length).padStart(2, "0")}
                                </span>
                            </h3>
                            <ul className="flex flex-wrap gap-2">
                                {group.items.map((name) => {
                                    const Icon = skillIcon[name];
                                    return (
                                        <li
                                            key={name}
                                            className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 text-[13.5px] font-medium text-slate-700 transition-colors group-hover:bg-white/15 group-hover:text-white dark:bg-blue-950/50 dark:text-slate-300"
                                        >
                                            {Icon && <Icon className="h-[15px] w-[15px] opacity-70" />}
                                            {name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}

                    {/* ---------- เคยใช้งาน: แถวเล็ก ไม่แย่งความเด่นจากด้านบน ---------- */}
                    <div className="reveal flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-slate-300 py-4 md:col-span-2 lg:col-span-3 dark:border-slate-700">
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                            {ui.skillsOther[lang]}
                        </span>
                        {otherSkills.map((name) => (
                            <span key={name} className="text-[13.5px] text-slate-600 dark:text-slate-400">
                                {name}
                            </span>
                        ))}
                    </div>

                    {/* ---------- การ์ดทักษะด้านภาษา ---------- */}
                    <div className={`${card} md:col-span-2 lg:col-span-3`}>
                        <h3 className="mb-4 font-display text-[22px] font-black italic text-slate-900 group-hover:text-white dark:text-white">
                            {ui.languagesTitle[lang]}
                        </h3>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {languages.map((l) => (
                                <li
                                    key={l.name.en}
                                    className="flex items-center justify-between gap-4 bg-slate-100 px-4 py-3 transition-colors group-hover:bg-white/15 dark:bg-blue-950/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Image src={l.flag} alt="" width={30} height={30} />
                                        <div className="min-w-0">
                                            <p className="font-semibold text-slate-900 group-hover:text-white dark:text-white">{l.name[lang]}</p>
                                            <p className="text-[13px] text-slate-500 group-hover:text-white/80 dark:text-slate-400">{l.label[lang]}</p>
                                            {l.certificate && (
                                                <a
                                                    href={l.certificate}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:underline group-hover:text-amber-300 dark:text-sky-400"
                                                >
                                                    {ui.viewCertificate[lang]} ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    {/* ระดับภาษาเป็นป้ายเฉียง (แสดงเฉพาะภาษาที่ใส่ level ไว้) */}
                                    {l.level && (
                                        <span className="shrink-0 -skew-x-12 bg-amber-300 px-3 py-1 font-mono text-xs font-bold text-slate-900">
                                            <span className="inline-block skew-x-12">{l.level[lang]}</span>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
