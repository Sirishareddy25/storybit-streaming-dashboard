import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchMoviesByGenre,
} from "./lib/tmdb";

export default async function Home() {
  const trending = await fetchTrendingMovies();
  const popular = await fetchPopularMovies();
  const nowPlaying = await fetchNowPlayingMovies();
  const action = await fetchMoviesByGenre(28);
  const comedy = await fetchMoviesByGenre(35);
  const thriller = await fetchMoviesByGenre(53);
  const horror = await fetchMoviesByGenre(27);
  const romance = await fetchMoviesByGenre(10749);

  const heroMovie = trending?.[0];

  return (
    <main className="pt-24 pb-16 px-6 md:px-12 min-h-screen text-white">
      {heroMovie && <Hero movie={heroMovie} />}

      <div className="space-y-12 max-w-6xl mx-auto">
        <MovieRow categoryTitle="Top Picks For You" movies={popular ?? []} />
        
        <MovieRow categoryTitle="Action Movies" movies={action ?? []} />
        <MovieRow categoryTitle="Comedy Movies" movies={comedy ?? []} />
        <MovieRow categoryTitle="Horror Movies" movies={horror ?? []} />
        <MovieRow categoryTitle="Romance Movies" movies={romance ?? []} />
      </div>
    </main>
  );

export default async function Home() {
  const trending = await fetchTrendingMovies();
  const popular = await fetchPopularMovies();

  // DEBUG: expose counts on page
  return (
    <>
      <div className="max-w-6xl mx-auto p-6 text-white">
        <pre className="bg-zinc-800 p-4 rounded">
          Debug counts:
          {"\n"}trending: {Array.isArray(trending) ? trending.length : JSON.stringify(trending)}
          {"\n"}popular: {Array.isArray(popular) ? popular.length : JSON.stringify(popular)}
        </pre>
      </div>
      {/* rest of your original Home rendering */}
    </>
  );
}
