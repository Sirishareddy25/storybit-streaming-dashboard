"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

type Movie = {
  id: number | string;
  title?: string | null;
  name?: string | null;
  vote_average?: number | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  top10?: number; // optional
};

export default function MovieRow({
  movies,
  categoryTitle,
}: {
  movies: Movie[];
  categoryTitle: string;
}) {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="mb-10">
      {/* Category Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-wide">
        {categoryTitle}
      </h2>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-neutral-900 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-neutral-900 to-transparent z-20" />

        {/* Row: horizontal scroll */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
          aria-label={`${categoryTitle} carousel`}
        >
          {movies.map((m, index) => {
            const poster = m.poster_path
              ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
              : "/fallback-poster.jpg";

            const title = (m.title ?? m.name ?? "Movie") as string; // ensure string

            return (
              <div
                key={String(m.id)}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link
                  href={`/movie/${m.id}`}
                  className="block focus:outline-none"
                  aria-label={`Open details for ${title}`}
                >
                  <div
                    className={`relative w-[150px] md:w-[180px] aspect-[2/3] rounded-lg overflow-hidden shadow-lg transition-transform duration-300
                      ${hoveredId === m.id ? "scale-110 z-30" : "scale-100"}`}
                    tabIndex={0}
                    onFocus={() => setHoveredId(m.id)}
                    onBlur={() => setHoveredId(null)}
                  >
                    {/* Poster - using fill requires parent relative with explicit aspect */}
                    <Image
                      src={poster}
                      alt={`${title}`}
                      fill
                      sizes="(max-width: 768px) 150px, 180px"
                      className="object-cover"
                      // priority might be set only for hero; avoid for many posters
                    />

                    {/* Glow Blur on Hover */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        hoveredId === m.id ? "bg-black/20 backdrop-blur-sm" : "bg-transparent"
                      }`}
                    />
                  </div>
                </Link>

                {/* BADGES */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-40">
                  {typeof m.vote_average === "number" && !Number.isNaN(m.vote_average) && (
                    <span className="px-2 py-1 text-xs rounded bg-black/70 border border-white/20 text-yellow-300 font-semibold">
                      ⭐ {m.vote_average.toFixed(1)}
                    </span>
                  )}

                  {index < 10 && (
                    <span className="px-2 py-1 text-xs rounded bg-red-600 text-white font-bold shadow">
                      TOP {index + 1}
                    </span>
                  )}

                  <span className="px-2 py-1 text-xs rounded bg-white/10 text-white backdrop-blur-md">
                    HD
                  </span>
                </div>

                {/* TOOLTIP ON HOVER / FOCUS */}
                {hoveredId === m.id && (
                  <div
                    // We'll keep tooltip width limited and use transform to avoid overflow
                    className="absolute left-0 top-full mt-2 w-64 p-3 rounded-lg bg-zinc-900 text-white shadow-xl border border-white/10 animate-fadeIn z-50"
                    role="dialog"
                    aria-label={`${title} quick info`}
                  >
                    <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                    <p className="text-xs text-white/70 line-clamp-3">
                      {m.vote_average
                        ? `Rating: ${m.vote_average.toFixed(1)} — High-quality movie from TMDB.`
                        : "High-quality movie from TMDB. Click for more details."}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
