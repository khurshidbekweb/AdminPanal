import { CiEdit } from "react-icons/ci";
import { QUERY_KEYS, useServices, useUnusedTranslates } from "../Query";
import toastify from "../utils/toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tariffUtils } from "../utils/tariff.utils";

const EditTarif = ({ id, tariff }) => {
  const queryClient = useQueryClient();

  const unusedTranslates = useUnusedTranslates();

  // edit tariff
  const editTariff = useMutation({
    mutationFn: tariffUtils.editTariff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.unusedTranslates],
      });
      toastify.successMessage("Service muvaffaqiyati o'zgartirildi.");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    editTariff.mutate({
      id: id,
      description: e.target.description.value,
      days: e.target.days.value,
      price: e.target.price.value,
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editTarif${id}`}
      >
        <CiEdit size={30} />
      </button>

      <div
        className="modal fade"
        id={`editTarif${id}`}
        tabIndex="-1"
        aria-labelledby={`editTarif${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editTarif${id}Label`}>
                Tariff update
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handleSubmit}>
                <label className="d-block mb-3">
                  <span className="d-block">Edit tariff description</span>
                  <select name="description" className="form-control ">
                    <option value="" selected defaultValue>
                      select tariff description
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

                <label className="d-block mb-3">
                  <span className="d-block">Edit days</span>
                  <input
                    defaultValue={tariff?.days}
                    type="number"
                    placeholder="enter days"
                    name="days"
                    className="form-control"
                  />
                </label>

                <label className="d-block mb-3">
                  <span className="d-block">Price</span>
                  <input
                    defaultValue={tariff?.price}
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    className="form-control"
                  />
                </label>

                <button
                  type="submit"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
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
};

export default EditTarif;
