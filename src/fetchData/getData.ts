import axios from "axios";

export const getMovies = async (searchItem: string) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=f165b3bc&s=${searchItem}`
    );
    const movies = response.data.Search;
    return movies;
  } catch (error) {
    console.error(error);
  }
};
