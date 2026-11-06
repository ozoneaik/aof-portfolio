import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  // TiDB Cloud ใช้พอร์ต 4000 (ถ้าไม่ใส่ ตัวเชื่อมต่อจะไปที่ 3306 ซึ่งเป็นค่าเริ่มต้นของ MySQL แล้วต่อไม่ติด)
  port: Number(process.env.DATABASE_PORT ?? 4000),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  // TiDB Cloud บังคับเชื่อมต่อผ่าน SSL/TLS และตรวจใบรับรองของ server ด้วย
  ssl: { rejectUnauthorized: true },
  // ค่าเริ่มต้นของ mariadb คือ 1 วินาที เผื่อเวลาให้ต่อข้ามประเทศ + เจรจา TLS
  connectTimeout: 10_000,
  connectionLimit: 5,
});
// next dev โหลดไฟล์ใหม่ทุกครั้งที่แก้โค้ด ถ้าสร้าง PrismaClient ใหม่ทุกรอบ connection จะเต็ม pool
// จึงเก็บตัวเดิมไว้ใน globalThis แล้วใช้ซ้ำ
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
