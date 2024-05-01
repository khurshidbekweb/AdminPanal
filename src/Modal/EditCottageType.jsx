import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";

function EditCottageType(props) {
  const queryClient = useQueryClient();

  const unusedTranslates = useUnusedTranslates();

  const editCottage = useMutation({
    mutationFn: cottageTypeUtils.patchCottageType,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottagetypes] }),
      ]),
    onError: (err) => {
      console.log(err);
    },
  });

  const handlCottageType = (e) => {
    e.preventDefault();
    editCottage.mutate({
      id: props.id,
      name: e.target.editCottageType.value,
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
              <form className="p-4" onSubmit={handlCottageType}>
                <label className="d-block w-100">
                  <span className="d-block text-start mb-1">
                    Edit cottage type
                  </span>
                  <select className="form-select" name="editCottageType">
                    <option value="" defaultValue selected>
                      select cottage type
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
                <button
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

export default EditCottageType;
