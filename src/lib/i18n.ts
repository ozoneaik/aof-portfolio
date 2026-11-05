export const langs = ["th", "en", "zh"] as const;
export type Lang = (typeof langs)[number];
export const langLabel: Record<Lang, string> = { th: "TH", en: "EN", zh: "中" };
export type T = Record<Lang, string>;

/** ใช้เช็คว่า string ที่มาจาก URL เป็นภาษาที่รองรับหรือไม่ */
export const isLang = (value: string): value is Lang => (langs as readonly string[]).includes(value);

/** แทนที่ {key} ในข้อความ เช่น fill("มี {n} ชิ้น", { n: 8 }) → "มี 8 ชิ้น" */
export const fill = (text: string, values: Record<string, string | number>) =>
    text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
