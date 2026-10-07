import * as THREE from "three";
import type { ScreenKind } from "@/data/portfolio";

// mock app UIs drawn on a 2D canvas and used as the laptop screen texture (16:10)
export const SCREEN_W = 1280;
export const SCREEN_H = 800;

const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';
const C = {
    bg: "#0b1220",
    panel: "#111b2e",
    line: "#1e2a44",
    text: "#e2e8f0",
    muted: "#64748b",
    blue: "#3b82f6",
    sky: "#38bdf8",
};

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string | CanvasGradient) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
}

function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, color = C.line) {
    rr(ctx, x, y, w, 12, 6, color);
}

// window chrome shared by every app screen: traffic lights, address pill, sidebar
function chrome(ctx: CanvasRenderingContext2D, title: string, sidebar: string[]) {
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
    ctx.fillStyle = C.panel;
    ctx.fillRect(0, 0, SCREEN_W, 64);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
        ctx.beginPath();
        ctx.arc(36 + i * 28, 32, 8, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
    });
    rr(ctx, SCREEN_W / 2 - 220, 16, 440, 32, 10, C.bg);
    ctx.fillStyle = C.muted;
    ctx.font = `500 18px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText(title, SCREEN_W / 2, 38);
    ctx.textAlign = "left";

    ctx.fillStyle = C.panel;
    ctx.fillRect(0, 64, 220, SCREEN_H - 64);
    sidebar.forEach((label, i) => {
        if (i === 0) rr(ctx, 14, 88, 192, 40, 10, "#1d3a6e");
        ctx.fillStyle = i === 0 ? C.text : C.muted;
        ctx.font = `${i === 0 ? 600 : 500} 18px ${FONT}`;
        ctx.fillText(label, 32, 114 + i * 52);
    });
}

function drawChat(ctx: CanvasRenderingContext2D) {
    chrome(ctx, "inbox.aof.dev", ["Inbox", "Reports", "KPI", "FAQ Bot", "Settings"]);
    const platforms = [
        ["Lazada", "#2563eb"],
        ["Shopee", "#f97316"],
        ["Facebook", "#3b82f6"],
        ["LINE", "#22c55e"],
        ["Shopee", "#f97316"],
        ["LINE", "#22c55e"],
    ];
    ctx.fillStyle = C.bg;
    platforms.forEach(([name, color], i) => {
        const y = 84 + i * 112;
        if (i === 0) rr(ctx, 232, y - 8, 336, 104, 12, C.panel);
        ctx.beginPath();
        ctx.arc(276, y + 36, 26, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = C.text;
        ctx.font = `600 18px ${FONT}`;
        ctx.fillText(name, 316, y + 28);
        bar(ctx, 316, y + 44, 180 + ((i * 37) % 60));
    });
    ctx.fillStyle = C.line;
    ctx.fillRect(580, 64, 2, SCREEN_H - 64);

    const bubbles: [boolean, number][] = [
        [false, 360],
        [true, 300],
        [false, 420],
        [true, 240],
        [false, 280],
    ];
    bubbles.forEach(([mine, w], i) => {
        const y = 100 + i * 108;
        const x = mine ? SCREEN_W - 40 - w : 610;
        rr(ctx, x, y, w, 76, 20, mine ? C.blue : C.panel);
        bar(ctx, x + 24, y + 24, w - 80, mine ? "#93c5fd" : C.line);
        bar(ctx, x + 24, y + 44, w - 140, mine ? "#93c5fd" : C.line);
    });
    rr(ctx, 610, SCREEN_H - 84, SCREEN_W - 650, 56, 16, C.panel);
    rr(ctx, SCREEN_W - 110, SCREEN_H - 76, 60, 40, 12, C.blue);
}

function drawAi(ctx: CanvasRenderingContext2D) {
    chrome(ctx, "screening.aof.dev", ["Queue", "Flagged", "Model", "Logs"]);
    const labels: [string, string][] = [
        ["OK", "#22c55e"],
        ["Greeting", "#eab308"],
        ["OK", "#22c55e"],
        ["18+", "#ef4444"],
        ["OK", "#22c55e"],
        ["Greeting", "#eab308"],
        ["OK", "#22c55e"],
        ["OK", "#22c55e"],
    ];
    const hues = [210, 260, 190, 330, 160, 30, 230, 280];
    labels.forEach(([label, color], i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 252 + col * 254;
        const y = 92 + row * 340;
        const g = ctx.createLinearGradient(x, y, x + 230, y + 230);
        g.addColorStop(0, `hsl(${hues[i]} 70% 55%)`);
        g.addColorStop(1, `hsl(${hues[i] + 40} 60% 25%)`);
        rr(ctx, x, y, 230, 230, 16, g);
        if (label === "18+") rr(ctx, x, y, 230, 230, 16, "rgba(11,18,32,0.75)");
        rr(ctx, x, y + 248, 230, 52, 12, C.panel);
        ctx.beginPath();
        ctx.arc(x + 26, y + 274, 8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillStyle = C.text;
        ctx.font = `600 18px ${FONT}`;
        ctx.fillText(label, x + 44, y + 280);
        ctx.fillStyle = C.muted;
        ctx.font = `500 16px ${FONT}`;
        ctx.textAlign = "right";
        ctx.fillText(`${(92 + ((i * 7) % 8)).toFixed(0)}%`, x + 212, y + 280);
        ctx.textAlign = "left";
    });
}

function drawRepair(ctx: CanvasRenderingContext2D) {
    chrome(ctx, "repair.aof.dev", ["Tickets", "Parts", "Orders", "Delivery", "Reports"]);
    // progress stepper
    const steps = ["Request", "Diagnose", "Parts", "Repair", "Delivered"];
    steps.forEach((s, i) => {
        const x = 280 + i * 210;
        if (i < steps.length - 1) {
            ctx.fillStyle = i < 3 ? C.blue : C.line;
            ctx.fillRect(x, 126, 210, 4);
        }
        ctx.beginPath();
        ctx.arc(x, 128, 16, 0, Math.PI * 2);
        ctx.fillStyle = i <= 3 ? C.blue : C.line;
        ctx.fill();
        ctx.fillStyle = i <= 3 ? C.text : C.muted;
        ctx.font = `600 16px ${FONT}`;
        ctx.textAlign = "center";
        ctx.fillText(s, x, 172);
        ctx.textAlign = "left";
    });
    // ticket table
    const status: [string, string][] = [
        ["Repairing", "#3b82f6"],
        ["Waiting parts", "#eab308"],
        ["Delivered", "#22c55e"],
        ["Diagnosing", "#a855f7"],
        ["Delivered", "#22c55e"],
        ["Repairing", "#3b82f6"],
        ["Waiting parts", "#eab308"],
    ];
    rr(ctx, 248, 210, SCREEN_W - 280, 560, 16, C.panel);
    status.forEach(([label, color], i) => {
        const y = 236 + i * 76;
        ctx.fillStyle = C.muted;
        ctx.font = `600 16px ui-monospace, monospace`;
        ctx.fillText(`#R-${1042 + i * 7}`, 276, y + 30);
        bar(ctx, 420, y + 20, 220 + ((i * 53) % 120));
        bar(ctx, 790, y + 20, 120);
        rr(ctx, SCREEN_W - 230, y + 8, 170, 36, 18, color + "33");
        ctx.fillStyle = color;
        ctx.font = `600 15px ${FONT}`;
        ctx.textAlign = "center";
        ctx.fillText(label, SCREEN_W - 145, y + 32);
        ctx.textAlign = "left";
        if (i < status.length - 1) {
            ctx.fillStyle = C.line;
            ctx.fillRect(276, y + 64, SCREEN_W - 336, 1);
        }
    });
}

function drawMacos(ctx: CanvasRenderingContext2D) {
    // desktop wallpaper + menu bar dropdown, like a menu bar utility
    const g = ctx.createLinearGradient(0, 0, SCREEN_W, SCREEN_H);
    g.addColorStop(0, "#1e3a8a");
    g.addColorStop(0.5, "#6d28d9");
    g.addColorStop(1, "#0ea5e9");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
    ctx.fillStyle = "rgba(15,23,42,0.55)";
    ctx.fillRect(0, 0, SCREEN_W, 40);
    ctx.fillStyle = C.text;
    ctx.font = `600 18px ${FONT}`;
    ctx.fillText("MacHub", 28, 27);
    ctx.font = `500 18px ${FONT}`;
    ctx.textAlign = "right";
    ctx.fillText("80%  ⌁  Tue 9:41", SCREEN_W - 24, 27);
    ctx.textAlign = "left";

    const x = SCREEN_W - 460;
    rr(ctx, x, 54, 430, 640, 24, "rgba(15,23,42,0.85)");
    const rows: [string, string, number][] = [
        ["Battery limit", "80%", 0.8],
        ["CPU temperature", "52°C", 0.52],
        ["Memory", "11.2 GB", 0.7],
    ];
    rows.forEach(([label, value, v], i) => {
        const y = 84 + i * 110;
        ctx.fillStyle = C.text;
        ctx.font = `600 18px ${FONT}`;
        ctx.fillText(label, x + 28, y + 24);
        ctx.fillStyle = C.sky;
        ctx.textAlign = "right";
        ctx.fillText(value, x + 402, y + 24);
        ctx.textAlign = "left";
        rr(ctx, x + 28, y + 44, 374, 14, 7, C.line);
        rr(ctx, x + 28, y + 44, 374 * v, 14, 7, C.blue);
    });
    const toggles: [string, boolean][] = [
        ["Keyboard clean lock", false],
        ["Clipboard history", true],
        ["Color picker", true],
    ];
    toggles.forEach(([label, on], i) => {
        const y = 430 + i * 82;
        ctx.fillStyle = C.text;
        ctx.font = `500 18px ${FONT}`;
        ctx.fillText(label, x + 28, y + 30);
        rr(ctx, x + 340, y + 8, 62, 34, 17, on ? "#22c55e" : C.line);
        ctx.beginPath();
        ctx.arc(on ? x + 385 : x + 357, y + 25, 13, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
    });
}

// "hello" screen shown right after the lid opens
function drawBoot(ctx: CanvasRenderingContext2D, name: string, role: string) {
    const g = ctx.createRadialGradient(SCREEN_W / 2, SCREEN_H / 2, 40, SCREEN_W / 2, SCREEN_H / 2, SCREEN_W * 0.7);
    g.addColorStop(0, "#10244a");
    g.addColorStop(1, "#02050c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
    const t = ctx.createLinearGradient(SCREEN_W / 2 - 300, 0, SCREEN_W / 2 + 300, 0);
    t.addColorStop(0, "#60a5fa");
    t.addColorStop(1, "#7dd3fc");
    ctx.textAlign = "center";
    ctx.fillStyle = t;
    ctx.font = `700 150px ${FONT}`;
    ctx.fillText(name, SCREEN_W / 2, SCREEN_H / 2 + 20);
    ctx.fillStyle = "#94a3b8";
    ctx.font = `500 34px ${FONT}`;
    ctx.fillText(role, SCREEN_W / 2, SCREEN_H / 2 + 90);
    ctx.textAlign = "left";
}

const painters: Record<ScreenKind, (ctx: CanvasRenderingContext2D) => void> = {
    chat: drawChat,
    ai: drawAi,
    repair: drawRepair,
    macos: drawMacos,
};

function toTexture(canvas: HTMLCanvasElement) {
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}

function newCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    return [canvas, canvas.getContext("2d")!] as const;
}

export function bootTexture(name: string, role: string) {
    const [canvas, ctx] = newCanvas();
    drawBoot(ctx, name, role);
    return toTexture(canvas);
}

/** mock UI for the slide; if `image` is set (a real screenshot in public/), it replaces the mock once loaded */
export function slideTexture(kind: ScreenKind, image?: string) {
    const [canvas, ctx] = newCanvas();
    painters[kind](ctx);
    const tex = toTexture(canvas);
    if (image) {
        const img = new Image();
        img.onload = () => {
            // cover-fit the screenshot into 16:10
            const s = Math.max(SCREEN_W / img.width, SCREEN_H / img.height);
            const w = img.width * s;
            const h = img.height * s;
            ctx.drawImage(img, (SCREEN_W - w) / 2, (SCREEN_H - h) / 2, w, h);
            tex.needsUpdate = true;
        };
        img.src = image;
    }
    return tex;
}
