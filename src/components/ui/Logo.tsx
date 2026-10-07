import Image from "next/image";

export function Logo({
    src,
    alt,
    zoom = 1,
    className = "h-16 w-16",
}: {
    src: string;
    alt: string;
    zoom?: number;
    className?: string;
}) {
    return (
        <div
            className={`relative shrink-0 overflow-hidden rounded-xl border border-blue-100 bg-white p-1.5 shadow-sm dark:border-slate-700 ${className}`}
        >
            <div className="relative h-full w-full">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="64px"
                    className="object-contain"
                    style={{ transform: `scale(${zoom})` }}
                    unoptimized={src.endsWith(".svg")}
                />
            </div>
        </div>
    );
}
