import React from "react";
import classes from "./MovieItem.module.scss";

const MovieItem = ({ poster, active }: { poster: string, active: boolean}) => {


  return (
    <div className={`${classes.movieItem} ${active ? classes.active : ""}`}>
      <img src={poster} />
    </div>
  );
};

export default MovieItem;
