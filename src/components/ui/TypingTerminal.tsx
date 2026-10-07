import { Fragment, useEffect, useState, type ReactNode } from "react";

type Step = { cmd: string; out: ReactNode; gap: string };

const steps: Step[] = [
    { cmd: "whoami", out: <span className="text-white">phuwadech (aof)</span>, gap: "\n\n" },
    {
        cmd: "cat stack.json",
        out: (
            <>
                {"{\n"}
                {"  "}<span className="text-sky-300">&quot;backend&quot;</span>: [<span className="text-amber-200">&quot;Laravel&quot;</span>, <span className="text-amber-200">&quot;PHP&quot;</span>],{"\n"}
                {"  "}<span className="text-sky-300">&quot;frontend&quot;</span>: [<span className="text-amber-200">&quot;React&quot;</span>, <span className="text-amber-200">&quot;Next.js&quot;</span>],{"\n"}
                {"  "}<span className="text-sky-300">&quot;db&quot;</span>: [<span className="text-amber-200">&quot;PostgreSQL&quot;</span>, <span className="text-amber-200">&quot;MySQL&quot;</span>]{"\n"}
                {"}"}
            </>
        ),
        gap: "\n\n",
    },
    { cmd: "status", out: <span className="text-emerald-300">✔ open to work from 2026-11-01</span>, gap: "\n" },
];

const START_MS = 700;
const TYPE_MS = 60;
const PAUSE_MS = 500;

const Prompt = () => <span className="text-sky-400">$</span>;
const Cursor = () => <span className="cursor-blink inline-block h-3.5 w-1.5 translate-y-0.5 bg-blue-300" />;

function Transcript({ step, chars }: { step: number; chars: number }) {
    const done = step >= steps.length;
    return (
        <>
            {steps.map((s, i) => {
                if (i > step) return null;
                const typing = i === step;
                const showOut = !typing || chars === s.cmd.length;
                return (
                    <Fragment key={s.cmd}>
                        <Prompt /> {typing ? s.cmd.slice(0, chars) : s.cmd}
                        {typing && <Cursor />}
                        {showOut && (
                            <>
                                {"\n"}
                                {s.out}
                                {!typing && s.gap}
                            </>
                        )}
                    </Fragment>
                );
            })}
            {done && (
                <>
                    <Prompt /> <Cursor />
                </>
            )}
        </>
    );
}

export function TypingTerminal() {
    const [step, setStep] = useState(0);
    const [chars, setChars] = useState(0);

    useEffect(() => {
        if (step >= steps.length) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const cmd = steps[step].cmd;
        const delay = reduce ? 0 : step === 0 && chars === 0 ? START_MS : chars < cmd.length ? TYPE_MS : PAUSE_MS;
        const id = setTimeout(() => {
            if (reduce) {
                setStep(steps.length);
            } else if (chars < cmd.length) {
                setChars(chars + 1);
            } else {
                setStep(step + 1);
                setChars(0);
            }
        }, delay);
        return () => clearTimeout(id);
    }, [step, chars]);

    return (
        <pre className="overflow-x-auto p-4 font-mono text-[11.5px] leading-5 text-blue-100 sm:text-xs">
            {/* the finished transcript sits invisibly underneath so the card never changes size while typing */}
            <code className="grid">
                <span className="invisible col-start-1 row-start-1" aria-hidden>
                    <Transcript step={steps.length} chars={0} />
                </span>
                <span className="col-start-1 row-start-1">
                    <Transcript step={step} chars={chars} />
                </span>
            </code>
        </pre>
    );
}
