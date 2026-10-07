export const langs = ["th", "en", "zh"] as const;
export type Lang = (typeof langs)[number];
export const langLabel: Record<Lang, string> = { th: "TH", en: "EN", zh: "中" };
type T = Record<Lang, string>;

export const profile = {
    name: { th: "ภูวเดช พาณิชยโสภา", en: "Phuwadech Panichayasopa", zh: "Phuwadech Panichayasopa" } as T,
    nickname: "Aof",
    role: { th: "Full-Stack Web Developer", en: "Full-Stack Web Developer", zh: "全栈 Web 开发工程师" } as T,
    tagline: {
        th: "นักพัฒนาเว็บที่ชอบสร้างระบบที่ใช้งานได้จริง ตั้งแต่ระบบภายในองค์กร แชทเรียลไทม์ ไปจนถึงแอปบน macOS",
        en: "A web developer who loves building systems people actually use — from internal tools and real-time chat to native macOS apps.",
        zh: "热爱打造真正实用系统的 Web 开发者——从企业内部系统、实时聊天到原生 macOS 应用。",
    } as T,
    location: { th: "น่าน, ประเทศไทย", en: "Nan, Thailand", zh: "泰国 难府" } as T,
    status: {
        th: "พร้อมเริ่มงาน หลังปลดประจำการ 1 พ.ย. 2569",
        en: "Available from Nov 1, 2026 (after military service)",
        zh: "2026 年 11 月 1 日起可入职（服兵役结束后）",
    } as T,
    email: "aofphuwadech@gmail.com",
    phone: "093-162-2330",
    phoneRaw: "0931622330",
    photo: "/profile.jpg",
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
    { id: "reddit", label: "Reddit", handle: "u/ozoneaik", url: "https://www.reddit.com/user/ozoneaik" },
] as const;

export const education = [
    {
        school: { th: "มหาวิทยาลัยพะเยา", en: "University of Phayao", zh: "帕尧大学" } as T,
        level: { th: "ปริญญาตรี", en: "Bachelor's Degree", zh: "学士学位" } as T,
        gpa: "3.32",
        logo: "/University_of_Phayao.svg",
    },
    {
        school: { th: "โรงเรียนบ่อเกลือ", en: "Bo Kluea School", zh: "博格鲁中学" } as T,
        level: { th: "มัธยมศึกษาตอนต้น–ปลาย", en: "Secondary School", zh: "初中至高中" } as T,
        gpa: "3.20",
        logo: "/bokluea.png",
    },
];

export const experience: {
    period: T;
    title: T;
    org: T;
    desc: T;
    logo?: string;
    /** zoom for logos whose image file has wide empty margins */
    logoZoom?: number;
}[] = [
    {
        period: { th: "2568 – 2569", en: "2025 – 2026", zh: "2025 – 2026" },
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
        title: { th: "Programmer", en: "Programmer", zh: "程序员" },
        org: {
            th: "Pumpkin Corporation Co., Ltd.",
            en: "Pumpkin Corporation Co., Ltd.",
            zh: "Pumpkin Corporation Co., Ltd.",
        },
        logo: "/Pumpkin.webp",
        logoZoom: 1.6,
        desc: {
            th: "พัฒนาระบบภายในองค์กรหลายระบบ เช่น ระบบรวมแชทหลายแพลตฟอร์ม ระบบแจ้งซ่อม ระบบรับประกันสินค้า และระบบ incentive ด้วย Laravel, React และ PostgreSQL",
            en: "Built multiple internal systems — omni-channel chat, repair requests, warranty registration and QC incentives — with Laravel, React and PostgreSQL.",
            zh: "使用 Laravel、React 和 PostgreSQL 开发多个企业内部系统，包括全渠道聊天、报修、产品保修登记和 QC 绩效奖金系统。",
        },
    },
    {
        period: { th: "2565 – 2566", en: "2022 – 2023", zh: "2022 – 2023" },
        title: { th: "Web Developer (ฝึกงาน)", en: "Web Developer Intern", zh: "Web 开发实习生" },
        org: { th: "Big Data Agency, เชียงใหม่", en: "Big Data Agency, Chiang Mai", zh: "Big Data Agency（清迈）" },
        logo: "/big-data-agency.png",
        logoZoom: 1.35,
        desc: {
            th: "ฝึกงานในตำแหน่งนักพัฒนาเว็บ พัฒนาระบบจัดการการลาของพนักงานด้วย Laravel และ PostgreSQL ร่วมกับทีมพัฒนา",
            en: "Web development internship — built an employee leave management system with Laravel and PostgreSQL alongside the dev team.",
            zh: "担任 Web 开发实习生，与开发团队一起使用 Laravel 和 PostgreSQL 开发员工请假管理系统。",
        },
    },
];

export type Project = {
    title: T;
    desc: T;
    tags: string[];
    featured?: boolean;
    /** measurable results, shown on the card and in the detail dialog */
    impact?: T[];
    /** longer write-up shown only in the detail dialog */
    details?: T;
    /** what you did on the project */
    role?: T;
    /** screenshot in public/, shown in the detail dialog */
    image?: string;
};

export const projects: Project[] = [
    {
        title: { th: "ระบบรวมแชทหลายแพลตฟอร์ม", en: "Omni-Channel Chat Platform", zh: "全渠道聊天平台" },
        desc: {
            th: "รวมแชทจาก Lazada, Shopee, Facebook และ LINE ผ่าน webhook มาตอบในระบบเดียวแบบเรียลไทม์ มีรายงานการตอบแชทเพื่อประเมิน KPI และบอทตอบคำถามทั่วไป",
            en: "Unifies Lazada, Shopee, Facebook and LINE chats via webhooks into one real-time inbox, with response reports for KPI evaluation and an FAQ bot.",
            zh: "通过 Webhook 将 Lazada、Shopee、Facebook 和 LINE 的消息汇集到一个实时收件箱，提供用于 KPI 考核的回复报表和常见问题机器人。",
        },
        tags: ["React", "Laravel", "Socket.io", "Broadcasting", "PostgreSQL", "MySQL"],
        featured: true,
        impact: [
            {
                th: "รวม 4 แพลตฟอร์มแชทไว้ในระบบเดียว",
                en: "4 chat platforms in one inbox",
                zh: "4 个聊天平台统一到一个收件箱",
            },
        ],
    },
    {
        title: { th: "AI คัดกรองรูปภาพ", en: "AI Image Screening Model", zh: "AI 图片筛查模型" },
        desc: {
            th: "โมเดล AI ทำงานร่วมกับระบบแชท ตรวจสอบรูปที่ลูกค้าส่งเข้ามาว่าเป็นภาพสวัสดีวันจันทร์ หรือภาพ 18+ หรือไม่",
            en: "Works alongside the chat platform to classify incoming customer images — flagging greeting images and 18+ content.",
            zh: "与聊天平台配合使用，自动识别客户发送的图片是否为问候图或 18+ 内容。",
        },
        tags: ["Python", "AI / ML"],
        featured: true,
    },
    {
        title: { th: "ระบบแจ้งซ่อม + สั่งซื้ออะไหล่", en: "Repair Request & Parts Ordering", zh: "报修与配件订购系统" },
        desc: {
            th: "ระบบแจ้งซ่อมพร้อมระบบสั่งซื้ออะไหล่ ตั้งแต่เลือกสินค้าจนถึงจัดส่ง ใช้ React กับ Laravel ในโปรเจคเดียวผ่าน Inertia",
            en: "Repair ticketing with a built-in parts ordering flow from selection to delivery — React and Laravel in a single codebase via Inertia.",
            zh: "报修工单系统，内置从选购到发货的配件订购流程；通过 Inertia 将 React 与 Laravel 整合在同一项目中。",
        },
        tags: ["React", "Laravel", "Inertia"],
    },
    {
        title: { th: "ระบบจัดการการลา", en: "Leave Management System", zh: "请假管理系统" },
        desc: {
            th: "ผลงานช่วงฝึกงานที่ Big Data Agency — ระบบการลาของพนักงาน ตั้งแต่กรอกใบลาจนถึงขั้นตอนการอนุมัติและเซ็นเอกสาร",
            en: "Internship project at Big Data Agency — employee leave workflow from request submission through multi-step approval and sign-off.",
            zh: "在 Big Data Agency 实习期间的项目——员工请假流程，从提交申请到多级审批与签核。",
        },
        tags: ["Laravel", "PostgreSQL"],
    },
    {
        title: { th: "ระบบ Incentive QC", en: "QC Incentive System", zh: "QC 绩效奖金系统" },
        desc: {
            th: "คำนวณค่าตอบแทนพิเศษรายเดือนให้กับพนักงานที่เกี่ยวข้องโดยอัตโนมัติ",
            en: "Automatically calculates monthly incentive pay for QC staff.",
            zh: "自动计算相关员工每月的绩效奖金。",
        },
        tags: ["Laravel", "React", "PostgreSQL"],
    },
    {
        title: { th: "ระบบลงทะเบียนรับประกันสินค้า", en: "Product Warranty Registration", zh: "产品保修登记系统" },
        desc: {
            th: "พัฒนาบน WordPress และแยกเว็บสำหรับลูกค้าประเทศเพื่อนบ้านด้วย React + Laravel ผ่าน Inertia",
            en: "Built on WordPress, plus a separate site for neighboring-country customers using React + Laravel via Inertia.",
            zh: "基于 WordPress 开发，并使用 React + Laravel（Inertia）为周边国家客户单独搭建网站。",
        },
        tags: ["WordPress", "React", "Laravel", "Inertia"],
    },
    {
        title: { th: "MacHub — แอปบน macOS", en: "MacHub — macOS Utility", zh: "MacHub — macOS 工具" },
        desc: {
            th: "แอปส่วนตัวบน MacBook: จำกัดการชาร์จแบต, โหมดล็อกคีย์บอร์ดเพื่อทำความสะอาด, clipboard, เช็คแรม, ดูอุณหภูมิ, color picker",
            en: "Personal Mac toolkit: battery charge limit, keyboard-cleaning lock, clipboard history, RAM & temperature monitor, color picker.",
            zh: "个人 Mac 工具箱：电池充电上限、清洁键盘锁定模式、剪贴板、内存与温度监控、取色器。",
        },
        tags: ["Swift", "macOS"],
        impact: [{ th: "6 เครื่องมือในแอปเดียว", en: "6 tools in one app", zh: "一个应用集成 6 个工具" }],
    },
    {
        title: { th: "ระบบสต็อกสินค้า", en: "Inventory Management", zh: "库存管理系统" },
        desc: {
            th: "จัดการสินค้าที่ขายบนหลายแพลตฟอร์ม สำหรับธุรกิจครอบครัว",
            en: "Tracks stock sold across multiple marketplaces for the family business.",
            zh: "为家族生意管理在多个电商平台销售的商品库存。",
        },
        tags: ["Next.js"],
    },
];

export type ScreenKind = "chat" | "ai" | "repair" | "macos";

/** projects shown on the 3D laptop screen in the scroll showcase, in order */
export const showcase: { project: Project; screen: ScreenKind }[] = [
    { project: projects[0], screen: "chat" },
    { project: projects[1], screen: "ai" },
    { project: projects[2], screen: "repair" },
    { project: projects[6], screen: "macos" },
];

export const skills: { group: T; items: string[] }[] = [
    {
        group: { th: "ภาษา & Framework", en: "Languages & Frameworks", zh: "语言与框架" },
        items: ["TypeScript", "JavaScript", "PHP", "Python", "Swift", "React", "Next.js", "Laravel", "Flutter", "Tailwind", "Bootstrap 5", "HTML", "CSS"],
    },
    {
        group: { th: "ฐานข้อมูล", en: "Databases", zh: "数据库" },
        items: ["PostgreSQL", "MySQL", "TiDB", "Prisma ORM", "Eloquent ORM", "HeidiSQL", "Navicat", "pgAdmin"],
    },
    {
        group: { th: "DevOps & Hosting", en: "DevOps & Hosting", zh: "DevOps 与部署" },
        items: ["Docker", "Nginx", "Apache", "Cloudflare", "Vercel", "Netlify", "Hostinger"],
    },
    {
        group: { th: "เครื่องมือ", en: "Tools", zh: "工具" },
        items: ["VS Code", "WebStorm", "PhpStorm", "WordPress", "Figma", "Word", "Excel"],
    },
    {
        group: { th: "AI", en: "AI", zh: "AI" },
        items: ["Claude", "ChatGPT", "Gemini", "Ollama"],
    },
];

export const stats: { value: number; decimals?: number; suffix?: string; label: T }[] = [
    { value: 2, suffix: "+", label: { th: "ปีประสบการณ์ทำงาน", en: "Years of experience", zh: "年工作经验" } },
    { value: projects.length, label: { th: "โปรเจกต์ที่พัฒนา", en: "Projects built", zh: "个项目" } },
    {
        value: skills.reduce((n, s) => n + s.items.length, 0),
        label: { th: "ภาษา & เครื่องมือ", en: "Technologies & tools", zh: "项技术与工具" },
    },
    {
        value: Number(education[0].gpa),
        decimals: 2,
        label: { th: "เกรดเฉลี่ยปริญญาตรี", en: "Bachelor's GPA", zh: "本科 GPA" },
    },
];

export const ui = {
    nav: {
        about: { th: "เกี่ยวกับ", en: "About", zh: "关于" },
        experience: { th: "ประสบการณ์", en: "Experience", zh: "经历" },
        projects: { th: "ผลงาน", en: "Projects", zh: "项目" },
        skills: { th: "ทักษะ", en: "Skills", zh: "技能" },
        contact: { th: "ติดต่อ", en: "Contact", zh: "联系" },
    },
    hi: { th: "สวัสดีครับ ผมชื่อ", en: "Hi, I'm", zh: "你好，我是" },
    ctaProjects: { th: "ดูผลงาน", en: "View Projects", zh: "查看项目" },
    ctaContact: { th: "ติดต่อผม", en: "Get in Touch", zh: "联系我" },
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
        th: "ผมเป็นนักพัฒนาเว็บ Full-Stack ที่มีประสบการณ์ทำงานจริงกว่า 2 ปี ถนัด Laravel + React + PostgreSQL ชอบแก้ปัญหาให้ทีมทำงานง่ายขึ้นด้วยระบบที่ออกแบบมาดี และสนุกกับการลองเทคโนโลยีใหม่ ๆ ทั้ง AI, LLM แบบ offline และการเขียนแอปบน macOS",
        en: "I'm a full-stack web developer with 2+ years of professional experience, most at home with Laravel + React + PostgreSQL. I enjoy making teams' work easier through well-designed systems, and love tinkering with new tech — AI, offline LLMs and native macOS apps.",
        zh: "我是一名全栈 Web 开发者，拥有 2 年以上的实际工作经验，擅长 Laravel + React + PostgreSQL。我喜欢通过设计良好的系统让团队工作更轻松，也乐于尝试新技术，包括 AI、本地离线 LLM 和 macOS 原生应用开发。",
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
    footer: {
        th: "สร้างด้วย Next.js + Tailwind CSS",
        en: "Built with Next.js + Tailwind CSS",
        zh: "使用 Next.js + Tailwind CSS 构建",
    },
    showcase: {
        eyebrow: { th: "Aof · Full-Stack", en: "Aof · Full-Stack", zh: "Aof · 全栈" },
        introTitle: { th: "สร้างเพื่อใช้งานจริง", en: "Built for real work.", zh: "为真实工作而打造。" },
        scrollHint: { th: "เลื่อนลงเพื่อดู", en: "Scroll to explore", zh: "向下滚动探索" },
        bootTitle: { th: "เปิดเครื่อง แล้วไปดูงานกัน", en: "Power on. Let's see the work.", zh: "开机，看看作品。" },
        skillsTitle: { th: "เบื้องหลังการทำงาน", en: "Under the hood.", zh: "深入内部。" },
        outroTitle: { th: "มาสร้างอะไรดี ๆ ด้วยกัน", en: "Let's build something great.", zh: "一起打造出色的作品。" },
    },
    themeLight: { th: "เปลี่ยนเป็นโหมดสว่าง", en: "Switch to light mode", zh: "切换到浅色模式" },
    themeDark: { th: "เปลี่ยนเป็นโหมดมืด", en: "Switch to dark mode", zh: "切换到深色模式" },
} satisfies Record<string, T | Record<string, T>>;
