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

/** เส้นหยักสีเหลืองใต้หัวข้อ (ไม่ได้ใช้ในดีไซน์ใหม่ เก็บไว้เผื่อกลับไปใช้) */
export function Squiggle({ className = "" }: { className?: string }) {
    return (
        <svg width="64" height="10" viewBox="0 0 64 10" fill="none" aria-hidden className={className}>
            <path d="M2 7c10-6 20-6 30-2s20 4 30-2" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

/**
 * ป้ายเฉียงสไตล์เว็บเกม เช่น "เพิ่มเติม" / "ล่าสุด"
 * ตัวนอกเอียง -12° ตัวในเอียงกลับ +12° → กล่องเอียงแต่ตัวหนังสือตรง
 */
export function SkewTag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-block -skew-x-12 bg-amber-300 px-3 py-0.5 text-xs font-bold text-slate-900 ${className}`}>
            <span className="inline-block skew-x-12">{children}</span>
        </span>
    );
}

/**
 * หัวข้อของแต่ละ section: ชิดซ้าย ข้อความเล็ก mono + หัวข้อตัวหนาเอียง + แถบสี 2 ท่อนด้านล่าง
 * - tone="light" ใช้บนพื้นสีเข้ม/สีน้ำเงิน (ตัวหนังสือขาว)
 * - right: ใส่อะไรไว้ฝั่งขวาของหัวข้อก็ได้ (เช่น ปุ่ม)
 */
export function SectionHead({
    eyebrow,
    title,
    tone = "default",
    right,
}: {
    eyebrow: string;
    title: React.ReactNode;
    tone?: "default" | "light";
    right?: React.ReactNode;
}) {
    const light = tone === "light";
    return (
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
                <p className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-white/80" : "text-blue-600 dark:text-sky-400"}`}>
                    {"// "}
                    {eyebrow}
                </p>
                <h2
                    className={`mt-2 whitespace-pre-line font-display text-[34px] font-black italic leading-[1.1] sm:text-5xl ${
                        light ? "text-white" : "text-slate-900 dark:text-white"
                    }`}
                >
                    {title}
                </h2>
                {/* แถบเฉียง 2 ท่อน (น้ำเงิน + amber) แทนเส้นหยักแบบเดิม */}
                <div aria-hidden className="mt-4 flex gap-1.5">
                    <span className={`h-1.5 w-12 -skew-x-[30deg] ${light ? "bg-white" : "bg-blue-600 dark:bg-sky-400"}`} />
                    <span className="h-1.5 w-5 -skew-x-[30deg] bg-amber-400" />
                </div>
            </div>
            {right}
        </div>
    );
}

// สีพื้นหลังไอคอน 3 โทน
export const toneClass = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
};
