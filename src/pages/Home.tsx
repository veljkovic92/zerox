import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { getMovies } from "../fetchData/getData";
import { FetchTypes } from "../types/types";

const Home = () => {
  const [allMovies, setAllMovies] = useState<FetchTypes>([]);
  //napravi input koji ce da uzima input values odvojene zarezima i na submit taster da se sve salje u newMovies i renderuje nova list u zavisnosti od dodatih stvari u input-u
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
  console.log(allMovies);

  return (
    <>
      <input />
      <MovieList fetchTypes={allMovies} />
    </>
  );
};

export default Home;
