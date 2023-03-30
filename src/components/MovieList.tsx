import React, { useEffect, useState } from "react";
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigation, fetchTypes]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <ul className={classes.movieTypes}>
      {fetchTypes.map((movieType, rowIndex) => (
        <li key={rowIndex}>
          <ul className={classes["movieTypes__list"]}>
            {movieType.movies.map((movie: Movie, columnIndex: number) => (
              <MovieItem
                poster={movie.Poster}
                key={columnIndex}
                active={
                  navigation.column === columnIndex &&
                  navigation.row === rowIndex
                }
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
