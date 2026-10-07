import { useEffect, useState } from "react";
import { profile, ui, type Lang } from "@/data/portfolio";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CopyIcon } from "@/components/icons/CopyIcon";

async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // clipboard API is unavailable outside secure contexts (e.g. plain http on a LAN IP)
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

export function CopyEmailButton({
    lang,
    showLabel = true,
    className = "",
}: {
    lang: Lang;
    showLabel?: boolean;
    className?: string;
}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const id = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(id);
    }, [copied]);

    const label = ui.copyEmail[lang];

    return (
        <button
            type="button"
            onClick={async () => setCopied(await copyText(profile.email))}
            aria-label={showLabel ? undefined : label}
            title={label}
            className={`inline-flex items-center gap-2 ${className}`}
        >
            {copied ? <CheckIcon className="h-5 w-5" /> : <CopyIcon className="h-5 w-5" />}
            {(showLabel || copied) && <span aria-live="polite">{copied ? ui.copied[lang] : label}</span>}
        </button>
    );
}
