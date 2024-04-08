import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { comfortUtils } from "../utils/comfort.utils";
import { useRef } from "react";
import toastify from "../utils/toastify";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";

function EditComfort(props) {
  const editCloseBtn = useRef(null);

  const queryClient = useQueryClient();

  const unusedTranslates = useUnusedTranslates();

  const editcomfort = useMutation({
    mutationFn: comfortUtils.patchComfort,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.unusedTranslates],
        }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.comforts] }),
      ]);
      editCloseBtn.current.setAttribute("data-bs-dismiss", "modal");
      toastify.successMessage("Muaffaqiatli tahrirlandi");
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage(err.message);
    },
  });

  const handlComfort = async (e) => {
    e.preventDefault();
    editcomfort.mutate({
      id: props.id,
      image: e.target.updeteImg.files[0],
      name: e.target.editComfort.value,
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editModa${props.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editModa${props.id}`}
        tabIndex="-1"
        aria-labelledby={`editModa${props.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModa${props.id}Label`}>
                Edit Region
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlComfort}>
                <label className="d-block mb-3">
                  <span className="d-block mb-1 text-start">Edit comfort</span>
                  <select className="form-control" name="editComfort">
                    <option value="" selected defaultValue>
                      select comfort
                    </option>
                    {unusedTranslates.data?.length &&
                      unusedTranslates.data.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.code}
                          </option>
                        );
                      })}
                  </select>
                </label>
                <label className="d-block text-start">
                  <span className="text-start d-block mb-1">
                    Upload comfort image
                  </span>
                  <input
                    type="file"
                    name="updeteImg"
                    className="form-control"
                  />
                </label>
                <button
                  ref={editCloseBtn}
                  type="submit"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 mt-3 text-white d-block"
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditComfort;
