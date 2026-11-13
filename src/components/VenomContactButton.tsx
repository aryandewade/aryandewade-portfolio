import React, { useEffect, useRef } from "react";

interface VenomContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

const ARROW_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(3.96 -0.12)"><g><path d="M2.16 17.76V0.96L14.28 13.1485H7.18952L6.75977 13.2786L2.16 17.76Z" fill-rule="evenodd" clip-rule="evenodd" fill="white"/><path d="M10.7449 16.5635C11.1744 17.6016 10.6882 18.792 9.65484 19.2326C8.61036 19.678 7.40291 19.1896 6.96183 18.1434L2.88 8.46155L6.72302 6.84L10.7449 16.5635Z" fill-rule="evenodd" clip-rule="evenodd" fill="white"/></g><path d="M9.77305 16.6772C10.0078 17.2234 9.74953 17.8559 9.19969 18.0818C8.66208 18.3028 8.04661 18.0515 7.81731 17.5174L4.92 10.7703L6.88612 9.96L9.77305 16.6772Z" fill-rule="evenodd" clip-rule="evenodd" fill="black"/><path d="M3.12 3.48V15.12L6.21809 12.1382L6.6647 11.9936H11.64L3.12 3.48Z" fill-rule="evenodd" clip-rule="evenodd" fill="black"/></g></svg>`;

const HAND_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6.99667 16.6967C6.66322 16.3018 6.25814 15.494 5.53722 14.5136C5.12861 13.9591 4.11533 12.9149 3.81358 12.3845C3.55174 11.9158 3.57992 11.7056 3.64214 11.3172C3.75252 10.6262 4.50866 10.0881 5.3153 10.1608C5.92469 10.2147 6.44131 10.5921 6.90626 10.9486C7.18688 11.1632 7.53209 11.5802 7.7399 11.8157C7.93129 12.0313 7.97826 12.1205 8.18256 12.3757C8.45261 12.7135 8.53715 12.8808 8.43383 12.5089C8.35046 11.9631 8.21426 11.0311 8.01701 10.207C7.86672 9.58199 7.83031 9.48406 7.68707 9.00431C7.5356 8.49376 7.45812 8.13614 7.31604 7.59479C7.21741 7.21187 7.04012 6.42954 6.99198 5.9894C6.92506 5.38752 6.88982 4.40603 7.30195 3.95489C7.62485 3.60168 8.36573 3.49495 8.82481 3.71282C9.42597 3.9978 9.76765 4.81645 9.92382 5.14325C10.2044 5.73083 10.3782 6.40973 10.5297 7.301C10.7222 8.43544 11.0768 10.01 11.0886 10.3412C11.16 10.824 11.0087 9.08023 11.0839 8.69071C11.152 8.3375 11.469 7.92708 11.8659 7.81595C12.2016 7.72242 12.595 7.68832 12.9414 7.75543C13.3088 7.82586 13.6963 8.07233 13.8408 8.3045C14.2658 8.99111 14.274 10.394 14.2916 10.3192C14.3926 9.90548 14.375 8.9669 14.6251 8.57628C14.7895 8.31881 15.2087 8.08663 15.4318 8.04923C15.7769 7.992 16.2008 7.9744 16.5636 8.04042C16.8559 8.09434 17.2517 8.42003 17.3585 8.57628C17.6144 8.9548 17.76 10.0254 17.8034 10.4006C17.8211 10.5558 17.8903 9.9693 18.1475 9.59079C18.6242 8.88768 20.3114 8.75123 20.376 10.2939C20.4054 11.0135 20.3995 10.9805 20.3995 11.4646C20.3995 12.0335 20.3855 12.3757 20.3526 12.7872C20.3161 13.2274 20.2152 14.222 20.0684 14.7041C20.0023 14.9208 19.8362 15.3146 19.6368 15.6862C19.4365 16.0595 19.1574 16.3814 18.8863 16.7071C18.5057 17.1643 17.9896 17.8381 17.9045 18.2218C17.7659 18.8401 17.8117 18.8446 17.7847 19.2836C17.7658 19.59 17.8429 19.9643 17.8909 20.1614C17.9084 20.2334 17.8602 20.3059 17.7865 20.3134C17.505 20.3417 16.8649 20.3946 16.4779 20.3366C16.0188 20.2673 15.4505 19.4112 15.3037 19.1494C15.1018 18.7884 14.6708 18.8578 14.503 19.124C14.2388 19.5455 13.6705 20.3014 13.269 20.3488C12.514 20.4377 10.9776 20.3869 9.72746 20.3723C9.65243 20.3714 9.59565 20.3027 9.60515 20.2283C9.64502 19.9157 9.69386 19.1741 9.31679 18.8765C8.95867 18.5915 8.34224 18.0138 7.97357 17.7101L6.99667 16.6967Z" fill-rule="evenodd" clip-rule="evenodd" fill="white"/><path d="M6.99667 16.6967C6.66322 16.3018 6.25814 15.494 5.53722 14.5136C5.12861 13.9591 4.11533 12.9149 3.81358 12.3845C3.55174 11.9158 3.57992 11.7056 3.64214 11.3172C3.75252 10.6262 4.50866 10.0881 5.3153 10.1608C5.92469 10.2147 6.44131 10.5921 6.90626 10.9486C7.18688 11.1632 7.53209 11.5802 7.7399 11.8157C7.93129 12.0313 7.97826 12.1205 8.18256 12.3757C8.45261 12.7135 8.53715 12.8808 8.43383 12.5089C8.35046 11.9631 8.21426 11.0311 8.01701 10.207C7.86672 9.58199 7.83031 9.48406 7.68707 9.00431C7.5356 8.49376 7.45812 8.13614 7.31604 7.59479C7.21741 7.21187 7.04012 6.42954 6.99198 5.9894C6.92505 5.38752 6.88982 4.40603 7.30195 3.95489C7.62485 3.60168 8.36573 3.49495 8.82481 3.71282C9.42597 3.9978 9.76765 4.81645 9.92382 5.14325C10.2044 5.73083 10.3782 6.40973 10.5297 7.301C10.7222 8.43544 11.0768 10.01 11.0886 10.3412C11.16 10.824 11.0087 9.08023 11.0839 8.69071C11.152 8.3375 11.469 7.92708 11.8659 7.81595C12.2016 7.72242 12.595 7.68832 12.9414 7.75543C13.3088 7.82586 13.6963 8.07233 13.8408 8.3045C14.2658 8.99111 14.274 10.394 14.2916 10.3192C14.3926 9.90548 14.375 8.9669 14.6251 8.57628C14.7895 8.31881 15.2087 8.08663 15.4318 8.04923C15.7769 7.992 16.2008 7.9744 16.5636 8.04042C16.8559 8.09434 17.2517 8.42003 17.3585 8.57628C17.6144 8.9548 17.76 10.0254 17.8034 10.4006C17.8211 10.5558 17.8903 9.9693 18.1475 9.59078C18.6242 8.88768 20.3114 8.75123 20.376 10.2939C20.4054 11.0135 20.3995 10.9805 20.3995 11.4646C20.3995 12.0335 20.3855 12.3757 20.3526 12.7872C20.3161 13.2274 20.2152 14.222 20.0684 14.7041C20.0023 14.9208 19.8362 15.3146 19.6368 15.6862C19.4365 16.0595 19.1574 16.3814 18.8863 16.7071C18.5057 17.1643 17.9896 17.8381 17.9045 18.2218C17.7659 18.8401 17.8117 18.8446 17.7847 19.2836C17.7658 19.59 17.8429 19.9643 17.8909 20.1614C17.9084 20.2334 17.8602 20.3059 17.7865 20.3134C17.505 20.3417 16.8649 20.3946 16.4779 20.3366C16.0188 20.2673 15.4505 19.4112 15.3037 19.1494C15.1018 18.7884 14.6708 18.8578 14.503 19.124C14.2388 19.5455 13.6705 20.3014 13.269 20.3488C12.514 20.4377 10.9776 20.3869 9.72746 20.3723C9.65243 20.3714 9.59565 20.3027 9.60515 20.2283C9.64502 19.9157 9.69386 19.1741 9.31679 18.8765C8.95867 18.5915 8.34224 18.0138 7.97357 17.7101L6.99667 16.6967Z" stroke-width="0.96" stroke="black"/><path d="M16.68 17.04V13.32" stroke-width="0.84" stroke-linecap="round" stroke="black"/><path d="M14.52 17.04V13.32" stroke-width="0.84" stroke-linecap="round" stroke="black"/><path d="M11.88 13.32V17.04" stroke-width="0.84" stroke-linecap="round" stroke="black"/></g></svg>`;

export const VenomContactButton: React.FC<VenomContactButtonProps> = ({
  onClick,
  className = "",
  label = "Contact ↗",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hitEl = btnRef.current;
    if (!canvas || !hitEl) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      document.body.classList.add("no-gl");
      return;
    }
    document.body.classList.add("has-gl");

    const FLOATBUF = !!(
      gl.getExtension("EXT_color_buffer_float") ||
      gl.getExtension("EXT_color_buffer_half_float")
    );

    let MAXS = 18;
    let MAXC = 24;
    if (gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS) < 900) {
      MAXS = 6;
      MAXC = 3;
    }

    const NP = 14;
    const MAXB = 5;
    const MAXR = 6;
    const MAXBR = 9;
    const SUB = 1 / 240;
    const ITER = 3;
    let CURZ = 25;
    const PEAK_H = 15;

    const P = {
      reach: 130,
      awareness: 220,
      maxStrands: 6,
      snapStretch: 1.6,
      maxLen: 160,
      creep: 0.25,
      slither: 1.0,
      whip: 1.0,
      magnet: 1.6,
      grip: 1.0,
      thickness: 1.0,
      pull: 1.0,
      gravity: 900,
      sheen: 0,
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const VIEW_SCALE = 1;
    const viewW = () => window.innerWidth / VIEW_SCALE;
    const viewH = () => window.innerHeight / VIEW_SCALE;

    const LABEL_TEXT = label;
    const LABEL_NUDGE = 0;
    const LABEL_PX = 120;
    const LABEL_CSS = 15;
    const LIFT_H = 10;
    const BEVEL = 3;
    let labelInkW = 0;

    const strands: any[] = [];
    const crawlers: any[] = [];
    const ripples: any[] = [];

    const HAND_BIG = 2.3;
    const hand = {
      m: 0,
      mV: 0,
      s: HAND_BIG,
      v: 0,
      ang: 0,
      angV: 0,
      on: false,
      ready: false,
      coat: -60,
      coatV: 0,
      thr: 0.8,
      ox: 0,
      oy: 0,
      oxV: 0,
      oyV: 0,
    };
    const PULL_MAX = 10;
    const TILT_MAX = 0.36;
    const WRIST_ANG = Math.atan2(15.5, 5.7);

    const FINGERS = [
      { a: [8.45, 4.4], b: [9.6, 10.8], hw: 1.5, turns: 2.4, t0: 0.12, t1: 0.78 },
      { a: [12.45, 8.4], b: [12.6, 12.8], hw: 1.38, turns: 1.6, t0: 0.12, t1: 0.82 },
      { a: [13.7, 16.9], b: [13.7, 20.1], hw: 4.1, turns: 1.4, t0: 0.08, t1: 0.92 },
      { a: [16.0, 8.6], b: [16.1, 12.8], hw: 1.55, turns: 1.6, t0: 0.12, t1: 0.82 },
      { a: [4.6, 11.4], b: [7.4, 14.6], hw: 1.25, turns: 1.7, t0: 0.1, t1: 0.82 },
      { a: [19.3, 9.6], b: [19.6, 12.8], hw: 1.1, turns: 1.4, t0: 0.12, t1: 0.86 },
    ];

    const cur = {
      x: -1e4,
      y: -1e4,
      vx: 0,
      vy: 0,
      lx: -1e4,
      ly: -1e4,
      present: false,
      down: false,
      mouse: false,
      t: 0,
    };

    const btn = {
      cx: 0,
      cy: 0,
      hw: 68,
      hh: 22,
      lbw: 64,
      lbh: 16,
      top: 12,
      sink: 4,
      dome: 1.2,
      lift: 0,
      liftV: 0,
      press: 0,
      pressV: 0,
      pressTarget: 0,
      intro: 1,
      introV: 0,
    };

    const pull = { x: 0, y: 0, amt: 0, v: 0 };
    const peak = { x: 0, y: 0, amt: 0, v: 0 };
    let time = 3;
    let lastSnap = -1;
    let lastSpawn = -1;
    let lastMicro = -1;
    let nextProbe = 2.6;
    let awareNow = 0;
    let labelAmt = 1;
    let labelTarget = 1;
    let W = 1;
    let H = 1;
    let DPR = 1;
    const WP = 18;

    const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);
    const ease = (e0: number, e1: number, x: number) => {
      const t = clamp((x - e0) / (e1 - e0), 0, 1);
      return t * t * (3 - 2 * t);
    };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    function spring(o: any, k: string, kv: string, target: number, w: number, z: number, dt: number) {
      o[kv] += (w * w * (target - o[k]) - 2 * z * w * o[kv]) * dt;
      o[k] += o[kv] * dt;
    }

    const VERT = `#version 300 es
    void main() {
      vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
      gl_Position = vec4(p, 0.0, 1.0);
    }`;

    const FRAG_SCENE = `#version 300 es
    precision highp float;
    precision highp int;
    #define MAXS ${MAXS}
    #define NP ${NP}
    #define MAXB ${MAXB}
    #define MAXR ${MAXR}
    #define MAXBR ${MAXBR}
    #define MAXC ${MAXC}
    #define WP ${WP}
    ${FLOATBUF ? "" : "#define ENC8 1"}

    uniform vec2 uRes;
    uniform float uDpr;
    uniform float uTime;
    uniform int uNC;
    uniform vec4 uCoil[MAXC * WP];
    uniform vec4 uCBox[MAXC];
    uniform sampler2D uHandSDF;
    uniform sampler2D uArrowSDF;
    uniform float uMorph;
    uniform vec4 uHand;
    uniform vec4 uHand2;
    uniform vec3 uCoat;
    uniform vec4 uBtn;
    uniform vec4 uBtnZ;
    uniform vec4 uBtnZ2;
    uniform vec4 uPull;
    uniform vec4 uPeak;
    uniform int uNS;
    uniform vec4 uPts[MAXS * NP];
    uniform vec4 uBox[MAXS];
    uniform vec4 uAnc[MAXS];
    uniform vec4 uAncD[MAXS];
    uniform int uNBr;
    uniform vec4 uBr[MAXBR * 3];
    uniform int uNB;
    uniform vec4 uBlob[MAXB];
    uniform float uBlobZ[MAXB];
    uniform vec4 uRip[MAXR];
    uniform vec4 uLabelBox;
    uniform float uEmboss;
    uniform float uZTop;
    uniform vec3 uK;
    uniform sampler2D uLabel;
    out vec4 outG;

    float smin(float a, float b, float k) {
      float h = max(k - abs(a - b), 0.0) / k;
      return min(a, b) - h * h * k * 0.25;
    }
    float dCapsule(vec3 p, vec3 a, vec3 b, float ra, float rb) {
      vec3 pa = p - a, ba = b - a;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      return length(pa - ba * h) - mix(ra, rb, h);
    }
    float sdPill(vec2 p, vec2 b) {
      vec2 q = vec2(max(abs(p.x) - (b.x - b.y), 0.0), p.y);
      return length(q) - b.y;
    }
    vec2 rot(vec2 p, float a) {
      float c = cos(a), s = sin(a);
      return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
    }
    float hand2D(vec2 p) {
      vec2 d = p - uHand.xy;
      vec2 r = vec2(uHand2.x * d.x + uHand2.y * d.y, -uHand2.y * d.x + uHand2.x * d.y) / uHand.z;
      float dArr = textureLod(uArrowSDF, clamp((r + vec2(6.1, 0.9)) / 24.0, 0.0, 1.0), 0.0).r;
      float dHnd = textureLod(uHandSDF, clamp((r + vec2(8.0, 3.0)) / 24.0, 0.0, 1.0), 0.0).r;
      return mix(dArr, dHnd, uMorph) * uHand.z;
    }

    vec2 button2D(vec2 p) {
      vec2 q = p - uBtn.xy;
      float d0 = sdPill(q, uBtn.zw);
      return vec2(d0, 0.0);
    }

    uint gStrandMask = 0u;
    uint gCMask[MAXC];
    bool gHand = false;

    float map(vec3 p, vec2 bd, float h2, out float dB, out float dS, out float dH) {
      float d = 1e5;
      float lift = uBtnZ2.x, bev = uBtnZ2.y;
      float dPill = bd.x;
      float zFace = uBtnZ.x + lift;
      vec2 cp = vec2(dPill, p.z - zFace);
      float dBody = length(max(cp, 0.0)) + min(max(cp.x, cp.y), 0.0) - bev;
      dB = dBody;
      d = min(d, dBody);

      dS = 1e5;
      for (int i = 0; i < MAXS; i++) {
        if (i >= uNS) break;
        if ((gStrandMask & (1u << uint(i))) == 0u) continue;
        for (int j = 0; j < NP - 1; j++) {
          vec4 a = uPts[i * NP + j], b = uPts[i * NP + j + 1];
          float cap = dCapsule(p, a.xyz, b.xyz, a.w, b.w);
          dS = min(dS, cap);
        }
      }
      d = smin(d, dS, uK.x);

      dH = 1e5;
      if (gHand) {
        float dPlane = abs(p.z - uHand2.z) - uHand2.w;
        dH = max(h2, dPlane);
        d = min(d, dH);
      }
      return d;
    }

    void main() {
      vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
      for (int i = 0; i < MAXS; i++) {
        if (i >= uNS) break;
        vec4 bx = uBox[i];
        if (p.x >= bx.x && p.x <= bx.z && p.y >= bx.y && p.y <= bx.w) {
          gStrandMask |= (1u << uint(i));
        }
      }
      vec2 hc = uHand.xy + mat2(uHand2.x, uHand2.y, -uHand2.y, uHand2.x) * (vec2(4.0, 9.0) * uHand.z);
      gHand = uHand.w > 0.5 && length(p - hc) < 17.5 * uHand.z + 4.0;

      vec2 bd = button2D(p);
      float h2 = gHand ? hand2D(p) : 1e5;
      float z = uZTop, minD = 1e5, dB, dS, dH;
      bool hit = false;
      for (int i = 0; i < 48; i++) {
        float d = map(vec3(p, z), bd, h2, dB, dS, dH);
        minD = min(minD, d);
        if (d < 0.03) { hit = true; break; }
        z -= max(d * 0.85, 0.02);
        if (z < 0.0) break;
      }
      if (!hit) {
        #ifdef ENC8
        outG = vec4(clamp(minD / 4.0, 0.0, 1.0), 0.0, 0.0, 0.0);
        #else
        outG = vec4(minD, 0.0, 0.0, 0.0);
        #endif
        return;
      }

      vec3 pos = vec3(p, z);
      const vec2 k = vec2(1.0, -1.0);
      const float e = 0.35;
      float t0, t1, t2;
      vec3 n = k.xyy * map(pos + k.xyy * e, button2D(pos.xy + k.xy * e), gHand ? hand2D(pos.xy + k.xy * e) : 1e5, t0, t1, t2)
             + k.yyx * map(pos + k.yyx * e, button2D(pos.xy + k.yy * e), gHand ? hand2D(pos.xy + k.yy * e) : 1e5, t0, t1, t2)
             + k.yxy * map(pos + k.yxy * e, button2D(pos.xy + k.yx * e), gHand ? hand2D(pos.xy + k.yx * e) : 1e5, t0, t1, t2)
             + k.xxx * map(pos + k.xxx * e, button2D(pos.xy + k.xx * e), gHand ? hand2D(pos.xy + k.xx * e) : 1e5, t0, t1, t2);
      n = normalize(n);
      float mat = dH < min(dB, dS) - 0.05 ? 3.0 : 1.0 + smoothstep(-1.5, 1.5, dB - dS);
      #ifdef ENC8
      outG = vec4(n.xy * 0.5 + 0.5, z / 128.0, mat * 0.25);
      #else
      outG = vec4(n.xy, z, mat);
      #endif
    }`;

    const FRAG_SHADE = `#version 300 es
    precision highp float;
    ${FLOATBUF ? "" : "#define ENC8 1"}
    uniform sampler2D uG;
    uniform sampler2D uLabel;
    uniform vec2 uRes;
    uniform float uDpr;
    uniform float uTime;
    uniform vec4 uLabelBox;
    uniform float uLabelAmt;
    uniform float uLabelLod;
    uniform float uIri;
    uniform float uZMax;
    uniform float uLift;
    uniform vec4 uBtnP;
    uniform vec2 uWin;
    uniform vec2 uBtnH;
    uniform sampler2D uHandCol;
    uniform sampler2D uArrowCol;
    uniform float uMorph;
    uniform vec4 uHand;
    uniform vec4 uHand2;
    out vec4 outC;

    vec3 KEY;

    vec4 dec(vec4 g) {
      #ifdef ENC8
      if (g.a < 0.1) return vec4(g.r * 4.0, 0.0, 0.0, 0.0);
      return vec4(g.rg * 2.0 - 1.0, g.b * 128.0, g.a * 4.0);
      #else
      return g;
      #endif
    }
    float decH(vec4 g) {
      #ifdef ENC8
      return g.b * 128.0;
      #else
      return g.b;
      #endif
    }
    vec2 uvOf(vec2 p) { return vec2(p.x * uDpr / uRes.x, 1.0 - p.y * uDpr / uRes.y); }
    vec4 gAt(ivec2 c) { return dec(texelFetch(uG, clamp(c, ivec2(0), ivec2(uRes) - 1), 0)); }
    float hAt(vec2 p, float lod) { return decH(textureLod(uG, uvOf(p), lod)); }
    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float softShadow(vec2 p, float h0) {
      vec2 L2 = normalize(KEY.xy);
      float tanE = KEY.z / length(KEY.xy);
      float res = 1.0, s = 1.2;
      for (int i = 0; i < 20; i++) {
        float zr = h0 + s * tanE;
        if (zr > uZMax) break;
        float hgt = hAt(p + L2 * s, log2(1.0 + s * 0.08 * uDpr));
        res = min(res, (1.5 - 0.7 * uLift) * (zr - hgt) / s);
        if (res < -0.2) break;
        s += 1.0 + s * 0.16;
      }
      res = clamp(res, 0.0, 1.0);
      return res * res * (3.0 - 2.0 * res);
    }
    float occlusion(vec2 p, float h) {
      vec2 uv = uvOf(p);
      float o = 0.0;
      o += 0.50 * clamp((decH(textureLod(uG, uv, log2(6.0 * uDpr))) - h) / 9.0, 0.0, 1.0);
      o += 0.32 * clamp((decH(textureLod(uG, uv, log2(20.0 * uDpr))) - h) / 26.0, 0.0, 1.0);
      return clamp(1.0 - o, 0.0, 1.0);
    }
    float sdPill(vec2 q, vec2 b) { return length(vec2(max(abs(q.x) - (b.x - b.y), 0.0), q.y)) - b.y; }

    float buttonShadow(vec2 p) {
      vec2 q = p - uBtnP.xy;
      float d0 = max(sdPill(q, uBtnP.zw), 0.0);
      float lift = uBtnH.y, h = uBtnH.x + lift;
      vec2 off = -normalize(KEY.xy) * (h * 0.38 + lift * 0.45);
      float d1 = max(sdPill(q - off, uBtnP.zw - vec2(1.0)), 0.0);
      float grounded = 1.0 - smoothstep(0.0, 12.0, lift);
      float contact = exp(-d0 / (2.2 + lift * 0.4)) * 0.62 * grounded;
      float occl = exp(-d0 / 7.0) * 0.3 * mix(0.45, 1.0, grounded);
      float dropSh = exp(-d1 / (8.0 + h * 0.25 + lift * 0.6)) * (0.34 - 0.08 * (1.0 - grounded));
      float ambient = exp(-d0 / 34.0) * 0.12;
      float lit = (1.0 - contact) * (1.0 - occl) * (1.0 - dropSh) * (1.0 - ambient);
      return clamp(1.0 - lit, 0.0, 0.88);
    }

    vec3 env(vec3 R) {
      vec2 rd = normalize(R.xy + vec2(1e-5));
      float keySide = 0.5 + 0.5 * dot(rd, normalize(KEY.xy));
      vec3 c = vec3(0.015);
      float dKey = max(dot(R, normalize(vec3(-0.4, -0.5, 0.8))), 0.0);
      c += vec3(1.0, 0.96, 0.92) * pow(dKey, 16.0) * 3.5;
      float dRimL = max(dot(R, normalize(vec3(-0.95, 0.1, 0.25))), 0.0);
      c += vec3(0.9, 0.95, 1.0) * pow(dRimL, 24.0) * 4.0;
      float dRimR = max(dot(R, normalize(vec3(0.95, -0.1, 0.25))), 0.0);
      c += vec3(0.9, 0.95, 1.0) * pow(dRimR, 24.0) * 3.0;
      return c;
    }

    vec3 shadeLabel(vec2 lu, float sh, float ao) {
      vec2 tx = vec2(1.5 / 1024.0, 1.5 / 256.0);
      float mx = textureLod(uLabel, lu + vec2(tx.x, 0.0), 0.0).a - textureLod(uLabel, lu - vec2(tx.x, 0.0), 0.0).a;
      float my = textureLod(uLabel, lu + vec2(0.0, tx.y), 0.0).a - textureLod(uLabel, lu - vec2(0.0, tx.y), 0.0).a;
      vec3 N = normalize(vec3(-mx * 1.4, -my * 1.4, 1.0));
      vec3 R = reflect(vec3(0.0, 0.0, -1.0), N);
      vec3 silver = vec3(0.95, 0.96, 0.98);
      vec3 Hh = normalize(KEY + vec3(0.0, 0.0, 1.0));
      float NdH = max(dot(N, Hh), 0.0);
      float spec = pow(NdH, 40.0);
      return silver * (0.85 * ao + 0.5 * max(dot(N, KEY), 0.0) * sh) + env(R) * 0.8 + vec3(spec * 1.3 * sh);
    }

    vec3 shadeGoo(vec2 p, vec4 g) {
      vec3 N = vec3(g.xy, sqrt(max(1e-4, 1.0 - dot(g.xy, g.xy))));
      vec3 alb = vec3(0.012, 0.013, 0.016);
      float sh = softShadow(p, g.z + 0.6);
      float ao = occlusion(p, g.z);
      vec3 R = reflect(vec3(0.0, 0.0, -1.0), N);
      float F = 0.04 + 0.96 * pow(1.0 - clamp(N.z, 0.02, 1.0), 5.0);
      vec3 col = alb * (0.8 * ao + 0.3 * max(dot(N, KEY), 0.0) * sh) + env(R) * F * 1.2 * mix(0.4, 1.0, sh);

      vec2 lu = (p - uLabelBox.xy) / (2.0 * uLabelBox.zw) + 0.5;
      lu.y = 1.0 - lu.y;
      if (lu.x >= 0.0 && lu.x <= 1.0 && lu.y >= 0.0 && lu.y <= 1.0) {
        float msk = textureLod(uLabel, lu, 0.0).a;
        if (msk > 0.01) {
          vec3 lab = shadeLabel(lu, sh, ao);
          col = mix(col, lab, msk * uLabelAmt);
        }
      }
      return col;
    }

    vec3 shadeHand(vec2 p, vec4 g) {
      vec3 N = vec3(g.xy, sqrt(max(1e-4, 1.0 - dot(g.xy, g.xy))));
      vec2 d = p - uHand.xy;
      vec2 r = vec2(uHand2.x * d.x + uHand2.y * d.y, -uHand2.y * d.x + uHand2.x * d.y) / uHand.z;
      vec4 tc = mix(textureLod(uArrowCol, clamp((r + vec2(6.1, 0.9)) / 24.0, 0.0, 1.0), 0.0),
                    textureLod(uHandCol, clamp((r + vec2(8.0, 3.0)) / 24.0, 0.0, 1.0), 0.0), uMorph);
      vec3 alb = pow(mix(vec3(0.0), tc.rgb, smoothstep(0.2, 0.8, tc.a)), vec3(2.2)) * 0.86 + 0.012;
      float sh = softShadow(p, g.z + 0.6);
      float ao = occlusion(p, g.z);
      vec3 R = reflect(vec3(0.0, 0.0, -1.0), N);
      float F = 0.04 + 0.96 * pow(1.0 - clamp(N.z, 0.03, 1.0), 5.0);
      return alb * (1.2 * max(dot(N, KEY), 0.0) * sh + 0.9 * ao) + env(R) * F * 1.15;
    }

    vec3 shadeAny(vec2 p, vec4 g) { return g.w > 2.5 ? shadeHand(p, g) : shadeGoo(p, g); }

    vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }

    void main() {
      KEY = normalize(vec3(-0.45, -0.56, 0.74));
      ivec2 c = ivec2(gl_FragCoord.xy);
      vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
      vec4 g = gAt(c);
      vec3 col;
      float a = 1.0;
      if (g.w < 0.5) {
        float cov = clamp(0.5 - g.x * uDpr, 0.0, 1.0);
        float sh = buttonShadow(p);
        if (cov > 0.0) {
          vec4 n0 = gAt(c + ivec2(1, 0)), n1 = gAt(c - ivec2(1, 0)), n2 = gAt(c + ivec2(0, 1)), n3 = gAt(c - ivec2(0, 1));
          vec4 gn = n0.w > 0.5 ? n0 : n1.w > 0.5 ? n1 : n2.w > 0.5 ? n2 : n3.w > 0.5 ? n3 : vec4(0.0);
          col = gn.w > 0.5 ? shadeAny(p, gn) : vec3(0.012);
          col = pow(aces(col * 0.95), vec3(1.0 / 2.2));
          col += (hash12(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0;
          outC = vec4(col, cov);
          return;
        } else if (sh > 0.02) {
          col = vec3(0.02, 0.008, 0.0);
          a = min(0.35, sh * 0.4);
          outC = vec4(col, a);
          return;
        } else {
          outC = vec4(0.0);
          return;
        }
      } else {
        col = shadeAny(p, g);
      }
      col = pow(aces(col * 0.95), vec3(1.0 / 2.2));
      col += (hash12(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0;
      outC = vec4(col, a);
    }`;

    const FRAG_FXAA = `#version 300 es
    precision highp float;
    uniform sampler2D uC;
    uniform vec2 uRes;
    out vec4 outC;
    float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }
    void main() {
      vec2 px = 1.0 / uRes, uv = gl_FragCoord.xy * px;
      vec4 cTexSample = texture(uC, uv);
      vec3 cM = cTexSample.rgb;
      float aM = cTexSample.a;
      if (aM <= 0.001) { outC = vec4(0.0); return; }
      float lNW = luma(texture(uC, uv + vec2(-1.0, -1.0) * px).rgb), lNE = luma(texture(uC, uv + vec2(1.0, -1.0) * px).rgb);
      float lSW = luma(texture(uC, uv + vec2(-1.0, 1.0) * px).rgb), lSE = luma(texture(uC, uv + vec2(1.0, 1.0) * px).rgb);
      float lM = luma(cM);
      float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE))), lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
      if (lMax - lMin < max(0.03, lMax * 0.08)) { outC = vec4(cM, aM); return; }
      vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), (lNW + lSW) - (lNE + lSE));
      float reduce = max((lNW + lNE + lSW + lSE) * 0.03125, 1.0 / 128.0);
      dir = clamp(dir / (min(abs(dir.x), abs(dir.y)) + reduce), -8.0, 8.0) * px;
      vec4 sA0 = texture(uC, uv - dir / 6.0), sA1 = texture(uC, uv + dir / 6.0);
      vec3 A = 0.5 * (sA0.rgb + sA1.rgb);
      float aA = 0.5 * (sA0.a + sA1.a);
      vec4 sB0 = texture(uC, uv - dir * 0.5), sB1 = texture(uC, uv + dir * 0.5);
      vec3 B = A * 0.5 + 0.25 * (sB0.rgb + sB1.rgb);
      float aB = aA * 0.5 + 0.25 * (sB0.a + sB1.a);
      float lB = luma(B);
      outC = (lB < lMin || lB > lMax) ? vec4(A, aA) : vec4(B, aB);
    }`;

    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src.trim());
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        throw new Error("Shader compile failed: " + gl!.getShaderInfoLog(sh));
      }
      return sh;
    }

    function program(fs: string, names: string[]) {
      const prog = gl!.createProgram()!;
      gl!.attachShader(prog, compile(gl!.VERTEX_SHADER, VERT));
      gl!.attachShader(prog, compile(gl!.FRAGMENT_SHADER, fs));
      gl!.linkProgram(prog);
      if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) {
        throw new Error("Program link failed: " + gl!.getProgramInfoLog(prog));
      }
      const u: Record<string, WebGLUniformLocation | null> = {};
      for (const n of names) u[n] = gl!.getUniformLocation(prog, n);
      return { prog, u };
    }

    const p1 = program(FRAG_SCENE, [
      "uArrowSDF", "uMorph", "uCoat", "uNC", "uCoil", "uCBox", "uHandSDF", "uHand", "uHand2",
      "uRes", "uDpr", "uTime", "uBtn", "uBtnZ", "uBtnZ2", "uPull", "uPeak", "uNS", "uPts",
      "uBox", "uAnc", "uAncD", "uNBr", "uBr", "uNB", "uBlob", "uBlobZ", "uRip", "uLabel",
      "uLabelBox", "uEmboss", "uZTop", "uK",
    ]);

    const p2 = program(FRAG_SHADE, [
      "uG", "uLabel", "uRes", "uDpr", "uTime", "uLabelBox", "uLabelAmt", "uLabelLod", "uIri",
      "uZMax", "uLift", "uBtnP", "uWin", "uBtnH", "uHandCol", "uArrowCol", "uMorph", "uHand", "uHand2",
    ]);

    const p3 = program(FRAG_FXAA, ["uC", "uRes"]);

    const handColTex = gl.createTexture()!;
    const handSdfTex = gl.createTexture()!;
    const arrowColTex = gl.createTexture()!;
    const arrowSdfTex = gl.createTexture()!;
    let iconsLoaded = 0;

    function buildIcon(svgString: string, colTex: WebGLTexture, sdfTex: WebGLTexture) {
      const cleanSvg = svgString.replace(/\sfilter=(["'])url\([^)]*\)\1/g, "");
      const img = new Image();
      img.onload = () => {
        const C = 256;
        const cv = document.createElement("canvas");
        cv.width = cv.height = C;
        cv.getContext("2d")!.drawImage(img, 0, 0, C, C);
        gl!.bindTexture(gl!.TEXTURE_2D, colTex);
        gl!.pixelStorei(gl!.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, cv);
        gl!.generateMipmap(gl!.TEXTURE_2D);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR_MIPMAP_LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);

        const N = 96;
        const sc = document.createElement("canvas");
        sc.width = sc.height = N;
        const sx = sc.getContext("2d")!;
        sx.drawImage(img, 0, 0, N, N);
        const a = sx.getImageData(0, 0, N, N).data;
        const inside = new Uint8Array(N * N);
        for (let i = 0; i < N * N; i++) inside[i] = a[i * 4 + 3] > 127 ? 1 : 0;
        const edge: number[] = [];
        for (let y = 0; y < N; y++) {
          for (let x = 0; x < N; x++) {
            const v = inside[y * N + x];
            if (
              (x > 0 && inside[y * N + x - 1] !== v) ||
              (x < N - 1 && inside[y * N + x + 1] !== v) ||
              (y > 0 && inside[(y - 1) * N + x] !== v) ||
              (y < N - 1 && inside[(y + 1) * N + x] !== v)
            )
              edge.push(x, y);
          }
        }
        const sdf = new Float32Array(N * N);
        const unit = 24 / N;
        for (let y = 0; y < N; y++) {
          for (let x = 0; x < N; x++) {
            let best = 1e9;
            for (let k = 0; k < edge.length; k += 2) {
              const dx = edge[k] - x;
              const dy = edge[k + 1] - y;
              const d = dx * dx + dy * dy;
              if (d < best) best = d;
            }
            const d = (Math.sqrt(best) + 0.5) * unit;
            sdf[y * N + x] = inside[y * N + x] ? -d : d;
          }
        }
        gl!.bindTexture(gl!.TEXTURE_2D, sdfTex);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.R16F, N, N, 0, gl!.RED, gl!.FLOAT, sdf);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
        if (++iconsLoaded === 2) hand.ready = true;
      };
      img.src = "data:image/svg+xml;utf8," + encodeURIComponent(cleanSvg);
    }

    buildIcon(HAND_SVG, handColTex, handSdfTex);
    buildIcon(ARROW_SVG, arrowColTex, arrowSdfTex);

    const vao = gl.createVertexArray()!;
    let cTex: WebGLTexture | null = null;
    const cFbo = gl.createFramebuffer()!;
    let gTex: WebGLTexture | null = null;
    const fbo = gl.createFramebuffer()!;

    function makeGBuffer() {
      if (gTex) gl!.deleteTexture(gTex);
      gTex = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, gTex);
      const levels = Math.floor(Math.log2(Math.max(W, H))) + 1;
      gl!.texStorage2D(gl!.TEXTURE_2D, levels, FLOATBUF ? gl!.RGBA16F : gl!.RGBA8, W, H);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR_MIPMAP_LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, gTex, 0);

      if (cTex) gl!.deleteTexture(cTex);
      cTex = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, cTex);
      gl!.texStorage2D(gl!.TEXTURE_2D, 1, gl!.RGBA8, W, H);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, cFbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, cTex, 0);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    }

    const LABEL_W = 1024;
    const LABEL_H = 256;
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = LABEL_W;
    labelCanvas.height = LABEL_H;
    const lctx = labelCanvas.getContext("2d")!;
    const labelTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, labelTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));

    function uploadLabel() {
      gl!.bindTexture(gl!.TEXTURE_2D, labelTex);
      gl!.pixelStorei(gl!.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, labelCanvas);
      gl!.generateMipmap(gl!.TEXTURE_2D);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR_MIPMAP_LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    }

    async function setLabelText(text: string) {
      if (document.fonts) await document.fonts.ready;
      lctx.clearRect(0, 0, LABEL_W, LABEL_H);
      lctx.font = `600 ${LABEL_PX}px "Host Grotesk", system-ui, sans-serif`;
      lctx.fillStyle = "white";
      lctx.textAlign = "center";
      lctx.textBaseline = "middle";
      lctx.fillText(text, LABEL_W / 2, LABEL_H / 2 + 3);
      const m = lctx.measureText(text);
      labelInkW = m.width;
      uploadLabel();
      labelAmt = 1;
      labelTarget = 1;
      layoutButton();
    }
    setLabelText(LABEL_TEXT);

    function geo() {
      const e = btn.intro;
      const pr = btn.press;
      return {
        cx: btn.cx,
        cy: btn.cy,
        hw: btn.hh * 0.5 + (btn.hw - btn.hh * 0.5) * e + 2.5 * pr,
        hh: btn.hh * (0.55 + 0.45 * e) + 1 * pr,
        top: Math.max(1, btn.top * e * (1 - 0.3 * pr)),
      };
    }

    function pillEdge(x: number, y: number, g: any, inset = 0) {
      const a = g.hw - g.hh;
      const ax = clamp(x - g.cx, -a, a);
      let dx = x - g.cx - ax;
      let dy = y - g.cy;
      let L = Math.hypot(dx, dy);
      if (L < 1e-3) {
        dx = 0;
        dy = -1;
        L = 1e-3;
      } else {
        dx /= L;
        dy /= L;
      }
      const R = g.hh - inset;
      return { x: g.cx + ax + dx * R, y: g.cy + dy * R, nx: dx, ny: dy, d: L - g.hh };
    }

    function anchorFor(px: number, py: number, lat: number, g: any) {
      const e = pillEdge(px, py, g);
      return pillEdge(e.x - e.ny * lat - e.nx * 4, e.y + e.nx * lat - e.ny * 4, g, 8);
    }

    function addRipple(x: number, y: number, amp: number) {
      if (reduced) return;
      ripples.push({ x, y, age: 0, amp });
      if (ripples.length > MAXR) ripples.shift();
    }

    function newStrand(kind: string, g: any, ax: number, ay: number) {
      const s: any = {
        kind,
        state: "grow",
        pin: "anchor",
        lx: (ax - g.cx) / g.hw,
        ly: (ay - g.cy) / g.hh,
        pos: new Float32Array(NP * 3),
        prev: new Float32Array(NP * 3),
        rad: new Float32Array(NP).fill(2),
        u: 0,
        ud: 0,
        uKick: true,
        rest: 1,
        vol: 0,
        stretch: 1,
        pinch: 0,
        len: 0,
        neckS: rand(0.42, 0.62),
        side: Math.random() < 0.5 ? -1 : 1,
        wig: rand(0.5, 1.2),
        phase: rand(0, 100),
        snapMul: rand(0.85, 1.15),
        lenMul: rand(0.88, 1.12),
        wrap: null,
        lat: 0,
        life: 0,
        ttl: 0,
        probe: null,
        mound: 0,
        dead: false,
        retract: 0,
      };
      const z = Math.max(2, g.top - 4) + btn.lift * LIFT_H;
      const e = pillEdge(ax, ay, g);
      for (let i = 0; i < NP; i++) {
        const o = i * 3;
        s.pos[o] = s.prev[o] = ax + e.nx * i * 0.4;
        s.pos[o + 1] = s.prev[o + 1] = ay + e.ny * i * 0.4;
        s.pos[o + 2] = s.prev[o + 2] = z;
      }
      return s;
    }

    function spawnReach(g: any) {
      if (strands.length >= MAXS - 1) return;
      const k = strands.filter((s) => s.kind === "reach" && s.pin === "anchor" && s.state !== "recoil").length;
      const lat = [0, 24, -24, 46, -46, 68, -68][k % 7] + rand(-5, 5);
      const a = anchorFor(cur.x, cur.y, lat, g);
      const s = newStrand("reach", g, a.x, a.y);
      s.lat = lat;
      s.vol = Math.PI * 1.2 * 1.2 * 140;
      const usedF = new Set(strands.filter((x) => x.wrap).map((x) => x.wrap.f));
      let fi = 0;
      for (let i = 0; i < FINGERS.length; i++) {
        if (!usedF.has(i)) {
          fi = i;
          break;
        }
      }
      s.wrap = { f: fi, prog: 0, th0: null, dir: 1, r: rand(0.7, 1.1), slide: 0, ph: rand(0, 10) };
      strands.push(s);
    }

    function handToWorld(ix: number, iy: number) {
      const dx = (ix - 8) * hand.s;
      const dy = (iy - 3) * hand.s;
      const c = Math.cos(hand.ang);
      const sn = Math.sin(hand.ang);
      return [cur.x + hand.ox + c * dx - sn * dy, cur.y + hand.oy + sn * dx + c * dy];
    }
    const handTh = () => 0.8 * hand.s;

    const cp = [0, 0, 0, 0];
    function coilPoint(s: any, f: number, hair: boolean) {
      const w = s.wrap;
      const F = FINGERS[w.f];
      const A = handToWorld(F.a[0], F.a[1]);
      const B = handToWorld(F.b[0], F.b[1]);
      let ux = B[0] - A[0];
      let uy = B[1] - A[1];
      const L = Math.hypot(ux, uy) || 1;
      ux /= L;
      uy /= L;
      const nx = -uy;
      const ny = ux;
      if (w.th0 === null) {
        const side = (s.pos[0] - (A[0] + B[0]) / 2) * nx + (s.pos[1] - (A[1] + B[1]) / 2) * ny;
        w.th0 = side > 0 ? 0 : Math.PI;
        w.dir = side > 0 ? 1 : -1;
      }
      const r = (hair ? 0.45 : w.r) * P.thickness;
      const phi = f * F.turns * (hair ? 1.25 : 1) * 2 * Math.PI * w.prog;
      const t = clamp(F.t0 + w.slide + ((F.t1 - F.t0) * phi) / (F.turns * 2 * Math.PI * (hair ? 1.1 : 1)), 0.02, 0.98);
      const th = w.th0 + w.dir * phi;
      const hw = F.hw * hand.s + r + 0.35;
      const zr = handTh() + r + 0.3;
      cp[0] = A[0] + ux * t * L + nx * Math.cos(th) * hw;
      cp[1] = A[1] + uy * t * L + ny * Math.cos(th) * hw;
      cp[2] = CURZ + Math.sin(th) * zr;
      cp[3] = r * (1 - 0.35 * f * f);
      return cp;
    }
    function coilStart(s: any) {
      const p = coilPoint(s, 0, false);
      return [p[0], p[1], p[2]];
    }

    function spawnMicro(g: any) {
      if (strands.length >= MAXS - 5) return;
      const lat = rand(-1, 1) * 60;
      const a = anchorFor(cur.x, cur.y, lat, g);
      const s = newStrand("micro", g, a.x, a.y);
      s.lat = lat;
      s.probe = { len: rand(0.5, 1.2), z: rand(1, 5), ph: rand(0, 6.28) };
      s.ttl = rand(0.7, 1.8);
      s.vol = Math.PI * 0.55 * 0.55 * 35;
      strands.push(s);
    }

    function outlineAt(t: number, g: any) {
      const a = g.hw - g.hh;
      const straight = 2 * a;
      const cap = Math.PI * g.hh;
      const per = 2 * straight + 2 * cap;
      let s = (((t % 1) + 1) % 1) * per;
      if (s < straight) return pillEdge(g.cx - a + s, g.cy - g.hh - 1, g);
      s -= straight;
      if (s < cap) {
        const th = -Math.PI / 2 + s / g.hh;
        return pillEdge(g.cx + a + Math.cos(th) * g.hh * 2, g.cy + Math.sin(th) * g.hh * 2, g);
      }
      s -= cap;
      if (s < straight) return pillEdge(g.cx + a - s, g.cy + g.hh + 1, g);
      s -= straight;
      const th = Math.PI / 2 + s / g.hh;
      return pillEdge(g.cx - a + Math.cos(th) * g.hh * 2, g.cy + Math.sin(th) * g.hh * 2, g);
    }

    let lastProbeT = Math.random();
    function spawnProbe(g: any) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const n = Math.random() < 0.5 ? 2 : 3;
      const t = lastProbeT + rand(0.25, 0.75);
      lastProbeT = t;
      const base = outlineAt(t, g);
      for (let i = 0; i < n && strands.length < MAXS - 2; i++) {
        const lat = (i - (n - 1) / 2) * 12 + rand(-3, 3);
        const a = pillEdge(base.x - base.ny * lat, base.y + base.nx * lat, g, 8);
        const s = newStrand("probe", g, a.x, a.y);
        s.probe = { nx: a.nx, ny: a.ny, dist: rand(10, 18), z: rand(2, 5), dir, delay: i * 0.07 };
        s.ttl = rand(0.8, 1.0);
        s.vol = Math.PI * 0.75 * 0.75 * 35;
        strands.push(s);
      }
    }

    const cum = new Float32Array(NP);
    const tmpP = new Float32Array(NP * 3);
    const tmpV = new Float32Array(NP * 3);

    function truncate(s: any, Lnew: number) {
      const pos = s.pos;
      const prev = s.prev;
      cum[0] = 0;
      for (let i = 1; i < NP; i++) {
        const a = (i - 1) * 3;
        const b = i * 3;
        cum[i] = cum[i - 1] + Math.hypot(pos[b] - pos[a], pos[b + 1] - pos[a + 1], pos[b + 2] - pos[a + 2]);
      }
      if (cum[NP - 1] < 1e-3 || Lnew >= cum[NP - 1]) return;
      let k = 0;
      for (let j = 0; j < NP; j++) {
        const target = (Lnew * j) / (NP - 1);
        while (k < NP - 2 && cum[k + 1] < target) k++;
        const t = clamp((target - cum[k]) / Math.max(cum[k + 1] - cum[k], 1e-6), 0, 1);
        for (let c = 0; c < 3; c++) {
          tmpP[j * 3 + c] = pos[k * 3 + c] * (1 - t) + pos[(k + 1) * 3 + c] * t;
          tmpV[j * 3 + c] = prev[k * 3 + c] * (1 - t) + prev[(k + 1) * 3 + c] * t;
        }
      }
      pos.set(tmpP);
      prev.set(tmpV);
    }

    function resample(src: Float32Array, a: number, b: number) {
      const out = new Float32Array(NP * 3);
      for (let j = 0; j < NP; j++) {
        const f = a + ((b - a) * j) / (NP - 1);
        const i0 = clamp(Math.floor(f), 0, NP - 2);
        const t = f - i0;
        for (let c = 0; c < 3; c++) {
          out[j * 3 + c] = src[i0 * 3 + c] * (1 - t) + src[(i0 + 1) * 3 + c] * t;
        }
      }
      return out;
    }

    function split(s: any, g: any) {
      const k = s.neckS * (NP - 1);
      const base = {
        ...s,
        kind: "piece",
        state: "recoil",
        pin: "anchor",
        pinch: 0,
        mound: s.mound,
        wrap: null,
        pos: resample(s.pos, 0, k),
        prev: resample(s.prev, 0, k),
        rad: new Float32Array(NP),
        vol: s.vol * s.neckS,
      };
      const tip = {
        ...s,
        kind: "piece",
        state: "recoil",
        pin: "cursor",
        pinch: 0,
        mound: 0,
        pos: resample(s.pos, NP - 1, k),
        prev: resample(s.prev, NP - 1, k),
        rad: new Float32Array(NP),
        vol: s.vol * (1 - s.neckS),
      };
      base.len = s.len * s.neckS;
      base.rest = base.len / (NP - 1);
      tip.len = s.len * (1 - s.neckS);
      tip.rest = tip.len / (NP - 1);
      base.retract = tip.retract = 0;
      const idx = strands.indexOf(s);
      strands[idx] = base;
      if (strands.length < MAXS) strands.push(tip);
      addRipple(g.cx + s.lx * g.hw, g.cy + s.ly * g.hh, 0.8);
      lastSnap = time;
    }

    function releaseAll(absorb: boolean) {
      for (const s of strands) {
        if (s.kind === "reach" && (s.state === "grow" || s.state === "attached")) {
          if (absorb || s.state === "grow") {
            s.state = "recoil";
            s.kind = "piece";
          } else if (!s.pinch) s.pinch = 1e-4;
        }
      }
    }

    function stepStrand(s: any, dt: number, g: any, present: boolean, _inside: boolean) {
      s.life += dt;
      const w = s.wrap;
      if (w) {
        w.slide = 0.045 * Math.sin(time * 1.4 + w.ph);
        if (s.state === "attached") w.prog += (1 - w.prog) * (1 - Math.exp(-dt * 10));
        else if (s.state === "recoil") {
          w.prog -= dt * 5;
          if (w.prog <= 0) {
            s.wrap = null;
            if (s.pin === "cursor") s.dead = true;
          }
        }
      }
      const R =
        s.pin === "anchor"
          ? [g.cx + s.lx * g.hw, g.cy + s.ly * g.hh, Math.max(2, g.top - 4) + btn.lift * LIFT_H]
          : s.wrap
          ? coilStart(s)
          : [cur.x, cur.y, CURZ];

      let T: number[] | null = null;
      if (s.kind === "reach" && (s.state === "grow" || s.state === "attached")) {
        T = coilStart(s);
        if (s.state === "attached") {
          const an = anchorFor(cur.x, cur.y, s.lat, g);
          const k = 1 - Math.exp(-dt * 1.4);
          s.lx += ((an.x - g.cx) / g.hw - s.lx) * k;
          s.ly += ((an.y - g.cy) / g.hh - s.ly) * k;
        }
      } else if (s.kind === "micro" && s.state !== "recoil") {
        const an = anchorFor(cur.x, cur.y, s.lat, g);
        const k = 1 - Math.exp(-dt * 2);
        s.lx += ((an.x - g.cx) / g.hw - s.lx) * k;
        s.ly += ((an.y - g.cy) / g.hh - s.ly) * k;
        const e2 = pillEdge(R[0], R[1], g);
        let tx = cur.x - R[0];
        let ty = cur.y - R[1];
        const tl = Math.hypot(tx, ty) || 1;
        let dx = e2.nx * 0.25 + (tx / tl) * 0.75;
        let dy = e2.ny * 0.25 + (ty / tl) * 0.75;
        const dl = Math.hypot(dx, dy) || 1;
        dx /= dl;
        dy /= dl;
        const len = (10 + 38 * awareNow) * s.probe.len;
        const sway = Math.sin(time * 3 + s.probe.ph) * 4;
        T = [R[0] + dx * len - dy * sway, R[1] + dy * len + dx * sway, R[2] + s.probe.z * awareNow];
        if (s.life > s.ttl || awareNow < 0.08) {
          s.state = "recoil";
          T = null;
        }
      } else if (s.kind === "probe" && s.state !== "recoil") {
        const pr = s.probe;
        const f = clamp((s.life - pr.delay) / s.ttl, 0, 1);
        const wave = Math.sin(Math.PI * f);
        const glide = pr.dir * (f - 0.3) * 20;
        const out = 3 + pr.dist * wave;
        T = [R[0] + pr.nx * out - pr.ny * glide, R[1] + pr.ny * out + pr.nx * glide, R[2] + pr.z * wave];
        if (s.life > s.ttl + pr.delay) {
          s.state = "recoil";
          T = null;
        }
      }

      let tip: number[] | null = null;
      if (T) {
        const L0 = Math.hypot(T[0] - R[0], T[1] - R[1], T[2] - R[2]);
        if (s.state === "grow") {
          const f = 3.8 * P.whip * (0.75 + 0.25 * P.magnet);
          const z = 0.5;
          const r = -0.2;
          const k1 = z / (Math.PI * f);
          const k2 = 1 / (2 * Math.PI * f) ** 2;
          const k3 = (r * z) / (2 * Math.PI * f);
          const xd = s.uKick ? 1 / dt : 0;
          s.uKick = false;
          const k2s = Math.max(k2, (dt * dt) / 2 + (dt * k1) / 2, dt * k1);
          s.u += dt * s.ud;
          s.ud += (dt * (1 + k3 * xd - s.u - k1 * s.ud)) / k2s;
          const u = s.u;
          const uc = clamp(u, 0, 1);
          const L2 = Math.hypot(T[0] - R[0], T[1] - R[1]) || 1;
          const nx = -(T[1] - R[1]) / L2;
          const ny = (T[0] - R[0]) / L2;
          const lat = s.side * s.wig * Math.sin(Math.PI * uc) * Math.min(L2 * 0.3, 34);
          tip = [
            R[0] + (T[0] - R[0]) * u + nx * lat,
            R[1] + (T[1] - R[1]) * u + ny * lat,
            R[2] + (T[2] - R[2]) * uc + 20 * Math.sin(Math.PI * uc),
          ];
          s.rest = (Math.max(4, L0 * Math.max(u, 0.03)) * 1.05) / (NP - 1);
          if (u > 0.85 && Math.abs(s.ud) < 1.6) s.state = "attached";
        } else {
          tip = T;
          let Lr = s.rest * (NP - 1);
          if (L0 < Lr * 1.03) Lr += (L0 * 1.03 - Lr) * (1 - Math.exp(-dt * 3.5));
          else Lr += (L0 - Lr) * (1 - Math.exp(-dt * P.creep));
          s.rest = Lr / (NP - 1);
          s.stretch = L0 / Math.max(Lr, 1);
          if (s.kind === "reach" && !s.pinch && (s.stretch > P.snapStretch * s.snapMul || L0 > P.maxLen * s.lenMul))
            s.pinch = 1e-4;
        }
      } else if (s.state === "recoil") {
        s.retract += dt;
        const Ln = Math.max(0, s.len * Math.exp(-dt * 9) - (s.pin === "cursor" ? 160 : 110) * dt);
        truncate(s, Ln);
        s.rest = Ln / (NP - 1);
      }

      if (s.pinch > 0) {
        s.pinch += dt / 0.1;
        if (s.pinch >= 1) {
          split(s, g);
          return;
        }
      }

      const pos = s.pos;
      const prev = s.prev;
      const damp = s.state === "recoil" ? 0.94 : 0.975;
      const lastO = (NP - 1) * 3;
      const ex = pos[lastO] - R[0];
      const ey = pos[lastO + 1] - R[1];
      const el = Math.hypot(ex, ey) || 1;
      const px = -ey / el;
      const py = ex / el;
      const slack = clamp(1.35 - s.stretch, 0.15, 1);
      const amp = (reduced || s.state === "recoil" ? 0 : 600) * P.slither * slack * (s.state === "grow" ? 0.4 : 1);
      const gdt = P.gravity * dt * dt;
      const mag =
        (s.kind === "reach" || s.kind === "micro") && s.state !== "recoil" && cur.present
          ? P.magnet * 900 * dt * dt
          : 0;

      for (let i = 1; i < NP; i++) {
        const o = i * 3;
        const sp = i / (NP - 1);
        const vx = (pos[o] - prev[o]) * damp;
        const vy = (pos[o + 1] - prev[o + 1]) * damp;
        const vz = (pos[o + 2] - prev[o + 2]) * damp;
        prev[o] = pos[o];
        prev[o + 1] = pos[o + 1];
        prev[o + 2] = pos[o + 2];
        const env = Math.sin(Math.PI * sp);
        const wave = Math.sin(sp * 8.5 - time * 7.5 + s.phase) * env * amp * dt * dt;
        pos[o] += vx + px * wave;
        pos[o + 1] += vy + py * wave;
        pos[o + 2] += vz - gdt + Math.cos(sp * 6 - time * 5 + s.phase) * env * amp * 0.25 * dt * dt;
        if (mag) {
          const mx = cur.x - pos[o];
          const my = cur.y - pos[o + 1];
          const ml = Math.hypot(mx, my) || 1;
          pos[o] += (mx / ml) * mag * env;
          pos[o + 1] += (my / ml) * mag * env;
        }
      }

      const rest = Math.max(s.rest, 0.05);
      for (let it = 0; it < ITER; it++) {
        pos[0] = R[0];
        pos[1] = R[1];
        pos[2] = R[2];
        if (tip) {
          pos[lastO] = tip[0];
          pos[lastO + 1] = tip[1];
          pos[lastO + 2] = tip[2];
        }
        for (let i = 0; i < NP - 1; i++) {
          const a = i * 3;
          const b = a + 3;
          let dx = pos[b] - pos[a];
          let dy = pos[b + 1] - pos[a + 1];
          let dz = pos[b + 2] - pos[a + 2];
          const d = Math.hypot(dx, dy, dz) || 1e-6;
          const wa = i === 0 ? 0 : 1;
          const wb = i + 1 === NP - 1 && tip ? 0 : 1;
          const ws = wa + wb;
          if (!ws) continue;
          const diff = ((d - rest) / d) * 0.95;
          dx *= diff;
          dy *= diff;
          dz *= diff;
          if (wa) {
            const f = wa / ws;
            pos[a] += dx * f;
            pos[a + 1] += dy * f;
            pos[a + 2] += dz * f;
          }
          if (wb) {
            const f = wb / ws;
            pos[b] -= dx * f;
            pos[b + 1] -= dy * f;
            pos[b + 2] -= dz * f;
          }
        }
      }

      let L = 0;
      for (let i = 0; i < NP - 1; i++) {
        const a = i * 3;
        const b = a + 3;
        L += Math.hypot(pos[b] - pos[a], pos[b + 1] - pos[a + 1], pos[b + 2] - pos[a + 2]);
      }
      s.len = L;
      const rMean = clamp(Math.sqrt(s.vol / (Math.PI * Math.max(L, 2))), 0.55, s.state === "recoil" ? 5 : 7) * P.thickness;
      const held = s.state === "attached";
      const neck = held ? clamp((s.stretch - 1.15) / 1.2, 0, 0.7) : 0;
      const nk = neck * (1 - s.pinch) + s.pinch * 0.96;
      for (let i = 0; i < NP; i++) {
        const sp = i / (NP - 1);
        let r = rMean * (s.pin === "cursor" ? 0.6 : 1 + 0.55 * Math.exp(-sp / 0.08));
        if ((s.wrap && s.kind === "reach") || s.kind === "micro" || s.kind === "probe")
          r *= 1 - 0.62 * ease(0.5, 1, sp);
        r *= 1 - nk * Math.exp(-(((sp - s.neckS) / 0.16) ** 2));
        s.rad[i] = Math.max(r, 0.35);
      }

      let moundT = 0;
      let elongT = 0;
      if (s.pin === "anchor") {
        if (s.state === "grow") {
          moundT = 6;
          elongT = 0.9;
        } else if (s.state === "attached") {
          moundT = 5 + 5 * clamp(s.stretch - 1, 0, 1.4);
          elongT = 1.0 + 1.4 * clamp(s.stretch - 0.8, 0, 1.4);
        }
      }
      s.mound += (moundT * 0.55 * P.pull - s.mound) * (1 - Math.exp(-dt * (moundT > s.mound ? 10 : 5)));
      s.elong = (s.elong || 0) + (elongT - (s.elong || 0)) * (1 - Math.exp(-dt * 8));

      if (s.state === "recoil" && (s.rest * (NP - 1) < 12 || L < 5)) {
        s.dead = true;
        if (s.pin === "anchor" && s.kind !== "micro") addRipple(R[0], R[1], 0.5);
      }
    }

    function step(dt: number) {
      if (!reduced) time += dt;
      spring(btn, "intro", "introV", 1, 9, 0.85, dt);
      spring(btn, "press", "pressV", btn.pressTarget, 30, 0.75, dt);
      labelAmt += (labelTarget - labelAmt) * (1 - Math.exp(-dt * (time > 0.6 ? 4 : 0)));
      const g = geo();

      const present = cur.present && btn.intro > 0.6;
      const e = pillEdge(cur.x, cur.y, g);
      const inside = present && e.d < -2;
      const aware = present && !inside ? ease(P.awareness, 18, e.d) : 0;
      awareNow = aware;

      spring(pull, "amt", "v", 0, 14, 1.0, dt);
      const pk = 1 - Math.exp(-dt * 10);
      pull.x += (e.x - e.nx * 6 - pull.x) * pk;
      pull.y += (e.y - e.ny * 6 - pull.y) * pk;
      spring(peak, "amt", "v", 0, 12, 1.0, dt);
      spring(btn, "lift", "liftV", inside ? 1 : 0, 11, 0.95, dt);
      CURZ = g.top + btn.lift * LIFT_H + 11;
      const fk = 1 - Math.exp(-dt * 14);
      peak.x += (cur.x - peak.x) * (peak.amt < 0.02 ? 1 : fk);
      peak.y += (cur.y - peak.y) * (peak.amt < 0.02 ? 1 : fk);

      if (!reduced) {
        const active = strands.filter(
          (s) => s.kind === "reach" && (s.state === "grow" || s.state === "attached")
        ).length;
        if (!present) releaseAll(false);
        else if (inside) releaseAll(true);
        else {
          const want =
            e.d < P.reach
              ? Math.min(
                  P.maxStrands,
                  Math.round(
                    Math.min(2, P.maxStrands) +
                      Math.max(0, P.maxStrands - 2) * ease(P.reach, P.reach * 0.4, e.d)
                  )
                )
              : 0;
          if (active < want && time - lastSpawn > rand(0.03, 0.06) && time - lastSnap > 0.15) {
            spawnReach(g);
            lastSpawn = time;
          }
          const micro = strands.filter((s) => s.kind === "micro" && s.state !== "recoil").length;
          if (micro < Math.round(7 * ease(0.1, 0.8, aware)) && time - lastMicro > rand(0.03, 0.07)) {
            spawnMicro(g);
            lastMicro = time;
          }
        }
        if (!inside && aware < 0.02 && time > nextProbe && btn.intro > 0.95) {
          if (strands.every((s) => s.kind === "probe" || s.state === "recoil")) spawnProbe(g);
          nextProbe = time + rand(1.8, 2.3);
        }
      }

      for (let i = 0; i < strands.length; i++) stepStrand(strands[i], dt, g, present, inside);
      for (let i = strands.length - 1; i >= 0; i--) if (strands[i].dead) strands.splice(i, 1);

      const wrapped = strands.some((s) => s.wrap);
      const engage = !reduced && hand.ready && present && (e.d < P.reach + 30 || inside || wrapped);
      spring(hand, "s", "v", HAND_BIG, 16, 0.9, dt);
      spring(hand, "coat", "coatV", inside ? 160 : present ? clamp(45 - e.d, -60, 160) : -60, 9, 0.9, dt);
      const thrT = inside ? 0.57 : 0.8 - 0.2 * clamp(1 - e.d / 60, 0, 1);
      hand.thr += (thrT - hand.thr) * (1 - Math.exp(-dt * 4));
      hand.on = hand.ready && cur.present && cur.mouse && engage;

      const touching =
        inside ||
        strands.some(
          (s) => s.kind === "reach" && (s.state === "attached" || (s.state === "grow" && s.u > 0.5))
        );
      spring(hand, "m", "mV", (engage && touching) || (hand.on && inside) ? 1 : 0, 32, 1.0, dt);
      hand.m = clamp(hand.m, 0, 1);

      let tx = 0;
      let ty = 0;
      for (const s of strands) {
        if (s.kind !== "reach" || s.state !== "attached" || !s.wrap) continue;
        const a = (NP - 1) * 3;
        const b = (NP - 4) * 3;
        const dx = s.pos[b] - s.pos[a];
        const dy = s.pos[b + 1] - s.pos[a + 1];
        const dl = Math.hypot(dx, dy) || 1;
        const tension = clamp(s.stretch - 0.7, 0, 1.2) * s.wrap.prog;
        tx += (dx / dl) * tension;
        ty += (dy / dl) * tension;
      }
      const tm = Math.hypot(tx, ty);
      const grip = hand.on ? Math.min(1, tm / 1.5) * P.grip : 0;
      const ux = tm > 1e-4 ? tx / tm : 0;
      const uy = tm > 1e-4 ? ty / tm : 0;
      spring(hand, "ox", "oxV", ux * PULL_MAX * grip, 16, 0.62, dt);
      spring(hand, "oy", "oyV", uy * PULL_MAX * grip, 16, 0.62, dt);
      let dA = Math.atan2(uy, ux) - WRIST_ANG;
      dA = Math.atan2(Math.sin(dA), Math.cos(dA));
      const pullTilt = tm > 1e-4 ? clamp(dA * 0.35, -TILT_MAX, TILT_MAX) * grip : 0;
      spring(hand, "ang", "angV", clamp(cur.vx * 0.00022, -0.32, 0.32) + pullTilt, 12, 0.85, dt);

      for (const r of ripples) r.age += dt;
      while (ripples.length && ripples[0].age > 1.6) ripples.shift();

      cur.vx *= Math.exp(-dt * 8);
      cur.vy *= Math.exp(-dt * 8);
    }

    const ptsBuf = new Float32Array(MAXS * NP * 4);
    const boxBuf = new Float32Array(MAXS * 4);
    const ancBuf = new Float32Array(MAXS * 4);
    const ancDBuf = new Float32Array(MAXS * 4);
    const brBuf = new Float32Array(MAXBR * 12);
    const coilBuf = new Float32Array(MAXC * WP * 4);
    const cboxBuf = new Float32Array(MAXC * 4);
    const blobBuf = new Float32Array(MAXB * 4);
    const blobZBuf = new Float32Array(MAXB);
    const ripBuf = new Float32Array(MAXR * 4);
    const K = [2.5, 6, 5];

    function render() {
      const g = geo();
      let zTop = g.top + btn.dome + pull.amt + peak.amt * PEAK_H * P.pull + btn.lift * LIFT_H + 4;
      let maxMound = 0;

      const ns = Math.min(strands.length, MAXS);
      for (let i = 0; i < ns; i++) {
        const s = strands[i];
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, rMax = 0;
        for (let j = 0; j < NP; j++) {
          const o = (i * NP + j) * 4;
          const x = s.pos[j * 3];
          const y = s.pos[j * 3 + 1];
          const z = s.pos[j * 3 + 2];
          const r = s.rad[j];
          ptsBuf[o] = x;
          ptsBuf[o + 1] = y;
          ptsBuf[o + 2] = z;
          ptsBuf[o + 3] = r;
          x0 = Math.min(x0, x);
          y0 = Math.min(y0, y);
          x1 = Math.max(x1, x);
          y1 = Math.max(y1, y);
          rMax = Math.max(rMax, r);
          zTop = Math.max(zTop, z + r + K[1] * 0.3);
        }
        const pad = rMax + K[1] + 3;
        boxBuf.set([x0 - pad, y0 - pad, x1 + pad, y1 + pad], i * 4);
        const ax = s.pin === "anchor" ? g.cx + s.lx * g.hw : 0;
        const ay = s.pin === "anchor" ? g.cy + s.ly * g.hh : 0;
        const m = s.pin === "anchor" ? s.mound : 0;
        maxMound = Math.max(maxMound, m);
        ancBuf.set([ax, ay, m, 17], i * 4);
        ancDBuf.set([s.dirX ?? 0, s.dirY ?? -1, s.elong || 0, 0], i * 4);
      }
      zTop += maxMound;

      let nc = 0;
      if (hand.on && hand.m > 0.6) {
        for (const hair of [false, true]) {
          for (const s of strands) {
            if (nc >= MAXC) break;
            if (!s.wrap || s.wrap.prog < 0.02) continue;
            let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
            for (let j = 0; j < WP; j++) {
              const q = coilPoint(s, j / (WP - 1), hair);
              coilBuf.set(q, (nc * WP + j) * 4);
              x0 = Math.min(x0, q[0]);
              y0 = Math.min(y0, q[1]);
              x1 = Math.max(x1, q[0]);
              y1 = Math.max(y1, q[1]);
            }
            const pad = 4 + K[1];
            cboxBuf.set([x0 - pad, y0 - pad, x1 + pad, y1 + pad], nc * 4);
            nc++;
          }
        }
      }
      if (hand.on) zTop = Math.max(zTop, CURZ + handTh() + 6);
      const handOn = hand.on && hand.ready ? 1 : 0;

      ripBuf.fill(0);
      ripples.forEach((r, i) => ripBuf.set([r.x, r.y, r.age, r.amp], i * 4));

      const lb = [g.cx, g.cy + LABEL_NUDGE, btn.lbw, btn.lbh];
      const time2 = reduced ? 3 : time;

      // Pass 1
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.viewport(0, 0, W, H);
      gl!.useProgram(p1.prog);
      gl!.bindVertexArray(vao);
      const u1 = p1.u;
      gl!.uniform2f(u1.uRes, W, H);
      gl!.uniform1f(u1.uDpr, DPR);
      gl!.uniform1f(u1.uTime, time2);
      gl!.uniform4f(u1.uBtn, g.cx, g.cy, g.hw, g.hh);
      gl!.uniform4f(u1.uBtnZ2, btn.lift * LIFT_H, BEVEL, 0, 0);
      gl!.uniform4f(u1.uBtnZ, g.top, btn.sink * Math.min(1, btn.intro), btn.dome * Math.min(1, btn.intro), 0);
      gl!.uniform4f(u1.uPull, pull.x, pull.y, pull.amt, 34);
      gl!.uniform4f(u1.uPeak, peak.x, peak.y, peak.amt * PEAK_H * P.pull, 24);
      gl!.uniform1i(u1.uNS, ns);
      gl!.uniform4fv(u1.uPts, ptsBuf);
      gl!.uniform4fv(u1.uBox, boxBuf);
      gl!.uniform4fv(u1.uAnc, ancBuf);
      gl!.uniform4fv(u1.uAncD, ancDBuf);
      gl!.uniform1i(u1.uNBr, 0);
      gl!.uniform4fv(u1.uBr, brBuf);
      gl!.uniform1i(u1.uNB, 0);
      gl!.uniform4fv(u1.uBlob, blobBuf);
      gl!.uniform1fv(u1.uBlobZ, blobZBuf);
      gl!.uniform4fv(u1.uRip, ripBuf);
      gl!.uniform4f(u1.uLabelBox, lb[0], lb[1], lb[2], lb[3]);
      gl!.uniform1f(u1.uEmboss, 0.0);
      gl!.uniform1f(u1.uZTop, zTop);
      gl!.uniform3f(u1.uK, K[0], K[1], K[2]);
      gl!.uniform1i(u1.uLabel, 1);
      gl!.uniform1i(u1.uNC, nc);
      gl!.uniform4fv(u1.uCoil, coilBuf);
      gl!.uniform4fv(u1.uCBox, cboxBuf);
      gl!.uniform4f(u1.uHand, cur.x + hand.ox, cur.y + hand.oy, hand.s, handOn);
      gl!.uniform4f(u1.uHand2, Math.cos(hand.ang), Math.sin(hand.ang), CURZ, handTh());
      gl!.uniform3f(u1.uCoat, hand.coat, 22, hand.thr);
      gl!.uniform1i(u1.uHandSDF, 2);
      gl!.activeTexture(gl!.TEXTURE2);
      gl!.bindTexture(gl!.TEXTURE_2D, handSdfTex);
      gl!.uniform1i(u1.uArrowSDF, 5);
      gl!.activeTexture(gl!.TEXTURE5);
      gl!.bindTexture(gl!.TEXTURE_2D, arrowSdfTex);
      gl!.uniform1f(u1.uMorph, hand.m);
      gl!.activeTexture(gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, labelTex);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, gTex);
      gl!.generateMipmap(gl!.TEXTURE_2D);

      // Pass 2
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, cFbo);
      gl!.viewport(0, 0, W, H);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.useProgram(p2.prog);
      const u2 = p2.u;
      gl!.uniform1i(u2.uG, 0);
      gl!.uniform1i(u2.uLabel, 1);
      gl!.uniform2f(u2.uRes, W, H);
      gl!.uniform1f(u2.uDpr, DPR);
      gl!.uniform1f(u2.uTime, time2);
      gl!.uniform4f(u2.uLabelBox, lb[0], lb[1], lb[2], lb[3]);
      gl!.uniform1f(u2.uLabelAmt, 0.0);
      gl!.uniform1f(u2.uLabelLod, Math.max(0, Math.log2(LABEL_W / (2 * lb[2] * DPR)) - 0.6));
      gl!.uniform1f(u2.uIri, P.sheen);
      gl!.uniform1f(u2.uZMax, zTop);
      gl!.uniform1f(u2.uLift, btn.lift);
      gl!.uniform4f(u2.uBtnP, g.cx, g.cy, g.hw, g.hh);
      const inkHalf = (labelInkW * LABEL_CSS) / LABEL_PX / 2;
      gl!.uniform2f(u2.uWin, -(inkHalf + 14) / g.hw, 15 / g.hw);
      gl!.uniform2f(u2.uBtnH, g.top, btn.lift * LIFT_H);
      gl!.uniform4f(u2.uHand, cur.x + hand.ox, cur.y + hand.oy, hand.s, handOn);
      gl!.uniform4f(u2.uHand2, Math.cos(hand.ang), Math.sin(hand.ang), CURZ, handTh());
      gl!.uniform1i(u2.uHandCol, 3);
      gl!.activeTexture(gl!.TEXTURE3);
      gl!.bindTexture(gl!.TEXTURE_2D, handColTex);
      gl!.uniform1i(u2.uArrowCol, 6);
      gl!.activeTexture(gl!.TEXTURE6);
      gl!.bindTexture(gl!.TEXTURE_2D, arrowColTex);
      gl!.uniform1f(u2.uMorph, hand.m);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      // Pass 3 (FXAA to screen)
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, W, H);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.useProgram(p3.prog);
      gl!.uniform1i(p3.u.uC, 4);
      gl!.uniform2f(p3.u.uRes, W, H);
      gl!.activeTexture(gl!.TEXTURE4);
      gl!.bindTexture(gl!.TEXTURE_2D, cTex);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function layoutButton() {
      const rect = hitEl!.getBoundingClientRect();
      btn.cx = (rect.left + rect.width / 2) / VIEW_SCALE;
      btn.cy = (rect.top + rect.height / 2) / VIEW_SCALE;
      btn.hw = rect.width / 2 / VIEW_SCALE;
      btn.hh = rect.height / 2 / VIEW_SCALE;
      const sc = LABEL_CSS / LABEL_PX;
      btn.lbw = (LABEL_W * sc) / 2;
      btn.lbh = (LABEL_H * sc) / 2;
    }

    function resize() {
      layoutButton();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(window.innerWidth * dpr));
      H = Math.max(1, Math.round(window.innerHeight * dpr));
      canvas!.width = W;
      canvas!.height = H;
      DPR = W / viewW();
      makeGBuffer();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", layoutButton, { passive: true });
    resize();

    let last = performance.now();
    let acc = 0;
    let animId: number;

    function frame(now: number) {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.1) dt = 0.1;
      acc += dt;
      let n = 0;
      while (acc >= SUB && n < 40) {
        step(SUB);
        acc -= SUB;
        n++;
      }
      if (n === 40) acc = 0;

      const isEngaged = hand.on && document.visibilityState === "visible";
      if (isEngaged !== document.body.classList.contains("is-engaged")) {
        document.body.classList.toggle("is-engaged", isEngaged);
      }

      const rect = hitEl!.getBoundingClientRect();
      if (rect.bottom > -40 && rect.top < window.innerHeight + 40) {
        render();
      }

      animId = requestAnimationFrame(frame);
    }
    animId = requestAnimationFrame(frame);

    function insidePill(x: number, y: number) {
      return pillEdge(x, y, geo()).d < 0;
    }

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dts = Math.max(1, now - cur.t) / 1000;
      const ex = e.clientX / VIEW_SCALE;
      const ey = e.clientY / VIEW_SCALE;
      if (cur.present) {
        cur.vx = (ex - cur.lx) / dts;
        cur.vy = (ey - cur.ly) / dts;
      }
      cur.t = now;
      cur.x = cur.lx = ex;
      cur.y = cur.ly = ey;
      cur.mouse = e.pointerType === "mouse" || e.pointerType === "pen";
      cur.present = cur.mouse || cur.down;
    };

    const onPointerDown = (e: PointerEvent) => {
      cur.down = true;
      cur.x = e.clientX / VIEW_SCALE;
      cur.y = e.clientY / VIEW_SCALE;
      cur.present = true;
    };

    const onPointerUp = (e: PointerEvent) => {
      cur.down = false;
      if (e.pointerType === "touch") cur.present = false;
      if (btn.pressTarget) press(false, e.clientX / VIEW_SCALE, e.clientY / VIEW_SCALE);
    };

    const onPointerLeave = () => {
      cur.present = false;
    };

    function press(on: boolean, x = btn.cx, y = btn.cy) {
      btn.pressTarget = on ? 1 : 0;
      if (!on) {
        addRipple(x, y, 1.4);
        for (const s of strands) if (s.state === "attached") s.rest *= 0.85;
      }
    }

    const onHitPointerDown = (e: PointerEvent) => {
      if (insidePill(e.clientX / VIEW_SCALE, e.clientY / VIEW_SCALE)) press(true);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    hitEl.addEventListener("pointerdown", onHitPointerDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", layoutButton);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      hitEl.removeEventListener("pointerdown", onHitPointerDown);
      document.body.classList.remove("is-engaged");
    };
  }, [label]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="venom-canvas"
        aria-hidden="true"
      />
      <button
        ref={btnRef}
        type="button"
        className={`venom-contact-hit ${className}`}
        onClick={onClick}
        aria-label="Contact"
      >
        <span className="venom-pill-content">
          <span className="venom-dot" />
          <span className="venom-text">Contact</span>
          <span className="venom-arrow" aria-hidden="true">↗</span>
        </span>
      </button>
    </>
  );
};
