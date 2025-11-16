"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { searchMovies } from "../lib/tmdb";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 1) {
        const data = await searchMovies(query);
        setResults(data);
      } else {
        setResults([]);
      }
      setTyping(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="pt-24 px-6 md:px-12 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setTyping(true);
        }}
        placeholder="Search for movies..."
        className="w-full max-w-xl px-4 py-3 rounded-lg bg-zinc-900 border border-white/10 shadow focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      {query.length > 1 && results.length > 0 && (
        <p className="mt-4 mb-2 text-white/60">
          Results for <span className="text-white font-semibold">"{query}"</span>
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
        {results.map((movie) => {
          const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/fallback-poster.jpg";

          return (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group relative"
            >
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg transform transition group-hover:scale-105">
                <Image
                  src={poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="mt-2 text-sm group-hover:text-red-400 transition">
                {movie.title}
              </p>
            </Link>
          );
        })}
      </div>

      {query.length > 1 && results.length === 0 && (
        <p className="mt-6 text-white/70">No results found.</p>
      )}
    </div>
  );
}
