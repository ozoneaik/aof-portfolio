import { profile, socials, ui, type Lang } from "@/data/portfolio";
import { socialIcon } from "@/components/Icons";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { SectionHead } from "@/components/ui/Decor";

// ส่วนติดต่อ: บล็อกใหญ่ 2 ช่อง (แบบปุ่ม Redeem / Buy ของเว็บเกม) + การ์ดโซเชียล
export function ContactSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];

    return (
        <section id="contact" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-6xl px-5 sm:px-6">
                <SectionHead eyebrow={t(ui.nav.contact)} title={t(ui.contactTitle)} />

                <p className="reveal -mt-2 mb-10 max-w-xl text-slate-600 dark:text-slate-300">{t(ui.contactBody)}</p>

                {/* ---------- บล็อกใหญ่ 2 ช่อง ---------- */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* อีเมล: พื้น navy */}
                    <div className="reveal relative overflow-hidden bg-navy p-8 text-white dark:bg-navy-2">
                        <span aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[30px] border-white/5" />
                        <p className="text-sm text-slate-400">{t(ui.emailLabel)}</p>
                        <a
                            href={`mailto:${profile.email}`}
                            className="mt-1 block break-all font-display text-[26px] font-black italic leading-tight text-sky-300 hover:text-white sm:text-3xl"
                        >
                            {t(ui.sendEmail)} →
                        </a>
                        <p className="mt-2 break-all font-mono text-sm text-slate-300">{profile.email}</p>
                        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                            <CopyEmailButton
                                email={profile.email}
                                label={t(ui.copyEmail)}
                                copiedLabel={t(ui.copied)}
                                className="font-semibold text-amber-300 hover:underline"
                            />
                            <a href={`tel:${profile.phoneRaw}`} className="text-slate-300 hover:text-white">
                                {t(ui.orCall)} <b className="text-white">{profile.phone}</b>
                            </a>
                        </div>
                    </div>

                    {/* ดาวน์โหลด CV: พื้นฟ้า-น้ำเงิน */}
                    <a
                        href={t(profile.cv)}
                        download
                        className="reveal group relative flex items-center justify-between gap-6 overflow-hidden bg-gradient-to-r from-sky-500 to-blue-600 p-8 text-white transition hover:-translate-y-1 dark:from-sky-800 dark:to-blue-900"
                    >
                        <span aria-hidden className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full border-[30px] border-white/10" />
                        <span>
                            <span className="block text-sm text-white/80">PDF · A4</span>
                            <span className="block font-display text-[26px] font-black italic leading-tight sm:text-3xl">{t(ui.downloadCv)}</span>
                        </span>
                        <span className="relative grid h-14 w-14 shrink-0 place-items-center bg-white text-blue-600 transition group-hover:bg-amber-300 group-hover:text-slate-900">
                            <DownloadIcon className="h-6 w-6" />
                        </span>
                    </a>
                </div>

                {/* ---------- การ์ดโซเชียล ---------- */}
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {socials.map((s) => {
                        const Icon = socialIcon[s.id];
                        return (
                            <a
                                key={s.id}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reveal group flex flex-col gap-1 border-b-4 border-slate-900 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-600 dark:border-slate-600 dark:bg-ink-2 dark:hover:border-sky-400"
                            >
                                <Icon className="h-6 w-6 text-slate-700 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-sky-300" />
                                <b className="mt-2 font-display text-xl font-black italic text-slate-900 dark:text-white">{s.label}</b>
                                <span className="truncate font-mono text-xs text-slate-500 dark:text-slate-400">{s.handle}</span>
                                <span className="mt-2 font-bold text-blue-600 transition group-hover:translate-x-1 dark:text-sky-400">↗</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
