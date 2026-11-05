// ชิ้นส่วนตกแต่งเล็ก ๆ ที่ใช้หลาย section

const blobStyles = {
    amber: "h-[30px] w-[22px] -rotate-[20deg] rounded-[60%_40%_55%_45%] bg-amber-400",
    sky: "h-3 w-4 rounded-[50%_50%_45%_55%] bg-sky-400",
    blue: "h-[18px] w-[26px] rounded-[50%_50%_40%_60%] bg-blue-500/85",
    dot: "h-3 w-3 rounded-full bg-amber-200 dark:bg-amber-300/70",
};

/** ก้อนสีลอย ๆ ตกแต่งพื้นหลัง — ส่ง className มากำหนดตำแหน่ง เช่น "left-[8%] top-28" */
export function Blob({
    tone,
    className = "",
    delay = 0,
}: {
    tone: keyof typeof blobStyles;
    className?: string;
    delay?: number;
}) {
    return (
        <span
            aria-hidden
            style={{ animationDelay: `${delay}s` }}
            className={`pointer-events-none absolute animate-float ${blobStyles[tone]} ${className}`}
        />
    );
}

/** เส้นหยักสีเหลืองใต้หัวข้อ */
export function Squiggle({ className = "" }: { className?: string }) {
    return (
        <svg width="64" height="10" viewBox="0 0 64 10" fill="none" aria-hidden className={className}>
            <path d="M2 7c10-6 20-6 30-2s20 4 30-2" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

/** หัวข้อของแต่ละ section: ข้อความเล็กสีฟ้า + หัวข้อใหญ่ + เส้นหยัก */
export function SectionHead({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
    return (
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
            <p className="font-semibold text-sky-500 dark:text-sky-400">{eyebrow}</p>
            <h2 className="mt-1.5 whitespace-pre-line text-[26px] font-bold leading-snug text-slate-900 sm:text-[34px] dark:text-white">
                {title}
            </h2>
            <Squiggle className="mx-auto mt-3" />
        </div>
    );
}

// สีพื้นหลังไอคอน 3 โทน
export const toneClass = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
};
