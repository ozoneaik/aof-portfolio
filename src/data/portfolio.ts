// ภาษา/ชนิดข้อมูลพื้นฐานแยกไว้ใน lib/i18n.ts เพื่อให้ client component import ได้โดยไม่ต้องโหลดข้อมูลทั้งไฟล์นี้
import { type T } from "@/lib/i18n";
export { fill, isLang, langLabel, langs, type Lang, type T } from "@/lib/i18n";

/** โดเมนของเว็บ (ใช้ใน sitemap, canonical, hreflang และลิงก์พรีวิวตอนแชร์) — เปลี่ยนตรงนี้ที่เดียว */
export const SITE_URL = "https://aof-portfolio.vercel.app";

export const profile = {
    name: { th: "ภูวเดช พาณิชยโสภา", en: "Phuwadech Panichayasopa", zh: "Phuwadech Panichayasopa" } as T,
    nickname: "Aof",
    nameShort: { th: "ภูวเดช (อ๊อฟ)", en: "Phuwadech (Aof)", zh: "Phuwadech（Aof）" } as T,
    role: { th: "Full-Stack Web Developer", en: "Full-Stack Web Developer", zh: "全栈 Web 开发工程师" } as T,
    tagline: {
        th: "นักพัฒนาเว็บที่ชอบสร้างระบบที่ใช้งานได้จริง ตั้งแต่ระบบภายในองค์กร แชทเรียลไทม์ ไปจนถึงแอปบน macOS",
        en: "A web developer who loves building systems people actually use — from internal tools and real-time chat to native macOS apps.",
        zh: "热爱打造真正实用系统的 Web 开发者——从企业内部系统、实时聊天到原生 macOS 应用。",
    } as T,
    location: { th: "จตุจักร, กรุงเทพฯ", en: "Chatuchak, Bangkok", zh: "曼谷 乍都乍" } as T,
    status: {
        th: "พร้อมเริ่มงานทันที",
        en: "Available to start now",
        zh: "可立即入职",
    } as T,
    statusNote: {
        th: "ปลดประจำการแล้ว 1 พ.ย. 2569",
        en: "Military service completed Nov 1, 2026",
        zh: "已于 2026 年 11 月 1 日退役",
    } as T,
    email: "aofphuwadech@gmail.com",
    phone: "093-162-2330",
    phoneRaw: "0931622330",
    photo: "/profile3.webp",
    photos: [
        { src: "/profile3.webp", position: "50% 30%" },
        { src: "/profile2.jpg", position: "50% 72%" },
        { src: "/profile.jpg", position: "50% 30%" },
    ],
    // put the PDF files in public/cv/
    cv: {
        th: "/cv/phuwadech-cv-th.pdf",
        en: "/cv/phuwadech-cv-en.pdf",
        zh: "/cv/phuwadech-cv-en.pdf",
    } as T,
};

export const socials = [
    { id: "github", label: "GitHub", handle: "ozoneaik", url: "https://github.com/ozoneaik" },
    {
        id: "linkedin",
        label: "LinkedIn",
        handle: "phuwadech-panichaysopa",
        url: "https://www.linkedin.com/in/phuwadech-panichaysopa-b5b84a374",
    },
    { id: "facebook", label: "Facebook", handle: "Phuwadech.Aof", url: "https://www.facebook.com/Phuwadech.Aof" },
] as const;

export const education = [
    {
        school: { th: "มหาวิทยาลัยพะเยา", en: "University of Phayao", zh: "帕尧大学" } as T,
        level: {
            th: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์",
            en: "B.Eng. in Computer Engineering",
            zh: "计算机工程 工学学士",
        } as T,
        gpa: "3.22",
        logo: "/University_of_Phayao.svg",
    },
];

/** ประสบการณ์ เรียงตามเวลา: ฝึกงาน → งานประจำ → รับราชการทหาร */
export const experience: {
    period: T;
    title: T;
    org: T;
    desc: T;
    /** ผลงานเด่นในงานนี้ (แสดงเป็น bullet) */
    points?: T[];
    logo?: string;
    /** zoom for logos whose image file has wide empty margins */
    logoZoom?: number;
    /** "main" = งานหลัก (แสดงเด่นที่สุด), "military" = รับราชการทหาร (แสดงเป็นแถบสั้น ๆ) */
    kind?: "main" | "military";
}[] = [
        {
            period: { th: "2568 – 2569", en: "2025 – 2026", zh: "2025 – 2026" },
            kind: "military",
            title: { th: "รับราชการทหาร", en: "Military Service", zh: "服兵役" },
            org: { th: "กองทัพไทย", en: "Royal Thai Armed Forces", zh: "泰国皇家武装部队" },
            desc: {
                th: "เข้ารับราชการทหารตามหน้าที่ ปลดประจำการวันที่ 1 พฤศจิกายน 2569",
                en: "Completed mandatory military service. Discharged on November 1, 2026.",
                zh: "依法服兵役，于 2026 年 11 月 1 日退役。",
            },
        },
        {
            period: { th: "2566 – 2568", en: "2023 – 2025", zh: "2023 – 2025" },
            kind: "main",
            title: { th: "Programmer", en: "Programmer", zh: "程序员" },
            org: {
                th: "Pumpkin Corporation Co., Ltd.",
                en: "Pumpkin Corporation Co., Ltd.",
                zh: "Pumpkin Corporation Co., Ltd.",
            },
            logo: "/Pumpkin.webp",
            logoZoom: 1.6,
            desc: {
                th: "พัฒนาระบบภายในองค์กรที่ใช้งานจริงด้วย Laravel, React และ PostgreSQL",
                en: "Built production internal systems with Laravel, React and PostgreSQL.",
                zh: "使用 Laravel、React 和 PostgreSQL 开发并上线多个企业内部系统。",
            },
            points: [
                {
                    th: "ระบบรวมแชท Lazada, Shopee, Facebook และ LINE แบบเรียลไทม์ ใช้งานโดยทีม CS, Marketing และ Sales ประมาณ 5–10 คน",
                    en: "Real-time omni-channel chat (Lazada, Shopee, Facebook, LINE) used by ~5–10 CS, Marketing and Sales staff",
                    zh: "实时全渠道聊天系统（Lazada、Shopee、Facebook、LINE），客服、市场与销售约 5–10 人使用",
                },
                {
                    th: "ระบบแจ้งซ่อม + สั่งซื้ออะไหล่ ใช้งานกับร้านค้าที่ร่วมกับบริษัทประมาณ 20 ร้าน",
                    en: "Repair-request & parts-ordering system used by ~20 partner shops",
                    zh: "报修与配件订购系统，约 20 家合作门店使用",
                },
                {
                    th: "โมเดล AI คัดกรองรูปภาพ (scikit-learn) ทำงานร่วมกับระบบแชท",
                    en: "AI image-screening model (scikit-learn) integrated with the chat platform",
                    zh: "与聊天平台集成的 AI 图片筛查模型（scikit-learn）",
                },
                {
                    th: "ระบบคำนวณ Incentive QC สำหรับฝ่าย HR และระบบลงทะเบียนรับประกันสินค้า",
                    en: "QC incentive calculator for HR and a product warranty registration system",
                    zh: "HR 使用的 QC 奖金计算系统，以及产品保修登记系统",
                },
            ],
        },
        {
            period: { th: "2565 – 2566", en: "2022 – 2023", zh: "2022 – 2023" },
            title: { th: "Web Developer (ฝึกงาน)", en: "Web Developer Intern", zh: "Web 开发实习生" },
            org: { th: "Big Data Agency, เชียงใหม่", en: "Big Data Agency, Chiang Mai", zh: "Big Data Agency（清迈）" },
            logo: "/big-data-agency.png",
            logoZoom: 1.35,
            desc: {
                th: "ฝึกงานในตำแหน่งนักพัฒนาเว็บ พัฒนาระบบจัดการการลาของพนักงานด้วย React, Laravel และ PostgreSQL ร่วมกับทีมพัฒนา",
                en: "Web development internship — built an employee leave management system with React, Laravel and PostgreSQL alongside the dev team.",
                zh: "担任 Web 开发实习生，与开发团队一起使用 React、Laravel 和 PostgreSQL 开发员工请假管理系统。",
            },
        },
    ];

// ข้อมูลผลงาน (projects) ย้ายไปเก็บใน database แล้ว: ดู prisma/seed.ts และ src/lib/projects.ts

/** ทักษะที่ใช้ในงานจริง (แสดงเป็นการ์ด) */
export const skills: { group: T; items: string[] }[] = [
    {
        group: { th: "ภาษา & Framework", en: "Languages & Frameworks", zh: "语言与框架" },
        items: ["TypeScript", "JavaScript", "PHP", "Python", "Swift", "React", "Next.js", "Laravel", "Inertia", "Tailwind", "scikit-learn"],
    },
    {
        group: { th: "ฐานข้อมูล", en: "Databases", zh: "数据库" },
        items: ["PostgreSQL", "MySQL", "TiDB", "Prisma ORM", "Eloquent ORM"],
    },
    {
        group: { th: "Deploy, Server & Cloud", en: "Deploy, Server & Cloud", zh: "部署、服务器与云" },
        items: ["Docker", "Nginx", "Ubuntu Server", "AWS S3", "Cloudflare R2", "Vercel"],
    },
];

/** เครื่องมือที่เคยใช้ (แสดงเป็นแถวเล็กบรรทัดเดียว) */
export const otherSkills = [
    "Bootstrap 5",
    "Apache",
    "Windows Server",
    "Laravel Vapor",
    "Netlify",
    "Hostinger",
    "XAMPP",
    "WordPress",
    "Figma",
    "Ollama",
    "pgAdmin",
    "Navicat",
];

/** ทักษะด้านภาษา: level คือจำนวนจุดที่เติมสีจาก 5 จุด */
export const languages: { name: T; level?: T; label: T; flag: string; certificate?: string }[] = [
    {
        name: { th: "ภาษาไทย", en: "Thai", zh: "泰语" },
        level: { th: "ภาษาหลัก", en: "Native", zh: "母语" },
        label: {
            th: "สื่อสาร อ่าน เขียนได้คล่องแคล่ว",
            en: "Fluent in speaking, reading and writing",
            zh: "听说读写流利",
        },
        flag: "/flag-th.svg"
    },
    {
        name: { th: "ภาษาอังกฤษ", en: "English", zh: "英语" },
        // ไม่แสดงระดับ และไม่แปะใบรับรอง (ถ้าจะกลับมาใช้: certificate: "https://pub-24ef2c0a48694b08a123774483d7e950.r2.dev/CEFR.jpeg")
        label: {
            th: "สามารถอ่านคู่มือต่าง ๆ ได้",
            en: "Can read manuals and technical documentation",
            zh: "能阅读各类手册与技术文档",
        },
        flag: "/flag-us.svg"
    },
];

/** ตัวเลขในแบนเนอร์ "เกี่ยวกับผม" (นับขึ้นตอน scroll มาถึง) */
export const facts: {
    icon: "work" | "education" | "projects" | "location";
    /** ตัวเลข หรือ "projectCount" = จำนวนผลงานที่ดึงจาก database */
    value?: number | "projectCount";
    decimals?: number;
    prefix?: string;
    suffix?: string;
    unit?: T;
    text?: T;
    label: T;
}[] = [
        {
            icon: "work",
            prefix: "~",
            value: 2,
            unit: { th: "ปี", en: "years", zh: "年" },
            label: { th: "ประสบการณ์ทำงานจริง", en: "Professional experience", zh: "实际工作经验" },
        },
        {
            icon: "education",
            prefix: "GPA ",
            value: Number(education[0].gpa),
            decimals: 2,
            label: { th: "ปริญญาตรี ม.พะเยา", en: "Bachelor's, University of Phayao", zh: "帕尧大学 学士" },
        },
        {
            icon: "projects",
            value: "projectCount",
            unit: { th: "โปรเจกต์", en: "projects", zh: "个项目" },
            label: { th: "ระบบองค์กร & งานส่วนตัว", en: "Company & personal work", zh: "企业系统与个人作品" },
        },
        {
            icon: "location",
            text: profile.location,
            label: profile.status,
        },
    ];

export const skillCount = skills.reduce((n, s) => n + s.items.length, 0);

/** การ์ด 6 ช่องในส่วน "สิ่งที่ผมทำได้" */
export const services: {
    icon: "server" | "screen" | "database" | "chat" | "deploy" | "ai";
    tone: "blue" | "sky" | "amber";
    title: T;
    desc: T;
    tags: string;
}[] = [
        {
            icon: "server",
            tone: "blue",
            title: { th: "ระบบหลังบ้าน & API", en: "Backend & APIs", zh: "后端与 API" },
            desc: {
                th: "ออกแบบ API และ business logic ที่ดูแลต่อได้ง่าย",
                en: "APIs and business logic that are easy to maintain",
                zh: "设计易于维护的 API 与业务逻辑",
            },
            tags: "Laravel · PHP",
        },
        {
            icon: "screen",
            tone: "sky",
            title: { th: "หน้าเว็บ & Dashboard", en: "Web UI & Dashboards", zh: "网页与仪表盘" },
            desc: {
                th: "หน้าจอที่ใช้ง่าย รองรับมือถือ ทำงานลื่น",
                en: "Easy, responsive interfaces that feel fast",
                zh: "易用、适配手机、流畅的界面",
            },
            tags: "React · Next.js · Inertia",
        },
        {
            icon: "database",
            tone: "amber",
            title: { th: "ออกแบบฐานข้อมูล", en: "Database Design", zh: "数据库设计" },
            desc: {
                th: "วางโครงสร้างข้อมูลให้ถูกต้องและ query ได้เร็ว",
                en: "Correct data models with fast queries",
                zh: "结构正确、查询高效的数据模型",
            },
            tags: "PostgreSQL · MySQL · TiDB",
        },
        {
            icon: "chat",
            tone: "blue",
            title: { th: "แชท & เรียลไทม์", en: "Chat & Real-time", zh: "聊天与实时功能" },
            desc: {
                th: "เชื่อม webhook จากหลายแพลตฟอร์มเข้าระบบเดียว",
                en: "Webhooks from many platforms in one system",
                zh: "将多平台 Webhook 接入同一系统",
            },
            tags: "WebSocket · Webhook",
        },
        {
            icon: "deploy",
            tone: "sky",
            title: { th: "Deploy & DevOps", en: "Deploy & DevOps", zh: "部署与 DevOps" },
            desc: {
                th: "ขึ้นระบบจริงบน server และ cloud พร้อมใช้งาน",
                en: "Shipping to servers and the cloud, ready to use",
                zh: "部署到服务器与云端，随时可用",
            },
            tags: "Docker · Nginx · Ubuntu · AWS",
        },
        {
            icon: "ai",
            tone: "amber",
            title: { th: "AI & แอป macOS", en: "AI & macOS Apps", zh: "AI 与 macOS 应用" },
            desc: {
                th: "โมเดลคัดกรองรูปภาพ และแอปเครื่องมือบน Mac",
                en: "Image screening models and Mac utility apps",
                zh: "图片筛查模型与 Mac 工具应用",
            },
            tags: "Python · scikit-learn · Swift",
        },
    ];

/** เทคโนโลยีที่โชว์ในแถบใต้ Hero (ชื่อต้องตรงกับ key ใน skillIcon) */
export const techStrip = ["Laravel", "React", "Next.js", "PostgreSQL", "Docker", "Swift"];

/** เทคโนโลยีที่โชว์เป็นวงกลมซ้อนกันใน Hero */
export const heroStack = ["Laravel", "React", "PostgreSQL", "Next.js", "Swift"];

export const ui = {
    nav: {
        services: { th: "ทำอะไรได้บ้าง", en: "What I do", zh: "服务" },
        about: { th: "เกี่ยวกับ", en: "About", zh: "关于" },
        experience: { th: "ประสบการณ์", en: "Experience", zh: "经历" },
        projects: { th: "ผลงาน", en: "Projects", zh: "项目" },
        skills: { th: "ทักษะ", en: "Skills", zh: "技能" },
        contact: { th: "ติดต่อ", en: "Contact", zh: "联系" },
    },
    hi: { th: "สวัสดีครับ ผมชื่อ", en: "Hi, I'm", zh: "你好，我是" },
    ctaProjects: { th: "ดูผลงาน", en: "View Projects", zh: "查看项目" },
    ctaContact: { th: "ติดต่อ", en: "Get in Touch", zh: "联系我" },
    downloadCv: { th: "ดาวน์โหลด CV", en: "Download CV", zh: "下载简历" },
    copyEmail: { th: "คัดลอกอีเมล", en: "Copy email", zh: "复制邮箱" },
    copied: { th: "คัดลอกแล้ว", en: "Copied!", zh: "已复制" },
    viewDetails: { th: "ดูรายละเอียด", en: "View details", zh: "查看详情" },
    close: { th: "ปิด", en: "Close", zh: "关闭" },
    projectRole: { th: "หน้าที่ของผม", en: "My role", zh: "我的职责" },
    projectImpact: { th: "ผลลัพธ์", en: "Impact", zh: "成果" },
    projectStack: { th: "เทคโนโลยีที่ใช้", en: "Tech stack", zh: "技术栈" },
    aboutTitle: { th: "เกี่ยวกับผม", en: "About Me", zh: "关于我" },
    aboutBody: {
        th: "ผมเป็นนักพัฒนาเว็บ Full-Stack ที่มีประสบการณ์ทำงานจริงประมาณ 2 ปี ถนัด Laravel + React + PostgreSQL ชอบแก้ปัญหาให้ทีมทำงานง่ายขึ้นด้วยระบบที่ออกแบบมาดี และสนุกกับการลองเทคโนโลยีใหม่ ๆ ทั้ง AI, LLM แบบ offline และการเขียนแอปบน macOS",
        en: "I'm a full-stack web developer with about 2 years of professional experience, most at home with Laravel + React + PostgreSQL. I enjoy making teams' work easier through well-designed systems, and love tinkering with new tech — AI, offline LLMs and native macOS apps.",
        zh: "我是一名全栈 Web 开发者，拥有约 2 年的实际工作经验，擅长 Laravel + React + PostgreSQL。我喜欢通过设计良好的系统让团队工作更轻松，也乐于尝试新技术，包括 AI、本地离线 LLM 和 macOS 原生应用开发。",
    },
    education: { th: "การศึกษา", en: "Education", zh: "教育背景" },
    experienceTitle: { th: "ประสบการณ์ทำงาน", en: "Work Experience", zh: "工作经历" },
    projectsTitle: { th: "ผลงานที่ผ่านมา", en: "Selected Projects", zh: "项目作品" },
    skillsTitle: { th: "ทักษะ & เครื่องมือ", en: "Skills & Tools", zh: "技能与工具" },
    contactTitle: { th: "มาร่วมงานกัน", en: "Let's Work Together", zh: "期待与您合作" },
    contactBody: {
        th: "สนใจร่วมงาน หรืออยากพูดคุยเรื่องโปรเจค ติดต่อผมได้ทุกช่องทางครับ",
        en: "Open to new opportunities and project chats — reach out through any channel below.",
        zh: "欢迎洽谈工作机会或项目合作，可通过以下任意方式联系我。",
    },
    // ----- SEO -----
    metaTitle: {
        th: "ภูวเดช (อ๊อฟ) — Full-Stack Web Developer",
        en: "Phuwadech (Aof) — Full-Stack Web Developer",
        zh: "Phuwadech（Aof）— 全栈 Web 开发工程师",
    },
    metaDescription: {
        th: "Portfolio ของภูวเดช พาณิชยโสภา (อ๊อฟ) นักพัฒนาเว็บ Full-Stack ที่ถนัด Laravel, React, Next.js และ PostgreSQL",
        en: "Portfolio of Phuwadech Panichayasopa (Aof), a full-stack web developer working with Laravel, React, Next.js and PostgreSQL.",
        zh: "Phuwadech Panichayasopa（Aof）的作品集——擅长 Laravel、React、Next.js 与 PostgreSQL 的全栈 Web 开发工程师。",
    },
    // ----- Navbar -----
    menu: { th: "เมนู", en: "Menu", zh: "菜单" },
    language: { th: "ภาษา", en: "Language", zh: "语言" },
    // ----- Hero -----
    heroEyebrow: {
        th: "Full-Stack Web Developer",
        en: "Full-Stack Web Developer",
        zh: "全栈 Web 开发工程师",
    },
    // หัวข้อแบ่งเป็น 3 บรรทัด: line1 / line2Before + line2Highlight / line3
    heroLine1: { th: "สร้างระบบ", en: "Building systems", zh: "打造" },
    heroLine2Before: { th: "ที่คน", en: "people ", zh: "真正" },
    heroLine2Highlight: { th: "ใช้งาน", en: "actually use", zh: "好用" },
    heroLine3: { th: "ได้จริง", en: "every day", zh: "的系统" },
    heroLeadBefore: { th: "สวัสดีครับ ผม", en: "Hi, I'm", zh: "你好，我是" },
    heroLeadAfter: {
        th: "นักพัฒนาเว็บที่ชอบสร้างระบบที่ทีมใช้งานได้จริง ตั้งแต่ระบบภายในองค์กร แชทเรียลไทม์ ไปจนถึงแอปบน macOS",
        en: "— a web developer who loves building systems people actually use, from internal tools and real-time chat to native macOS apps.",
        zh: "，一名热爱打造实用系统的 Web 开发者——从企业内部系统、实时聊天到原生 macOS 应用。",
    },
    proofTitle: { th: "ประสบการณ์ทำงานจริงประมาณ 2 ปี", en: "~2 years of real-world experience", zh: "约 2 年实际工作经验" },
    proofSub: { th: "พัฒนาระบบมาแล้ว {n} โปรเจกต์", en: "{n} projects built so far", zh: "已开发 {n} 个项目" },
    cardStackLabel: { th: "ถนัดที่สุด", en: "Strongest at", zh: "最擅长" },
    cardChatBig: { th: "4 แพลตฟอร์ม", en: "4 platforms", zh: "4 个平台" },
    cardChatSub: {
        th: "ตอบลูกค้าได้ในหน้าเดียว แบบเรียลไทม์",
        en: "Every customer chat in one real-time inbox",
        zh: "在一个页面实时回复所有客户",
    },
    termHint: { th: "ลองพิมพ์ {cmd} ในนี้ดูครับ", en: "Try typing {cmd} in here", zh: "试着在这里输入 {cmd}" },
    photoSlide: { th: "รูปที่ {n}", en: "Photo {n}", zh: "第 {n} 张照片" },
    termLabel: { th: "พิมพ์คำสั่ง terminal", en: "Type a terminal command", zh: "输入终端命令" },
    // ปุ่มดำแบบ store badge ใน Hero
    badgeDownload: { th: "ดาวน์โหลด", en: "Download", zh: "下载" },
    badgeCvTh: { th: "CV ภาษาไทย", en: "CV (Thai)", zh: "简历（泰文）" },
    badgeCvEn: { th: "CV English", en: "CV (English)", zh: "简历（英文）" },
    badgeCodeOn: { th: "ดูโค้ดบน", en: "Code on", zh: "代码托管于" },
    // แผงผลงานใต้ Hero
    featuredProjects: { th: "ผลงานเด่น", en: "Featured work", zh: "精选项目" },
    // ประสบการณ์ / ทักษะ
    confidentialNote: {
        th: "ระบบและซอร์สโค้ดนี้เป็นทรัพย์สินของบริษัท จึงไม่สามารถเปิดเผยลิงก์ได้ ยินดีอธิบายรายละเอียดและแนวทางการพัฒนาในการสัมภาษณ์ครับ",
        en: "This system and its source code belong to the company, so links can't be shared publicly. Happy to walk through the details in an interview.",
        zh: "该系统及源代码属于公司资产，无法公开链接。欢迎在面试中详细介绍开发细节。",
    },
    latestJob: { th: "งานล่าสุด", en: "Latest role", zh: "最近职位" },
    skillsOther: { th: "เคยใช้งาน", en: "Also used", zh: "也用过" },
    // ----- แถบเทคโนโลยี -----
    techStripTitle: {
        th: "เทคโนโลยีที่ผมใช้ทำงานจริงทุกวัน",
        en: "The stack I use on real work every day",
        zh: "我日常工作中使用的技术",
    },
    // ----- สิ่งที่ผมทำได้ -----
    servicesTitle: {
        th: "ครบตั้งแต่หลังบ้าน หน้าบ้าน\nจนถึงขึ้นระบบจริง",
        en: "From backend and frontend\nall the way to production",
        zh: "从后端、前端\n到上线部署，一手包办",
    },
    // ----- แบนเนอร์เกี่ยวกับผม -----
    aboutHello: { th: "สวัสดีครับ ผมอ๊อฟ", en: "Hi, I'm Aof", zh: "你好，我是 Aof" },
    aboutCta: { th: "ดูประสบการณ์ทำงาน", en: "See my experience", zh: "查看工作经历" },
    // ----- ผลงาน -----
    filterAll: { th: "ทั้งหมด", en: "All", zh: "全部" },
    filterWork: { th: "งานบริษัท", en: "Company work", zh: "公司项目" },
    filterPersonal: { th: "งานส่วนตัว", en: "Personal", zh: "个人项目" },
    featured: { th: "เด่น", en: "Featured", zh: "精选" },
    screenshots: { th: "ภาพหน้าจอ {n} รูป", en: "{n} screenshots", zh: "{n} 张截图" },
    prevImage: { th: "รูปก่อนหน้า", en: "Previous image", zh: "上一张" },
    nextImage: { th: "รูปถัดไป", en: "Next image", zh: "下一张" },
    viewCode: { th: "ดูโค้ดบน GitHub", en: "View code on GitHub", zh: "在 GitHub 查看代码" },
    visitWebsite: { th: "เปิดเว็บไซต์", en: "Visit website", zh: "访问网站" },
    // ----- ทักษะ -----
    languagesTitle: { th: "ภาษา", en: "Languages", zh: "语言能力" },
    viewCertificate : { th: "ดูใบรับรอง", en: "View certificate", zh: "查看证书" },
    skillsCount: { th: "{n} อย่างที่ผมใช้ทำงาน", en: "{n} tools I work with", zh: "我常用的 {n} 项技术" },
    // ----- ติดต่อ -----
    contactNote: { th: "ส่งข้อความมาคุยกันได้เลยครับ", en: "Drop me a message anytime", zh: "随时欢迎留言联系" },
    emailLabel: { th: "อีเมล", en: "Email", zh: "邮箱" },
    orCall: { th: "หรือโทร", en: "or call", zh: "或致电" },
    sendEmail: { th: "ส่งอีเมลหาผม", en: "Send me an email", zh: "给我发邮件" },
    footer: {
        th: "สร้างด้วย Next.js + Tailwind CSS",
        en: "Built with Next.js + Tailwind CSS",
        zh: "使用 Next.js + Tailwind CSS 构建",
    },
    themeLight: { th: "เปลี่ยนเป็นโหมดสว่าง", en: "Switch to light mode", zh: "切换到浅色模式" },
    themeDark: { th: "เปลี่ยนเป็นโหมดมืด", en: "Switch to dark mode", zh: "切换到深色模式" },
    // ----- ข้อความใน terminal ที่พิมพ์คำสั่งได้ -----
    term: {
        helpTitle: { th: "คำสั่งที่ใช้ได้:", en: "Available commands:", zh: "可用命令：" },
        whoami: { th: "ผมคือใคร", en: "who am I", zh: "我是谁" },
        stack: { th: "เทคโนโลยีหลัก", en: "main stack", zh: "主要技术栈" },
        projects: { th: "ไปดูผลงาน", en: "jump to projects", zh: "查看项目" },
        contact: { th: "ช่องทางติดต่อ", en: "how to reach me", zh: "联系方式" },
        cv: { th: "ดาวน์โหลด CV", en: "download my CV", zh: "下载简历" },
        clear: { th: "ล้างหน้าจอ", en: "clear the screen", zh: "清屏" },
        goProjects: { th: "→ กำลังพาไปหน้าผลงาน...", en: "→ taking you to my projects...", zh: "→ 正在前往项目..." },
        goContact: { th: "✔ ยินดีมากครับ! พาไปหน้าติดต่อ...", en: "✔ Great! Taking you to contact...", zh: "✔ 太好了！正在前往联系方式..." },
        cvDone: { th: "✔ กำลังดาวน์โหลด CV...", en: "✔ Downloading CV...", zh: "✔ 正在下载简历..." },
        sudo: {
            th: "ขอโทษครับ คุณไม่มีสิทธิ์ sudo ในเครื่องผม 😄",
            en: "Nice try — you don't have sudo on my machine 😄",
            zh: "不好意思，你在我的电脑上没有 sudo 权限 😄",
        },
        notFound: { th: "ไม่พบคำสั่ง: {cmd} — ลองพิมพ์ help", en: "command not found: {cmd} — try help", zh: "未找到命令：{cmd} — 试试 help" },
        intro: { th: "# พิมพ์ help เพื่อดูคำสั่งทั้งหมด", en: "# type help to see all commands", zh: "# 输入 help 查看所有命令" },
    },
} satisfies Record<string, T | Record<string, T>>;
