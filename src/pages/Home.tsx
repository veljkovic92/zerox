import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import MovieList from "../components/MovieList";
import { getMovies } from "../fetchData/getData";
import useDebounce from "../hooks/useDebounce";
import { FetchTypes, Movie, MovieType } from "../types/types";
import classes from "./Home.module.scss";

const Home = () => {
  const [allMovies, setAllMovies] = useState<MovieType[]>([]);
  const [search, setSearch] = useState<string>("");
  const searchDebouncedValue = useDebounce(search, 500);

  const searchMovie = useCallback(async () => {
    if (searchDebouncedValue.length) {
      const res = await getMovies(searchDebouncedValue);
      if (!!res) {
        setAllMovies([{ type: searchDebouncedValue, movies: res }]);
      }
    } else {
      getAllMovies();
    }
  }, [searchDebouncedValue]);

  const getAllMovies = async () => {
    try {
      const newMovies = [];
      const spiderman = await getMovies("Spiderman");
      const batman = await getMovies("Batman");
      const avengers = await getMovies("Avengers");
      newMovies.push(
        { type: "spiderman", movies: spiderman },
        { type: "batman", movies: batman },
        { type: "avengers", movies: avengers }
      );

      setAllMovies(newMovies);
    } catch (error) {
      console.log(error);
    }
  };

  //napravi input koji ce da uzima input values odvojene zarezima i na submit taster da se sve salje u newMovies i renderuje nova list u zavisnosti od dodatih stvari u input-u
  useEffect(() => {
    getAllMovies();
  }, []);
  // console.log("these are all movies: " + allMovies);

  // useEffect(() => {
  //   if (!keywords || keywords.length === 0) {
  //     getAllMovies();
  //   }
  //   const getKeyMovies = async () => {
  //     // ovde saljes vise fetcha na backend kroz loop. Vidi da li je to dobra praksa i ako ne, ispravi
  //     try {
  //       const newMovies: FetchTypes = [];
  //       for (let i = 0; i < keywords.length; i++) {
  //         const newKeyMovie = await getMovies(keywords[i]);
  //         const newKeyMovieObject: MovieType = {
  //           type: keywords[i],
  //           movies: newKeyMovie,
  //         };

  //         console.log(newKeyMovieObject);

  //         newMovies.push(newKeyMovieObject);

  //         // console.log("these are all movies: " + newMovies);
  //       }
  //       if (newMovies && newMovies.length) {
  //         console.log("new movie array is here" + newMovies);

  //         setAllMovies(newMovies);
  //       }
  //       console.log(newMovies);
  //     } catch (err) {}
  //   };

  //   getKeyMovies();
  // }, [keywords]);

  console.log()

  return (
    <div className={classes.home}>
      <input onChange={(e) => setSearch(e.target.value)} />
      <Button type="submit" onClick={searchMovie}>
        Search
      </Button>

      <MovieList fetchTypes={allMovies} />
    </div>
  );
};

export default Home;
