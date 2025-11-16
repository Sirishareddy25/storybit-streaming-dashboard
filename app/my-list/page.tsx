import Image from "next/image";
import Link from "next/link";
import { fetchTrendingMovies } from "../lib/tmdb";

export default async function MyListPage() {
  const movies = await fetchTrendingMovies();

  const shuffled = (movies ?? []).sort(() => 0.5 - Math.random());
  const myListMovies = shuffled.slice(0, 6);

  return (
    <section className="w-full bg-gradient-to-br from-neutral-900/70 to-neutral-800/60 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-white">My List</h1>
        <p className="text-white/80 mb-8 max-w-2xl">
          These are some random movies saved to your list.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {myListMovies.map((movie: any) => (
            <Link
  key={movie?.id ?? Math.random()}
  href={`/movie/${movie?.id ?? ""}`}
  className="rounded-xl overflow-hidden bg-black/40 shadow-lg"
>
  <div className="relative w-full h-[420px] md:h-[460px]">
    <Image
      src={
        movie?.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/fallback-poster.jpg"
      }
      alt="Movie Poster"
      fill
      sizes="(max-width: 768px) 50vw, 33vw"
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
  </div>

  <div className="px-3 py-4">
    <h2 className="text-white font-semibold line-clamp-1">
      {movie?.title ?? movie?.name}
    </h2>

    <p className="text-sm text-white/60 mt-1 line-clamp-2">
      {movie?.overview
        ? movie.overview.slice(0, 100) + "..."
        : "No overview available."}
    </p>
  </div>
</Link>

          ))}
        </div>
      </div>
    </section>
  );
}
