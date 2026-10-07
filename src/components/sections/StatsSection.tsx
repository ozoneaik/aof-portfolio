import { stats, type Lang } from "@/data/portfolio";
import { CountUp } from "@/components/ui/CountUp";

export function StatsSection({ lang }: { lang: Lang }) {
    return (
        <section aria-label="Highlights" className="border-y border-blue-100 bg-white/60 dark:border-blue-900/40 dark:bg-slate-950/40">
            <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-blue-100 px-4 sm:px-6 md:grid-cols-4 md:divide-x dark:divide-blue-900/40">
                {stats.map((s) => (
                    <div key={s.label.en} className="flex flex-col-reverse px-2 py-8 text-center">
                        <dt className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label[lang]}</dt>
                        <dd className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text font-mono text-3xl font-bold text-transparent sm:text-4xl dark:from-blue-400 dark:to-sky-300">
                            <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
