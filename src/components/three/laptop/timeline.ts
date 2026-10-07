// shared between the 3D scene and the DOM captions (kept free of three.js so the section stays light)
export const SLIDES_START = 0.34;
export const SLIDE_LEN = 0.095;

/** scroll-progress range [start, end] in which project slide i is on screen */
export const slideRange = (i: number) => [SLIDES_START + i * SLIDE_LEN, SLIDES_START + (i + 1) * SLIDE_LEN] as const;
