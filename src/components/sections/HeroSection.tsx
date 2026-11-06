import Image from "next/image";
import { fill, heroStack, profile, projects, socials, ui, type Lang } from "@/data/portfolio";
import { brandColor, skillIcon } from "@/components/Icons";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { Blob } from "@/components/ui/Decor";
import { InteractiveTerminal } from "@/components/ui/InteractiveTerminal";
import { ParallaxScene } from "@/components/ui/ParallaxScene";

// การ์ดลอยรอบรูป: ลอยขึ้นลงช้า ๆ (animate-float) + ขยับตามเมาส์ (data-depth)
const floatCard =
    "absolute z-10 animate-float rounded-2xl bg-white p-4 text-[13px] shadow-soft transition-transform duration-500 ease-out dark:bg-ink-2 dark:ring-1 dark:ring-blue-900/50";

export function HeroSection({ lang }: { lang: Lang }) {
    const t = (v: Record<Lang, string>) => v[lang];
    const omniChat = projects.find((p) => p.slug === "omni-channel")!;
    const github = socials.find((s) => s.id === "github")!;
    // แปลงข้อความ terminal ทุกคำสั่งเป็นภาษาปัจจุบัน เช่น { help: { th, en, zh } } → { help: "..." }
    const termText = Object.fromEntries(Object.entries(ui.term).map(([key, v]) => [key, v[lang]])) as Record<
        keyof typeof ui.term,
        string
    >;
    // ข้อความ "ลองพิมพ์ {cmd} ในนี้ดูครับ" แบ่งเป็นก่อน/หลัง เพื่อใส่ <kbd>help</kbd> ตรงกลาง
    const [hintBefore, hintAfter] = t(ui.termHint).split("{cmd}");

    return (
        <ParallaxScene className="relative overflow-hidden pb-20 pt-10 lg:pt-12">
            <Blob tone="amber" className="left-[46%] top-16 hidden lg:block" />
            <Blob tone="sky" className="left-[44%] top-80 hidden lg:block" delay={-3} />
            <Blob tone="blue" className="bottom-10 left-[2%] hidden lg:block" delay={-2} />
            <Blob tone="dot" className="bottom-16 left-[30%] hidden lg:block" />

            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
                {/* ---------- ฝั่งข้อความ (z-10 กันวงกลมพื้นหลังของรูปมาทับบนมือถือ) ---------- */}
                <div className="relative z-10">
                    <p className="font-semibold text-sky-500 dark:text-sky-400">{t(ui.heroEyebrow)}</p>
                    <h1
                        className={`mb-6 mt-4 font-bold leading-[1.15] text-slate-900 dark:text-white ${
                            // ภาษาอังกฤษคำยาวกว่า จึงใช้ตัวเล็กลงเพื่อไม่ให้ตัดเป็น 5 บรรทัด
                            lang === "en" ? "text-[36px] sm:text-5xl lg:text-[54px]" : "text-[40px] sm:text-6xl lg:text-[68px]"
                            }`}
                    >
                        {t(ui.heroLine1)}
                        <br />
                        {t(ui.heroLine2Before)}
                        <span className="text-blue-600 dark:text-blue-400">{t(ui.heroLine2Highlight)}</span>
                        <br />
                        {t(ui.heroLine3)}
                        <span
                            aria-hidden
                            className="ml-[0.3em] inline-grid h-[0.82em] place-items-center rounded-full bg-amber-200 px-[0.22em] align-[0.18em] font-mono text-[0.38em] font-semibold text-slate-900"
                        >
                            &lt;/&gt;
                        </span>
                    </h1>
                    <p className="max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        {t(ui.heroLeadBefore)}&nbsp;<b className="text-slate-900 dark:text-white">{t(profile.nameShort)}</b>{" "}
                        {t(ui.heroLeadAfter)}
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-5">
                        <a
                            href="#projects"
                            className="rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-[0_10px_24px_-8px_rgb(37_99_235/0.55)] transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            {t(ui.ctaProjects)}
                        </a>
                        <a href={t(profile.cv)} download className="group inline-flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-200">
                            <span className="grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-blue-200 text-blue-600 transition group-hover:border-blue-500 group-hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:group-hover:bg-blue-950">
                                <DownloadIcon className="h-[18px] w-[18px]" />
                            </span>
                            {t(ui.downloadCv)}
                        </a>
                    </div>

                    {/* ไอคอนเทคโนโลยีซ้อนกัน + ประสบการณ์ */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <div className="flex">
                            {heroStack.map((name, i) => {
                                const Icon = skillIcon[name];
                                return (
                                    <span
                                        key={name}
                                        title={name}
                                        className={`grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-white shadow-[0_2px_8px_rgb(15_23_42/0.12)] dark:border-ink dark:bg-ink-2 ${i > 0 ? "-ml-2.5" : ""}`}
                                    >
                                        <Icon className={`h-5 w-5 ${brandColor[name] ?? ""}`} />
                                    </span>
                                );
                            })}
                        </div>
                        <p className="text-sm leading-snug text-slate-600 dark:text-slate-400">
                            <b className="text-slate-900 dark:text-white">{t(ui.proofTitle)}</b>
                            <br />
                            {fill(t(ui.proofSub), { n: projects.length })}
                        </p>
                    </div>
                </div>

                {/* ---------- ฝั่งรูป + การ์ดลอย ---------- */}
                <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
                    <div className="relative h-[500px] sm:h-[560px] lg:h-[600px]">
                        {/* วงกลมพื้นหลัง */}
                        <div
                            data-depth="6"
                            className="absolute -right-32 -top-14 h-[600px] w-[560px] rounded-full bg-gradient-to-br from-sky-100 to-blue-50 transition-transform duration-500 ease-out lg:-right-44 lg:h-[680px] lg:w-[640px] dark:from-blue-950/70 dark:to-ink-2"
                        />
                        {/* รูปโปรไฟล์ในกรอบโค้ง */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                            <div
                                data-depth="10"
                                className="relative h-[420px] w-[260px] overflow-hidden rounded-[200px_200px_28px_28px] border-[6px] border-white shadow-[0_30px_60px_-24px_rgb(15_35_71/0.45)] transition-transform duration-500 ease-out sm:h-[520px] sm:w-[330px] dark:border-ink-2"
                            >
                                <Image
                                    src={profile.photo}
                                    alt={t(profile.name)}
                                    fill
                                    priority
                                    sizes="(min-width: 640px) 330px, 260px"
                                    className="object-cover"
                                    style={{ objectPosition: "50% 72%" }}
                                />
                            </div>
                        </div>

                        {/* การ์ด: สายที่ถนัด */}
                        <div data-depth="26" style={{ animationDelay: "-2s" }} className={`${floatCard} left-0 top-2.5 flex w-[220px] items-center gap-3 lg:-left-2.5 lg:top-10`}>
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                                <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="m6 5-4 4 4 4M12 5l4 4-4 4" />
                                </svg>
                            </span>
                            <p className="leading-snug text-slate-600 dark:text-slate-400">
                                {t(ui.cardStackLabel)}
                                <br />
                                <b className="text-slate-900 dark:text-white">
                                    Laravel · React · PostgreSQL
                                </b>
                            </p>
                        </div>

                        {/* การ์ด: ระบบรวมแชท */}
                        <div data-depth="30" style={{ animationDelay: "-4s" }} className={`${floatCard} right-0 top-28 w-[190px] sm:w-[214px] lg:-right-3.5 lg:top-36`}>
                            <p className="text-[11.5px] text-slate-500 dark:text-slate-400">{t(omniChat.title)}</p>
                            <p className="my-0.5 text-xl font-bold leading-tight text-slate-900 sm:text-[26px] dark:text-white">{t(ui.cardChatBig)}</p>
                            <p className="text-[11.5px] font-medium text-emerald-700 dark:text-emerald-400">● {t(ui.cardChatSub)}</p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {["Lazada", "Shopee", "Facebook", "LINE"].map((p) => (
                                    <span key={p} className="rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* การ์ด: สถานะพร้อมทำงาน */}
                        {/* <div data-depth="18" style={{ animationDelay: "-1s" }} className={`${floatCard} bottom-5 right-0 flex w-[236px] gap-3 lg:-right-1.5 lg:bottom-12`}>
                            <span className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full border-2 border-blue-100 dark:border-blue-900">
                                <Image
                                    src={profile.photo}
                                    alt=""
                                    fill
                                    sizes="38px"
                                    className="scale-[2.6] object-cover"
                                    style={{ objectPosition: "50% 62%", transformOrigin: "48% 62%" }}
                                />
                            </span>
                            <div>
                                <p className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgb(16_185_129/0.15)]" />
                                    {t(profile.status)}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t(profile.statusNote)}</p>
                            </div>
                        </div> */}
                    </div>

                    {/* Terminal: จอใหญ่ลอยทับมุมซ้ายของรูป / มือถืออยู่ใต้รูป */}
                    <div
                        data-depth="22"
                        style={{ animationDelay: "-5s" }}
                        className="relative z-20 mt-6 transition-transform duration-500 ease-out lg:absolute lg:-left-10 lg:bottom-24 lg:mt-0 lg:w-[290px] lg:animate-float"
                    >
                        <InteractiveTerminal
                            text={{
                                ...termText,
                                label: t(ui.termLabel),
                                name: t(profile.nameShort),
                                role: `${t(profile.role)} · ${t(profile.location)}`,
                                email: profile.email,
                                phone: profile.phone,
                                github: `@${github.handle}`,
                                cvHref: t(profile.cv),
                            }}
                        />
                        <p className="mt-3 text-center text-xs text-slate-500 lg:absolute lg:-bottom-9 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 lg:whitespace-nowrap lg:rounded-full lg:bg-white lg:px-3 lg:py-1 lg:text-slate-600 lg:shadow-soft dark:text-slate-400 lg:dark:bg-ink-2">
                            {hintBefore}
                            <kbd className="rounded bg-blue-50 px-1.5 font-mono text-blue-700 dark:bg-blue-950 dark:text-blue-300">help</kbd>
                            {hintAfter}
                        </p>
                    </div>
                </div>
            </div>
        </ParallaxScene>
    );
}
