import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { regionUtils } from "../utils/region.utils";
import toastify from "../utils/toastify";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";

function EditRegion(props) {
  const queryClient = useQueryClient();

  const unusedTranslates = useUnusedTranslates();

  const editRegion = useMutation({
    mutationFn: regionUtils.patchRegion,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.unusedTranslates],
        }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.regions] }),
        toastify.successMessage("Viloyat nomi muvaffaqiyatli o'zgartirildi 🙌"),
      ]),
    onError: () => {
      toastify.errorMessage("Hatolik yuz berdi😣");
    },
  });

  const patchRegion = (e) => {
    e.preventDefault();
    editRegion.mutate({
      id: props.id,
      name: e.target.editRegion.value,
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
              <form className="p-4" onSubmit={patchRegion}>
                <label className="d-block">
                  <span className="d-block mb-1 text-start">Select Region</span>
                  <select className="form-select" name="editRegion">
                    <option value="" defaultValue selected>
                      select region
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
                  data-bs-dismiss="modal"
                  className="btn btn-modal bg-success fs-6 fw-bold rounded-2 mt-3 text-white d-block"
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

export default EditRegion;
