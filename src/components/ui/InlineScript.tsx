"use client";

/**
 * ใส่ <script> ที่รันทันทีตอน browser อ่าน HTML (ก่อน paint)
 *
 * ทำไมต้องมี component นี้: React 19 จะเตือน "Encountered a script tag..." ถ้า render <script> ฝั่ง client
 * (เช่นตอนเปลี่ยนภาษาด้วย router.push แล้ว root layout ถูก render ใหม่บน browser)
 * วิธีแก้ตามเอกสาร Next.js: ฝั่ง server ใส่ type="text/javascript" (รันจริงตอนโหลดหน้า)
 * ฝั่ง client ใส่ type="text/plain" (React ไม่มองว่าเป็น script จึงไม่เตือน และไม่รันซ้ำ)
 * suppressHydrationWarning บอก React ว่า type สองฝั่งไม่ตรงกันโดยตั้งใจ
 *
 * ต้องเป็น "use client": ถ้าเป็น Server Component โค้ดจะรันบน server เสมอ
 * typeof window จึงได้ "undefined" ทุกครั้ง แล้ว browser ก็ได้ type="text/javascript" ไปด้วย (คำเตือนไม่หาย)
 */
export function InlineScript({ html }: { html: string }) {
    return (
        <script
            type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
