import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { translateUtils } from "../utils/translate.utils";
import { regionUtils } from "../utils/region.utils";
import toastify from "../utils/toastify";

function AddRegion() {
    const queryClient = useQueryClient()
  const unusedTranslates = useQuery({
    queryKey: ["unusedTranslates"],
    queryFn: translateUtils.getUnusedTranslates,
  });
  const addRegion = useMutation({
    mutationFn: regionUtils.postRegion,
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({queryKey: ["regions"]}),
      queryClient.invalidateQueries({queryKey: ["unusedTranslates"]}),
      toastify.successMessage("Viloyat muvaffaqiyatli yaratildi")
    ]),
    onError: () => {
      toastify.errorMessage("Hatolik yuz berdi.")
    }
    
  })
  const handlRegion = (e) => {
    e.preventDefault()
    addRegion.mutate({
        name: e.target.region.value
    })
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ADD REGION
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlRegion}>
                <select
                  className="form-select mb-4"
                  name="region"
                  id="region-dash"
                >
                  {unusedTranslates.data?.length &&
                    unusedTranslates.data.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.code}
                        </option>
                      );
                    })}
                </select>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  {" "}
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRegion;
