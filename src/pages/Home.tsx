import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { getMovies } from "../fetchData/getData";
import { FetchTypes } from "../types/types";

const Home = () => {
  const [allMovies, setAllMovies] = useState<FetchTypes>([]);

  useEffect(() => {
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
    getAllMovies();
  }, []);

  return (
    <>
      <MovieList fetchTypes={allMovies} />
    </>
  );
};

export default Home;
