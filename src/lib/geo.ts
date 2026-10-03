// Abstract, hand-drawn GTA basemap. No tile provider, no API key, no price bubbles.
export const BOUNDS = { west: -79.95, east: -79.20, south: 43.33, north: 44.06 };
export const VB = { w: 900, h: 1000 };

export function project(lng: number, lat: number) {
  const x = ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VB.w;
  const y = VB.h - ((lat - BOUNDS.south) / (BOUNDS.north - BOUNDS.south)) * VB.h;
  return { x, y };
}

const pt = (lng: number, lat: number) => { const p = project(lng, lat); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; };
const poly = (coords: [number, number][]) => coords.map(([lng, lat]) => pt(lng, lat)).join(" ");

// Lake Ontario north shore, west to east, then closed off the bottom/right of the frame.
export const LAKE = `M ${poly([
  [-79.95, 43.35], [-79.86, 43.32], [-79.79, 43.325], [-79.74, 43.36], [-79.70, 43.40],
  [-79.665, 43.45], [-79.62, 43.505], [-79.56, 43.555], [-79.49, 43.595], [-79.42, 43.625],
  [-79.38, 43.635], [-79.33, 43.645], [-79.28, 43.665], [-79.24, 43.695], [-79.20, 43.735],
])} L ${pt(-79.20, 43.33)} Z`;

// Escarpment / greenbelt suggestion (Niagara Escarpment running NE)
export const ESCARP = `M ${poly([
  [-79.95, 43.46], [-79.90, 43.52], [-79.86, 43.60], [-79.83, 43.70], [-79.80, 43.80],
  [-79.78, 43.92], [-79.74, 44.02],
])}`;

export const ROADS: { d: string; label: string; lx: number; ly: number }[] = [
  { d: `M ${poly([[-79.95,43.38],[-79.82,43.35],[-79.72,43.40],[-79.64,43.50],[-79.55,43.58],[-79.47,43.61],[-79.39,43.635]])}`, label: "QEW", lx: -79.74, ly: 43.415 },
  { d: `M ${poly([[-79.95,43.60],[-79.80,43.61],[-79.66,43.625],[-79.52,43.655],[-79.38,43.68],[-79.26,43.745],[-79.20,43.79]])}`, label: "401", lx: -79.86, ly: 43.607 },
  { d: `M ${poly([[-79.95,43.52],[-79.82,43.58],[-79.70,43.70],[-79.58,43.78],[-79.44,43.845],[-79.30,43.87],[-79.20,43.88]])}`, label: "407", lx: -79.67, ly: 43.735 },
  { d: `M ${poly([[-79.535,43.62],[-79.525,43.74],[-79.515,43.86],[-79.51,44.00]])}`, label: "400", lx: -79.533, ly: 43.965 },
  { d: `M ${poly([[-79.345,43.71],[-79.375,43.80],[-79.41,43.90],[-79.44,44.02]])}`, label: "404", lx: -79.452, ly: 44.01 },
];

export const PLACES: { name: string; lng: number; lat: number; big?: boolean }[] = [
  { name: "Toronto", lng: -79.383, lat: 43.653, big: true },
  { name: "Mississauga", lng: -79.642, lat: 43.589, big: true },
  { name: "Oakville", lng: -79.687, lat: 43.451, big: true },
  { name: "Vaughan", lng: -79.508, lat: 43.837, big: true },
  { name: "Burlington", lng: -79.799, lat: 43.336 },
  { name: "Milton", lng: -79.877, lat: 43.518 },
  { name: "Brampton", lng: -79.760, lat: 43.685 },
  { name: "Etobicoke", lng: -79.552, lat: 43.640 },
  { name: "Woodbridge", lng: -79.597, lat: 43.780 },
  { name: "Maple", lng: -79.509, lat: 43.860 },
  { name: "Richmond Hill", lng: -79.439, lat: 43.882 },
  { name: "Markham", lng: -79.338, lat: 43.870 },
  { name: "Aurora", lng: -79.463, lat: 44.000 },
  { name: "King City", lng: -79.528, lat: 43.928 },
  { name: "Scarborough", lng: -79.245, lat: 43.775 },
];
