import type { CSSProperties } from "react";

/*
 * Vector recreations of the REZE packaging: matte navy boxes with the
 * letterspaced wordmark and the vertical "meridian" gradient line,
 * plus the Day (slate) and Night (violet) stick packets.
 */

type Accent = "day" | "night" | "duo" | "core";

const meridianStops: Record<Accent, [string, string, string]> = {
  day: ["#d3e3f7", "#7e9cc4", "#45628c"],
  night: ["#cec2f8", "#8d7fd6", "#443a85"],
  duo: ["#d3e3f7", "#8d9ccf", "#584c9e"],
  core: ["#aac5e7", "#8d7fd6", "#443a85"],
};

const packetStops: Record<string, [string, string]> = {
  day: ["#8ba7cd", "#63799f"],
  night: ["#8d7fd6", "#5f52ad"],
  core: ["#7f8fd0", "#585597"],
};

function Meridian({
  id,
  accent,
  x,
  y,
  h,
  w = 2.4,
}: {
  id: string;
  accent: Accent;
  x: number;
  y: number;
  h: number;
  w?: number;
}) {
  const [a, b, c] = meridianStops[accent];
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="55%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
      </defs>
      <rect x={x - w / 2} y={y} width={w} height={h} rx={w / 2} fill={`url(#${id})`} />
    </>
  );
}

const boxText: CSSProperties = {
  fontFamily: "var(--font-body)",
  fill: "#dfe5f1",
};

export function BoxFront({
  accent,
  width = 190,
  label,
  sublabel,
  spec,
  className,
}: {
  accent: Exclude<Accent, "duo">;
  width?: number;
  label: string;
  sublabel: string;
  spec?: string;
  className?: string;
}) {
  const specLine = spec ?? specLineFor(accent);
  const uid = `box-${accent}`;
  return (
    <svg
      viewBox="0 0 200 244"
      width={width}
      height={(width / 200) * 244}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b2947" />
          <stop offset="48%" stopColor="#111c33" />
          <stop offset="100%" stopColor="#0d1526" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="188" height="232" rx="7" fill={`url(#${uid}-sheen)`} />
      <rect
        x="6.5"
        y="6.5"
        width="187"
        height="231"
        rx="6.5"
        fill="none"
        stroke="rgba(223,229,241,0.14)"
      />
      {/* lid seam */}
      <line x1="6" y1="58" x2="194" y2="58" stroke="rgba(7,12,23,0.45)" strokeWidth="1" />
      <text
        x="100"
        y="42"
        textAnchor="middle"
        style={{ ...boxText, fontSize: 16, letterSpacing: 9 }}
      >
        REZE
      </text>
      <Meridian id={`${uid}-line`} accent={accent} x={100} y={82} h={58} />
      <text
        x="100"
        y="172"
        textAnchor="middle"
        style={{ ...boxText, fontSize: 11, letterSpacing: 6 }}
      >
        {label.toUpperCase()}
      </text>
      <text
        x="100"
        y="190"
        textAnchor="middle"
        style={{ ...boxText, fontSize: 6, letterSpacing: 2.4, fill: "#8d97ad" }}
      >
        {sublabel.toUpperCase()}
      </text>
      <text
        x="100"
        y="216"
        textAnchor="middle"
        style={{ ...boxText, fontSize: 5.4, letterSpacing: 1.6, fill: "#6e7a96" }}
      >
        {specLine}
      </text>
    </svg>
  );
}

export function Packet({
  accent,
  width = 76,
  label,
  grams = "5G",
  className,
}: {
  accent: "day" | "night" | "core";
  width?: number;
  label: string;
  grams?: string;
  className?: string;
}) {
  const uid = `pk-${accent}`;
  const [top, bottom] = packetStops[accent];
  return (
    <svg
      viewBox="0 0 90 224"
      width={width}
      height={(width / 90) * 224}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
        <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="5" y="4" width="80" height="216" rx="8" fill={`url(#${uid}-body)`} />
      <rect x="5" y="4" width="80" height="216" rx="8" fill={`url(#${uid}-shine)`} />
      {/* crimped seals */}
      {[10, 14, 18].map((y) => (
        <line key={y} x1="9" y1={y} x2="81" y2={y} stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      ))}
      {[206, 210, 214].map((y) => (
        <line key={y} x1="9" y1={y} x2="81" y2={y} stroke="rgba(7,12,23,0.22)" strokeWidth="1" />
      ))}
      <text
        x="45"
        y="62"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-body)", fontSize: 10.5, letterSpacing: 5.5, fill: "#f2f4fa" }}
      >
        REZE
      </text>
      <rect x="43.9" y="84" width="2.2" height="44" rx="1.1" fill="rgba(245,247,252,0.9)" />
      <text
        x="45"
        y="160"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-body)", fontSize: 8.5, letterSpacing: 4.2, fill: "#f2f4fa" }}
      >
        {label.toUpperCase()}
      </text>
      <text
        x="45"
        y="186"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)", fontSize: 6, letterSpacing: 2, fill: "rgba(242,244,250,0.75)" }}
      >
        {grams}
      </text>
    </svg>
  );
}

/** Two Day capsules — slate-blue cap, porcelain body. */
export function Capsules({ width = 150, className }: { width?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 170 120"
      width={width}
      height={(width / 170) * 120}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cap-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a3bde0" />
          <stop offset="100%" stopColor="#6d89b4" />
        </linearGradient>
        <linearGradient id="cap-white" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dfe6f0" />
        </linearGradient>
      </defs>
      {/* rear capsule */}
      <g transform="rotate(-24 100 52)">
        <rect x="55" y="38" width="92" height="30" rx="15" fill="url(#cap-white)" />
        <rect x="55" y="38" width="46" height="30" rx="15" fill="url(#cap-blue)" />
        <rect x="93" y="38" width="8" height="30" fill="url(#cap-blue)" />
        <rect x="60" y="43" width="80" height="5" rx="2.5" fill="#ffffff" opacity="0.35" />
      </g>
      {/* front capsule */}
      <g transform="rotate(14 78 84)">
        <rect x="22" y="68" width="92" height="30" rx="15" fill="url(#cap-white)" />
        <rect x="22" y="68" width="46" height="30" rx="15" fill="url(#cap-blue)" />
        <rect x="60" y="68" width="8" height="30" fill="url(#cap-blue)" />
        <rect x="27" y="73" width="80" height="5" rx="2.5" fill="#ffffff" opacity="0.35" />
      </g>
    </svg>
  );
}

export function DuoBox({ width = 300, className }: { width?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 320 250"
      width={width}
      height={(width / 320) * 250}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="duo-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2947" />
          <stop offset="100%" stopColor="#101a30" />
        </linearGradient>
        <linearGradient id="duo-tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1526" />
          <stop offset="100%" stopColor="#131f39" />
        </linearGradient>
      </defs>
      {/* open lid */}
      <rect x="26" y="6" width="268" height="92" rx="6" fill="url(#duo-lid)" />
      <rect x="26.5" y="6.5" width="267" height="91" rx="5.5" fill="none" stroke="rgba(223,229,241,0.13)" />
      <text
        x="160"
        y="42"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-body)", fontSize: 9.5, letterSpacing: 4.4, fill: "#dfe5f1" }}
      >
        RESET. RESTORE. RISE.
      </text>
      {/* crescent moon */}
      <path
        d="M160 58 a9 9 0 1 0 7 14.5 a7.2 7.2 0 1 1 -7 -14.5 z"
        fill="none"
        stroke="#aab4ca"
        strokeWidth="1.4"
        transform="rotate(-18 160 66)"
      />
      {/* tray */}
      <rect x="14" y="104" width="292" height="140" rx="7" fill="url(#duo-tray)" />
      <rect x="14.5" y="104.5" width="291" height="139" rx="6.5" fill="none" stroke="rgba(223,229,241,0.15)" />
      {/* inner boxes */}
      {(
        [
          { x: 30, accent: "day", label: "DAY" },
          { x: 162, accent: "night", label: "NIGHT" },
        ] as const
      ).map(({ x, accent, label }) => (
        <g key={accent}>
          <rect x={x} y="118" width="128" height="112" rx="4" fill="#16233f" />
          <rect
            x={x + 0.5}
            y="118.5"
            width="127"
            height="111"
            rx="3.5"
            fill="none"
            stroke="rgba(223,229,241,0.12)"
          />
          <text
            x={x + 64}
            y="152"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 6, fill: "#dfe5f1" }}
          >
            REZE
          </text>
          <Meridian id={`duo-${accent}`} accent={accent} x={x + 64} y={164} h={34} w={2} />
          <text
            x={x + 64}
            y="216"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-body)", fontSize: 7.5, letterSpacing: 3.6, fill: "#aab4ca" }}
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ProductArt({
  accent,
  size = "card",
}: {
  accent: Accent;
  size?: "card" | "stage" | "thumb";
}) {
  const w = size === "stage" ? 300 : size === "thumb" ? 40 : 200;
  if (accent === "duo") {
    return <DuoBox width={size === "thumb" ? 52 : w + 40} />;
  }
  if (size === "thumb") {
    return <BoxFront accent={accent} width={44} label={labelFor(accent)} sublabel="" />;
  }
  return (
    <BoxFront
      accent={accent}
      width={size === "stage" ? 230 : 170}
      label={labelFor(accent)}
      sublabel={sublabelFor(accent)}
    />
  );
}

function labelFor(accent: Exclude<Accent, "duo">): string {
  return accent === "day" ? "Day" : accent === "night" ? "Night" : "Core";
}

function sublabelFor(accent: Exclude<Accent, "duo">): string {
  return accent === "day"
    ? "Daily Support*"
    : accent === "night"
      ? "Nighttime Support*"
      : "Longevity Support*";
}

function specLineFor(accent: Exclude<Accent, "duo">): string {
  return accent === "day"
    ? "DIETARY SUPPLEMENT · 60 CAPSULES"
    : accent === "night"
      ? "DIETARY SUPPLEMENT · 30 – 10G PACKETS"
      : "DIETARY SUPPLEMENT · 30 – 5G PACKETS";
}
