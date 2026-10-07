"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { ScreenKind } from "@/data/portfolio";
import { bootTexture, slideTexture } from "./screens";
import { SLIDE_LEN, SLIDES_START } from "./timeline";

/* ---------- timeline ----------
 * everything is keyed to p = scroll progress through the pinned section (0..1).
 * the DOM captions use the same ranges via data-show (see LaptopShowcase).
 */

type Key = [number, number];
type Key3 = [number, [number, number, number]];

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

function track(p: number, keys: Key[]) {
    if (p <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
        const [p1, v1] = keys[i];
        if (p <= p1) {
            const [p0, v0] = keys[i - 1];
            return v0 + (v1 - v0) * smooth((p - p0) / (p1 - p0));
        }
    }
    return keys[keys.length - 1][1];
}

function track3(p: number, keys: Key3[], out: THREE.Vector3) {
    return out.set(
        track(p, keys.map(([k, v]) => [k, v[0]])),
        track(p, keys.map(([k, v]) => [k, v[1]])),
        track(p, keys.map(([k, v]) => [k, v[2]])),
    );
}

const TL = {
    lid: [[0.08, 0], [0.24, 1.85], [0.86, 1.85], [0.97, 0]] as Key[], // radians the lid is open
    screen: [[0.17, 0], [0.26, 1], [0.87, 1], [0.93, 0]] as Key[], // screen brightness
    rotY: [[0, -0.75], [0.12, -0.45], [0.3, 0], [0.36, -0.2], [0.72, -0.2], [0.8, -0.65], [0.9, -0.65], [1, 0]] as Key[],
    explode: [[0.74, 0], [0.82, 1], [0.88, 1], [0.93, 0]] as Key[],
    shift: [[0.3, 0], [0.36, 1], [0.72, 1], [0.77, 0]] as Key[], // makes room for the project captions
    camPos: [[0, [0, 4.2, 7.2]], [0.26, [0, 2.1, 6.6]], [0.72, [0, 2.1, 6.6]], [0.8, [0, 4.2, 9]], [0.9, [0, 4.2, 9]], [1, [0, 2.6, 7.6]]] as Key3[],
    targetY: [[0, 0.2], [0.26, 0.8], [0.72, 0.8], [0.8, 0.75], [0.9, 0.75], [1, 0.4]] as Key[],
};

/** 0..1 visibility of something shown during [a, b], with soft edges */
function rangeVisibility(p: number, a: number, b: number, fade = 0.02) {
    return smooth(clamp01((p - a) / fade)) * smooth(clamp01((b - p) / fade));
}

/* ---------- model ---------- */
const W = 3.2; // width
const D = 2.2; // base depth
const LID = 2.12; // lid length
const SCREEN = [3.0, 1.875] as const; // 16:10
const KEY_PITCH = 0.19;

// [x, z, width, depth] of every key, in world units relative to the keyboard centre
const KEYS: [number, number, number, number][] = (() => {
    const rows: number[][] = [
        Array(14).fill(1),
        Array(14).fill(1),
        [1.5, ...Array(12).fill(1)],
        Array(13).fill(1.077),
        [1, 1, 1, 1.3, 5.4, 1.3, 1, 1, 1],
    ];
    const out: [number, number, number, number][] = [];
    const fnDepth = 0.08;
    out.push(...rows[0].map((_, i) => [(i - 6.5) * KEY_PITCH, -0.5, KEY_PITCH - 0.025, fnDepth] as [number, number, number, number]));
    rows.slice(1).forEach((row, r) => {
        const total = row.reduce((a, b) => a + b, 0);
        let x = (-total / 2) * KEY_PITCH;
        const z = -0.4 + (r + 0.5) * KEY_PITCH;
        row.forEach((w) => {
            out.push([x + (w * KEY_PITCH) / 2, z, w * KEY_PITCH - 0.025, KEY_PITCH - 0.025]);
            x += w * KEY_PITCH;
        });
    });
    return out;
})();

const CHIPS: [number, number, number, number][] = [
    [-0.5, -0.1, 0.42, 0.42], // [x, z, w, d]
    [0.25, -0.15, 0.3, 0.22],
    [0.25, 0.2, 0.3, 0.22],
    [0.8, 0, 0.18, 0.5],
    [-1.05, 0.25, 0.22, 0.22],
];

function shadowTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(0,0,0,0.8)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
}

type SceneProps = {
    sectionRef: RefObject<HTMLElement | null>;
    overlayRef: RefObject<HTMLDivElement | null>;
    slides: { screen: ScreenKind; image?: string }[];
    boot: { name: string; role: string };
    animate: boolean;
};

function Laptop({ sectionRef, overlayRef, slides, boot, animate }: SceneProps) {
    const gl = useThree((s) => s.gl);

    const root = useRef<THREE.Group>(null);
    const bottom = useRef<THREE.Mesh>(null);
    const deck = useRef<THREE.Group>(null);
    const keys = useRef<THREE.InstancedMesh>(null);
    const board = useRef<THREE.Group>(null);
    const lid = useRef<THREE.Group>(null);
    const panel = useRef<THREE.Group>(null);
    const screenMat = useRef<THREE.MeshBasicMaterial>(null);
    const glow = useRef<THREE.PointLight>(null);
    const progress = useRef(-1);
    const shownSlide = useRef(-2);
    const camPos = useRef(new THREE.Vector3());
    const target = useRef(new THREE.Vector3());

    const [assets] = useState(() => ({
        boot: bootTexture(boot.name, boot.role),
        slides: slides.map((s) => slideTexture(s.screen, s.image)),
        shadow: shadowTexture(),
        bottomGeo: new RoundedBoxGeometry(W, 0.06, D, 4, 0.03),
        deckGeo: new RoundedBoxGeometry(W, 0.04, D, 4, 0.02),
        lidGeo: new RoundedBoxGeometry(W, 0.05, LID, 4, 0.025),
        padGeo: new RoundedBoxGeometry(1.3, 0.006, 0.78, 2, 0.003),
    }));
    useEffect(
        () => () => {
            assets.boot.dispose();
            assets.slides.forEach((t) => t.dispose());
            assets.shadow.dispose();
            assets.bottomGeo.dispose();
            assets.deckGeo.dispose();
            assets.lidGeo.dispose();
            assets.padGeo.dispose();
        },
        [assets],
    );

    // studio-style reflections for the aluminium
    const [envMap] = useState(() => {
        const pmrem = new THREE.PMREMGenerator(gl);
        const room = new RoomEnvironment();
        const tex = pmrem.fromScene(room, 0.04).texture;
        room.dispose();
        pmrem.dispose();
        return tex;
    });
    useEffect(() => () => envMap.dispose(), [envMap]);

    useLayoutEffect(() => {
        const mesh = keys.current;
        if (!mesh) return;
        const m = new THREE.Matrix4();
        const q = new THREE.Quaternion();
        KEYS.forEach(([x, z, w, d], i) => {
            m.compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(w, 1, d));
            mesh.setMatrixAt(i, m);
        });
        mesh.instanceMatrix.needsUpdate = true;
    }, []);

    // caption nodes, collected on the first frame and faded directly (no React re-render)
    const captions = useRef<{ el: HTMLElement; a: number; b: number; last: number }[] | null>(null);

    useFrame((state, delta) => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const raw = clamp01(-rect.top / Math.max(1, rect.height - window.innerHeight));
        // ease toward the scroll position for the soft, weighty feel of Apple's product pages
        progress.current = progress.current < 0 || !animate ? raw : progress.current + (raw - progress.current) * (1 - Math.exp(-delta * 7));
        const p = progress.current;

        captions.current ??= Array.from(overlayRef.current?.querySelectorAll<HTMLElement>("[data-show]") ?? []).map((el) => {
            const [a, b] = el.dataset.show!.split(",").map(Number);
            return { el, a, b, last: -1 };
        });
        for (const c of captions.current) {
            const v = rangeVisibility(p, c.a, c.b);
            if (Math.abs(v - c.last) < 0.002) continue;
            c.last = v;
            c.el.style.opacity = String(v);
            c.el.style.transform = `translateY(${(1 - v) * 28}px)`;
            c.el.style.visibility = v < 0.01 ? "hidden" : "visible";
        }

        const aspect = state.size.width / state.size.height;
        const wide = aspect > 1.1;
        const e = track(p, TL.explode);
        const shift = track(p, TL.shift);

        const r = root.current;
        if (r) {
            r.rotation.y = track(p, TL.rotY);
            r.position.x = wide ? -1.05 * shift : 0;
            r.position.y = (wide ? 0 : 0.9 * shift) + (animate ? Math.sin(state.clock.elapsedTime * 0.8) * 0.03 : 0);
        }
        if (lid.current) {
            lid.current.rotation.x = -track(p, TL.lid);
            lid.current.position.z = -D / 2 + 0.02 - 0.35 * e;
            lid.current.position.y = 0.112 + 0.3 * e;
        }
        if (bottom.current) bottom.current.position.y = 0.03 - 0.45 * e;
        if (deck.current) deck.current.position.y = 0.25 * e;
        if (keys.current) keys.current.position.y = 0.098 + 0.6 * e;
        if (panel.current) panel.current.position.y = -0.4 * e;
        if (board.current) {
            board.current.visible = e > 0.01;
            board.current.position.y = 0.05 - 0.12 * e;
            board.current.scale.setScalar(0.6 + 0.4 * e);
        }

        // screen: power fade + a short dip while switching between projects
        let slide = -1;
        let dip = 1;
        if (p >= SLIDES_START) {
            const f = (p - SLIDES_START) / SLIDE_LEN;
            if (f < slides.length) {
                slide = Math.floor(f);
                const edge = Math.min(f - slide, slide + 1 - f);
                dip = 0.2 + 0.8 * smooth(clamp01(edge / 0.18));
            }
        }
        const power = track(p, TL.screen) * dip;
        const mat = screenMat.current;
        if (mat) {
            if (slide !== shownSlide.current) {
                mat.map = slide >= 0 ? assets.slides[slide] : assets.boot;
                shownSlide.current = slide;
            }
            mat.color.setScalar(power);
        }
        if (glow.current) glow.current.intensity = 2.5 * power;

        // camera pulls further back on narrow screens so the laptop still fits
        const k = Math.max(1, 1.25 / aspect);
        target.current.set(0, track(p, TL.targetY), 0);
        track3(p, TL.camPos, camPos.current).sub(target.current).multiplyScalar(k).add(target.current);
        state.camera.position.copy(camPos.current);
        state.camera.lookAt(target.current);
    });

    const alu = { color: "#868b93", metalness: 0.9, roughness: 0.32, envMap, envMapIntensity: 1 };

    return (
        <group ref={root}>
            {/* soft contact shadow */}
            <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
                <planeGeometry args={[W * 1.6, D * 1.8]} />
                <meshBasicMaterial map={assets.shadow} transparent opacity={0.9} depthWrite={false} />
            </mesh>

            <mesh ref={bottom} geometry={assets.bottomGeo} position={[0, 0.03, 0]}>
                <meshStandardMaterial {...alu} />
            </mesh>

            {/* logic board, only seen in the exploded view */}
            <group ref={board} visible={false}>
                <mesh>
                    <boxGeometry args={[2.7, 0.02, 1.6]} />
                    <meshStandardMaterial color="#12305e" roughness={0.5} metalness={0.4} envMap={envMap} />
                </mesh>
                {CHIPS.map(([x, z, w, d]) => (
                    <mesh key={`${x},${z}`} position={[x, 0.025, z]}>
                        <boxGeometry args={[w, 0.03, d]} />
                        <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={1.6} metalness={0.5} roughness={0.3} />
                    </mesh>
                ))}
            </group>

            <group ref={deck}>
                <mesh geometry={assets.deckGeo} position={[0, 0.08, 0]}>
                    <meshStandardMaterial {...alu} />
                </mesh>
                {/* keyboard well */}
                <mesh rotation-x={-Math.PI / 2} position={[0, 0.1005, -0.32]}>
                    <planeGeometry args={[2.78, 1.12]} />
                    <meshStandardMaterial color="#0c0d10" roughness={0.8} />
                </mesh>
                <mesh geometry={assets.padGeo} position={[0, 0.1, 0.62]}>
                    <meshStandardMaterial color="#9ba0a8" metalness={0.6} roughness={0.22} envMap={envMap} />
                </mesh>
            </group>

            <instancedMesh ref={keys} args={[undefined, undefined, KEYS.length]} position={[0, 0.098, -0.32]}>
                <boxGeometry args={[1, 0.02, 1]} />
                <meshStandardMaterial color="#17191d" roughness={0.55} metalness={0.1} envMap={envMap} />
            </instancedMesh>

            {/* lid pivots on the hinge at the back edge */}
            <group ref={lid} position={[0, 0.112, -D / 2 + 0.02]}>
                <mesh rotation-z={Math.PI / 2} position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.035, 0.035, W * 0.8, 16]} />
                    <meshStandardMaterial color="#2a2d33" metalness={0.8} roughness={0.4} envMap={envMap} />
                </mesh>
                <mesh geometry={assets.lidGeo} position={[0, 0.025, LID / 2]}>
                    <meshStandardMaterial {...alu} />
                </mesh>
                <group ref={panel}>
                    <mesh rotation-x={Math.PI / 2} position={[0, -0.002, LID / 2]}>
                        <planeGeometry args={[W - 0.05, LID - 0.05]} />
                        <meshStandardMaterial color="#050506" roughness={0.15} metalness={0.2} envMap={envMap} />
                    </mesh>
                    <mesh rotation-x={Math.PI / 2} position={[0, -0.004, 0.165 + SCREEN[1] / 2]}>
                        <planeGeometry args={SCREEN} />
                        <meshBasicMaterial ref={screenMat} map={assets.boot} toneMapped={false} color="#000" />
                    </mesh>
                    <pointLight ref={glow} position={[0, -0.6, LID / 2]} color="#7dd3fc" distance={3} intensity={0} />
                </group>
            </group>
        </group>
    );
}

export default function LaptopScene(props: SceneProps & { active: boolean }) {
    const { active, ...rest } = props;
    return (
        <Canvas
            camera={{ fov: 40, position: [0, 4.2, 7.2], near: 0.1, far: 100 }}
            dpr={[1, 1.75]}
            frameloop={active ? "always" : "never"}
            gl={{ antialias: true, alpha: false }}
        >
            <color attach="background" args={["#000000"]} />
            <ambientLight intensity={0.25} />
            <directionalLight position={[3, 5, 4]} intensity={1.6} />
            <pointLight position={[-4, 2, -3]} color="#3b82f6" intensity={40} />
            <pointLight position={[4, 1, -2]} color="#38bdf8" intensity={18} />
            <Laptop {...rest} />
        </Canvas>
    );
}
