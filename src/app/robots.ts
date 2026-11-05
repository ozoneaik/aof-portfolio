import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/portfolio";

// /robots.txt — อนุญาตให้ทุก bot เก็บข้อมูลได้ และบอกตำแหน่ง sitemap
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
