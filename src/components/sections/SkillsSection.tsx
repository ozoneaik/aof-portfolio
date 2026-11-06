import { languages, skillCount, skills, ui, type Lang } from "@/data/portfolio";
import { skillIcon } from "@/components/Icons";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHead, toneClass } from "@/components/ui/Decor";
import Image from "next/image";

// สีไอคอนหัวการ์ด วนตามลำดับกลุ่ม
const tones = ["blue", "amber", "sky", "blue", "amber"] as const;

export function SkillsSection({ lang }: { lang: Lang }) {
    // หัวข้อ "{n} อย่างที่ผมใช้ทำงาน" → ใส่ตัวเลขนับขึ้นตรง {n}
    const [before, after] = ui.skillsCount[lang].split("{n}");

    return (
        <section id="skills" className="scroll-mt-20 py-24">
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
                    {skills.map((group, i) => (
                        <div
                            key={group.group.en}
                            className={`reveal rounded-[20px] border border-[#edf2f9] p-6 dark:border-blue-900/40 dark:bg-ink-2 ${i === 0 ? "lg:col-span-2" : ""
                                }`}
                        >
                            <h3 className="mb-4 flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
                                <span className={`grid h-[34px] w-[34px] place-items-center rounded-[10px] ${toneClass[tones[i % tones.length]]}`}>
                                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                        <path d="m5 4-3 4 3 4M11 4l3 4-3 4" />
                                    </svg>
                                </span>
                                {group.group[lang]}
                                <span className="ml-auto font-mono text-xs font-medium text-slate-400">{group.items.length}</span>
                            </h3>
                            <ul className="flex flex-wrap gap-2">
                                {group.items.map((name) => {
                                    const Icon = skillIcon[name];
                                    return (
                                        <li
                                            key={name}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-[#e6eefa] bg-[#f6f9fe] px-3 py-1.5 text-[13.5px] text-slate-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-slate-300"
                                        >
                                            {Icon && <Icon className="h-[15px] w-[15px] text-slate-500 dark:text-slate-400" />}
                                            {name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}

                    {/* การ์ดทักษะด้านภาษา: กว้างเต็มแถว แสดงระดับเป็นจุด 5 จุด */}
                    <div className="reveal rounded-[20px] border border-[#edf2f9] p-6 md:col-span-2 lg:col-span-3 dark:border-blue-900/40 dark:bg-ink-2">
                        <h3 className="mb-4 flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
                            <span className={`grid h-[34px] w-[34px] place-items-center rounded-[10px] ${toneClass.sky}`}>
                                {/* ไอคอนลูกโลก */}
                                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <circle cx="8" cy="8" r="6.25" />
                                    <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.5 3.9 2.5 6.25S9.7 12.45 8 14.25C6.3 12.45 5.5 10.35 5.5 8S6.3 3.55 8 1.75Z" />
                                </svg>
                            </span>
                            {ui.languagesTitle[lang]}
                        </h3>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {languages.map((l) => (
                                <li
                                    key={l.name.en}
                                    className="flex items-center justify-between gap-4 rounded-2xl border border-[#e6eefa] bg-[#f6f9fe] px-4 py-3 dark:border-blue-900/50 dark:bg-blue-950/40"
                                >
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={l.flag}
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                        <div className="min-w-0">
                                            <p className="font-semibold text-slate-900 dark:text-white">{l.name[lang]}</p>
                                            <p className="text-[13px] text-slate-500 dark:text-slate-400">{l.label[lang]}</p>
                                        </div>
                                    </div>
                                    {/* ระดับ: จุดที่ i < level เติมสีน้ำเงิน ที่เหลือเป็นสีจาง */}
                                    <div className="flex shrink-0 gap-1.5shrink-0 rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                        {l.level[lang]}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
