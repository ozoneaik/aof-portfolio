import { NextResponse, type NextRequest } from "next/server";
import { isLang, langs, type Lang } from "@/lib/i18n";

const DEFAULT_LANG: Lang = "en";

/**
 * เลือกภาษาให้คนที่เข้า URL ที่ยังไม่มีภาษา (เช่น "/")
 * 1) ถ้าเคยกดเลือกภาษาไว้ → ใช้ค่าจาก cookie "lang"
 * 2) ไม่งั้นดูจาก header Accept-Language ของ browser เช่น "en-US,en;q=0.9,th;q=0.8"
 * 3) ไม่ตรงอะไรเลย → ภาษาไทย
 */
function pickLang(request: NextRequest): Lang {
    const saved = request.cookies.get("lang")?.value;
    if (saved && isLang(saved)) return saved;

    const header = request.headers.get("accept-language") ?? "";
    const preferred = header
        .split(",")
        .map((part) => {
            const [tag, q] = part.trim().split(";q=");
            return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);

    for (const { lang } of preferred) {
        if (isLang(lang)) return lang;
    }
    return DEFAULT_LANG;
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // URL มีภาษาอยู่แล้ว (/th, /en/...) → ปล่อยผ่าน
    const hasLang = langs.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
    if (hasLang) return;

    // ไม่มีภาษา → redirect ไปเติมภาษาข้างหน้า เช่น "/" → "/en"
    const url = request.nextUrl.clone();
    url.pathname = `/${pickLang(request)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    // ข้ามไฟล์ภายในของ Next (_next) และไฟล์ที่มีนามสกุล เช่น favicon.ico, sitemap.xml, รูป, CV
    matcher: ["/((?!_next|.*\\..*).*)"],
};
