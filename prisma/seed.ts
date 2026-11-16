/**
 * ใส่ข้อมูลผลงานทั้งหมดลง database (รันซ้ำได้: ลบของเดิมแล้วใส่ใหม่ทุกครั้ง)
 *
 * วิธีรัน: npx prisma db seed
 *
 * ที่มาของข้อมูล
 * - ลิงก์ GitHub / เว็บไซต์ / รูป preview + คำอธิบายรูป → อ่านจาก project_list.json
 * - ชื่อ คำอธิบาย 3 ภาษา, ประเภท, tag, ผลลัพธ์ → อยู่ในรายการ projects ด้านล่าง
 *   (ภาษาไทยใช้ description จาก project_list.json ก่อน ถ้าไม่ว่าง)
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { prisma } from "../src/lib/prisma";

type T = { th: string; en: string; zh: string };
const locales = ["th", "en", "zh"] as const;

type ProjectSeed = {
    slug: string;
    /** ชื่อ projectName ใน project_list.json (ถ้าไม่มี = โปรเจกต์ที่ไม่มีลิงก์และรูป) */
    jsonName?: string;
    category: "work" | "personal";
    featured: boolean;
    tags: string[];
    title: T;
    description: T;
    impacts?: T[];
    /** หน้าที่ของผมในโปรเจกต์นี้ (แสดงเป็น "หน้าที่ของผม") */
    role?: T;
};

/** รูปแบบข้อมูลใน project_list.json */
type JsonProject = {
    projectName: string;
    description: string;
    link: {
        github: string | null;
        website: string | null;
        preview: { url: string; caption: T }[];
    };
};

// เรียงตามลำดับที่จะแสดงบนหน้าเว็บ (ใช้เป็น sort_order)
const projects: ProjectSeed[] = [
    {
        slug: "callcenter-system-pk",
        jsonName: "callcenter-system-pk",
        category: "work",
        featured: true,
        tags: ["React", "Laravel", "PostgreSQL", "MySQL", "WebSocket"],
        title: { th: "ระบบรวมแชทหลายแพลตฟอร์ม", en: "Omni-Channel Chat Platform", zh: "全渠道聊天平台" },
        description: { th: "รวมแชทจาก Lazada, Shopee, Facebook และ LINE ผ่าน webhook มาตอบในระบบเดียวแบบเรียลไทม์ มีรายงานการตอบแชทเพื่อประเมิน KPI และบอทตอบคำถามทั่วไป", en: "Unifies Lazada, Shopee, Facebook and LINE chats via webhooks into one real-time inbox, with response reports for KPI evaluation and an FAQ bot.", zh: "通过 Webhook 将 Lazada、Shopee、Facebook 和 LINE 的消息汇集到一个实时收件箱，提供用于 KPI 考核的回复报表和常见问题机器人。" },
        impacts: [
            { th: "รวม 4 แพลตฟอร์มแชทไว้ในระบบเดียว", en: "4 chat platforms in one inbox", zh: "4 个聊天平台统一到一个收件箱" },
            { th: "ใช้งานจริงโดยทีม Customer Service, Marketing และ Sales รวมประมาณ 5–10 คน", en: "Used daily by Customer Service, Marketing and Sales — around 5–10 staff", zh: "客服、市场和销售团队约 5–10 人日常使用" },
        ],
        role: { th: "พัฒนาทั้งหน้าบ้าน (React) และหลังบ้าน (Laravel) เชื่อม webhook ของแต่ละแพลตฟอร์ม และทำแชทเรียลไทม์ผ่าน WebSocket", en: "Built both the React frontend and Laravel backend, integrated each platform's webhooks and implemented real-time chat over WebSocket.", zh: "负责 React 前端与 Laravel 后端开发，对接各平台 Webhook，并通过 WebSocket 实现实时聊天。" },
    },
    {
        slug: "service-center-pk",
        jsonName: "service-center(pk)",
        category: "work",
        featured: true,
        tags: ["React", "Laravel", "Inertia", "PostgreSQL", "MySQL"],
        title: { th: "ระบบแจ้งซ่อม + สั่งซื้ออะไหล่", en: "Repair Request & Parts Ordering", zh: "报修与配件订购系统" },
        description: { th: "ระบบแจ้งซ่อมพร้อมระบบสั่งซื้ออะไหล่ ตั้งแต่เลือกสินค้าจนถึงจัดส่ง ใช้ React กับ Laravel ในโปรเจคเดียวผ่าน Inertia", en: "Repair ticketing with a built-in parts ordering flow from selection to delivery — React and Laravel in a single codebase via Inertia.", zh: "报修工单系统，内置从选购到发货的配件订购流程；通过 Inertia 将 React 与 Laravel 整合在同一项目中。" },
        impacts: [{ th: "ใช้งานจริงกับร้านค้าที่ร่วมกับบริษัทประมาณ 20 ร้าน และเพิ่มขึ้นเรื่อย ๆ", en: "In production with around 20 partner shops, and growing", zh: "已有约 20 家合作门店在使用，且持续增加" }],
        role: { th: "พัฒนาระบบแจ้งซ่อมและสั่งซื้ออะไหล่ทั้งหน้าบ้านและหลังบ้านด้วย React + Laravel (Inertia)", en: "Developed the repair-request and parts-ordering flows end to end with React + Laravel (Inertia).", zh: "使用 React + Laravel（Inertia）完成报修与配件订购流程的前后端开发。" },
    },
    {
        slug: "ai-image",
        category: "work",
        featured: false,
        tags: ["Python", "Machine Learning", "scikit-learn"],
        title: { th: "AI คัดกรองรูปภาพ", en: "AI Image Screening Model", zh: "AI 图片筛查模型" },
        description: { th: "โมเดล Machine Learning (scikit-learn) ทำงานร่วมกับระบบรวมแชท ตรวจสอบรูปที่ลูกค้าส่งเข้ามาว่าเป็นภาพสวัสดีวันจันทร์ หรือภาพไม่เหมาะสม (NSFW) หรือไม่", en: "A machine-learning model (scikit-learn) that works with the omni-channel chat platform to classify incoming customer images — flagging greeting images and inappropriate (NSFW) content.", zh: "基于 scikit-learn 的机器学习模型，与全渠道聊天平台配合使用，自动识别客户发送的图片是否为问候图或不当（NSFW）内容。" },
        role: { th: "เทรนโมเดลจำแนกรูปด้วย scikit-learn และเชื่อมผลลัพธ์เข้ากับระบบรวมแชท", en: "Trained the image classifier with scikit-learn and wired its results into the chat platform.", zh: "使用 scikit-learn 训练图片分类模型，并将结果接入聊天平台。" },
    },
    {
        slug: "leave-manage-system",
        jsonName: "leave-manage-system",
        category: "work",
        featured: false,
        tags: ["React", "Laravel", "PostgreSQL"],
        title: { th: "ระบบจัดการการลา", en: "Leave Management System", zh: "请假管理系统" },
        description: { th: "ผลงานช่วงฝึกงานที่ Big Data Agency — ระบบการลาของพนักงาน ตั้งแต่กรอกใบลาจนถึงขั้นตอนการอนุมัติและเซ็นเอกสาร", en: "Internship project at Big Data Agency — employee leave workflow from request submission through multi-step approval and sign-off.", zh: "在 Big Data Agency 实习期间的项目——员工请假流程，从提交申请到多级审批与签核。" },
        role: { th: "ร่วมพัฒนากับทีมช่วงฝึกงาน ทั้งหน้าจอ React และ API ฝั่ง Laravel", en: "Worked with the dev team during my internship on both the React screens and the Laravel API.", zh: "实习期间与开发团队合作，负责 React 页面与 Laravel API。" },
    },
    {
        slug: "qc-incentive",
        category: "work",
        featured: false,
        tags: ["Laravel", "React", "PostgreSQL"],
        title: { th: "ระบบ Incentive QC", en: "QC Incentive System", zh: "QC 绩效奖金系统" },
        description: { th: "คำนวณค่าตอบแทนพิเศษรายเดือนให้กับพนักงานที่เกี่ยวข้องโดยอัตโนมัติ", en: "Automatically calculates monthly incentive pay for QC staff.", zh: "自动计算相关员工每月的绩效奖金。" },
        impacts: [{ th: "ฝ่าย HR 1–3 คนใช้คำนวณ incentive ทุกเดือน", en: "Used monthly by 1–3 HR staff to calculate incentives", zh: "HR 部门 1–3 人每月用于计算奖金" }],
        role: { th: "พัฒนาระบบคำนวณ incentive และหน้าจอสำหรับฝ่าย HR", en: "Built the incentive calculation logic and the screens HR uses.", zh: "开发奖金计算逻辑及 HR 使用的页面。" },
    },
    {
        slug: "warranty",
        category: "work",
        featured: false,
        tags: ["WordPress", "React", "Laravel", "Inertia"],
        title: { th: "ระบบลงทะเบียนรับประกันสินค้า", en: "Product Warranty Registration", zh: "产品保修登记系统" },
        description: { th: "พัฒนาบน WordPress และแยกเว็บสำหรับลูกค้าประเทศเพื่อนบ้านด้วย React + Laravel ผ่าน Inertia", en: "Built on WordPress, plus a separate site for neighboring-country customers using React + Laravel via Inertia.", zh: "基于 WordPress 开发，并使用 React + Laravel（Inertia）为周边国家客户单独搭建网站。" },
        role: { th: "พัฒนาเว็บลงทะเบียนบน WordPress และเว็บสำหรับลูกค้าต่างประเทศด้วย React + Laravel", en: "Built the WordPress registration site and the React + Laravel site for overseas customers.", zh: "开发 WordPress 登记网站以及面向海外客户的 React + Laravel 网站。" },
    },
    {
        slug: "machub",
        jsonName: "macHub",
        category: "personal",
        featured: false,
        tags: ["Swift", "macOS"],
        title: { th: "MacHub — แอปบน macOS", en: "MacHub — macOS Utility", zh: "MacHub — macOS 工具" },
        description: { th: "แอปส่วนตัวบน MacBook: จำกัดการชาร์จแบต, โหมดล็อกคีย์บอร์ดเพื่อทำความสะอาด, clipboard, เช็คแรม, ดูอุณหภูมิ, color picker", en: "Personal Mac toolkit: battery charge limit, keyboard-cleaning lock, clipboard history, RAM & temperature monitor, color picker.", zh: "个人 Mac 工具箱：电池充电上限、清洁键盘锁定模式、剪贴板、内存与温度监控、取色器。" },
        impacts: [{ th: "6 เครื่องมือในแอปเดียว", en: "6 tools in one app", zh: "一个应用集成 6 个工具" }],
        role: { th: "ออกแบบและพัฒนาเองทั้งหมดด้วย Swift", en: "Designed and built solo in Swift.", zh: "独立使用 Swift 设计并开发。" },
    },
    {
        slug: "stock-management",
        jsonName: "stock-management",
        category: "personal",
        featured: false,
        tags: ["Next.js", "Prisma", "TiDB"],
        title: { th: "ระบบสต็อกสินค้า", en: "Inventory Management", zh: "库存管理系统" },
        description: { th: "จัดการสต็อกสินค้าสำหรับธุรกิจครอบครัว", en: "Stock management for my family's business.", zh: "为家族生意管理商品库存。" },
        role: { th: "ออกแบบและพัฒนาเองทั้งหมด ตั้งแต่ฐานข้อมูลจนถึง deploy บน Vercel", en: "Designed and built solo — from the database schema to deployment on Vercel.", zh: "独立完成从数据库设计到部署至 Vercel 的全部工作。" },
    },
];

async function main() {
    const list: JsonProject[] = JSON.parse(readFileSync(join(process.cwd(), "project_list.json"), "utf8"));

    // ล้างข้อมูลเดิม: ลบ projects แล้วตาราง translations / images / project_tags ถูกลบตาม (onDelete: Cascade)
    await prisma.project.deleteMany();
    await prisma.tag.deleteMany();

    for (const [index, p] of projects.entries()) {
        const json = p.jsonName ? list.find((x) => x.projectName === p.jsonName) : undefined;
        if (p.jsonName && !json) throw new Error(`ไม่พบ "${p.jsonName}" ใน project_list.json`);

        const images = json?.link.preview ?? [];
        // รูปหน้าปก = รูปที่ชื่อไฟล์มีคำว่า main ถ้าไม่มีใช้รูปแรก
        const coverIndex = Math.max(
            0,
            images.findIndex((img) => /(^|[_-])main\./.test(img.url.split("/").pop() ?? "")),
        );

        await prisma.project.create({
            data: {
                slug: p.slug,
                category: p.category,
                featured: p.featured,
                sortOrder: index,
                githubUrl: json?.link.github ?? null,
                // ลิงก์ของงานบริษัทเก็บไว้ใน DB ตามเดิม แต่ getProjects จะไม่ส่งออกไปแสดง (ดู confidential ใน src/lib/projects.ts)
                websiteUrl: json?.link.website ?? null,
                // ข้อความ 3 ภาษา = 3 แถวใน project_translations
                translations: {
                    create: locales.map((locale) => ({
                        locale,
                        title: p.title[locale],
                        description: locale === "th" && json?.description ? json.description : p.description[locale],
                        impacts: p.impacts?.map((impact) => impact[locale]),
                        role: p.role?.[locale],
                    })),
                },
                // รูปเรียงตามลำดับใน JSON
                images: {
                    create: images.map((img, i) => ({
                        url: img.url,
                        caption: img.caption,
                        sortOrder: i,
                        isCover: i === coverIndex,
                    })),
                },
                // tag ที่มีอยู่แล้วใช้ตัวเดิม ถ้ายังไม่มีสร้างใหม่ (ชื่อห้ามซ้ำ)
                tags: {
                    create: p.tags.map((name) => ({
                        tag: { connectOrCreate: { where: { name }, create: { name } } },
                    })),
                },
            },
        });
        console.log(`✔ ${p.slug} (${images.length} รูป)`);
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
