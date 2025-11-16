// types/movie.ts
export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number | null;
  [key: string]: any;
}

export interface TMDBListResponse {
  page?: number;
  results: Movie[];
  total_results?: number;
  total_pages?: number;
}

export interface Video {
  id: string;
  key: string;        // YouTube key (most common)
  name?: string;
  site?: string;      // e.g., "YouTube"
  type?: string;      // "Trailer", "Teaser", etc.
  official?: boolean;
  iso_639_1?: string;
  iso_3166_1?: string;
  size?: number;
}
