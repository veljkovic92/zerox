export type FetchTypes = Array<MovieType>;
export type MovieType = { type: string; movies: Movie[] };
export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

