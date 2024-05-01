import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { languageUtils } from "../utils/language.utils";
import { translateUtils } from "../utils/translate.utils";
import toastify from "../utils/toastify";
import { multiAddTranslate } from "../utils/multiLanguages";
import { useContext } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { QUERY_KEYS } from "../Query";

function Translate() {
  const queryClient = useQueryClient();

  const language = useQuery({
    queryKey: ["languages_translate"],
    queryFn: languageUtils.getLanguage,
  });

  const addTranslate = useMutation({
    mutationFn: translateUtils.postTranslate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.translates] });
      toastify.successMessage("Translate muvaffaqiyatli qo'shildi.");
    },
    onError: () => {
      toastify.errorMessage("Hatolik yuz berdi");
    },
  });

  const handlTranslate = (e) => {
    e.preventDefault();
    const definition = {};
    for (let el of language.data) {
      definition[el.code] = e.target[el.code].value;
    }
    addTranslate.mutate({
      code: e.target.code.value,
      definition,
      type: e.target.type.value,
    });
    e.target.code.value = "";
    e.target.uz.value = "";
    e.target.en.value = "";
    e.target.ru.value = "";
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTranslate"
      >
        {multiAddTranslate[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addTranslate"
        tabIndex="-1"
        aria-labelledby="addTranslatelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addTranslateLabel">
                Translate
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlTranslate}>
                <label className="d-block">
                  <span className="w-100 d-block mb-1">Translate code</span>
                  <input
                    className="w-100 p-1 mb-3 form-control"
                    required
                    type="text"
                    name="code"
                    placeholder="code: "
                  />
                </label>
                <p className="fw-medium fs-5 mb-1">Definition</p>
                {language?.data?.length &&
                  language.data.map((e) => {
                    return (
                      <label key={e.id} className="w-100 d-block mb-2">
                        <span className="d-block w-100">
                          {" "}
                          {e.code} definition
                        </span>
                        <input
                          className="p-1 w-100 d-block form-control"
                          required
                          type="text"
                          name={e.code}
                          placeholder={e.code}
                        />
                      </label>
                    );
                  })}
                <select
                  className="form-select form-select-sm p-1"
                  name="type"
                  required
                  aria-label=".form-select-sm example"
                >
                  <option value="content">Content</option>
                  <option value="error">Error</option>
                </select>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
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

export default Translate;
