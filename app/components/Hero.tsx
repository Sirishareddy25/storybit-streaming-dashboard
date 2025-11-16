// app/components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export type Movie = {
  id?: number | string;
  title?: string | null;
  name?: string | null;
  overview?: string | null;
  backdrop_path?: string | null;
  poster_path?: string | null;
};

export default function Hero({ movie }: { movie?: Movie | null }) {
  if (!movie) return null;

  const title = movie.title ?? movie.name ?? "Untitled";
  const overview = movie.overview ?? "No description available.";

  // Correct TMDB URL + fallback poster
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "/fallback-hero.jpg"; // final safety fallback

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] rounded-xl overflow-hidden mb-12">
      {/* Background Image */}
      <Image
        src={backdrop}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* Hero Content */}
      <div className="absolute bottom-10 left-10 z-20 max-w-2xl pr-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
          {title}
        </h1>

        <p className="mt-4 text-sm md:text-lg text-white/85 line-clamp-3 drop-shadow">
          {overview}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center gap-3 bg-white text-black px-6 py-2.5 rounded-md font-semibold shadow hover:brightness-95 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3v18l15-9z" />
            </svg>
            Play
          </Link>

          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2 rounded-md font-medium border border-white/20 hover:bg-white/30 transition backdrop-blur-sm"
          >
            More Info
          </Link>
        </div>
      </div>

      {/* Bottom shadow for smooth transition into next row */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />
    </section>
  );
}
