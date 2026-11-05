"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CopyIcon } from "@/components/icons/CopyIcon";

async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // clipboard API ใช้ไม่ได้ถ้าไม่ใช่ https (เช่นเปิดผ่าน IP ในวง LAN) → ใช้วิธีเก่าแทน
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        ta.remove();
        return ok;
    }
}

/** ปุ่มคัดลอกอีเมล: กดแล้วข้อความเปลี่ยนเป็น "คัดลอกแล้ว" 2 วินาที */
export function CopyEmailButton({
    email,
    label,
    copiedLabel,
    className = "",
}: {
    email: string;
    label: string;
    copiedLabel: string;
    className?: string;
}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const id = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(id);
    }, [copied]);

    return (
        <button type="button" onClick={async () => setCopied(await copyText(email))} className={`inline-flex items-center gap-1.5 ${className}`}>
            {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
            <span aria-live="polite">{copied ? copiedLabel : label}</span>
        </button>
    );
}
