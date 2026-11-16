import { profile, socials, ui, type Lang } from "@/data/portfolio";
import type { ProjectView } from "@/lib/projects";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { GitHubIcon } from "@/components/icons/GithubIcon";
import { HeroPhotoSlider } from "@/components/ui/HeroPhotoSlider";
import { ParallaxScene } from "@/components/ui/ParallaxScene";

// การ์ดลอยรอบรูป: มุมเหลี่ยม พื้นสีเข้มโปร่ง ลอยขึ้นลงช้า ๆ + ขยับตามเมาส์ (data-depth)
const floatCard =
    "absolute z-10 animate-float rounded-md border border-white/15 bg-navy/85 p-4 text-[13px] text-slate-300 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur transition-transform duration-500 ease-out";

// ปุ่มดำแบบ store badge (App Store / Google Play)
const badge =
    "group flex items-center gap-2.5 rounded-xl border-2 border-white/60 bg-black px-4 py-2 text-white transition hover:-translate-y-0.5 hover:border-amber-300";

export function HeroSection({ lang, projects }: { lang: Lang; projects: ProjectView[] }) {
    const t = (v: Record<Lang, string>) => v[lang];
    // การ์ดลอยใช้ชื่อระบบรวมแชทจาก database (ถ้าหาไม่เจอใช้ข้อความสำรอง)
    const chatTitle = projects.find((p) => p.slug === "callcenter-system-pk")?.title ?? "Omni-Channel Chat";
    const github = socials.find((s) => s.id === "github")!;

    return (
        // pb ใหญ่ไว้ให้แผงผลงาน (ProjectsSection) เลื่อนขึ้นมาซ้อนขอบล่าง
        // Hero เป็นพื้นเข้มทั้งโหมดสว่างและโหมดมืด (เหมือนภาพ key art ของเว็บเกม)
        <ParallaxScene className="relative overflow-hidden bg-navy pb-44 pt-14 text-white lg:min-h-[calc(100svh-72px)] lg:pt-16 dark:bg-ink">
            {/* ---------- พื้นหลัง: แสงฟ้า + ลายจุด + คำใหญ่จาง ๆ ---------- */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-40 -top-20 h-[700px] w-[700px] rounded-full bg-blue-600/35 blur-[120px]" />
                <div className="absolute -bottom-40 left-[-10%] h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1.2px,transparent_1.2px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
                <p className="absolute -left-4 top-6 select-none whitespace-nowrap font-display text-[22vw] font-black italic uppercase leading-none text-white/[0.04]">
                    Full Stack
                </p>
            </div>

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
                {/* ---------- ฝั่งข้อความ ---------- */}
                <div className="relative z-10">
                    {/* ป้ายเฉียงสีเหลือง: พร้อมเริ่มงาน + ปลดประจำการแล้ว (สิ่งที่ HR อยากรู้เป็นอย่างแรก) */}
                    <p className="inline-block -skew-x-12 bg-amber-300 px-4 py-1.5 text-sm font-bold text-slate-900">
                        <span className="inline-flex skew-x-12 flex-wrap items-center gap-x-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-600 shadow-[0_0_0_3px_rgb(5_150_105/0.25)]" />
                            {t(profile.status)}
                            <span className="font-medium text-slate-700">· {t(profile.statusNote)}</span>
                        </span>
                    </p>

                    {/* ตำแหน่งงานเป็นข้อความใหญ่ที่สุด (HR ต้องรู้ทันทีว่าสมัครตำแหน่งอะไร) */}
                    <h1
                        className="mt-6 font-display text-[40px] font-black italic leading-[1.05] drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)] sm:text-6xl lg:text-[62px]"
                    >
                        Full-Stack
                        <br />
                        <span className="text-sky-300">Web Developer</span>
                    </h1>

                    {/* ประสบการณ์ · ที่อยู่ */}
                    <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-semibold text-white">
                        <span>{t(ui.proofTitle)}</span>
                        <span aria-hidden className="text-slate-500">|</span>
                        <span className="font-medium text-slate-300">📍 {t(profile.location)}</span>
                    </p>

                    {/* สโลแกน (ย่อลงเป็นบรรทัดรอง) */}
                    <p className="mt-5 font-display text-xl font-extrabold italic text-sky-200 sm:text-2xl">
                        {[t(ui.heroLine1), t(ui.heroLine2Before) + t(ui.heroLine2Highlight), t(ui.heroLine3)].join(lang === "en" ? " " : "")}
                    </p>

                    <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
                        {t(ui.heroLeadBefore)}&nbsp;<b className="text-white">{t(profile.nameShort)}</b> {t(ui.heroLeadAfter)}
                    </p>

                    {/* ---------- ปุ่มดำแบบ store badge ---------- */}
                    <div className="mt-8 flex flex-wrap gap-2.5">
                        <a href={profile.cv.th} download className={badge}>
                            <DownloadIcon className="h-6 w-6 shrink-0 text-amber-300" />
                            <span className="leading-tight">
                                <small className="block text-[11px] text-white/70">{t(ui.badgeDownload)}</small>
                                <b className="text-base">{t(ui.badgeCvTh)}</b>
                            </span>
                        </a>
                        <a href={profile.cv.en} download className={badge}>
                            <DownloadIcon className="h-6 w-6 shrink-0 text-sky-300" />
                            <span className="leading-tight">
                                <small className="block text-[11px] text-white/70">{t(ui.badgeDownload)}</small>
                                <b className="text-base">{t(ui.badgeCvEn)}</b>
                            </span>
                        </a>
                        <a href={github.url} target="_blank" rel="noopener noreferrer" className={badge}>
                            <GitHubIcon className="h-6 w-6 shrink-0" />
                            <span className="leading-tight">
                                <small className="block text-[11px] text-white/70">{t(ui.badgeCodeOn)}</small>
                                <b className="text-base">GitHub</b>
                            </span>
                        </a>
                    </div>
                </div>

                {/* ---------- ฝั่งรูป: กรอบโค้ง + มุมเล็งแบบ HUD + การ์ดลอย ---------- */}
                <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
                    <div className="relative h-[500px] sm:h-[560px] lg:h-[600px]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                            <div data-depth="10" className="relative transition-transform duration-500 ease-out">
                                <div className="relative h-[460px] w-[290px] overflow-hidden rounded-[200px_200px_6px_6px] border-[5px] border-sky-300 shadow-[0_0_0_12px_rgb(255_255_255/0.08),0_30px_60px_-24px_rgb(0_0_0/0.7)] sm:h-[540px] sm:w-[350px]">
                                    <HeroPhotoSlider photos={profile.photos} alt={t(profile.name)} slideLabel={t(ui.photoSlide)} />
                                </div>
                                {/* มุมเล็ง 4 มุม (ตกแต่ง) */}
                                <span aria-hidden className="absolute -bottom-3 -left-3 h-8 w-8 border-b-[3px] border-l-[3px] border-amber-300" />
                                <span aria-hidden className="absolute -bottom-3 -right-3 h-8 w-8 border-b-[3px] border-r-[3px] border-amber-300" />
                            </div>
                        </div>

                        {/* การ์ด: สายที่ถนัด → มุมซ้ายบน */}
                        <div data-depth="26" style={{ animationDelay: "-2s" }} className={`${floatCard} -left-1 top-0 flex w-[214px] items-center gap-3 lg:-left-8 lg:top-6`}>
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sky-400/15 text-sky-300">
                                <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                    <path d="m6 5-4 4 4 4M12 5l4 4-4 4" />
                                </svg>
                            </span>
                            <p className="leading-snug">
                                {t(ui.cardStackLabel)}
                                <br />
                                <b className="text-white">Laravel · React · PostgreSQL</b>
                            </p>
                        </div>

                        {/* การ์ด: ระบบรวมแชท → มุมขวาล่าง (มือถือซ่อน เพราะจอแคบจะบังตัว) */}
                        <div data-depth="30" style={{ animationDelay: "-4s" }} className={`${floatCard} -right-4 bottom-12 hidden w-[204px] sm:block lg:-right-10 lg:bottom-20`}>
                            <p className="text-[11.5px] text-slate-400">{chatTitle}</p>
                            <p className="my-0.5 font-display text-[24px] font-black italic leading-tight text-white">{t(ui.cardChatBig)}</p>
                            <p className="text-[11.5px] font-medium text-emerald-400">● {t(ui.cardChatSub)}</p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {["Lazada", "Shopee", "Facebook", "LINE"].map((p) => (
                                    <span key={p} className="rounded-sm bg-white/10 px-2 py-0.5 text-[10.5px] font-semibold text-sky-200">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ลิงก์เอียงมุมขวาล่าง แบบ "GO TO ... >>" */}
            <a
                href="#projects"
                className="absolute bottom-36 right-[5%] hidden font-display text-2xl font-black italic text-white transition hover:text-sky-300 lg:block"
            >
                {t(ui.ctaProjects)} <span className="text-amber-300">&gt;&gt;</span>
            </a>
        </ParallaxScene>
    );
}
