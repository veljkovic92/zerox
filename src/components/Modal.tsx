import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Movie } from "../types/types";

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
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{textAlign: "center"}}>
        <Modal.Header closeButton>
          <Modal.Title>{foundMovie.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <p>Release Date: {foundMovie.Year}</p>
          <img src={foundMovie.Poster} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Watch Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MovieModal;
