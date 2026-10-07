"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  education,
  experience,
  langLabel,
  langs,
  profile,
  projects,
  skills,
  socials,
  ui,
  type Lang,
} from "@/data/portfolio";
import { ArrowIcon, MailIcon, MoonIcon, PhoneIcon, PinIcon, SunIcon, socialIcon } from "./Icons";

const sections = ["about", "experience", "projects", "skills", "contact"] as const;

// language preference: persisted in localStorage, with an in-memory fallback
let memoryLang: Lang = "th";
const readLang = (): Lang => {
  try {
    const saved = localStorage.getItem("lang");
    if (langs.includes(saved as Lang)) return saved as Lang;
  } catch {}
  return memoryLang;
};
const writeLang = (l: Lang) => {
  memoryLang = l;
  try {
    localStorage.setItem("lang", l);
  } catch {}
  window.dispatchEvent(new Event("langchange"));
};
const subscribeLang = (cb: () => void) => {
  window.addEventListener("langchange", cb);
  return () => window.removeEventListener("langchange", cb);
};

// theme: the .dark class on <html> is the source of truth (set before paint in layout.tsx)
type Theme = "light" | "dark";
const readTheme = (): Theme => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const writeTheme = (t: Theme) => {
  document.documentElement.classList.toggle("dark", t === "dark");
  try {
    localStorage.setItem("theme", t);
  } catch {}
  window.dispatchEvent(new Event("themechange"));
};
const subscribeTheme = (cb: () => void) => {
  window.addEventListener("themechange", cb);
  return () => window.removeEventListener("themechange", cb);
};

function SectionHeading({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="reveal mb-10">
      <p className="font-mono text-sm text-blue-600 dark:text-blue-400">
        <span className="text-blue-300 dark:text-blue-700">{index}.</span> {label}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
    </div>
  );
}

function Logo({
  src,
  alt,
  zoom = 1,
  className = "h-16 w-16",
}: {
  src: string;
  alt: string;
  zoom?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border border-blue-100 bg-white p-1.5 shadow-sm dark:border-slate-700 ${className}`}
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="64px"
          className="object-contain"
          style={{ transform: `scale(${zoom})` }}
          unoptimized={src.endsWith(".svg")}
        />
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 font-mono text-xs text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
      {children}
    </span>
  );
}

export default function Portfolio() {
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "th" as Lang);
  const setLang = writeLang;
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light" as Theme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  }, [lang]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const t = (v: Record<Lang, string>) => v[lang];
  const isDark = theme === "dark";

  return (
    <div className="flex-1">
      {/* ───────── Navbar ───────── */}
      <header className="sticky top-0 z-50 border-b border-blue-100/70 bg-white/80 backdrop-blur-md dark:border-blue-900/40 dark:bg-[#050b1a]/80">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
          <a href="#top" className="font-mono text-lg font-semibold text-slate-900 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">&lt;</span>aof
            <span className="text-blue-600 dark:text-blue-400"> /&gt;</span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            {sections.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <span className="font-mono text-xs text-blue-500">0{i + 1}.</span> {t(ui.nav[id])}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex rounded-lg border border-blue-200 p-0.5 font-mono text-xs dark:border-blue-900/70">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-md px-2 py-1 transition-colors sm:px-2.5 ${
                    lang === l
                      ? "bg-blue-600 text-white"
                      : "text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950"
                  }`}
                  aria-pressed={lang === l}
                >
                  {langLabel[l]}
                </button>
              ))}
            </div>

            <button
              onClick={() => writeTheme(isDark ? "light" : "dark")}
              aria-label={t(isDark ? ui.themeLight : ui.themeDark)}
              title={t(isDark ? ui.themeLight : ui.themeDark)}
              className="relative h-[30px] w-[30px] overflow-hidden rounded-lg border border-blue-200 text-amber-500 transition-colors hover:bg-blue-50 dark:border-blue-900/70 dark:text-blue-300 dark:hover:bg-blue-950"
            >
              {/* icons follow the .dark class so the right one shows from first paint */}
              <SunIcon className="absolute inset-0 m-auto h-[18px] w-[18px] transition-all duration-300 dark:-rotate-90 dark:scale-0 dark:opacity-0" />
              <MoonIcon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100" />
            </button>

            <button
              className="rounded-lg p-1.5 text-slate-700 hover:bg-blue-50 lg:hidden dark:text-slate-200 dark:hover:bg-blue-950"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>
        {menuOpen && (
          <ul className="border-t border-blue-100 bg-white px-4 py-3 lg:hidden dark:border-blue-900/40 dark:bg-[#050b1a]">
            {sections.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                >
                  <span className="font-mono text-xs text-blue-500">0{i + 1}.</span> {t(ui.nav[id])}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main id="top">
        {/* ───────── Hero ───────── */}
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

        {/* ───────── About ───────── */}
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

        {/* ───────── Experience ───────── */}
        <section id="experience" className="scroll-mt-16 bg-blue-50/50 py-24 dark:bg-blue-950/20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading index="02" label="experience" title={t(ui.experienceTitle)} />
            <ol className="relative ml-2 border-l-2 border-blue-200 dark:border-blue-900/70">
              {experience.map((x) => (
                <li key={x.period.en} className="reveal relative mb-10 pl-8 last:mb-0">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-600 ring-2 ring-blue-200 dark:border-[#050b1a] dark:bg-blue-400 dark:ring-blue-900" />
                  <p className="font-mono text-sm text-blue-600 dark:text-blue-400">{t(x.period)}</p>
                  <div className="mt-2 flex items-center gap-4">
                    {x.logo && <Logo src={x.logo} alt={t(x.org)} zoom={x.logoZoom} className="h-14 w-14" />}
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{t(x.title)}</h3>
                      <p className="text-slate-500 dark:text-slate-400">{t(x.org)}</p>
                    </div>
                  </div>
                  <p className="mt-3 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">{t(x.desc)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── Projects ───────── */}
        <section id="projects" className="scroll-mt-16 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading index="03" label="projects" title={t(ui.projectsTitle)} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <article
                  key={p.title.en}
                  className={`reveal group flex flex-col rounded-xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/10 dark:bg-slate-900/60 dark:hover:shadow-blue-500/10 ${
                    p.featured
                      ? "border-blue-300 ring-1 ring-blue-100 dark:border-blue-700/70 dark:ring-blue-900/40"
                      : "border-slate-200 hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                      ~/{p.title.en.toLowerCase().split(" ").slice(0, 2).join("-").replace(/[^a-z-]/g, "")}
                    </span>
                    {p.featured && (
                      <span className="rounded-full bg-blue-600 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white">
                        featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                    {t(p.title)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{t(p.desc)}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Skills ───────── */}
        <section id="skills" className="scroll-mt-16 bg-blue-50/50 py-24 dark:bg-blue-950/20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading index="04" label="skills" title={t(ui.skillsTitle)} />
            <div className="grid gap-5 md:grid-cols-2">
              {skills.map((s) => (
                <div
                  key={s.group.en}
                  className="reveal rounded-xl border border-blue-100 bg-white p-6 dark:border-blue-900/40 dark:bg-slate-900/60"
                >
                  <h3 className="font-mono text-sm font-semibold text-blue-700 dark:text-blue-300">
                    <span className="text-blue-300 dark:text-blue-700">const</span> {t(s.group)}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Contact ───────── */}
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
      </main>

      <footer className="border-t border-blue-100 py-8 dark:border-blue-900/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 font-mono text-xs text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
          <p>© 2026 Phuwadech Panichayasopa</p>
          <p>{t(ui.footer)}</p>
        </div>
      </footer>
    </div>
  );
}
