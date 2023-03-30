import React, { useEffect, useRef, useState } from "react";
import { FetchTypes, Movie } from "../types/types";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.scss";

type Navigation = {
  row: number;
  column: number;
};

const MovieList = ({ fetchTypes }: { fetchTypes: FetchTypes }) => {
  const [navigation, setNavigation] = useState<Navigation>({
    row: 0,
    column: 0,
  }); // activeIndex state to keep track of which movie item is currently active

  const [modalOpen, setModalOpen] = useState(false); // modalOpen state to keep track of whether the modal is currently open or not
  const movieTypesRef = useRef<HTMLUListElement>(null); // useRef hook to set initial focus

  const movieTypesWidth = movieTypesRef.current?.offsetWidth || 0;
  const movieWidth = (movieTypesWidth - 5 * 10) / 6;
  const [currentMovieWidth, setCurrentMovieWidth] = useState(movieWidth);
  console.log("width " + movieTypesWidth);
  console.log("movie width " + movieWidth);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowUp": //  arrow up key
          setNavigation((navigation) =>
            navigation.row > 0
              ? { ...navigation, row: navigation.row - 1 }
              : navigation
          );
          break;

        case "ArrowDown": //  arrow down key
          setNavigation((navigation) =>
            navigation.row < fetchTypes.length - 1
              ? { ...navigation, row: navigation.row + 1 }
              : navigation
          );
          break;

        case "ArrowLeft": // left arrow key
          setNavigation((navigation) =>
            navigation.column > 0
              ? { ...navigation, column: navigation.column - 1 }
              : navigation
          );

          break;
        case "ArrowRight": // right arrow key
          setNavigation((navigation) =>
            navigation.column < fetchTypes[navigation.row].movies.length - 1
              ? { ...navigation, column: navigation.column + 1 }
              : navigation
          );

          break;
        case "Enter": // enter key
          setModalOpen(true);
          break;
        default:
          break;
      }
    };

    if (movieTypesRef.current) {
      movieTypesRef.current.focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigation, fetchTypes]);
  console.log(currentMovieWidth);

  useEffect(() => {
    if (navigation.column > 0) {
      setCurrentMovieWidth((navigation.column + 1) * movieWidth);
    } else if (navigation.column === 0) {
      setCurrentMovieWidth(movieWidth);
    }
  }, [navigation]);

  useEffect(() => {
    if (navigation.column > 5) {
      movieTypesRef.current?.scrollBy({
        left: movieWidth + 10,
        behavior: "smooth",
      });
    } else if (navigation.column < 4) {
      movieTypesRef.current?.scrollBy({
        left: -movieWidth - 10,
        behavior: "smooth",
      });
    }
  }, [currentMovieWidth]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <ul className={classes.movieTypes} ref={movieTypesRef} tabIndex={0}>
      {fetchTypes.map((movieType, rowIndex) => (
        <ul className={classes["movieTypes__row"]} key={rowIndex}>
          {movieType.movies.map((movie: Movie, columnIndex: number) => (
            <MovieItem
              poster={movie.Poster}
              key={columnIndex}
              active={
                navigation.column === columnIndex && navigation.row === rowIndex
              }
            />
          ))}
        </ul>
      ))}
    </ul>
  );
};

export default MovieList;
