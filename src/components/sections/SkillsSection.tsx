import { skillCount, skills, ui, type Lang } from "@/data/portfolio";
import { skillIcon } from "@/components/Icons";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHead, toneClass } from "@/components/ui/Decor";

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
                            className={`reveal rounded-[20px] border border-[#edf2f9] p-6 dark:border-blue-900/40 dark:bg-ink-2 ${
                                i === 0 ? "lg:col-span-2" : ""
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
                </div>
            </div>
        </section>
    );
}
