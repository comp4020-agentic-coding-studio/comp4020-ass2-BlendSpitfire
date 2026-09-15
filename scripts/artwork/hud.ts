/* Generates the link-preview card: a head-up display symbology set, drawn in
 * the Slop palette rather than HUD green so it stays in the house two inks.
 *
 *   node scripts/artwork/hud.ts
 *
 * Writes src/assets/images/card.png only. The home page hero is a photograph,
 * so this deliberately does not touch hero-home.avif. */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const GOLD = "#b97d1c";
const BRONZE = "#8a5c13";
const GREY = "#6b6154";
const GROUND = "#14110b";

interface Spec {
  width: number;
  height: number;
  label?: string;
}

/** Pitch ladder rungs, in degrees. Negative rungs are dashed, which is the
 *  convention that tells you at a glance which side of the horizon you are on. */
const RUNGS = [-10, -5, 5, 10];

function pitchLadder(
  cx: number,
  cy: number,
  pxPerDeg: number,
  scale: number,
  fits: (y: number) => boolean,
): string {
  const half = 132 * scale;
  const gap = 46 * scale;
  const tick = 11 * scale;

  return RUNGS.filter((deg) => fits(cy - deg * pxPerDeg)).map((deg) => {
    const y = cy - deg * pxPerDeg;
    const down = deg < 0;
    const dash = down ? ` stroke-dasharray="${13 * scale} ${9 * scale}"` : "";
    const tipY = down ? y - tick : y + tick;
    const label = String(Math.abs(deg)).padStart(2, "0");

    return `
    <g stroke="${GOLD}" stroke-width="${2.2 * scale}" fill="none" stroke-linecap="square">
      <path d="M ${cx - half} ${y} H ${cx - gap}"${dash} />
      <path d="M ${cx - gap} ${y} V ${tipY}" />
      <path d="M ${cx + gap} ${y} H ${cx + half}"${dash} />
      <path d="M ${cx + gap} ${y} V ${tipY}" />
    </g>
    <text x="${cx - half - 12 * scale}" y="${y + 6 * scale}" fill="${GOLD}"
      font-family="monospace" font-size="${21 * scale}" text-anchor="end">${label}</text>
    <text x="${cx + half + 12 * scale}" y="${y + 6 * scale}" fill="${GOLD}"
      font-family="monospace" font-size="${21 * scale}">${label}</text>`;
  }).join("");
}

/** The flight path marker: where the aircraft is actually going, as opposed to
 *  where it is pointing. Sits slightly low and left of centre here — a real one
 *  rarely sits in the middle of anything. */
function flightPathMarker(x: number, y: number, scale: number): string {
  const r = 15 * scale;
  const wing = 26 * scale;
  return `
  <g stroke="${GOLD}" stroke-width="${2.8 * scale}" fill="none" stroke-linecap="square">
    <circle cx="${x}" cy="${y}" r="${r}" />
    <path d="M ${x - r} ${y} H ${x - r - wing}" />
    <path d="M ${x + r} ${y} H ${x + r + wing}" />
    <path d="M ${x} ${y - r} V ${y - r - wing * 0.62}" />
  </g>`;
}

/** The angle-of-attack bracket, which is the instrument the approach is
 *  actually flown on. On speed is the bracket aligned with the marker. */
function aoaBracket(x: number, y: number, scale: number): string {
  const h = 30 * scale;
  const w = 13 * scale;
  return `
  <g stroke="${GOLD}" stroke-width="${2.8 * scale}" fill="none" stroke-linecap="square">
    <path d="M ${x + w} ${y - h} H ${x} V ${y + h} H ${x + w}" />
  </g>`;
}

function tape(
  x: number,
  cy: number,
  values: number[],
  scale: number,
  align: "left" | "right",
): string {
  const step = 40 * scale;
  const tick = 14 * scale;
  const dir = align === "left" ? 1 : -1;
  const mid = (values.length - 1) / 2;

  const marks = values
    .map((value, i) => {
      const y = cy + (i - mid) * step;
      const major = value % 2 === 0;
      const len = major ? tick : tick * 0.55;
      const text = major
        ? `<text x="${x + dir * (len + 10 * scale)}" y="${y + 7 * scale}" fill="${GOLD}"
             font-family="monospace" font-size="${22 * scale}"
             text-anchor="${align === "left" ? "start" : "end"}">${value}0</text>`
        : "";
      return `<path d="M ${x} ${y} H ${x + dir * len}" />${text}`;
    })
    .join("");

  const span = ((values.length - 1) / 2) * step + 26 * scale;
  return `
  <g stroke="${GOLD}" stroke-width="${2.2 * scale}" fill="none" stroke-linecap="square">
    <path d="M ${x} ${cy - span} V ${cy + span}" />
    ${marks}
  </g>
  <g stroke="${GOLD}" stroke-width="${2.6 * scale}" fill="none">
    <path d="M ${x + dir * 3 * scale} ${cy - 13 * scale} L ${x + dir * 20 * scale} ${cy}
             L ${x + dir * 3 * scale} ${cy + 13 * scale}" />
  </g>`;
}

function headingScale(cx: number, y: number, scale: number): string {
  const step = 66 * scale;
  const headings = [33, 34, 35, 36, 1, 2, 3];
  const mid = (headings.length - 1) / 2;

  const marks = headings
    .map((h, i) => {
      const x = cx + (i - mid) * step;
      return `
      <path d="M ${x} ${y} V ${y + 13 * scale}" />
      <text x="${x}" y="${y + 38 * scale}" fill="${GOLD}" stroke="none"
        font-family="monospace" font-size="${21 * scale}" text-anchor="middle">${String(h).padStart(2, "0")}</text>`;
    })
    .join("");

  return `
  <g stroke="${GOLD}" stroke-width="${2.2 * scale}" fill="${GOLD}" stroke-linecap="square">
    <path d="M ${cx - mid * step - 30 * scale} ${y} H ${cx + mid * step + 30 * scale}" stroke-width="${2.2 * scale}" fill="none" />
    ${marks}
  </g>
  <g stroke="${GOLD}" stroke-width="${2.6 * scale}" fill="none">
    <path d="M ${cx - 11 * scale} ${y - 15 * scale} L ${cx} ${y - 2 * scale} L ${cx + 11 * scale} ${y - 15 * scale}" />
  </g>`;
}

function hudSvg({ width, height, label }: Spec): string {
  const scale = height / 900;
  const cx = width / 2;
  const cy = height / 2 + 16 * scale;
  const pxPerDeg = height / 30;

  const headingY = height * 0.11;
  const fits = (y: number): boolean => y > headingY + 58 * scale && y < height - 70 * scale;

  // Off-centre on purpose: the aircraft is drifting right of where it is
  // pointed, which is the whole reason the marker is a separate symbol.
  const fpmX = cx + 58 * scale;
  const fpmY = cy + 62 * scale;

  const horizonHalf = Math.min(width * 0.3, 330 * scale);
  const endTick = 14 * scale;
  const caption = label
    ? `<text x="${56 * scale}" y="${height - 48 * scale}" fill="${GOLD}"
         font-family="monospace" font-size="${34 * scale}" letter-spacing="${3 * scale}">${label}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${GROUND}" />

  <g stroke="${BRONZE}" stroke-width="${2.8 * scale}" fill="none" stroke-linecap="square">
    <path d="M ${cx - horizonHalf} ${cy + endTick} V ${cy} H ${cx - 46 * scale}" />
    <path d="M ${cx + 46 * scale} ${cy} H ${cx + horizonHalf} V ${cy + endTick}" />
  </g>

  ${pitchLadder(cx, cy, pxPerDeg, scale, fits)}
  ${aoaBracket(fpmX - 64 * scale, fpmY, scale)}
  ${flightPathMarker(fpmX, fpmY, scale)}
  ${tape(Math.max(96 * scale, width * 0.11), cy, [28, 29, 30, 31, 32], scale, "left")}
  ${tape(width - Math.max(96 * scale, width * 0.11), cy, [14, 15, 16, 17, 18], scale, "right")}
  ${headingScale(cx, headingY, scale)}
  ${caption}
</svg>`;
}

async function write(spec: Spec, out: string, format: "avif" | "png"): Promise<void> {
  const path = resolve(out);
  mkdirSync(dirname(path), { recursive: true });
  const svg = Buffer.from(hudSvg(spec));
  const image = sharp(svg, { density: 144 });
  const buffer =
    format === "avif"
      ? await image.avif({ quality: 62 }).toBuffer()
      : await image.png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(path, buffer);
  console.log(`${out} — ${spec.width}x${spec.height}, ${(buffer.length / 1024).toFixed(0)} kB`);
}

await write(
  { width: 1200, height: 630, label: "SLOP4386" },
  "src/assets/images/card.png",
  "png",
);
