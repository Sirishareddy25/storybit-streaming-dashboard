import Image from "next/image";
import MovieRow from "@/app/components/MovieRow";
import { fetchMovie, fetchSimilarMovies } from "@/app/lib/tmdb";

export default async function MovieDetailPage({ params }: any) {
  const { id } = await params;

  const movie = await fetchMovie(id);
  const similar = await fetchSimilarMovies(id);

  const title = movie.title || movie.name;
  const year = movie.release_date?.slice(0, 4);
  const rating = movie.vote_average?.toFixed(1);
  const runtime = movie.runtime;
  const genres = movie.genres?.map((g: any) => g.name).join(", ");

  // Find YouTube trailer
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/fallback-hero.jpg";

  return (
    <div className="pb-20 text-white">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={backdrop}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-10 left-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            {title}
          </h1>
          <p className="mt-4 text-white/80 md:text-lg max-w-xl line-clamp-4">
            {movie.overview}
          </p>

          {trailer && (
            <a
              href={`#trailer`}
              className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-md font-semibold shadow hover:opacity-90 transition"
            >
              ▶ Play Trailer
            </a>
          )}
        </div>
      </section>

      {/* TRAILER PLAYER */}
      {trailer && (
        <section id="trailer" className="max-w-5xl mx-auto mt-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* MOVIE DETAILS */}
      <section className="max-w-5xl mx-auto mt-14 px-6">
        <h2 className="text-2xl font-bold mb-4">Details</h2>

        <div className="space-y-2 text-white/80">
          <p><strong>Rating:</strong> ⭐ {rating}</p>
          <p><strong>Year:</strong> {year}</p>
          <p><strong>Runtime:</strong> {runtime} min</p>
          <p><strong>Genres:</strong> {genres}</p>
        </div>
      </section>

      {/* CAST */}
      <section className="max-w-5xl mx-auto mt-14 px-6">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-3">
          {movie.credits?.cast?.slice(0, 15).map((actor: any) => {
            const img = actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "/fallback-poster.jpg";

            return (
              <div key={actor.id} className="w-28 shrink-0 text-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden">
                  <Image src={img} alt={actor.name} fill className="object-cover" />
                </div>
                <p className="mt-2 text-sm font-semibold">{actor.name}</p>
                <p className="text-xs text-white/50">{actor.character}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SIMILAR MOVIES */}
      <section className="max-w-6xl mx-auto mt-16 px-6">
        <MovieRow categoryTitle="Similar Movies" movies={similar} />
      </section>
    </div>
  );
}
