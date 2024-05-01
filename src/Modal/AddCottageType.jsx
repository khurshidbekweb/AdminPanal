import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import toastify from "../utils/toastify";
import { useContext } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { multiAddCottageType } from "../utils/multiLanguages";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";

function AddCottageType() {
  const queryClient = useQueryClient();

  const unusedTranslates = useUnusedTranslates();

  const addCottageType = useMutation({
    mutationFn: cottageTypeUtils.postCottageType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottagetypes] });
      toastify.successMessage("Dacha tipi muvaffaqiyatli qo'shildi");
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage("Dacha tipini qo'shishda xatolik");
    },
  });

  const handlCottageType = (e) => {
    e.preventDefault();
    addCottageType.mutate({
      name: e.target.cottageType.value,
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
        data-bs-target="#addCottageType"
      >
        {multiAddCottageType[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addCottageType"
        tabIndex="-1"
        aria-labelledby="addCottageTypeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addCottageTypeLabel">
                Add Cottage Type
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
                <label className="d-block">
                  <span className="text-start mb-1 d-block">
                    Select cottage type
                  </span>
                  <select
                    className="form-select mb-4"
                    name="cottageType"
                    id="region-dash"
                  >
                    <option value="" defaultValue selected>
                      select cottage type
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

export default AddCottageType;
