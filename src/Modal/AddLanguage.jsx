import { useMutation, useQueryClient } from "@tanstack/react-query";
import { languageUtils } from "../utils/language.utils";
import toastify from "../utils/toastify";
import { useContext } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { multiAddLanguage } from "../utils/multiLanguages";
import { QUERY_KEYS } from "../Query";

function AddLanguage() {
  const queryClient = useQueryClient();

  // add language
  const addLanguage = useMutation({
    mutationFn: languageUtils.postLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
      toastify.successMessage("Til muvaffaqiyati yaratildi.");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLanguage.mutate({
      code: e.target.code.value,
      title: e.target.title.value,
    });
    (e.target.code.value = ""), (e.target.title.value = "");
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addLanguage"
      >
        {multiAddLanguage[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addLanguage"
        tabIndex="-1"
        aria-labelledby="addLanguageLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addLanguageLabel">
                Add Language
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
                <label className="w-100 d-block mb-3">
                  <span className="d-block w-100 mb-1">
                    Enter Language Code
                  </span>
                  <input
                    className="w-100 p-1 form-control"
                    type="text"
                    name="code"
                    placeholder="ex: uz"
                    required
                  />
                </label>
                <label className="w-100 d-block mb-4">
                  <span className="d-block w-100 mb-1">
                    Enter Language description
                  </span>
                  <input
                    className="p-1 w-100 d-block form-control"
                    type="text"
                    name="title"
                    placeholder="ex: O`zbek tili"
                    required
                  />
                </label>
                <button
                  type="submit"
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
}

export default AddLanguage;
