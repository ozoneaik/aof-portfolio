import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";
import { isLang, langs, SITE_URL, ui, type Lang } from "@/data/portfolio";
import { InlineScript } from "@/components/ui/InlineScript";
import "../globals.css";

const plexThai = IBM_Plex_Sans_Thai({
    variable: "--font-plex-thai",
    subsets: ["thai", "latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

// ค่า lang ที่ใส่ใน <html lang> และ hreflang ให้ Google
const htmlLang: Record<Lang, string> = { th: "th", en: "en", zh: "zh-CN" };
// ค่า locale ของ Open Graph (Facebook / LINE ใช้ตอนแสดงพรีวิวลิงก์)
const ogLocale: Record<Lang, string> = { th: "th_TH", en: "en_US", zh: "zh_CN" };

// สร้างหน้า /th, /en, /zh ไว้ล่วงหน้าตอน build (เป็น static ทั้งหมด)
export function generateStaticParams() {
    return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    if (!isLang(lang)) return {};

    const title = ui.metaTitle[lang];
    const description = ui.metaDescription[lang];
    const url = `${SITE_URL}/${lang}`;

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        alternates: {
            canonical: url,
            // บอก Google ว่าหน้านี้มีฉบับภาษาอื่นที่ URL ไหน
            languages: {
                ...Object.fromEntries(langs.map((l) => [htmlLang[l], `${SITE_URL}/${l}`])),
                "x-default": `${SITE_URL}/th`,
            },
        },
        openGraph: {
            type: "website",
            url,
            title,
            description,
            siteName: "Phuwadech (Aof)",
            locale: ogLocale[lang],
            alternateLocale: langs.filter((l) => l !== lang).map((l) => ogLocale[l]),
        },
        twitter: { card: "summary_large_image", title, description },
    };
}

// รันก่อน paint: ใส่ class .dark ตามที่เคยเลือกไว้ หรือตามค่าระบบ เพื่อไม่ให้จอขาวแวบ
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

export default async function RootLayout({ children, params }: Props) {
    const { lang } = await params;
    if (!isLang(lang)) notFound();

    return (
        <html
            lang={htmlLang[lang]}
            className={`${plexThai.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
            suppressHydrationWarning
        >
            <head>
                <InlineScript html={themeInit} />
            </head>
            <body className="overflow-x-hidden">{children}</body>
        </html>
    );
}
