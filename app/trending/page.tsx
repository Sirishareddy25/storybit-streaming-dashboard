import Image from "next/image";
import Link from "next/link";
import { fetchTrendingMovies } from "../lib/tmdb";


export default async function TrendingPage() {
  const movies = await fetchTrendingMovies();

  return (
    <div className="max-w-6xl mx-auto pt-10">
      <h1 className="text-4xl font-bold mb-6">Trending Movies</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie: any) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-64 flex items-center justify-center bg-gray-800 text-white">
                  No image
                </div>
              )}
              <h2 className="text-white font-semibold mt-2 px-2">
                {movie.title}
              </h2>
            </Link>
          ))
        ) : (
          <p className="text-gray-400">No movies found. Check TMDB key or network.</p>
        )}
      </div>
    </div>
  );
}
