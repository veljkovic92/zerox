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

  const [yIndex, setYIndex] = useState({
    index0: 0,
    index1: 0,
    index2: 0,
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie>({
    Title: "",
    imdbID: "",
    Poster: "",
    Type: "",
    Year: "",
  });

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

  const [endReached, setEndReached] = useState(false);

  type ObjectKey = keyof typeof yIndex;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowUp": //  arrow up key
          let myIndex = `index${navigation.row - 1}` as ObjectKey;
          setY("decreased");
          setNavigation((navigation) =>
            navigation.row > 0
              ? { column: yIndex[myIndex], row: navigation.row - 1 }
              : navigation
          );
          break;

        case "ArrowDown": //  arrow down key
          setY("increased");
          let myIndex2 = `index${navigation.row + 1}` as ObjectKey;
          setNavigation((navigation) =>
            navigation.row < fetchTypes.length - 1
              ? { column: yIndex[myIndex2], row: navigation.row + 1 }
              : navigation
          );
          break;

        case "ArrowLeft": // left arrow key
          setX("decreased");
          setYIndex((prevVal) => {
            if (navigation.column === 0) {
              return prevVal;
            }
            return {
              ...prevVal,
              [`index${navigation.row}`]: navigation.column - 1,
            };
          });
          setNavigation((navigation) =>
            navigation.column > 0
              ? { ...navigation, column: navigation.column - 1 }
              : navigation
          );

          break;
        case "ArrowRight": // right arrow key
          setX("increased");
          setYIndex((prevVal) => {
            if (navigation.column === 9) {
              return prevVal;
            }
            return {
              ...prevVal,
              [`index${navigation.row}`]: navigation.column + 1,
            };
          });
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
  }, [navigation, fetchTypes, yIndex]);

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
  // scroll za pojedinacni ul element ne radi. Samo za sve ul u okviru parent-a

  useEffect(() => {
    const widthOfPadding = movieTypesRef.current!.offsetWidth - movieTypesWidth;
    console.log(widthOfPadding);
    if (movieTypesWidth > 500) {
      if (x === "increased") {
        if (endReached) return;
        movieTypesRef.current!.children[navigation.row].scrollLeft +=
          (movieTypesRef.current!.offsetWidth - 5 * 10) / 6 + 10;
      } else if (x === "decreased") {
        movieTypesRef.current!.children[navigation.row].scrollLeft -=
          (movieTypesRef.current!.offsetWidth - 5 * 10) / 6 + 10;
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
        if (endReached) return;
        movieTypesRef.current!.children[navigation.row].scrollLeft +=
          movieTypesRef.current!.offsetWidth - 10 + 10;
      } else if (x === "decreased") {
        movieTypesRef.current!.children[navigation.row].scrollLeft -=
          movieTypesRef.current!.offsetWidth - 10 + 10;
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
    return () => {
      setX("");
    };
  }, [
    x,
    y,
    movieTypesWidth,
    currentMovieWidth,
    currentMovieHeight,
    movieWidth,
    movieHeight,
    navigation.column,
    navigation.row,
    endReached,
  ]);

  useEffect(() => {
    if (navigation.column === 9) {
      setEndReached(true);
    } else {
      setEndReached(false);
    }
  }, [navigation.column]);

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
          <div
            className={classes["movieList__movieTypes__parentRow"]}
            key={rowIndex}
            id={rowIndex.toString()}
          >
            <ul className={classes["movieList__movieTypes__parentRow__row"]}>
              {movieType.movies?.map((movie: Movie, columnIndex: number) => (
                <MovieItem
                  poster={movie.Poster}
                  title={movie.Title}
                  key={columnIndex}
                  active={
                    navigation.column === columnIndex &&
                    navigation.row === rowIndex
                  }
                />
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
