"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { langLabel, langs, type Lang } from "@/lib/i18n";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";
import { SunIcon } from "@/components/icons/SunIcon";
import Image from "next/image";
import Avatar from "../../../public/avatar.png"
type Props = {
    lang: Lang;
    links: { id: string; label: string }[];
    labels: { contact: string; menu: string; language: string; themeLight: string; themeDark: string };
};

// จำภาษาที่เลือกไว้ใน cookie (proxy.ts ใช้ตอนเข้า "/" ครั้งหน้า)
function rememberLang(next: Lang) {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
}

// สลับธีม: class .dark บน <html> คือตัวกำหนดหลัก ไอคอนพระอาทิตย์/พระจันทร์เปลี่ยนตาม class นี้ด้วย CSS เลยไม่ต้องมี state
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch { }
}

export function NavbarClient({ lang, links, labels }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState<string | null>(null);
    const router = useRouter();

    // เปลี่ยนภาษา: จำค่าไว้ แล้วไปหน้าภาษานั้น (scroll: false = อยู่ตำแหน่งเดิม ไม่เด้งขึ้นบนสุด)
    const switchLang = (next: Lang) => {
        rememberLang(next);
        router.push(`/${next}`, { scroll: false });
    };

    // ใส่เส้นขอบล่างเมื่อเลื่อนลงมา + ไฮไลต์เมนูของ section ที่กำลังดูอยู่
    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const { scrollY, innerHeight } = window;
            setScrolled(scrollY > 8);

            let current: string | null = null;
            for (const { id } of links) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) current = id;
            }
            // section สุดท้ายสั้น: ถ้าเลื่อนจนสุดหน้าให้ถือว่าอยู่ section สุดท้าย
            const max = document.documentElement.scrollHeight - innerHeight;
            if (max > 0 && scrollY >= max - 2) current = links[links.length - 1].id;
            setActive(current);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, [links]);

    const linkClass = (id: string) =>
        active === id
            ? "text-slate-900 dark:text-white"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";

    return (
        <header
            className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-colors dark:bg-ink/85 ${scrolled ? "border-blue-100 dark:border-blue-900/40" : "border-transparent"
                }`}
        >
            <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5 sm:px-6">
                {/* โลโก้ */}
                <a href="#top" className="flex items-center gap-2.5">

                    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-blue-600 font-mono text-[15px] font-semibold text-white">
                        {/* a/ */}
                        <Image
                            alt=""
                            src={Avatar}
                        />
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-400 dark:border-ink" />
                    </span>
                    <span className="leading-tight">
                        <b className="block text-[15px] tracking-wide text-slate-900 dark:text-white">PHUWADECH</b>
                        <small className="hidden font-mono sm:block text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                            full-stack dev
                        </small>
                    </span>
                </a>

                {/* เมนูหลัก (จอใหญ่) */}
                <ul className="hidden items-center gap-7 text-[14.5px] lg:flex">
                    {links.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                aria-current={active === id ? "true" : undefined}
                                className={`relative py-1 transition-colors ${linkClass(id)}`}
                            >
                                {label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-400 ${active === id ? "w-full opacity-100" : "w-0 opacity-0"
                                        }`}
                                />
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    {/* ปุ่มเลือกภาษา */}
                    <div
                        role="group"
                        aria-label={labels.language}
                        className="flex rounded-full border border-blue-100 p-0.5 font-mono text-xs dark:border-blue-900/60"
                    >
                        {langs.map((l) => (
                            <button
                                key={l}
                                type="button"
                                onClick={() => l !== lang && switchLang(l)}
                                aria-pressed={lang === l}
                                className={`rounded-full px-2.5 py-1 transition-colors ${lang === l
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300"
                                    }`}
                            >
                                {langLabel[l]}
                            </button>
                        ))}
                    </div>

                    {/* ปุ่มสลับธีม */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`${labels.themeDark} / ${labels.themeLight}`}
                        className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-blue-100 text-amber-500 transition-colors hover:bg-blue-50 dark:border-blue-900/60 dark:text-sky-300 dark:hover:bg-blue-950"
                    >
                        <SunIcon className="absolute h-[18px] w-[18px] transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0" />
                        <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100" />
                    </button>

                    {/* ปุ่มติดต่อ */}
                    <a
                        href="#contact"
                        className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgb(37_99_235/0.55)] transition hover:-translate-y-0.5 hover:bg-blue-700 sm:inline-block"
                    >
                        {labels.contact}
                    </a>

                    {/* ปุ่มเมนู (จอเล็ก) */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={labels.menu}
                        aria-expanded={menuOpen}
                        className="grid h-9 w-9 place-items-center rounded-full border border-blue-100 text-slate-700 lg:hidden dark:border-blue-900/60 dark:text-slate-200"
                    >
                        {menuOpen ? (
                            <CloseIcon className="h-4 w-4" />
                        ) : (
                            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                                <path d="M3 6h14M3 10h14M3 14h14" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* เมนูบนมือถือ */}
            {menuOpen && (
                <ul className="border-t border-blue-100 bg-white px-5 py-3 lg:hidden dark:border-blue-900/40 dark:bg-ink">
                    {links.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={() => setMenuOpen(false)}
                                className={`block py-2.5 ${linkClass(id)}`}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                    <li className="sm:hidden">
                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="mt-2 block rounded-full bg-blue-600 py-2.5 text-center font-semibold text-white"
                        >
                            {labels.contact}
                        </a>
                    </li>
                </ul>
            )}
        </header>
    );
}
