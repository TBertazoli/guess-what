import React from "react";

const Modal = () => {
  return (
    <div class="modal" tabindex="-1" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h2 id="show-modal-text"></h2>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick="closeModal()"
            >
              Close
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              onClick="saveScore()"
            >
              Save Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
