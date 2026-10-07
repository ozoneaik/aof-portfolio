import { profile, socials, ui, type Lang } from "@/data/portfolio";
import { socialIcon } from "@/components/Icons";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";

export function ContactSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="contact" className="scroll-mt-16 py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="reveal relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 px-6 py-14 text-white sm:px-12 dark:from-blue-900 dark:via-blue-800 dark:to-sky-800">
                    <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 invert" />
                    <div className="relative">
                        <p className="font-mono text-sm text-blue-100">05. contact</p>
                        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{t(ui.contactTitle)}</h2>
                        <p className="mt-3 max-w-xl text-blue-50">{t(ui.contactBody)}</p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={`mailto:${profile.email}`}
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-blue-700 shadow-lg transition hover:-translate-y-0.5 dark:bg-slate-950 dark:text-blue-300"
                            >
                                <MailIcon className="h-5 w-5" /> {profile.email}
                            </a>
                            <a
                                href={`tel:${profile.phoneRaw}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-medium transition hover:-translate-y-0.5 hover:bg-white/10"
                            >
                                <PhoneIcon className="h-5 w-5" /> {profile.phone}
                            </a>
                        </div>

                        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {socials.map((s) => {
                                const Icon = socialIcon[s.id];
                                return (
                                    <a
                                        key={s.id}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 p-4 backdrop-blur transition hover:bg-white/20"
                                    >
                                        <Icon className="h-6 w-6 shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold">{s.label}</p>
                                            <p className="truncate font-mono text-xs text-blue-100">{s.handle}</p>
                                        </div>
                                        <ArrowIcon className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
