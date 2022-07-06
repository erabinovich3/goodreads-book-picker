import React, { useState } from "react";
import { parse } from "papaparse";
import { filterBooks, isValidGRArray } from "../data/file";
import { FaGoodreads } from "react-icons/fa";
import Modal from "./Modal";

function GRDataUpload({ setBooks }) {
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      parse(e.target.files[0], {
        header: true,
        transformHeader: (header) => {
          return header.toLowerCase().replaceAll(" ", "-");
        },
        skipEmptyLines: true,
        complete: (results) => {
          if (isValidGRArray(results.data)) {
            const books = filterBooks(results.data);
            setBooks(books);
            localStorage.setItem("books", JSON.stringify(books));
          } else {
            console.error("Not valid Goodreads data.");
            setShowModal(true);
          }
        },
      });
    }
  };

  return (
    <div className="intro-page h-100 d-flex justify-content-center align-items-center">
      {showModal && (
        <Modal
          type="error"
          content="Not valid Goodreads data."
          handleClose={() => setShowModal(false)}
        />
      )}

      <div className="upload-block container shadow w-70 rounded p-5 text-center">
        <div className="upload-info border-bottom">
          <h1 className="title">How To Use:</h1>
          <p>
            This app only works with{" "}
            <a
              href="https://help.goodreads.com/s/article/How-do-I-import-or-export-my-books-1553870934590"
              target="_blank"
              rel="noreferrer"
            >
              Goodreads data
            </a>
            !
            <br />
            Leave all shelves unselected to choose from any shelf.
            <br />
            Select one or more shelves to choose books only from those shelves.
            <br />
            <br />
            This app currently only shows <b>exclusive</b> shelves in order to
            avoid repeats.
          </p>
        </div>
        <label className="file-upload btn btn-secondary">
          Upload File{" "}
          <FaGoodreads style={{ verticalAlign: "-2px", marginLeft: "3px" }} />
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default GRDataUpload;
