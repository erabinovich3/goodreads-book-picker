import React, { useState } from "react";
import Modal from "./Modal";

function Sidebar({ shelves, setSelectedShelves, setBooks, setChosenBook }) {
  const [checked, setChecked] = useState(new Array(shelves.length).fill(false));
  const [showModal, setShowModal] = useState(false);

  const handleChange = (position) => {
    const updatedChecked = checked.map((shelf, index) =>
      index === position ? !shelf : shelf
    );
    setChecked(updatedChecked);

    const updatedShelves = shelves.filter(
      (shelf, index) => updatedChecked[index]
    );
    setSelectedShelves(updatedShelves);
  };

  const resetBooks = () => {
    localStorage.removeItem("books");
    setBooks([]);
    setChosenBook(null);
  };

  return (
    <div className="sidebar border col d-flex flex-column">
      {showModal && (
        <Modal
          type="warning"
          handleClose={() => setShowModal(false)}
          handleReset={resetBooks}
        />
      )}

      <div className="shelves p-3">
        <h3>Shelves:</h3>
        {shelves.map((shelf, index) => {
          return (
            <div className="form-check d-flex" key={index}>
              <input
                className="form-check-input ms-0 flex-shrink-0"
                type="checkbox"
                id={shelf}
                name={shelf}
                value={shelf}
                checked={checked[index]}
                onChange={() => handleChange(index)}
              />
              <label className="form-check-label" htmlFor={shelf}>
                &nbsp;{shelf}
              </label>
            </div>
          );
        })}
      </div>
      <div className="re-upload-btn mt-sm-auto d-flex justify-content-center mb-4">
        <button
          className="btn btn-sm btn-outline-danger re-upload-btn"
          onClick={() => setShowModal(true)}
        >
          Re-Upload Goodreads Data
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
