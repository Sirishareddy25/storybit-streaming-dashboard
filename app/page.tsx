// app/page.tsx
import React from "react";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import { fetchPopularMovies, fetchTrendingMovies } from "./lib/tmdb";
import type { Movie } from "@/types/Movie";

export default async function Home() {
  // Fetch data server-side (safe fallbacks in lib/tmdb)
  const popular: Movie[] = await fetchPopularMovies();
  const trending: Movie[] = await fetchTrendingMovies();

  // Choose hero movie (first popular or trending fallback)
  const heroMovie = (popular && popular.length > 0 ? popular[0] : trending[0]) ?? null;

  return (
    <main className="pt-24 px-6 md:px-12">
      {/* Hero */}
      {heroMovie ? <Hero movie={heroMovie} /> : null}

      {/* Example rows */}
      <div className="max-w-6xl mx-auto">
        <MovieRow categoryTitle="Top Picks For You" movies={popular ?? []} />
        <MovieRow categoryTitle="Trending Now" movies={trending ?? []} />
      </div>
    </main>
  );
}
