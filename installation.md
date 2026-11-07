# Installation Guide — aof-portfolio

คู่มือติดตั้งและตั้งค่าเว็บ Portfolio ตั้งแต่ clone โปรเจกต์ไปจนถึง deploy ขึ้น Vercel

---

## 1. ภาพรวมระบบ

| ส่วน | เทคโนโลยี |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components) + React 19 |
| ภาษา | TypeScript |
| CSS | Tailwind CSS v4 |
| ฐานข้อมูล | TiDB Cloud (เข้ากันได้กับ MySQL) |
| ORM | Prisma 7 + `@prisma/adapter-mariadb` |
| เก็บรูปภาพ | Cloudflare R2 |
| Hosting | Vercel |

**ข้อมูลแต่ละส่วนเก็บไว้ที่ไหน**

- **ข้อมูลส่วนตัว ประสบการณ์ ทักษะ ข้อความบนเว็บ (3 ภาษา)** → `src/data/portfolio.ts`
- **ผลงาน (projects)** → ฐานข้อมูล TiDB (ใส่ข้อมูลด้วย `prisma/seed.ts` + `project_list.json`)
- **ภาพหน้าจอผลงาน / ใบรับรอง** → Cloudflare R2
- **CV (PDF)** → `public/cv/`

---

## 2. สิ่งที่ต้องมีก่อนติดตั้ง

- **Node.js 22 LTS ขึ้นไป** (แนะนำ Node.js 26 LTS)
  - Next.js 16 ต้องการ Node.js 20.9 ขึ้นไป
  - Prisma 7 ต้องการ Node.js 20.19+, 22.12+ หรือ 24+
  - เช็คเวอร์ชัน: `node -v`
- **npm** (มากับ Node.js)
- **Git**
- **บัญชี TiDB Cloud** พร้อม cluster ที่สร้างไว้แล้ว
- **บัญชี Cloudflare** ที่มี R2 bucket เปิด public access (สำหรับรูปผลงาน)
- **บัญชี Vercel** (ถ้าจะ deploy)

---

## 3. ติดตั้งโปรเจกต์

```bash
# 1) clone โปรเจกต์
git clone https://github.com/ozoneaik/aof-portfolio.git
cd aof-portfolio

# 2) ติดตั้ง package
npm install
```

> `npm install` จะรัน `prisma generate` ให้อัตโนมัติ (script `postinstall` ใน `package.json`)
> เพื่อสร้าง Prisma Client ไว้ที่โฟลเดอร์ `generated/prisma/` (โฟลเดอร์นี้ไม่ได้อยู่ใน git)

---

## 4. ตั้งค่า Environment Variables (`.env`)

คัดลอกไฟล์ตัวอย่างแล้วใส่ค่าจริง:

```bash
cp .env.example .env
```

| ตัวแปร | ใช้ที่ไหน | ตัวอย่าง | หมายเหตุ |
|---|---|---|---|
| `DATABASE_PROJECT` | Prisma CLI (`migrate`, `db seed`) | `mysql://xxxx.root:PASSWORD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/projects?sslaccept=strict` | ต้องมี `?sslaccept=strict` ต่อท้าย |
| `DATABASE_HOST` | หน้าเว็บ (Prisma Client) | `gateway01.ap-southeast-1.prod.aws.tidbcloud.com` | ไม่มี `https://` |
| `DATABASE_PORT` | หน้าเว็บ | `4000` | **ใส่ `4000` หรือลบบรรทัดนี้ทิ้ง** ห้ามเว้นว่าง (ดูข้อ 12) |
| `DATABASE_USER` | หน้าเว็บ | `xxxx.root` | ต้องมี prefix หน้า `.root` ตามที่ TiDB ให้มา |
| `DATABASE_PASSWORD` | หน้าเว็บ | `********` | |
| `DATABASE_NAME` | หน้าเว็บ | `projects` | |
| `IMAGE_URL` | `next.config.ts` (อนุญาตโดเมนรูป) | `pub-xxxxxxxx.r2.dev` | **ชื่อโดเมนอย่างเดียว** ไม่มี `https://` และไม่มี `/` ต่อท้าย ถ้าไม่ใส่ `npm run dev` จะ error ทันที |

**หาค่า TiDB ได้จากไหน:** TiDB Cloud console → เลือก cluster → ปุ่ม **Connect** → เลือก Connect With: `General`

**หาค่า `IMAGE_URL`:** Cloudflare dashboard → R2 → เลือก bucket → Settings → Public access → คัดลอกโดเมน `pub-xxxx.r2.dev`

> ⚠️ อย่า commit ไฟล์ `.env` ขึ้น git (มีอยู่ใน `.gitignore` แล้ว)

---

## 5. ตั้งค่าฐานข้อมูล

### 5.1 สร้างตาราง (ครั้งแรก)

```bash
npx prisma migrate dev --name init
```

คำสั่งนี้จะสร้าง 5 ตารางใน TiDB:

| ตาราง | เก็บอะไร |
|---|---|
| `projects` | ข้อมูลหลักของผลงาน (slug, ประเภท, ผลงานเด่น, ลิงก์ GitHub/เว็บ) |
| `project_translations` | ชื่อ/คำอธิบายผลงานแยกภาษา (th, en, zh) |
| `project_images` | รูปภาพหน้าจอ + คำอธิบายรูป 3 ภาษา |
| `tags` | เทคโนโลยี เช่น React, Laravel |
| `project_tags` | ตารางกลางเชื่อมผลงาน ↔ เทคโนโลยี |

> ถ้า database มีตารางเก่าที่ไม่ตรงกับ migration (เช่นตารางทดสอบ) Prisma จะถามให้ reset
> หรือสั่งล้างทั้งหมดเองด้วย `npx prisma migrate reset` (**ข้อมูลทุกตารางจะหายหมด**)

### 5.2 ใส่ข้อมูลผลงาน

```bash
npx prisma db seed
```

- อ่านลิงก์และรูปจาก `project_list.json` + ข้อความ 3 ภาษาจาก `prisma/seed.ts`
- **รันซ้ำได้ทุกเมื่อ** สคริปต์จะลบผลงานเดิมทั้งหมดแล้วใส่ใหม่
- ควรเห็นผลลัพธ์ `✔ callcenter-system-pk (7 รูป)` ... ครบ 8 บรรทัด

### 5.3 ดูข้อมูลในฐานข้อมูล (ไม่บังคับ)

```bash
npx prisma studio
```

เปิดหน้าเว็บจัดการข้อมูลที่ `http://localhost:5555`

---

## 6. รันโหมดพัฒนา

```bash
npm run dev
```

เปิด `http://localhost:3000` → ระบบจะพาไป `/th`, `/en` หรือ `/zh` อัตโนมัติตามภาษาของ browser
(ถ้าเคยกดเลือกภาษาไว้ จะจำค่าใน cookie `lang`)

---

## 7. ทดสอบแบบ production ในเครื่อง

```bash
npm run build   # build จริง (ตอน build จะดึงข้อมูลผลงานจาก TiDB ด้วย)
npm run start   # รันที่ http://localhost:3000
```

ตรวจโค้ดก่อน commit:

```bash
npx tsc --noEmit   # ตรวจ type
npm run lint       # ตรวจ ESLint
```

---

## 8. Deploy ขึ้น Vercel

### 8.1 เชื่อมโปรเจกต์

1. push โค้ดขึ้น GitHub
2. Vercel dashboard → **Add New → Project** → เลือก repo `aof-portfolio`
3. Framework Preset: **Next.js** (ค่าอื่นใช้ค่าเริ่มต้นได้เลย)

### 8.2 ตั้ง Environment Variables บน Vercel

**Settings → Environment Variables** ใส่ให้ครบ (ค่าเดียวกับ `.env`):

```
DATABASE_HOST
DATABASE_PORT        (4000)
DATABASE_USER
DATABASE_PASSWORD
DATABASE_NAME
IMAGE_URL
```

> `DATABASE_PROJECT` ไม่จำเป็นบน Vercel (ใช้เฉพาะคำสั่ง Prisma CLI บนเครื่องตัวเอง)
> ถ้าขาดตัวใดตัวหนึ่ง **build จะล้ม** เพราะตอน build ต้องต่อ TiDB และ `next.config.ts` ต้องใช้ `IMAGE_URL`

### 8.3 ตั้ง Region ใกล้ฐานข้อมูล

**Settings → Functions → Function Region** → เลือก **Singapore (sin1)**
ให้ใกล้กับ TiDB (ap-southeast-1) จะตอบสนองเร็วกว่า

### 8.4 ลำดับเมื่อแก้โครงสร้างตาราง

ถ้าแก้ `prisma/schema.prisma` ให้ทำบนเครื่องตัวเองก่อน deploy:

```bash
npx prisma migrate dev --name <ชื่อการเปลี่ยนแปลง>   # สร้าง migration ใหม่ + แก้ตารางใน TiDB
git add prisma/migrations prisma/schema.prisma
git commit -m "..." && git push                      # Vercel build ใหม่อัตโนมัติ
```

---

## 9. การอัปเดตเนื้อหา

| อยากแก้อะไร | แก้ที่ไหน | ต้องทำต่อ |
|---|---|---|
| ข้อมูลส่วนตัว, ประสบการณ์, ทักษะ, ภาษา, ข้อความ UI | `src/data/portfolio.ts` | commit + push |
| ลิงก์ GitHub/เว็บ, รูปภาพ, คำอธิบายรูปของผลงาน | `project_list.json` | `npx prisma db seed` |
| ชื่อ/คำอธิบาย 3 ภาษา, tag, ผลงานเด่น, ลำดับผลงาน | `prisma/seed.ts` | `npx prisma db seed` |
| เพิ่มรูปผลงานใหม่ | อัปโหลดเข้า R2 แล้วเพิ่มลิงก์ใน `project_list.json` | `npx prisma db seed` |
| CV | แทนที่ไฟล์ `public/cv/phuwadech-cv-th.pdf` และ `phuwadech-cv-en.pdf` | commit + push |
| รูปโปรไฟล์ | ไฟล์ใน `public/` + แก้ `profile.photo` ใน `src/data/portfolio.ts` | commit + push |

> **ข้อมูลผลงานมี cache 1 ชั่วโมง** (`"use cache"` + `cacheLife("hours")` ใน `src/lib/projects.ts`)
> หลัง seed แล้วหน้าเว็บจริงจะอัปเดตภายใน ~1 ชั่วโมง ไม่ต้อง deploy ใหม่
> ตอน `npm run dev` ให้รีสตาร์ทเพื่อเห็นข้อมูลใหม่ทันที

---

## 10. คำสั่งที่ใช้บ่อย

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | รันโหมดพัฒนา |
| `npm run build` | build production |
| `npm run start` | รันผลลัพธ์จาก build |
| `npm run lint` | ตรวจ ESLint |
| `npx tsc --noEmit` | ตรวจ TypeScript |
| `npx prisma generate` | สร้าง Prisma Client ใหม่ (หลังแก้ schema) |
| `npx prisma migrate dev --name <ชื่อ>` | สร้าง migration + แก้ตาราง |
| `npx prisma migrate reset` | ⚠️ ล้างทุกตารางแล้วสร้างใหม่ตาม migration |
| `npx prisma db seed` | ใส่ข้อมูลผลงานใหม่ทั้งหมด |
| `npx prisma studio` | เปิดหน้าจัดการข้อมูล |

---

## 11. โครงสร้างโฟลเดอร์ที่สำคัญ

```
aof-portfolio/
├── prisma/
│   ├── schema.prisma        # โครงสร้างตาราง
│   ├── migrations/          # ประวัติการแก้ตาราง (ต้อง commit)
│   └── seed.ts              # สคริปต์ใส่ข้อมูลผลงาน
├── prisma.config.ts         # ตั้งค่า Prisma CLI (อ่าน DATABASE_PROJECT, คำสั่ง seed)
├── project_list.json        # ลิงก์ + รูป + คำอธิบายรูปของผลงาน
├── generated/prisma/        # Prisma Client (สร้างอัตโนมัติ ไม่อยู่ใน git)
├── public/
│   ├── cv/                  # ไฟล์ CV (PDF)
│   └── ...                  # รูปโปรไฟล์ โลโก้
└── src/
    ├── proxy.ts             # พา "/" ไปหน้าภาษาที่เหมาะสม
    ├── app/
    │   ├── [lang]/          # หน้าเว็บแยกตามภาษา (/th, /en, /zh)
    │   ├── sitemap.ts       # /sitemap.xml
    │   └── robots.ts        # /robots.txt
    ├── components/
    │   ├── sections/        # แต่ละส่วนของหน้า (Hero, ประสบการณ์, ผลงาน ...)
    │   └── ui/              # component ย่อย (terminal, gallery, ...)
    ├── data/portfolio.ts    # ข้อมูลและข้อความทั้งหมด 3 ภาษา
    └── lib/
        ├── i18n.ts          # ภาษาที่รองรับ
        ├── prisma.ts        # เชื่อมต่อฐานข้อมูล
        └── projects.ts      # ดึงผลงานจาก DB (มี cache)
```

---

## 12. แก้ปัญหาที่พบบ่อย

### `pool failed to retrieve a connection from pool (active=0 idle=0)`
ต่อฐานข้อมูลไม่ติดเลย ตรวจ:
- `DATABASE_PORT` ต้องเป็น `4000` — **ถ้าเขียน `DATABASE_PORT=` ไว้แต่เว้นว่าง จะกลายเป็นพอร์ต 0** ให้ใส่ `4000` หรือลบบรรทัดออก
- `DATABASE_HOST`, `DATABASE_USER` (ต้องมี prefix เช่น `xxxx.root`), `DATABASE_PASSWORD` ถูกต้อง
- ถ้ายังไม่ได้ ดูสาเหตุจริงด้วย `console.dir(e.meta?.driverAdapterError?.cause, { depth: null })`

### `ยังไม่ได้ใส่ link รูปใน env` ตอน `npm run dev` / build
ยังไม่ได้ตั้ง `IMAGE_URL` ใน `.env` (หรือบน Vercel)

### รูปผลงานไม่ขึ้น / error `hostname ... is not configured under images`
`IMAGE_URL` ไม่ตรงกับโดเมนของรูป หรือใส่ `https://` / `/` ติดมา — ต้องเป็นแค่ `pub-xxxx.r2.dev`
แก้ `.env` แล้ว**ต้องรีสตาร์ท** `npm run dev` (Next.js อ่าน `next.config.ts` ตอนเริ่มเท่านั้น)

### บนเครื่องรูปขึ้น แต่บน Vercel รูปหาย (404)
ชื่อไฟล์ตัวพิมพ์เล็ก-ใหญ่ไม่ตรงกับในโค้ด (Mac ไม่แยก แต่ Vercel แยก) เช่น `profile.JPG` vs `/profile.jpg`
เปลี่ยนชื่อด้วย `git mv` ผ่านชื่อชั่วคราว:
```bash
git mv public/photo.JPG public/photo-tmp.jpg
git mv public/photo-tmp.jpg public/photo.jpg
```

### แก้ข้อมูลผลงานแล้วหน้าเว็บไม่เปลี่ยน
- ลืมรัน `npx prisma db seed`
- ข้อมูลยังติด cache (สูงสุด ~1 ชั่วโมงบนเว็บจริง) — ตอน dev ให้รีสตาร์ท server

### `Cannot find module '../../generated/prisma/client'`
ยังไม่ได้สร้าง Prisma Client → รัน `npx prisma generate`

### แคชค้าง / หน้าเว็บแปลก ๆ หลังอัปเกรด
```bash
# หยุด npm run dev ก่อน (Ctrl + C)
rm -rf .next
npm run dev
```

### `npx prisma ...` ใช้คำสั่ง `migrate` / `generate` ไม่ได้
อาจเผลอได้ Prisma 8 มา (`npx prisma@latest`) — โปรเจกต์นี้ใช้ **Prisma 7** ให้ใช้ `npx prisma` ภายในโปรเจกต์
(เวอร์ชันล็อกไว้ใน `package.json` แล้ว) และ Prisma 8 ยังไม่รองรับ MySQL/TiDB
