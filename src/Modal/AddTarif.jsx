import { QUERY_KEYS, useServices, useUnusedTranslates } from "../Query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tariffUtils } from "../utils/tariff.utils";
import toastify from "../utils/toastify";
import { useContext } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { multiAddTariff } from "../utils/multiLanguages";

const AddTarif = () => {
  const queryClient = useQueryClient();

  // unUsedTranslates
  const unusedTranslates = useUnusedTranslates();

  // get Services
  const service = useServices();

  // add tariff
  const addTariff = useMutation({
    mutationFn: tariffUtils.addTariff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.unusedTranslates],
      });
      toastify.successMessage("Service muvaffaqiyati yaratildi.");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addTariff.mutate({
      type: e.target.type.value,
      description: e.target.description.value,
      service_id: e.target.serviceId.value,
      days: e.target.days.value,
      price: e.target.price.value,
    });
  };

  // language change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTariff"
      >
        {multiAddTariff[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addTariff"
        tabIndex="-1"
        aria-labelledby="addTariffLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="addTariffLabel">
                Add Tariff
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handleSubmit}>
                <label className="d-block  mb-3">
                  <span className="d-block">Select Type</span>
                  <select name="type" className="form-control">
                    <option defaultValue selected disabled>
                      Select type
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
                  <span className="d-block">Select description</span>
                  <select name="description" className="form-control ">
                    <option defaultValue disabled selected>
                      Select description
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
                  <span className="d-block">Select service</span>
                  <select name="serviceId" className="form-control ">
                    <option defaultValue disabled selected>
                      Select service
                    </option>
                    {service.data?.length &&
                      service.data.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.name}
                          </option>
                        );
                      })}
                  </select>
                </label>

                <label className="d-block mb-3">
                  <span className="d-block">Days</span>
                  <input
                    type="number"
                    placeholder="Enter days"
                    name="days"
                    className="form-control"
                  />
                </label>

                <label className="d-block mb-3">
                  <span className="d-block">Price</span>
                  <input
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
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTarif;
