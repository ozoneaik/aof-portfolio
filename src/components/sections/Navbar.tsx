import { ui, type Lang } from "@/data/portfolio";
import { NavbarClient } from "@/components/ui/NavbarClient";

// ลำดับเมนูบน Navbar (id ต้องตรงกับ id ของแต่ละ section)
const sections = ["services", "about", "experience", "projects", "skills", "contact"] as const;

// ส่วนนี้เป็น Server Component: แปลข้อความให้เสร็จแล้วค่อยส่งให้ฝั่ง client
// ฝั่ง browser จึงไม่ต้องโหลดข้อความทั้ง 3 ภาษา
export function Navbar({ lang }: { lang: Lang }) {
    return (
        <NavbarClient
            lang={lang}
            links={sections.map((id) => ({ id, label: ui.nav[id][lang] }))}
            labels={{
                contact: ui.ctaContact[lang],
                menu: ui.menu[lang],
                language: ui.language[lang],
                themeLight: ui.themeLight[lang],
                themeDark: ui.themeDark[lang],
            }}
        />
    );
}
