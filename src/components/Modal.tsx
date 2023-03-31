import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Movie } from "../types/types";
import classes from "./Modal.module.scss";

function MovieModal({
  modalIsOpen,
  foundMovie,
}: {
  modalIsOpen: boolean;
  foundMovie: Movie;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(modalIsOpen);
  }, [modalIsOpen]);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} className={classes.modal} centered >
        <Modal.Header closeButton className={classes["modal__header"]}>
          <Modal.Title className={classes["modal__header__title"]}>
            <h2>{foundMovie.Title}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes["modal__body"]}>
          <img
            src={foundMovie.Poster}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = "none";
            }}
            alt={foundMovie.Title}
          />

          {foundMovie.Poster === "N/A" && (
            <span>
              No Cover Image Available For This "{foundMovie.Title}" Movie!
            </span>
          )}
        </Modal.Body>
        <Modal.Footer className={classes["modal__footer"]}>
          <p className={classes["modal__footer--release"]}>
            <em>
              <strong>Release Date: </strong>
              {foundMovie.Year}
            </em>
          </p>

          <div className={classes["modal__footer__actions"]}>
            <Button variant="danger" onClick={handleClose}>
              Watch Now
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MovieModal;
