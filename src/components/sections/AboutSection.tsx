import { education, profile, ui, type Lang } from "@/data/portfolio";
import { MailIcon } from "@/components/icons/MailIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { PinIcon } from "@/components/icons/PinIcon";
import { Logo } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="about" className="scroll-mt-16 py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading index="01" label="about" title={t(ui.aboutTitle)} />
                <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
                    <div className="reveal space-y-6">
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{t(ui.aboutBody)}</p>
                        <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                            <li className="flex items-center gap-3">
                                <PinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" /> {t(profile.location)}
                            </li>
                            <li className="flex items-center gap-3">
                                <MailIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <a href={`mailto:${profile.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                                    {profile.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <PhoneIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <a href={`tel:${profile.phoneRaw}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                                    {profile.phone}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="reveal">
                        <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {t(ui.education)}
                        </h3>
                        <div className="space-y-4">
                            {education.map((e) => (
                                <div
                                    key={e.gpa}
                                    className="flex items-center gap-4 rounded-xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 dark:border-blue-900/40 dark:from-slate-900/80 dark:to-blue-950/40"
                                >
                                    <Logo src={e.logo} alt={t(e.school)} />
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-900 dark:text-white">{t(e.school)}</p>
                                        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{t(e.level)}</p>
                                        <p className="mt-1.5 font-mono text-sm text-blue-700 dark:text-blue-300">GPA {e.gpa}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
