import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import MovieList from "../components/MovieList";
import { getMovies } from "../fetchData/getData";
import { MovieType } from "../types/types";
import classes from "./Home.module.scss";

const Home = () => {
  const [allMovies, setAllMovies] = useState<MovieType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [movieSearched, setMovieSearched] = useState(false);

  const searchMovie = async () => {
    if (search) {
      const res = await getMovies(search);
      if (!!res) {
        setAllMovies([{ type: search, movies: res }]);
        setMovieSearched(true);
      }
    } else {
      getAllMovies();
      setMovieSearched(false);
    }
  };

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

  useEffect(() => {
    getAllMovies();
  }, []);

  console.log();

  return (
    <div className={classes.home}>
      <h1>Movie Schack</h1>
      <section className={classes["home__search"]}>
        <Form.Control
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Find your movie"
          id="form_control"
        />
        <Button type="submit" onClick={searchMovie} variant="danger">
          Search
        </Button>
      </section>

      <MovieList fetchTypes={allMovies} searchValue={movieSearched} />
    </div>
  );
};

export default Home;
