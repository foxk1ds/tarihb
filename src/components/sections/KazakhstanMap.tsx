"use client";

import { useId, useState, type ReactNode } from "react";
import { Compass } from "lucide-react";
import { KAZ_PATH, KAZ_VIEWBOX, MAP_CITIES, NEIGHBOURS, TEST_SITE } from "@/lib/geo";
import { useLanguage } from "@/components/providers/LanguageContext";
import { cx } from "@/lib/utils";

type CityEntry = {
  city: string;
  label: string;
  detail: string;
  marker: string;
};

type KazakhstanMapProps = {
  cities: readonly CityEntry[];
  activeCityId?: string | null;
  onCitySelect?: (id: string) => void;
  className?: string;
  children?: ReactNode;
};

const MAP_HEIGHT = 720;
const MAP_OFFSET_Y = 50;

const cityCoordinates = MAP_CITIES.filter((city) => city.id !== "astana");

function positionStyle(x: number, y: number) {
  return {
    left: `${(x / 1000) * 100}%`,
    top: `${((y + MAP_OFFSET_Y) / MAP_HEIGHT) * 100}%`
  };
}

function formatCoordinates(lat: number, lon: number) {
  return `${Math.abs(lat).toFixed(1)}° ${lat >= 0 ? "N" : "S"} · ${Math.abs(lon).toFixed(1)}° ${lon >= 0 ? "E" : "W"}`;
}

export function KazakhstanMap({
  cities,
  activeCityId,
  onCitySelect,
  className,
  children
}: KazakhstanMapProps) {
  const { dictionary } = useLanguage();
  const [internalActive, setInternalActive] = useState<string | null>(null);
  const patternId = useId().replace(/:/g, "");
  const clipId = `kaz-clip-${patternId}`;
  const dotId = `kaz-dots-${patternId}`;
  const gradientId = `kaz-fill-${patternId}`;
  const glowId = `site-glow-${patternId}`;

  const active = activeCityId !== undefined ? activeCityId : internalActive;

  const handleSelect = (id: string) => {
    if (onCitySelect) onCitySelect(id);
    else setInternalActive((current) => (current === id ? null : id));
  };

  return (
    <div
      className={cx("map-shell grain", className)}
      role="group"
      aria-label={dictionary.ui.mapEyebrow}
    >
      <div className="relative aspect-[1000/720] w-full">
        <span aria-hidden="true" className="absolute left-3 top-3 z-20 h-3 w-3 border-l border-t border-white/20" />
        <span aria-hidden="true" className="absolute right-3 top-3 z-20 h-3 w-3 border-r border-t border-white/20" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 z-20 h-3 w-3 border-b border-l border-white/20" />
        <span aria-hidden="true" className="absolute bottom-3 right-3 z-20 h-3 w-3 border-b border-r border-white/20" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-4 sm:p-5">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#080b10]/70 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-crimson" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-300 sm:text-[9px]">
              {dictionary.ui.testSite}
            </span>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-500 sm:text-[9px]">
              {dictionary.ui.mapCoords}
            </p>
            <p className="mt-1 hidden font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600 sm:block">
              {dictionary.ui.mapEyebrow}
            </p>
          </div>
        </div>

        <svg
          viewBox={KAZ_VIEWBOX}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F59E0B" stopOpacity="0.22" />
              <stop offset="0.52" stopColor="#B45309" stopOpacity="0.1" />
              <stop offset="1" stopColor="#78350F" stopOpacity="0.03" />
            </linearGradient>
            <radialGradient id={glowId}>
              <stop offset="0" stopColor="#E5484D" stopOpacity="0.34" />
              <stop offset="0.55" stopColor="#E5484D" stopOpacity="0.08" />
              <stop offset="1" stopColor="#E5484D" stopOpacity="0" />
            </radialGradient>
            <pattern id={dotId} width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.65" fill="rgba(255,255,255,0.14)" />
            </pattern>
            <clipPath id={clipId}>
              <path d={KAZ_PATH} />
            </clipPath>
          </defs>

          <g>
            {NEIGHBOURS.map((country) => (
              <path key={country.code} d={country.d} className="map-neighbour" />
            ))}
          </g>

          <path
            d={KAZ_PATH}
            fill={`url(#${gradientId})`}
            stroke="rgba(252,211,77,0.55)"
            strokeWidth="1.2"
            fillRule="evenodd"
            style={{ filter: "drop-shadow(0 0 26px rgba(245,158,11,.16))" }}
          />

          <g clipPath={`url(#${clipId})`}>
            <rect x="0" y="-50" width="1000" height="720" fill={`url(#${dotId})`} opacity="0.4" />
            <g stroke="rgba(252,211,77,0.11)" strokeWidth="0.6" opacity="0.7">
              {[90, 190, 290, 390, 490, 590].map((y) => (
                <line key={`h-${y}`} x1="0" y1={y} x2="1000" y2={y} />
              ))}
              {[150, 300, 450, 600, 750, 900].map((x) => (
                <line key={`v-${x}`} x1={x} y1="-50" x2={x} y2="670" />
              ))}
            </g>
            <g fill="none" stroke="rgba(229,72,77,0.28)" strokeWidth="0.75">
              <circle cx={TEST_SITE.x} cy={TEST_SITE.y} r="42" strokeDasharray="2 5" />
              <circle cx={TEST_SITE.x} cy={TEST_SITE.y} r="78" strokeDasharray="2 7" strokeOpacity="0.7" />
              <circle cx={TEST_SITE.x} cy={TEST_SITE.y} r="118" strokeDasharray="2 9" strokeOpacity="0.42" />
            </g>
            <g fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6">
              <ellipse cx="420" cy="330" rx="250" ry="120" />
              <ellipse cx="500" cy="390" rx="330" ry="170" />
            </g>
          </g>

          <path
            d={KAZ_PATH}
            fill="none"
            stroke="rgba(252,211,77,0.22)"
            strokeWidth="5"
            strokeLinejoin="round"
            opacity="0.4"
            style={{ filter: "blur(6px)" }}
          />

          <text
            x="330"
            y="405"
            fill="rgba(255,255,255,0.075)"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="24"
            letterSpacing="13"
          >
            QAZAQSTAN
          </text>
          <text
            x="330"
            y="432"
            fill="rgba(251,191,36,0.22)"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="9"
            letterSpacing="5"
          >
            1949 — 1989
          </text>

          <circle cx={TEST_SITE.x} cy={TEST_SITE.y} r="46" fill={`url(#${glowId})`} />
          <circle
            cx={TEST_SITE.x}
            cy={TEST_SITE.y}
            r="12"
            fill="none"
            stroke="rgba(229,72,77,0.55)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
          />
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-scan bg-gradient-to-r from-transparent via-amber-300/[0.055] to-transparent"
        />

        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={positionStyle(TEST_SITE.x, TEST_SITE.y)}
        >
          <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-crimson/50" />
          <span
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-crimson/40"
            style={{ animationDelay: "1.1s" }}
          />
          <span className="relative grid h-4 w-4 place-items-center rounded-full border border-crimson/70 bg-[#1a0d0f] shadow-[0_0_20px_rgba(229,72,77,.5)]">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
          </span>
          <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-full border border-crimson/25 bg-[#120a0c]/85 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-crimson-400 backdrop-blur-sm">
            {dictionary.ui.testSite}
          </span>
        </div>

        {cities.map((city, index) => {
          const coordinate = cityCoordinates[index];
          if (!coordinate) return null;
          const isActive = active === coordinate.id;
          const alignEnd = coordinate.id === "oskemen";

          return (
            <button
              key={coordinate.id}
              type="button"
              onClick={() => handleSelect(coordinate.id)}
              className="map-marker group text-left"
              style={positionStyle(coordinate.x, coordinate.y)}
              data-active={isActive}
              aria-label={`${city.city} — ${city.label}`}
              aria-pressed={isActive}
            >
              <span className="map-marker-dot" />
              <span
                className={cx(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.15em] transition-colors duration-300 sm:text-[9px]",
                  alignEnd ? "right-5 text-right" : "left-5",
                  isActive ? "text-amber-300" : "text-zinc-400 group-hover:text-amber-200"
                )}
              >
                <span className="hidden sm:inline">{city.city}</span>
                <span className="sm:hidden">{city.marker}</span>
              </span>
              <span
                className={cx(
                  "map-tooltip top-full mt-3",
                  alignEnd && "map-tooltip--start"
                )}
              >
                <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-amber-400">
                  {city.marker} · {city.city}
                </span>
                <span className="mt-1 block text-xs font-semibold text-zinc-100">{city.label}</span>
                <span className="mt-1 block text-[11px] leading-5 text-zinc-400">{city.detail}</span>
                <span className="mt-2 block border-t border-white/10 pt-2 font-mono text-[8px] text-zinc-500">
                  {formatCoordinates(coordinate.lat, coordinate.lon)}
                </span>
              </span>
            </button>
          );
        })}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-full border border-white/10 bg-[#080b10]/70 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-400 backdrop-blur-md">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {dictionary.ui.legendCity}
            </span>
            <span className="h-2.5 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              {dictionary.ui.legendSite}
            </span>
          </div>
          <span className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-600 sm:flex">
            <Compass className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.5} />
            N 48°
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}
