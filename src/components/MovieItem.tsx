import React from "react";
import classes from "./MovieItem.module.scss";

const MovieItem = ({ poster }: { poster: string }) => {
  return (
    <div className={classes.movieItem}>
      <img src={poster} />
    </div>
  );
};

export default MovieItem;
