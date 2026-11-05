"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** ข้อความทั้งหมดที่ terminal ใช้ (แปลมาจากฝั่ง server แล้ว) */
export type TerminalText = {
    label: string;
    helpTitle: string;
    whoami: string;
    stack: string;
    projects: string;
    contact: string;
    cv: string;
    clear: string;
    goProjects: string;
    goContact: string;
    cvDone: string;
    sudo: string;
    notFound: string; // มี {cmd} ให้แทนที่
    intro: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    github: string;
    cvHref: string;
};

type Line = { id: number; content: ReactNode };

// สีของแต่ละส่วนในผลลัพธ์
const Prompt = () => <span className="text-sky-400">$</span>;
const Key = ({ children }: { children: ReactNode }) => <span className="text-sky-300">{children}</span>;
const Str = ({ children }: { children: ReactNode }) => <span className="text-amber-200">{children}</span>;
const Ok = ({ children }: { children: ReactNode }) => <span className="text-emerald-300">{children}</span>;

const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function InteractiveTerminal({ text, className = "" }: { text: TerminalText; className?: string }) {
    const [lines, setLines] = useState<Line[]>([]);
    const [input, setInput] = useState("");
    const nextId = useRef(0);
    const history = useRef<string[]>([]);
    const historyIndex = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const print = (content: ReactNode) => setLines((prev) => [...prev, { id: nextId.current++, content }]);

    // คำสั่งทั้งหมด: แต่ละคำสั่งคืนค่าเป็นสิ่งที่จะแสดง หรือ null ถ้าไม่ต้องแสดงอะไร
    const commands: Record<string, () => ReactNode> = {
        help: () => (
            <>
                {text.helpTitle}
                {(
                    [
                        ["whoami", text.whoami],
                        ["stack", text.stack],
                        ["projects", text.projects],
                        ["contact", text.contact],
                        ["cv", text.cv],
                        ["hire", "☕"],
                        ["clear", text.clear],
                    ] as const
                ).map(([cmd, desc]) => (
                    <span key={cmd}>
                        {"\n  "}
                        <Key>{cmd.padEnd(10)}</Key>
                        {desc}
                    </span>
                ))}
            </>
        ),
        whoami: () => (
            <>
                <span className="text-white">{text.name}</span>
                {"\n"}
                {text.role}
            </>
        ),
        stack: () => (
            <>
                {"{\n  "}
                <Key>&quot;backend&quot;</Key>: [<Str>&quot;Laravel&quot;</Str>, <Str>&quot;PHP&quot;</Str>],{"\n  "}
                <Key>&quot;frontend&quot;</Key>: [<Str>&quot;React&quot;</Str>, <Str>&quot;Next.js&quot;</Str>],{"\n  "}
                <Key>&quot;db&quot;</Key>: [<Str>&quot;PostgreSQL&quot;</Str>, <Str>&quot;MySQL&quot;</Str>]{"\n}"}
            </>
        ),
        projects: () => {
            setTimeout(() => scrollToSection("projects"), 400);
            return <Ok>{text.goProjects}</Ok>;
        },
        contact: () => (
            <>
                email{"   "}
                <Str>{text.email}</Str>
                {"\n"}phone{"   "}
                <Str>{text.phone}</Str>
                {"\n"}github{"  "}
                <Str>{text.github}</Str>
            </>
        ),
        cv: () => {
            // สร้างลิงก์ชั่วคราวแล้วกดให้ดาวน์โหลด
            const a = document.createElement("a");
            a.href = text.cvHref;
            a.download = "";
            a.click();
            return <Ok>{text.cvDone}</Ok>;
        },
        hire: () => {
            setTimeout(() => scrollToSection("contact"), 500);
            return <Ok>{text.goContact}</Ok>;
        },
        sudo: () => <span className="text-red-300">{text.sudo}</span>,
        ls: () => "about/  experience/  projects/  skills/  contact/",
        clear: () => {
            setLines([]);
            return null;
        },
    };

    const run = (raw: string) => {
        const cmd = raw.trim().toLowerCase();
        print(
            <>
                <Prompt /> {raw}
            </>,
        );
        if (!cmd) return;
        history.current.push(cmd);
        historyIndex.current = history.current.length;
        // "sudo อะไรก็ได้" ให้ตอบเหมือน sudo
        const handler = commands[cmd] ?? (cmd.startsWith("sudo ") ? commands.sudo : undefined);
        const output = handler ? handler() : text.notFound.replace("{cmd}", cmd);
        if (output !== null) print(output);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            run(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            // เรียกคำสั่งก่อนหน้า
            e.preventDefault();
            if (historyIndex.current > 0) setInput(history.current[--historyIndex.current]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            historyIndex.current = Math.min(historyIndex.current + 1, history.current.length);
            setInput(history.current[historyIndex.current] ?? "");
        } else if (e.key === "Tab" && input) {
            // เติมชื่อคำสั่งให้อัตโนมัติ
            const match = Object.keys(commands).find((c) => c.startsWith(input.toLowerCase()));
            if (match) {
                e.preventDefault();
                setInput(match);
            }
        }
    };

    // ตอนเปิดหน้า: พิมพ์ "whoami" ให้เองทีละตัว แล้วบอกให้ลองพิมพ์ help
    useEffect(() => {
        let cancelled = false;
        const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const wait = (ms: number) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));

        (async () => {
            await wait(800);
            for (const ch of "whoami") {
                if (cancelled) return;
                setInput((v) => v + ch);
                await wait(90);
            }
            await wait(300);
            if (cancelled) return;
            setInput("");
            setLines([
                { id: nextId.current++, content: <><Prompt /> whoami</> },
                { id: nextId.current++, content: <><span className="text-white">{text.name}</span>{"\n"}{text.role}</> },
                { id: nextId.current++, content: <span className="text-slate-500">{text.intro}</span> },
            ]);
        })();

        return () => {
            cancelled = true;
            setInput("");
        };
    }, [text]);

    // เลื่อนลงล่างสุดทุกครั้งที่มีบรรทัดใหม่
    useEffect(() => {
        const body = bodyRef.current;
        if (body) body.scrollTop = body.scrollHeight;
    }, [lines]);

    return (
        <div
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
            className={`cursor-text overflow-hidden rounded-2xl bg-navy font-mono text-[13px] text-slate-300 lg:text-xs shadow-soft ring-sky-400/45 focus-within:ring-[3px] ${className}`}
        >
            <div className="flex items-center gap-1.5 bg-navy-2 px-3 py-2">
                <i className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <i className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <i className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-1.5 text-[10.5px] text-blue-200/55">aof@macbook: ~</span>
            </div>
            <div ref={bodyRef} className="h-44 overflow-y-auto px-3.5 py-2.5 leading-relaxed [scrollbar-width:thin]">
                {lines.map((line) => (
                    <div key={line.id} className="whitespace-pre-wrap break-words">
                        {line.content}
                    </div>
                ))}
                <label className="flex items-center gap-1.5">
                    <Prompt />
                    {/* ช่องพิมพ์ใช้ตัวอักษร 16px บนมือถือ กัน iPhone ซูมหน้าจอตอนแตะ */}
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        aria-label={text.label}
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        className="min-w-0 flex-1 bg-transparent text-base text-white caret-blue-300 outline-none lg:text-xs"
                    />
                </label>
            </div>
        </div>
    );
}
