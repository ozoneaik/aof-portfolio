import { cacheLife } from "next/cache";
import type { Lang } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

/** รูป preview หนึ่งรูป (คำอธิบายแปลเป็นภาษาปัจจุบันแล้ว) */
export type ProjectImageView = { url: string; caption: string };

/** ข้อมูลโปรเจกต์ที่พร้อมแสดงผล: แปลเป็นภาษาเดียวแล้ว ส่งให้ client component ได้เลย */
export type ProjectView = {
    slug: string;
    category: "work" | "personal";
    featured: boolean;
    title: string;
    desc: string;
    details?: string;
    role?: string;
    impact: string[];
    tags: string[];
    images: ProjectImageView[];
    githubUrl?: string;
    websiteUrl?: string;
};

/**
 * ดึงผลงานทั้งหมดจาก database ในภาษาที่ต้องการ
 *
 * "use cache" + cacheLife("hours"): Next.js เก็บผลลัพธ์ไว้ (แยกตาม lang)
 * แล้วดึงจาก database ใหม่ในเบื้องหลังทุก ~1 ชั่วโมง → แก้ข้อมูลใน DB แล้วไม่ต้อง deploy ใหม่
 * ตอน build จะดึงครั้งแรก หน้าเว็บจึงยังเป็น static เร็วเหมือนเดิม
 */
export async function getProjects(lang: Lang): Promise<ProjectView[]> {
    "use cache";
    cacheLife("hours");

    const rows = await prisma.project.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
            translations: { where: { locale: lang } }, // เอาเฉพาะภาษาที่ต้องการ (ได้ 0 หรือ 1 แถว)
            images: { orderBy: { sortOrder: "asc" } },
            tags: { include: { tag: true }, orderBy: { tagId: "asc" } },
        },
    });

    return rows
        .filter((p) => p.translations.length > 0) // ข้ามโปรเจกต์ที่ยังไม่มีข้อความภาษานี้
        .map((p) => {
            const tr = p.translations[0];
            return {
                slug: p.slug,
                category: p.category,
                featured: p.featured,
                title: tr.title,
                desc: tr.description,
                details: tr.details ?? undefined,
                role: tr.role ?? undefined,
                impact: toStringArray(tr.impacts),
                tags: p.tags.map((t) => t.tag.name),
                // รูปปกขึ้นก่อน ที่เหลือเรียงตาม sort_order
                images: [...p.images]
                    .sort((a, b) => Number(b.isCover) - Number(a.isCover))
                    .map((img) => ({ url: img.url, caption: captionFor(img.caption, lang) })),
                githubUrl: p.githubUrl ?? undefined,
                websiteUrl: p.websiteUrl ?? undefined,
            };
        });
}

/** impacts เก็บเป็น JSON → แปลงกลับเป็น string[] (ถ้ารูปแบบไม่ถูกต้องคืน []) */
function toStringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/** caption เก็บเป็น JSON { th, en, zh } → เลือกภาษาที่ต้องการ ถ้าไม่มีใช้ภาษาไทยแทน */
function captionFor(value: unknown, lang: Lang): string {
    if (!value || typeof value !== "object") return "";
    const caption = value as Partial<Record<Lang, unknown>>;
    const text = caption[lang] ?? caption.th;
    return typeof text === "string" ? text : "";
}
