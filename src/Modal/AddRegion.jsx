import { useMutation, useQueryClient } from "@tanstack/react-query";
import { regionUtils } from "../utils/region.utils";
import toastify from "../utils/toastify";
import { useContext } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { multiAddRegion } from "../utils/multiLanguages";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";

function AddRegion() {
  const queryClient = useQueryClient();

  const unusedTranslates = useUnusedTranslates();

  const addRegion = useMutation({
    mutationFn: regionUtils.postRegion,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.regions] }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.unusedTranslates],
        }),
        toastify.successMessage("Viloyat muvaffaqiyatli yaratildi"),
      ]),
    onError: () => {
      toastify.errorMessage("Hatolik yuz berdi.");
    },
  });

  const handlRegion = (e) => {
    e.preventDefault();
    addRegion.mutate({
      name: e.target.region.value,
    });
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addRegion"
      >
        {multiAddRegion[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addRegion"
        tabIndex="-1"
        aria-labelledby="addRegionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addRegionLabel">
                Add Region
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
                <label className="w-100 d-block">
                  <span className="d-block mb-1">Select Region name</span>
                  <select
                    className="form-select mb-4"
                    name="region"
                    id="region-dash"
                  >
                    <option value="" defaultChecked selected>
                      select region name
                    </option>
                    {unusedTranslates.data?.length &&
                      unusedTranslates.data.map((el) => {
                        return (
                          <option key={el.id} value={el.id}>
                            {el.code}
                          </option>
                        );
                      })}
                  </select>
                </label>
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
