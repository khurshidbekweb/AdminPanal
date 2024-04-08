import { useMutation, useQueryClient } from "@tanstack/react-query";
import { languageUtils } from "../utils/language.utils";
import { CiEdit } from "react-icons/ci";
import { QUERY_KEYS } from "../Query";

function EditLanguage(props) {
  const queryClient = useQueryClient();

  const editLanguage = useMutation({
    mutationFn: languageUtils.pachtLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const patchLanguage = (e) => {
    e.preventDefault();
    editLanguage.mutate({
      id: props.id,
      title: e.target.title.value,
    });
  };

  return (
    <div className="edit-language">
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${props?.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editModal${props?.id}`}
        tabIndex="-1"
        aria-labelledby={`editModal${props?.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`editModal${props?.id}Label`}
              >
                Edit Language
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={patchLanguage}>
                <label className="w-100 mb-3 text-start">
                  <span className="mb-1 d-block w-100">
                    Edit Language description
                  </span>
                  <input
                    className="w-100 form-control"
                    type="text"
                    name="title"
                    placeholder="ex: O`zbek tili"
                  />
                </label>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-modal bg-success fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLanguage;
