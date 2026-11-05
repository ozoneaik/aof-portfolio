import type { MetadataRoute } from "next";
import { langs, SITE_URL } from "@/data/portfolio";

// /sitemap.xml — บอก Google ว่ามีหน้าไหนบ้าง และแต่ละหน้ามีฉบับภาษาอะไร
export default function sitemap(): MetadataRoute.Sitemap {
    const languages = { th: `${SITE_URL}/th`, en: `${SITE_URL}/en`, "zh-CN": `${SITE_URL}/zh` };

    return langs.map((lang) => ({
        url: `${SITE_URL}/${lang}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: lang === "th" ? 1 : 0.8,
        alternates: { languages },
    }));
}
