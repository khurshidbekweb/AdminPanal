import { useMutation, useQueryClient } from "@tanstack/react-query";
import { comfortUtils } from "../utils/comfort.utils";
import toastify from "../utils/toastify";
import { useContext, useRef } from "react";
import { multiAddComfort } from "../utils/multiLanguages";
import { LanguageContext } from "../Helper/LanguageContext";

// icons
import { FaUpload } from "react-icons/fa";

import { QUERY_KEYS, useUnusedTranslates } from "../Query";

function AddComfort() {
  const addComfortBtn = useRef(null);

  const queryClient = useQueryClient();

  // get ununusedTranslates
  const unusedTranslates = useUnusedTranslates();

  // add comfort
  const addComfort = useMutation({
    mutationFn: comfortUtils.postComfort,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.comforts],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.unusedTranslates],
      });
      toastify.successMessage("Qo'shish muvaffaqiyat amalga oshirildi 🙌");
    },
    onError: (err) => {
      toastify.errorMessage(err.message);
      console.log(err);
    },
  });

  const handlComforts = (e) => {
    e.preventDefault();
    addComfort.mutate({
      name: e.target.comfort.value,
      image: e.target.comfortImg.files[0],
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
        data-bs-target="#addcomfort"
      >
        {multiAddComfort[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addcomfort"
        tabIndex="-1"
        aria-labelledby="addcomfortLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="addcomfortLabel">
                Comforts
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlComforts}>
                <label className="d-block">
                  <span className="d-block mb-1">Enter comfort</span>
                  <select name="comfort" className="form-select">
                    <option value="" defaultValue selected>
                      select comfort
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
                <label className="file-input-label mt-3">
                  <input
                    type="file"
                    name="comfortImg"
                    id="comfort-img"
                    className="file-input"
                  />
                  <FaUpload size={25} />
                  <span>Upload Img</span>
                </label>
                <button
                  ref={addComfortBtn}
                  type="submit"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
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

export default AddComfort;
