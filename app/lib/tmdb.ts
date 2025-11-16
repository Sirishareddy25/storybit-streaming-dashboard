// app/lib/tmdb.ts
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

/**
 * Centralized fetch wrapper for TMDB.
 * - If API_KEY is missing, returns safe defaults (no build crash).
 * - Throws only for non-200 responses when key is present.
 */
async function fetchFromTMDB(path: string, init?: RequestInit) {
  // If no API key, return a safe empty result (do NOT throw)
  if (!API_KEY) {
    // Server-side log (visible in Vercel build logs)
    // eslint-disable-next-line no-console
    console.warn("TMDB_API_KEY missing; returning safe fallback for", path);
    // TMDB list endpoints usually return { results: [...] }
    // For safety return an object that callers can inspect.
    return { results: [] };
  }

  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${path}${sep}api_key=${API_KEY}`;

  const res = await fetch(url, { cache: "no-store", ...init });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`TMDB error ${res.status}: ${txt}`);
  }

  return res.json();
}

/** Movie detail by ID (returns null if missing or error) */
export async function fetchMovieById(id: string | number) {
  try {
    const data = await fetchFromTMDB(`/movie/${id}`);
    // if our fallback returned { results: [] } when API_KEY missing,
    // treat that as "no movie"
    if (!data || data?.results) return null;
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchMovieById error:", err);
    return null;
  }
}

/** Trailers / videos (returns [] on error) */
export async function fetchMovieVideos(id: string | number) {
  try {
    const data = await fetchFromTMDB(`/movie/${id}/videos`);
    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchMovieVideos error:", err);
    return [];
  }
}

/** Trending Now (array) */
export async function fetchTrendingMovies() {
  try {
    const data = await fetchFromTMDB("/trending/movie/day");
    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchTrendingMovies error:", err);
    return [];
  }
}

/** Popular (array) */
export async function fetchPopularMovies() {
  try {
    const data = await fetchFromTMDB("/movie/popular");
    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchPopularMovies error:", err);
    return [];
  }
}

/** Now playing (array) */
export async function fetchNowPlayingMovies() {
  try {
    const data = await fetchFromTMDB("/movie/now_playing");
    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchNowPlayingMovies error:", err);
    return [];
  }
}

/** Discover by genre (array) */
export async function fetchMoviesByGenre(genreId: number) {
  try {
    const data = await fetchFromTMDB(
      `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`
    );
    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchMoviesByGenre error:", err);
    return [];
  }
}

/** Search movies (array) */
export async function searchMovies(query: string) {
  if (!query) return [];
  try {
    const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`);
    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("searchMovies error:", err);
    return [];
  }
}

/** Full movie with append_to_response (videos, credits, similar). Returns null on error */
export async function fetchMovie(id: string | number) {
  try {
    const data = await fetchFromTMDB(`/movie/${id}?append_to_response=videos,credits,similar`);
    // When key missing fetchFromTMDB returns { results: [] } — treat that as null
    if (!data || data?.results) return null;
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchMovie error:", err);
    return null;
  }
}

/** Similar movies (array) */
export async function fetchSimilarMovies(id: string | number) {
  try {
    const data = await fetchFromTMDB(`/movie/${id}/similar`);
    return data?.results ?? [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchSimilarMovies error:", err);
    return [];
  }
}
