import { techStrip, ui, type Lang } from "@/data/portfolio";
import { skillIcon } from "@/components/Icons";

// แถบโลโก้เทคโนโลยีใต้ Hero (ตำแหน่งเดียวกับแถบ "Trusted by" ในรูปอ้างอิง)
export function TechStrip({ lang }: { lang: Lang }) {
    return (
        <section aria-label={ui.techStripTitle[lang]} className="bg-blue-50 py-8 text-center dark:bg-blue-950/30">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <p className="mb-5 text-sm text-slate-600 dark:text-slate-400">{ui.techStripTitle[lang]}</p>
                <ul className="flex flex-wrap items-center justify-center gap-x-11 gap-y-4">
                    {techStrip.map((name) => {
                        const Icon = skillIcon[name];
                        return (
                            <li key={name} className="flex items-center gap-2.5 text-[17px] font-semibold text-slate-600 dark:text-slate-300">
                                <Icon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
