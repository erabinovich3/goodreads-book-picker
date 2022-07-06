import React from "react";

const warningMsg =
  "Are you sure? This will clear your data and you will need to upload a file again.";

function Modal({ type, content, handleClose, handleReset }) {
  return (
    <div
      className="modal-bg w-100 h-100 position-absolute top-0 start-0"
      onClick={handleClose}
    >
      <div className="custom-modal w-75 mx-auto position-relative">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header p-0 pb-3 ps-3">
              <h5 className="modal-title">
                {type === "error" ? "Error" : "Warning"}
              </h5>
              <button className="btn-close" onClick={handleClose}></button>
            </div>

            <div className="modal-body text-center">
              {type === "warning" ? warningMsg : content}
            </div>
            <div className="modal-footer p-0 pt-3 pe-3">
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
              {type === "warning" && (
                <button className="btn btn-warning" onClick={handleReset}>
                  Clear Data
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
