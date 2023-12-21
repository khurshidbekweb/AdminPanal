import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import { translateUtils } from "../utils/translate.utils";


function AddCottageType() {
    const queryClient = useQueryClient()
    const unusedTranslates = useQuery({
        queryKey: ["unusedTranslates"],
        queryFn: translateUtils.getUnusedTranslates
    })
    const addCottageType = useMutation({
        mutationFn: cottageTypeUtils.postCottageType,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['cottagetypes']})
        },
        onError: (err) => {
            console.log(err);
        }        
      })
      const handlCottageType = (e) => {
        e.preventDefault();
        addCottageType.mutate({
            name: e.target.cottageType.value
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
              <form className="p-4" onSubmit={handlCottageType}>
                <select
                  className="form-select mb-4"
                  name="cottageType"
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
  )
}

export default AddCottageType