import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// รูปพรีวิวตอนแชร์ลิงก์ (Facebook, LINE, X) ขนาดมาตรฐาน 1200×630
// ใช้ข้อความภาษาอังกฤษเพราะฟอนต์ตั้งต้นของ ImageResponse ไม่มีตัวอักษรไทย
export const alt = "Phuwadech (Aof) — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    const photo = await readFile(join(process.cwd(), "public/profile.jpg"), "base64");

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 90px",
                    background: "linear-gradient(135deg, #ffffff 0%, #eff6ff 55%, #e0f2fe 100%)",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
                    <div style={{ fontSize: 30, color: "#0ea5e9", fontWeight: 600 }}>Full-Stack Web Developer</div>
                    <div style={{ fontSize: 76, fontWeight: 700, color: "#0f172a", lineHeight: 1.1, marginTop: 18 }}>
                        Phuwadech
                    </div>
                    <div style={{ fontSize: 76, fontWeight: 700, color: "#2563eb", lineHeight: 1.1 }}>(Aof)</div>
                    <div style={{ fontSize: 30, color: "#475569", marginTop: 28 }}>Laravel · React · Next.js · PostgreSQL</div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 36,
                            fontSize: 26,
                            color: "#047857",
                        }}
                    >
                        <div style={{ width: 14, height: 14, borderRadius: 7, background: "#10b981", marginRight: 12 }} />
                        Available to start now
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        width: 330,
                        height: 450,
                        borderRadius: "165px 165px 28px 28px",
                        overflow: "hidden",
                        border: "8px solid #ffffff",
                        boxShadow: "0 30px 60px -24px rgba(15,35,71,0.45)",
                    }}
                >
                    <img
                        src={`data:image/jpeg;base64,${photo}`}
                        alt=""
                        width={330}
                        height={450}
                        style={{ objectFit: "cover", objectPosition: "50% 72%" }}
                    />
                </div>
            </div>
        ),
        size,
    );
}
