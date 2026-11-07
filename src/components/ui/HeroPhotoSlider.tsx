"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroPhoto = {
    src: string;
    /** จุดโฟกัสของรูปในกรอบ (CSS object-position) เช่น "50% 30%" = เลื่อนให้เห็นส่วนบนมากขึ้น */
    position: string;
};

type Props = {
    photos: HeroPhoto[];
    alt: string;
    /** ข้อความปุ่มจุด มี {n} ให้แทนที่ เช่น "รูปที่ {n}" */
    slideLabel: string;
    /** เวลาที่แต่ละรูปค้างอยู่ (มิลลิวินาที) */
    interval?: number;
};

/**
 * รูปโปรไฟล์หลายรูปในกรอบโค้ง: ค่อย ๆ จางเปลี่ยนรูปเองทุก 4 วินาที
 * - เอาเมาส์ชี้หรือโฟกัสด้วยคีย์บอร์ด = หยุดชั่วคราว
 * - กดจุดด้านล่างเพื่อเลือกรูปเอง
 * - ผู้ใช้ที่ตั้งค่า "ลดการเคลื่อนไหว" จะไม่เปลี่ยนรูปอัตโนมัติ
 */
export function HeroPhotoSlider({ photos, alt, slideLabel, interval = 4000 }: Props) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = photos.length;

    useEffect(() => {
        if (total < 2 || paused) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % total), interval);
        return () => clearInterval(id);
    }, [total, paused, interval]);

    return (
        <div
            className="absolute inset-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            {/* ซ้อนรูปทั้งหมดไว้ที่เดียวกัน แล้วสลับความโปร่งใส (opacity) ให้เห็นทีละรูป */}
            {photos.map((photo, i) => (
                <Image
                    key={photo.src}
                    src={photo.src}
                    alt={i === index ? alt : ""}
                    aria-hidden={i !== index}
                    fill
                    // รูปแรกโหลดทันที (เป็นสิ่งแรกที่เห็น) ที่เหลือโหลดตามปกติ
                    loading={i === 0 ? "eager" : undefined}
                    sizes="(min-width: 640px) 360px, 290px"
                    className={`object-cover transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
                    style={{ objectPosition: photo.position }}
                />
            ))}

            {/* จุดเลือกรูป: วางทับด้านล่างของกรอบ */}
            {total > 1 && (
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/75 px-2.5 py-1.5 backdrop-blur dark:bg-ink/70">
                    {photos.map((photo, i) => (
                        <button
                            key={photo.src}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={slideLabel.replace("{n}", String(i + 1))}
                            aria-current={i === index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                i === index ? "w-5 bg-blue-600 dark:bg-blue-400" : "w-2 bg-slate-400/70 hover:bg-slate-500"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
