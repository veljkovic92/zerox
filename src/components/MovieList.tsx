import React from "react";
import "react-multi-carousel/lib/styles.css";
import { FetchTypes, Movie } from "../types/types";
import MovieItem from "./MovieItem";
import classes from "./MovieRow.module.scss";

const MovieList = ({ fetchTypes }: { fetchTypes: FetchTypes }) => {
  return (
    <ul>
      {fetchTypes.map((movieType, rowIndex) => (
        <li key={rowIndex}>
          <ul>
            {movieType.movies.map((movie: Movie, columnIndex: number) => (
              <MovieItem poster={movie.Poster} key={movie.imdbID} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
