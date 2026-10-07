"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// colors follow the site's blue palette; additive glow only reads well on the dark background
const palettes = {
    light: { node: "#2563eb", line: "#60a5fa", blending: THREE.NormalBlending, opacity: 0.55 },
    dark: { node: "#60a5fa", line: "#3b82f6", blending: THREE.AdditiveBlending, opacity: 0.85 },
};

const BOUNDS = new THREE.Vector3(14, 9, 5); // half-extents of the box the nodes drift in
const LINK_DIST = 3.2;
const SPEED = 0.35;
const LINKS_PER_NODE = 6;

// soft round sprite so points render as dots instead of squares
function makeDotTexture() {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
}

// owns the node buffers and geometries; mutated every frame outside React's render
class NetworkSim {
    readonly points = new THREE.BufferGeometry();
    readonly lines = new THREE.BufferGeometry();
    private positions: Float32Array;
    private velocities: Float32Array;
    private linePositions: Float32Array;
    private lineColors: Float32Array; // rgba, alpha fades with distance

    constructor(private count: number) {
        this.positions = new Float32Array(count * 3);
        this.velocities = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            this.positions[i * 3] = (Math.random() * 2 - 1) * BOUNDS.x;
            this.positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOUNDS.y;
            this.positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z;
            this.velocities[i * 3] = (Math.random() - 0.5) * SPEED;
            this.velocities[i * 3 + 1] = (Math.random() - 0.5) * SPEED;
            this.velocities[i * 3 + 2] = (Math.random() - 0.5) * SPEED * 0.5;
        }
        const maxSegments = count * LINKS_PER_NODE;
        this.linePositions = new Float32Array(maxSegments * 2 * 3);
        this.lineColors = new Float32Array(maxSegments * 2 * 4);
        this.points.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
        this.lines.setAttribute("position", new THREE.BufferAttribute(this.linePositions, 3));
        this.lines.setAttribute("color", new THREE.BufferAttribute(this.lineColors, 4));
    }

    step(dt: number, move: boolean, lineColor: THREE.Color) {
        const { count, positions, velocities, linePositions, lineColors } = this;

        if (move) {
            const b = [BOUNDS.x, BOUNDS.y, BOUNDS.z];
            for (let i = 0; i < count * 3; i++) {
                positions[i] += velocities[i] * dt;
                const limit = b[i % 3];
                if (positions[i] > limit || positions[i] < -limit) velocities[i] *= -1;
            }
            this.points.attributes.position.needsUpdate = true;
        }

        // connect nearby nodes; closer pairs get more opaque lines
        let seg = 0;
        const maxSegments = count * LINKS_PER_NODE;
        const maxD2 = LINK_DIST * LINK_DIST;
        outer: for (let i = 0; i < count; i++) {
            const ix = positions[i * 3], iy = positions[i * 3 + 1], iz = positions[i * 3 + 2];
            for (let j = i + 1; j < count; j++) {
                const jx = positions[j * 3], jy = positions[j * 3 + 1], jz = positions[j * 3 + 2];
                const d2 = (ix - jx) ** 2 + (iy - jy) ** 2 + (iz - jz) ** 2;
                if (d2 > maxD2) continue;
                const alpha = 1 - Math.sqrt(d2) / LINK_DIST;
                linePositions.set([ix, iy, iz, jx, jy, jz], seg * 6);
                lineColors.set([lineColor.r, lineColor.g, lineColor.b, alpha, lineColor.r, lineColor.g, lineColor.b, alpha], seg * 8);
                if (++seg >= maxSegments) break outer;
            }
        }
        this.lines.setDrawRange(0, seg * 2);
        this.lines.attributes.position.needsUpdate = true;
        this.lines.attributes.color.needsUpdate = true;
    }

    dispose() {
        this.points.dispose();
        this.lines.dispose();
    }
}

function Network({ count, isDark, animate }: { count: number; isDark: boolean; animate: boolean }) {
    const invalidate = useThree((s) => s.invalidate);
    const group = useRef<THREE.Group>(null);
    const pointer = useRef({ x: 0, y: 0 });
    const scroll = useRef(0);

    const palette = isDark ? palettes.dark : palettes.light;
    const lineColor = useMemo(() => new THREE.Color(palette.line), [palette.line]);
    const [dot] = useState(makeDotTexture);
    const [sim] = useState(() => new NetworkSim(count));

    useEffect(
        () => () => {
            dot.dispose();
            sim.dispose();
        },
        [dot, sim],
    );

    // a theme switch must repaint even when the loop is idle (reduced motion)
    useEffect(() => invalidate(), [isDark, invalidate]);

    useEffect(() => {
        if (!animate) return;
        const onPointer = (e: PointerEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scroll.current = max > 0 ? window.scrollY / max : 0;
        };
        onScroll();
        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onPointer);
            window.removeEventListener("scroll", onScroll);
        };
    }, [animate]);

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.05);
        sim.step(dt, animate, lineColor);

        // parallax: lean toward the pointer, turn slowly as the page scrolls
        const g = group.current;
        if (g) {
            const targetY = pointer.current.x * 0.25 + scroll.current * Math.PI * 0.5;
            const targetX = pointer.current.y * 0.15;
            const ease = 1 - Math.exp(-dt * 3);
            g.rotation.y += (targetY - g.rotation.y) * ease;
            g.rotation.x += (targetX - g.rotation.x) * ease;
        }
    });

    return (
        <group ref={group}>
            <points geometry={sim.points}>
                <pointsMaterial
                    color={palette.node}
                    size={0.22}
                    map={dot}
                    transparent
                    depthWrite={false}
                    blending={palette.blending}
                    opacity={isDark ? 1 : 0.8}
                />
            </points>
            <lineSegments geometry={sim.lines}>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    depthWrite={false}
                    blending={palette.blending}
                    opacity={palette.opacity}
                />
            </lineSegments>
        </group>
    );
}

export default function NetworkBackground({ isDark, paused = false }: { isDark: boolean; paused?: boolean }) {
    // only rendered on the client (loaded with ssr: false), so window is available here
    const [{ count, animate }] = useState(() => ({
        count: window.matchMedia("(max-width: 768px)").matches ? 55 : 130,
        animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    }));
    const [ready, setReady] = useState(false);

    return (
        <div
            aria-hidden
            className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                dpr={[1, 1.5]}
                frameloop={paused ? "never" : animate ? "always" : "demand"}
                gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
                onCreated={() => setReady(true)}
            >
                <Network count={count} isDark={isDark} animate={animate} />
            </Canvas>
        </div>
    );
}
