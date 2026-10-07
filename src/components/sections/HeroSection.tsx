import Image from "next/image";
import { profile, socials, ui, type Lang } from "@/data/portfolio";
import { socialIcon } from "@/components/Icons";

export function HeroSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section className="bg-grid relative overflow-hidden">
            <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/20" />
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_1fr]">
                <div className="min-w-0">
                    <p className="font-mono text-sm text-blue-600 dark:text-blue-400">
                        {"// "}
                        {t(ui.hi)}
                    </p>
                    <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                        {t(profile.name)}
                        <span className="text-blue-600 dark:text-blue-400"> ({profile.nickname})</span>
                    </h1>
                    <p className="mt-3 bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text font-mono text-xl font-semibold text-transparent sm:text-2xl dark:from-blue-400 dark:to-sky-300">
                        {t(profile.role)}
                    </p>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        {t(profile.tagline)}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-1.5 text-sm text-blue-800 dark:border-blue-800/70 dark:bg-blue-950/50 dark:text-blue-200">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                        </span>
                        {t(profile.status)}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#projects"
                            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 dark:hover:bg-blue-500"
                        >
                            {t(ui.ctaProjects)}
                        </a>
                        <a
                            href="#contact"
                            className="rounded-lg border border-blue-300 bg-white px-5 py-3 font-medium text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-500 dark:border-blue-700 dark:bg-transparent dark:text-blue-300 dark:hover:border-blue-400"
                        >
                            {t(ui.ctaContact)}
                        </a>
                    </div>

                    <div className="mt-8 flex gap-3">
                        {socials.map((s) => {
                            const Icon = socialIcon[s.id];
                            return (
                                <a
                                    key={s.id}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="rounded-lg border border-blue-100 bg-white p-2.5 text-slate-500 transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* photo + terminal card */}
                <div className="relative min-w-0">
                    <div className="relative ml-auto w-[82%] sm:w-[72%] lg:w-[80%]">
                        <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border-2 border-blue-300/70 dark:border-blue-700/60" />
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-blue-100 bg-blue-100 shadow-2xl shadow-blue-900/20 dark:border-blue-900/50 dark:bg-blue-950 dark:shadow-black/40">
                            <Image
                                src={profile.photo}
                                alt={t(profile.name)}
                                fill
                                priority
                                sizes="(min-width: 1024px) 420px, 80vw"
                                className="object-cover"
                                style={{ objectPosition: "50% 100%" }}
                            />
                        </div>
                    </div>

                    <div className="relative z-10 -mt-32 w-[88%] overflow-hidden rounded-xl border border-blue-900/20 bg-[#0b1a33]/95 shadow-2xl shadow-blue-900/30 backdrop-blur sm:w-[70%] lg:-mt-40 lg:w-[72%] dark:border-blue-400/20 dark:shadow-black/50">
                        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0f2347] px-4 py-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                            <span className="ml-2 font-mono text-[11px] text-blue-200/60">aof@macbook: ~</span>
                        </div>
                        <pre className="overflow-x-auto p-4 font-mono text-[11.5px] leading-5 text-blue-100 sm:text-xs">
                            <code>
                                <span className="text-sky-400">$</span> whoami{"\n"}
                                <span className="text-white">phuwadech (aof)</span>
                                {"\n\n"}
                                <span className="text-sky-400">$</span> cat stack.json{"\n"}
                                {"{\n"}
                                {"  "}<span className="text-sky-300">&quot;backend&quot;</span>: [<span className="text-amber-200">&quot;Laravel&quot;</span>, <span className="text-amber-200">&quot;PHP&quot;</span>],{"\n"}
                                {"  "}<span className="text-sky-300">&quot;frontend&quot;</span>: [<span className="text-amber-200">&quot;React&quot;</span>, <span className="text-amber-200">&quot;Next.js&quot;</span>],{"\n"}
                                {"  "}<span className="text-sky-300">&quot;db&quot;</span>: [<span className="text-amber-200">&quot;PostgreSQL&quot;</span>, <span className="text-amber-200">&quot;MySQL&quot;</span>]{"\n"}
                                {"}\n\n"}
                                <span className="text-sky-400">$</span> status{"\n"}
                                <span className="text-emerald-300">✔ open to work from 2026-11-01</span>
                                {"\n"}
                                <span className="text-sky-400">$</span> <span className="cursor-blink inline-block h-3.5 w-1.5 translate-y-0.5 bg-blue-300" />
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    )
}
