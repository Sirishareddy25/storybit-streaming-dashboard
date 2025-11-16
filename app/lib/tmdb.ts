// app/lib/tmdb.ts

const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

async function fetchFromTMDB(path: string, init?: RequestInit) {
  if (!API_KEY) throw new Error("TMDB_API_KEY missing");
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${sep}api_key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store", ...init });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`TMDB error ${res.status}: ${txt}`);
  }

  return res.json();
}

// Movie detail
export async function fetchMovieById(id: string | number) {
  return await fetchFromTMDB(`/movie/${id}`);
}

// Trailers / videos
export async function fetchMovieVideos(id: string | number) {
  try {
    const data = await fetchFromTMDB(`/movie/${id}/videos`);
    return data?.results ?? [];
  } catch (err) {
    console.error("fetchMovieVideos error:", err);
    return [];
  }
}

// Trending Now
export async function fetchTrendingMovies() {
  const data = await fetchFromTMDB("/trending/movie/day");
  return data?.results ?? [];
}

// Popular (Top Picks / Popular on StoryBit)
export async function fetchPopularMovies() {
  const data = await fetchFromTMDB("/movie/popular");
  return data?.results ?? [];
}

// New & Hot (now playing / latest releases)
export async function fetchNowPlayingMovies() {
  const data = await fetchFromTMDB("/movie/now_playing");
  return data?.results ?? [];
}

// Discover by genre
export async function fetchMoviesByGenre(genreId: number) {
  const data = await fetchFromTMDB(
    `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`
  );
  return data?.results ?? [];
}
export async function searchMovies(query: string) {
  if (!query) return [];

  const url = `${process.env.TMDB_BASE_URL}/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return [];

  const data = await res.json();
  return data.results || [];
}
export async function fetchMovie(id: string | number) {
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,credits,similar`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed movie fetch");
  return res.json();
}

export async function fetchSimilarMovies(id: string | number) {
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.results || [];
}
