import React, { useEffect, useRef, useState } from "react";
import { FetchTypes, Movie } from "../types/types";
import MovieModal from "./Modal";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.scss";

type Navigation = {
  row: number;
  column: number;
};

const MovieList = ({
  fetchTypes,
  searchValue,
}: {
  fetchTypes: FetchTypes;
  searchValue: boolean;
}) => {
  const [navigation, setNavigation] = useState<Navigation>({
    row: 0,
    column: 0,
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie>({
    Title: "",
    imdbID: "",
    Poster: "",
    Type: "",
    Year: "",
  });

  const [keyboardIsTouched, setKeyboardIsTouched] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const movieTypesRef = useRef<HTMLUListElement>(null);

  const movieTypesWidth = movieTypesRef.current?.offsetWidth || 0;
  const movieTypesHeight = movieTypesRef.current?.offsetHeight || 0;

  const movieWidth =
    movieTypesWidth > 500
      ? (movieTypesWidth - 5 * 10) / 6
      : movieTypesWidth - 10;

  const movieHeight = (movieTypesHeight - 2 * 20) / 3;

  const [currentMovieWidth, setCurrentMovieWidth] = useState(movieWidth);
  const [currentMovieHeight, setCurrentMovieHeight] = useState(movieWidth);

  const [x, setX] = useState("");
  const [y, setY] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowUp": //  arrow up key
          if (!keyboardIsTouched) {
            setKeyboardIsTouched(true);
          }
          setY("decreased");
          setNavigation((navigation) =>
            navigation.row > 0
              ? { ...navigation, row: navigation.row - 1 }
              : navigation
          );
          break;

        case "ArrowDown": //  arrow down key
          if (!keyboardIsTouched) {
            setKeyboardIsTouched(true);
          }
          setY("increased");
          setNavigation((navigation) =>
            navigation.row < fetchTypes.length - 1
              ? { ...navigation, row: navigation.row + 1 }
              : navigation
          );
          break;

        case "ArrowLeft": // left arrow key
          if (!keyboardIsTouched) {
            setKeyboardIsTouched(true);
          }
          setX("decreased");
          setNavigation((navigation) =>
            navigation.column > 0
              ? { ...navigation, column: navigation.column - 1 }
              : navigation
          );

          break;
        case "ArrowRight": // right arrow key
          if (!keyboardIsTouched) {
            setKeyboardIsTouched(true);
          }
          setX("increased");
          setNavigation((navigation) =>
            navigation.column < fetchTypes[navigation.row].movies.length - 1
              ? { ...navigation, column: navigation.column + 1 }
              : navigation
          );

          break;
        case "Enter": // enter key
          if (document.activeElement?.id !== "form_control") {
            setModalOpen(true);
          } else {
            document.getElementById("form_button")?.click();
          }

          const foundMovie =
            fetchTypes[navigation.row].movies[navigation.column];
          setSelectedMovie(foundMovie);

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
      setModalOpen(false);
    };
  }, [navigation, fetchTypes]);

  useEffect(() => {
    if (navigation.column > 0) {
      setCurrentMovieWidth((navigation.column + 1) * movieWidth);
    } else if (navigation.column === 0) {
      setCurrentMovieWidth(movieWidth);
    }

    if (navigation.row > 0) {
      setCurrentMovieHeight((navigation.row + 1) * movieHeight);
    } else if (navigation.row === 0) {
      setCurrentMovieHeight(movieHeight);
    }
  }, [navigation, movieWidth, movieHeight]);

  useEffect(() => {
    if (movieTypesWidth > 500) {
      if (navigation.column > 5 && x === "increased") {
        movieTypesRef.current?.scrollBy({
          left: movieWidth + 15,
          behavior: "smooth",
        });
      } else if (navigation.column < 4 && x === "decreased") {
        movieTypesRef.current?.scrollBy({
          left: -movieWidth - 15,
          behavior: "smooth",
        });
      }

      if (navigation.row === 0 && y === "decreased") {
        movieTypesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (navigation.row === 2 && y === "increased") {
        movieTypesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    } else {
      if (x === "increased") {
        movieTypesRef.current?.scrollBy({
          left: movieWidth + 10,
          behavior: "smooth",
        });
      } else if (x === "decreased") {
        movieTypesRef.current?.scrollBy({
          left: -movieWidth - 10,
          behavior: "smooth",
        });
      }

      if (navigation.row === 0 && y === "decreased") {
        movieTypesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else if (navigation.row === 2 && y === "increased") {
        movieTypesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  }, [
    currentMovieWidth,
    currentMovieHeight,
    movieWidth,
    movieHeight,
    navigation.column,
    navigation.row,
  ]);

  return (
    <div className={classes.movieList}>
      <MovieModal modalIsOpen={modalOpen} foundMovie={selectedMovie} />
      <h2>{searchValue ? "Your Movies: " : "Recommended For You:"}</h2>
      <ul
        className={classes["movieList__movieTypes"]}
        ref={movieTypesRef}
        tabIndex={0}
      >
        {fetchTypes?.map((movieType, rowIndex) => (
          <ul
            className={classes["movieList__movieTypes__row"]}
            key={rowIndex}
            id={rowIndex.toString()}
          >
            {movieType.movies?.map((movie: Movie, columnIndex: number) => (
              <MovieItem
                poster={movie.Poster}
                title={movie.Title}
                key={columnIndex}
                active={
                  navigation.column === columnIndex &&
                  navigation.row === rowIndex &&
                  keyboardIsTouched === true
                }
              />
            ))}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
