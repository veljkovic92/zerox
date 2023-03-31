import React from "react";
import classes from "./MovieItem.module.scss";

const MovieItem = ({
  poster,
  title,
  active,
}: {
  poster: string;
  title: string;
  active: boolean;
}) => {
  

  return (
    <div className={`${classes.movieItem} ${active ? classes.active : ""}`} >
      <img
        src={poster}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = "none";
        }}
      />
      {poster === "N/A" && (
        <span>No Cover Image Available For This "{title}" Movie!</span>
      )}
    </div>
  );
};

export default MovieItem;
