import { profile, socials, ui, type Lang } from "@/data/portfolio";
import { socialIcon } from "@/components/Icons";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Blob } from "@/components/ui/Decor";

// ส่วนติดต่อ (วางแบบส่วน "ราคา" ในรูปอ้างอิง: รายการ ✓ ซ้าย / โน้ตเอียงตรงกลาง / การ์ดอีเมลขวา)
export function ContactSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];
    const checks = [ui.contactChecks1, ui.contactChecks2, ui.contactChecks3, ui.contactChecks4];

    return (
        <section
            id="contact"
            className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-white to-blue-50 py-24 dark:from-ink dark:to-blue-950/40"
        >
            <Blob tone="amber" className="left-[46%] top-24 hidden lg:block" />
            <Blob tone="sky" className="bottom-24 left-[40%] hidden lg:block" delay={-3} />

            <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1fr]">
                {/* ซ้าย: หัวข้อ + รายการ ✓ */}
                <div className="reveal">
                    <p className="font-semibold text-sky-500 dark:text-sky-400">{t(ui.nav.contact)}</p>
                    <h2 className="mb-3.5 mt-1.5 text-[32px] font-bold leading-tight text-slate-900 sm:text-[40px] dark:text-white">
                        {t(ui.contactTitle)}
                    </h2>
                    <p className="max-w-sm text-slate-600 dark:text-slate-300">{t(ui.contactBody)}</p>
                    <ul className="mt-6 grid gap-3">
                        {checks.map((c) => (
                            <li key={c.en} className="flex items-center gap-3 text-[15px] text-slate-700 dark:text-slate-200">
                                <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-sky-500 text-white">
                                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                        <path d="m2.5 6 2.5 2.5 4.5-5" />
                                    </svg>
                                </span>
                                {t(c)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* กลาง: โน้ตเอียง + ลูกศร (จอใหญ่เท่านั้น) */}
                <div className="reveal relative hidden justify-center lg:flex" aria-hidden>
                    <div className="relative max-w-[230px] -rotate-3 rounded-[18px] bg-white px-6 py-5 text-[19px] font-semibold leading-snug text-slate-900 shadow-soft dark:bg-ink-2 dark:text-white">
                        {t(ui.contactNote)}
                        <svg viewBox="0 0 24 22" className="absolute -bottom-3 -right-2.5 h-[26px] w-7 text-sky-400" fill="currentColor">
                            <path d="M12 21s-9-5.6-9-12.1A5 5 0 0 1 12 6a5 5 0 0 1 9 2.9C21 15.4 12 21 12 21Z" />
                        </svg>
                    </div>
                    <svg viewBox="0 0 70 56" className="absolute -bottom-16 right-2.5 h-14 w-[70px] text-sky-400" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 4c0 26 18 42 54 44" />
                        <path d="m50 38 10 10-12 6" />
                    </svg>
                </div>

                {/* ขวา: การ์ดอีเมล */}
                <div className="reveal rounded-3xl bg-white px-7 py-8 text-center shadow-soft dark:bg-ink-2 dark:ring-1 dark:ring-blue-900/50">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t(ui.emailLabel)}</p>
                    <p className="mb-2.5 mt-1 break-all text-xl font-bold text-slate-900 dark:text-white">{profile.email}</p>
                    <a
                        href={`tel:${profile.phoneRaw}`}
                        className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm text-slate-700 hover:text-blue-700 dark:bg-blue-950 dark:text-slate-300"
                    >
                        {t(ui.orCall)} <b className="text-slate-900 dark:text-white">{profile.phone}</b>
                    </a>
                    <a
                        href={`mailto:${profile.email}`}
                        className="mt-6 block rounded-full bg-blue-600 py-4 font-semibold text-white shadow-[0_10px_24px_-8px_rgb(37_99_235/0.55)] transition hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                        {t(ui.sendEmail)}
                    </a>
                    <CopyEmailButton
                        email={profile.email}
                        label={t(ui.copyEmail)}
                        copiedLabel={t(ui.copied)}
                        className="mt-3 text-[13.5px] font-medium text-blue-600 hover:underline dark:text-blue-400"
                    />
                    <div className="mt-5 flex justify-center gap-2.5 border-t border-[#eef2f8] pt-5 dark:border-blue-900/40">
                        {socials.map((s) => {
                            const Icon = socialIcon[s.id];
                            return (
                                <a
                                    key={s.id}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    title={s.label}
                                    className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 text-slate-500 transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 dark:border-blue-900/60 dark:text-slate-400 dark:hover:text-blue-300"
                                >
                                    <Icon className="h-[18px] w-[18px]" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
