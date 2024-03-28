import { MdDelete } from "react-icons/md";

import deleteImg from "../assets/deleteImg.svg";

const DeleteAllModal = ({ deleteFunction, id }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target={`#deleteAllModal${id}`}
      >
        <MdDelete size={25} />
      </button>
      <div
        className="modal fade"
        id={`deleteAllModal${id}`}
        tabIndex="-1"
        aria-labelledby={`deleteAllModalLabel${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`deleteAllModalLabel${id}`}>
                Are you sure to delete ?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <img src={deleteImg} alt="delete icon" className="py-3" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deleteFunction(id)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAllModal;
